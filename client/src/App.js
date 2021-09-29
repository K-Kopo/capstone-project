import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import DonationsPage from "./pages/DonationsPage/DonationsPage";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Footer from "./components/Footer/Footer";
import Donations from "./components/Donations/Donations";
import AboutPage from "./pages/AboutPage/AboutPage";

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
        <Route path="/about" component={AboutPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
