const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, ()=> {
    console.log(`listening at http://localhost:${PORT}`);
})