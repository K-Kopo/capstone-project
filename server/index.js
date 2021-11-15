const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const PORT = 8000;
const usersRoute = require('./routes/users');
const donationsRoute = require('./routes/donations');
const cors = require("cors");
const dbUrl =  'mysql://g7oadfmg39eyd3up:kh1d65zx7macz5w3@x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/k77mc4uco60xbip6'
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Here's Johnny!!");
});

app.use("/users", usersRoute);

app.use("/donations", donationsRoute);

app.listen(`${PORT}`, ()=> {
    console.log(`listening at ${dbUrl}`);
})