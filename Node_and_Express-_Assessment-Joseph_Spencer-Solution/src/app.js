const express = require("express");
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");
const app = express();


//Routes
app.get("/zoos/all",(req,res) => { 
  const { admin } = req.query 
  if (admin === "true") { 
    res.send(`All zoos: ${getZoos().join("; ")}`) } 
  res.send("You do not have access to that route.") })

app.get("/check/:zip", validateZip, (req, res, next) => {
   const zip = req.params.zip;
  const message = getZoos(zip)
    ? `${zip} exists in our records.`
    : `${zip} does not exist in our records.`;
  res.send(message); 
});

app.get("/zoos/:zip", validateZip, (req, res) => { 
  const zip = req.params.zip 
  const zoos = getZoos(zip) 
  if (zoos && zoos.length) { 
    res.send(`${zip} zoos: ${zoos.join("; ")}`) 
  } 
  res.send(`${zip} has no zoos.`) 
})

  //Error handling
app.use((req, res, next) => {
  res.send(`That route could not be found!`);
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;