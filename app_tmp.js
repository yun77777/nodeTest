const express=require('express');
const http=require('http');

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var path=require('path');

var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
var static = require('serve-static');


const upload = multer({ 
    dest: __dirname+'/uploads/', 
}) 

//express app
const app=express();
var router = express.Router();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/views', express.static(__dirname + '/views'));

// app.use(cors());
 
//register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myViews');

//listen for requests


// app.use('/upload', express.static(__dirname + '/upload'));
app.use(cors());

var storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(request, 'upload');
    },
    filename: (request, file, callback) => {
    
        var basename = path.basename(file.basename);
        var date = Date.now();
        
        callback(request, date + '_' + basename);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 10
    }
});

app.get('/', (req, res)=>{
    // res.send('<p>home page</p>');
    res.sendFile('./views/index.html',{ root: __dirname});
    // res.render('index');
});

app.get('/test', (req, res)=>{
    res.sendFile('./views/test.html',{ root: __dirname});
});

app.get('/config', (req,res)=>{
    utilsApi.openConfig('./config.json');

    // res.sendFile('./config.json',{ root: __dirname});

});

app.get('/about', (req, res)=>{
    // res.send('<p>about page</p>');
    res.sendFile('./views/about.html',{ root: __dirname});
});

//redirects
app.get('/about-blah', (req, res)=>{
    res.redirect('/about');
});

//GET
app.get('/upload', (request, response) => {
    console.log('# GET /upload');

    fs.readFile('./views/test.html', 'utf8', (err, data) => {
        if(err) throw err;

        console.log('upload.html read');
        
        response.write(data);
        response.end();
    });
});

//when there are mutl files, use upload.array(name)
//when there is a single file, use upload.single(name)
// app.get('/upload', function(req, res){
//     res.render('upload');
//   });
  app.post('/upload', upload.single('uploadfile'), function(req, res){
    alert('f')
    const { fieldname, originalname, encoding, mimetyle, destination, filename, path, size} = req.file;;
    const {name} = req.body;

    // res.send('Uploaded : '+req.file.filename);
    console.log("req.body.name: ",name);
    console.log("req.file.destination: ",destination);

    res.json({ok:true, data:"'single upload ok"});
  });
  

//404 page
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html',{ root: __dirname});
});

app.listen(3000);
