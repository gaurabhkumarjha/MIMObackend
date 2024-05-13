const express = require("express");
const app = express();
require('./DB/db');
const cors = require("cors");
const router = require('./Routes/routes');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(router);
app.use("/uploads", express.static("./Upload"));

app.get('/', (req, res) => {
      res.status(201).json("express running...");
});


app.listen(port, () => {
      console.log("server is running...");
});