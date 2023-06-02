let express = require("express");

let app = express();

app.use(express.json());

let PORT = 9090;

let db = [];

let counter = 1;



app.listen(PORT, function () {
  console.log("Application started on port", PORT);
});