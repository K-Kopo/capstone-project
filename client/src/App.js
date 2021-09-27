import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import DonationsPage from "./pages/DonationsPage/DonationsPage";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import Footer from "./components/Footer/Footer";
import Donations from "./components/Donations/Donations";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" component={UserPage} />
        <Route path="/donations/:id" component={DonationsPage} />
        <Route path="/users/:id" component={UserPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/donations" component={Donations} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
