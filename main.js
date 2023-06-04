let express = require("express");

let app = express();

app.use(express.json());

let PORT = 9001;

let db = [];

let counter = 1;

app.post("/contacts", function (req, res) {
  let n = req.body.name;

  let o = req.body.occ;

  let newContact = {
    name: n,
    occ: o,
    id: counter,
  };
  counter++;

  db.push(newContact);
  res.json(newContact);
});

app.get("/contacts", function (req, res) {
  let summaries = db.map(function (element) {
    let summary = {};
    summary.name = element.name;
    summary.id = element.id;
    return summaries;
  });

  res.json(summaries);
});

app.get("/contacts/:id", function (req, res) {
  let id = req.params.id;

  let found = db.find(function (element) {
    if (element.id == id) {
      return true;
    } else {
      return false;
    }
  });

  res.json(found);
});

app.delete("/contacts/:id", function (req, res) {
  let id = req.params.id;

  let newDb = db.filter(function (element) {
    if (element.id == id) {
      return false;
    } else {
      return true;
    }
  });

  db = newDb;
});

app.put("/contacts/:id", function (req, res) {
  let id = req.params.id;

  let name = req.body.name;
  let occ = req.body.occ;
  let done = req.body.done == true;

  let found = db.find(function (element) {
    if (element.id == id) {
      return true;
    } else {
      return false;
    }
  });

  if (found) {
    found.name = name;
    found.occ = occ;
    found.done = done;
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, function () {
  console.log("Application started on port", PORT);
});
