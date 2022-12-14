// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home"
import About from "./components/About"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
    <Router>
      <div>
        <Navbar />
        <div >
        <Routes>
          <Route path="/" element={<Home></Home>}>
          </Route>
          <Route path="/about" element={<About></About>}>
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
