const express = require("express");
const User = require("./../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();
const SECRET_KEY = "Yeah$@#";
const fetchUser = require("../middleware/fetchUser")

// 1) Route : Creating User, No Login required
route.post(
    "/createuser",
    [
        //Validation for the fields,
        body("emailID", "Please Enter a valid EmailID").isEmail(),
        body("name", "Please Enter a Valid Name").isString(),
        body("name", "Name is of minumum 5 Length").isLength({ min: 5 }),
        body("password", "Length of Password should not less than 5").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        // if Error exists
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else{
        try {
            //for checking the user is exists in the dataBase or not
            // let value = await User.findOne({emailID:"ramjk1159@gmail.com"})
            const saltValue = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, saltValue);
            let useCreated = await User.create({
                name: req.body.name,
                emailID: req.body.emailID,
                password: hashPassword,
            });
            let data = {
                user: {
                    id: useCreated._id,
                },
            };
            var authToken = jwt.sign(data, SECRET_KEY);
            res.json({ authToken });
        } catch (error) {
            if ("keyValue" in error && "emailID" in error["keyValue"]) {
                //Sendig Bad request
                res.status(400).json({ Error: "User is already exists with the same EmailID" });
            }
            // Some Other Errors are Occured
            else {
                res.status(500).json({ error: "Something Went Wrong!, We will fix soon :-)" });
            }
        }
    }
    }
);

// 2) Route : Login User, No Login required
route.post(
    "/login",
    [
        //Validation for the fields,
        body("emailID", "Please Enter a valid EmailID").isEmail(),
        body("password", "Password should not empty").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // if Error exists
        if (!errors.isEmpty()) {
            res.status(400).send("Please Enter the Valid Crendentials");
        }
        else{
        try {
            const { emailID, password } = req.body
            const userExists = await User.findOne({ emailID });
            if (!userExists) {
                res.status(400).send("Please Enter the Valid Crendentials");
            } else {
                isPasswordValid = await bcrypt.compare(password, userExists.password)
                if (isPasswordValid) {
                    let data = {
                        user: {
                            id: req.body._id,
                        },
                    };
                    var authToken = jwt.sign(data, SECRET_KEY);
                    res.json({ authToken });
                    console.log("Logged Successfully");
                }
                else {
                    res.status(400).send("Please Enter the Valid Crendentials");
                }
            }
        } catch (error) {
            res
                .status(500)
                .json({ Error: "Something Went Wrong!, We will fix soon :-)" });
        }
    }
    }
);

// 3) Route : Getting User Details, Login Required
route.post('/fetchuser', fetchUser,  async (req,res)=>{
    let id = req.user.id
    try {
        let user = await User.findById(id).select('-password')
       res.json(user)
    } catch (error) {
        res.status(400).send("Internal Server error")
        
    }
})



module.exports = route;
