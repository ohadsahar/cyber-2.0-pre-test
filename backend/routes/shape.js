const express = require("express");
const CubeData = require("../models/shapeschema");
const fs = require("fs");
const PDF = require("pdfkit");
const router = express.Router();

router.post("", (req,res,next) => {

  let doc = new PDF;
  const name = 'Ohad' + '.pdf';

  fs.appendFileSync('src/assets/pdf-files/temp.pdf','Width:' + req.body.width + ' ' + 'Height:' + req.body.height + ' ' + 'Direction:' + req.body.direction  + ' ' ,'utf-8');
  const readme = fs.readFileSync('src/assets/pdf-files/temp.pdf', 'utf-8');


  const cubedata = new CubeData ({
    width: req.body.width,
    height: req.body.height,
    direction: req.body.direction
  });
    doc.pipe(fs.createWriteStream('src/assets/pdf-files/' + name));
    doc.font('fonts/PalatinoBold.ttf').fontSize(15).text('All cube information:' + readme,100 , 100);
    doc.end();

  cubedata.save().then(CreatedCube => {

    res.status(200).json({
      cubes: {
        id: CreatedCube._id,
        width: CreatedCube.width,
        height: CreatedCube.height,
        direction: CreatedCube.direction
      }
    });
  });
});

router.get("", (req,res,next) => {
  CubeData.find().then(documents => {
    res.status(200).json({
      cubes: documents
    });
  });
});




module.exports = router;
