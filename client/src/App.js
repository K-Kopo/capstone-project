import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import DonationsPage from "./pages/DonationsPage/DonationsPage";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage/LogInPage";

function App() {
  return (
    <Router >
      <Header />
      
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" component={UserPage}/>
        <Route path="/donations" component={DonationsPage}/>
        <Route path="/users/:id" component={UserPage}/>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LogInPage} />
      </Switch>
      
      
      'Welcome to the Capstone, sucka!'
      </Router>
  );
}

export default App;
