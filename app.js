const http=require('http');

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var path=require('path');

const express = require('express')
const cors = require("cors")
const app = express()
var router = express.Router();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/uploads', express.static(__dirname + '/uploads'));

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.use(cors())

app.listen(3000, () => console.log("Multer Server Start"));

app.get('/', (req, res)=>{
    // res.send('<p>home page</p>');
    res.sendFile('./views/index.html',{ root: __dirname});
    // res.render('index');
});



 app.post('/single/upload', upload.single('file'), (req, res, next) => {

//  router.post('/single/upload', upload.single('file'), (req, res, next) => {

    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
    const { name } = req.body;
  
    console.log("name : ", name);
    console.log("fieldname : ", fieldname);
    console.log("originalname: ", originalname);
    console.log("encoding : ", encoding);
    console.log("mimetype : ", mimetype);
    console.log("destination : ", destination);
    console.log("filename : ", filename);
    console.log("path ", path);
    console.log("size", size);

    // res.json({ok: true, data: "Single Upload Ok"})
    res.redirect('/');

  
  })


 app.post('/multipart/upload', upload.array('file'), (req, res, next) => {

    const { name } = req.body;
    console.log("name : ", name);
  
    req.files.map(data => {
        console.log("data.fieldname : ", data.fieldname);
        console.log("data.originalname : ", data.originalname);
        console.log("data.encoding : ", data.encoding);
        console.log("data.mimetype : ", data.mimetype);
        console.log("data.destination : ", data.destination);
        console.log("data.filename : ", data.filename);
        console.log("data.path : ", data.path);
        console.log("data.size : ", data.size);
    })
  
    res.json({ok: true, data: "Multipart Upload Ok"})
  
  })




const fileFields = upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 8 },
]);

app.post('/fields/upload', fileFields, (req, res, next) => {


    const { file1, file2 } = req.files;
    const { name } = req.body;


    console.log("name : ", name);

    file1.map(data => {
        console.log("file1");
        console.log("     ");
        console.log("data.fieldname : ", data.fieldname);
        console.log("data.originalname : ", data.originalname);
        console.log("data.encoding : ", data.encoding);
        console.log("data.mimetype : ", data.mimetype);
        console.log("data.destination : ", data.destination);
        console.log("data.filename : ", data.filename);
        console.log("data.path : ", data.path);
        console.log("data.size : ", data.size);
    })
    
    console.log("     ");
    console.log("-----------------------------------------------");
    console.log("     ");
    
    file2.map(data => {
        console.log("file2");
        console.log("     ");
        console.log("data.fieldname : ", data.fieldname);
        console.log("data.originalname : ", data.originalname);
        console.log("data.encoding : ", data.encoding);
        console.log("data.mimetype : ", data.mimetype);
        console.log("data.destination : ", data.destination);
        console.log("data.filename : ", data.filename);
        console.log("data.path : ", data.path);
        console.log("data.size : ", data.size);
    })

    res.json({ok: true, data: "Fields Upload Ok"})

})