import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import  Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import Alert  from './components/Alert';
import HeroSection from "./components/HeroSection";
import Signup from "./components/signup";
import Login from "./components/Login";
import { useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  return (
    <>
       <NoteState>
        <Router>
          <Navbar
          title="Notevault"
          button1="Login"
          button2="Signup" />
          {/* <Alert message="This is amazing React course" /> */}
          <div>
            <Routes>
              <Route exact path="/" element={<HeroSection />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup setUser={setUser}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App; 
