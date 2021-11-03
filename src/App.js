import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth";
import {initializeBackendForUser} from "./axiosFunctions"

function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <h1>Loading</h1>
      </div>
    );
  }
  if (error) {
    return <h1>Error</h1>;
  }
  if (user) {
    initializeBackendForUser(user.email);
    return <Home />;
  } else {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
