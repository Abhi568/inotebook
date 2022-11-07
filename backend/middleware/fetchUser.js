const jwt = require("jsonwebtoken");
const SECRET_KEY = "Yeah$@#";

const getUserDetails = (req, res, next) => {
  let token = req.header("auth-token")
  if (!token) {
    res.status(401).json({ Error: 'Please authenticate using a valid token' })
  } else {
    try {
      var userDetails = jwt.verify(token, SECRET_KEY);
      console.log(userDetails)
      req.user = userDetails.user
      next()
    } catch (err) {
      res.status(401).json({ Error: 'Please authenticate using a valid token' })

    }


  }

}

module.exports = getUserDetails