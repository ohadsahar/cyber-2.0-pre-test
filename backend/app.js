const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const CubeData = require("./routes/shape");

//returing us an express app
const app = express();


//writing to our database in the mongodb and is name:first
mongoose.connect("mongodb+srv://ohad:ppd53brx!@cluster0-vw61b.mongodb.net/together?retryWrites=true",  { useNewUrlParser: true })
.then(() =>{

  console.log("Connected to server");

})
.catch(() => {

  console.log("Failed");
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});




app.use("/api/savedCubeData",CubeData );

module.exports = app;
