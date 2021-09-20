import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import DonationsPage from "./pages/DonationsPage/DonationsPage";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <Router >
      
      <Switch>
        <Route to="/" exact component={HomePage} />
        <Route to="/users" component={UserPage}/>
        <Route to="/donations" component={DonationsPage}/>
        <Route to="/users/:id" component={UserPage}/>
      </Switch>
      
      
      'Welcome to the Capstone, sucka!'
      </Router>
  );
}

export default App;
