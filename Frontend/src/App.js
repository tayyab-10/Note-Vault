// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
// import Navbar from './components/Navbar';
// import  Home  from './components/Home';
// import About from './components/About';
// import NoteState from './context/notes/NoteState';
// import Alert  from './components/Alert';
import Login from './components/Login';

function App() {
  return (
    <>
   {/* <h5 className="container">Tayyab</h5> */}
    <Login/>
      {/* <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is amazing React course" />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState> */}
    </>
  );
}

export default App;
