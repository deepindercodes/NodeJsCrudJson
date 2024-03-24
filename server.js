const express = require('express')

const CrudArticle = require('./views/Helpers/jsonData')

var path = require('path');

const app = express();
const port = 3000;

let obja = new CrudArticle();

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup public folder
app.use(express.static('./public'));

//index page
app.get('/',function (req, res) {

    let articles = obja.getArticles();
    res.render('pages/index', {objarticles:articles});
});

//addnewarticle
app.get('/addnewarticle',function (req, res) {
    res.render('pages/addnewarticle',{articleCreated : false})
});
app.post('/addnewarticle',function (req, res) {
    
    let articleAdded = obja.saveArticle(req.body.txtarticletitle,req.body.txtarticleauthor, req.body.txtarticlebody,req.body.hdnarticleimage);
    //console.log(req.body);
    //console.log(obja);
    //console.log(articleAdded);

    res.render('pages/addnewarticle',{articleCreated : articleAdded});
});

//editarticle
app.get('/editarticle',function (req, res) 
{
    let articleid = req.query.id;
    let article = obja.getArticleById(articleid);
    res.render('pages/editarticle',{objarticle : article, articleEdited : false});
});
app.post('/editarticle',function (req, res) 
{
    let articleid = req.query.id;
    let article = {};
    let articleUpdated = obja.updateArticle(articleid,req.body.txtarticletitle,req.body.txtarticleauthor, req.body.txtarticlebody,req.body.hdnarticleimage);
    if(articleUpdated == false)
    {
        article = obja.getArticleById(articleid);
    }

    res.render('pages/editarticle',{objarticle : article, articleEdited : articleUpdated});
});

//delarticle
app.get('/delarticle',function (req, res) 
{
    let articleid = req.query.id;
    let article = obja.delArticle(articleid);

    res.redirect('/');
   
});

//view
app.get('/view',function (req, res) 
{
    let articleid = req.query.id;
    let article = obja.getArticleById(articleid);

    res.render('pages/view',{objarticle : article});
   
});


app.listen(port, () => console.log(`App Started on port ${port}!`));

//https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application
//https://medium.com/swlh/master-ejs-template-engine-with-node-js-and-expressjs-979cc22b69be