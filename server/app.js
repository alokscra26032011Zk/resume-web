var express = require("express");
var app = express();
var cors = require('cors')
var multer = require('multer')
var bodyParser = require('body-parser');
const Extractor = require('./extractor');
const fs = require('fs')
const tesseract = require("node-tesseract-ocr")
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')
app.post('/image', function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    console.log(req.file);
    tesseract.recognize("files/"+req.file.filename, config)
  .then(text => {
    console.log("Result:", text)
    var writeStream = fs.createWriteStream("files/"+req.file.filename+".txt");
writeStream.write(text);
writeStream.end();
Extractor
      .parseResumeFile('./files/' + req.file.filename+'.txt', './files/compiled') // input file, output dir
      .then(file => {
        console.log("Yay! " + file);
        let jsonData = {}
        fs.readFile('./files/compiled/'+file+'.json', 'utf-8', (err, data) => {
          if (err) throw err

          jsonData = JSON.parse(data)
          const jsonResponse = Object.keys(jsonData).map(i => ({ [i] :jsonData[i] }))
          console.log(jsonResponse);
          
          return res.send(jsonResponse)
        })

      })
      .catch(error => {
        console.error(error);
        return res.json({})
      });

  })
  .catch(error => {
    console.log(error.message)
  })

    

    

  })

});
app.post('/upload', function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    console.log(req.file);

    Extractor
      .parseResumeFile('./files/' + req.file.filename, './files/compiled') // input file, output dir
      .then(file => {
        console.log("Yay! " + file);
        let jsonData = {}
        fs.readFile('./files/compiled/'+file+'.json', 'utf-8', (err, data) => {
          if (err) throw err

          jsonData = JSON.parse(data)
          const jsonResponse = Object.keys(jsonData).map(i => ({ [i] :jsonData[i] }))
          console.log(jsonResponse);
          
          return res.send(jsonResponse)
        })

      })
      .catch(error => {
        console.error(error);
        return res.json({})
      });

    

  })

});