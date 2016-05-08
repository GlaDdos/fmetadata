var express = require('express');
var exphbs = require('express-handlebars');
var multer = require('multer');
var upload = multer({dest: 'upload/'});
var app = express();

var router = express.Router();


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

router.use(function(request, response, next){
  next();
});

app.use('/', router);
router.route('/')
  .get(function(request, response){
    response.render('home');
  });

router.route('/file')
  .post(upload.single('file'), function(request, response){
    console.log(request.file.size);
    response.json({ fileSize: request.file.size });
  });


app.set('port', process.env.PORT || 8080 );
app.listen(app.get('port'));

console.log('Node server is listening on port ' + app.get('port'));
