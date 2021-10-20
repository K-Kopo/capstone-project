// require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const usersRoute = require('./routes/users');
const donationsRoute = require('./routes/donations');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Here's Johnny!!");
});

app.use("/users", usersRoute);

app.use("/donations", donationsRoute);

app.listen(`${PORT}`, ()=> {
    console.log(`listening at http://localhost:${PORT}`);
})