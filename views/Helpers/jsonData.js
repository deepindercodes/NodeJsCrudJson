const fs = require('fs');

//https://www.geeksforgeeks.org/how-to-add-data-in-json-file-using-node-js/
//https://flaviocopes.com/how-to-check-if-file-exists-node/
//https://stackabuse.com/how-to-use-module-exports-in-node-js/

//data.json
let newarticle = {
    id: "",
    articletitle: "",
    articleauthor: "",
    articlebody: "",
    articleimage: "",
    createdonutc: "",
    modifiedonutc: "",
    status: "",
}

const path = './db/data.json'

class CrudArticle
{

    constructor()
    {
        
    }

    getArticles()
    {
        let dataJson = {};
        if(fs.existsSync(path) === true)
        {
            var data = fs.readFileSync(path);
            dataJson = JSON.parse(data);
        }
        return dataJson.articles;
    }

    getArticleById(id)
    {
        let articleid = parseInt(id);

        let dataJson = {};
        var data = fs.readFileSync(path);
        dataJson = JSON.parse(data);

        //console.log(dataJson.articles);

        let article = {};
        article = dataJson.articles.filter(a => a.id == articleid)[0];
        return article;

    }

    saveArticle(articletitle,articleauthor,articlebody,articleimage)
    {
        try{
            newarticle.articletitle = articletitle;
            newarticle.articleauthor = articleauthor;
            newarticle.articlebody = articlebody;
            newarticle.articleimage = articleimage;
            //console.log(articleimage);
            //console.log(newarticle.articleimage);
            newarticle.status = "E";

            const date = new Date();
            const utcStr = date.toUTCString()

            newarticle.createdonutc = utcStr;
            
           

            let dataJson = {};

            let pk = 1;

            if(fs.existsSync(path) === true)
            {
                var data = fs.readFileSync(path);
                dataJson = JSON.parse(data);

                pk = parseInt(dataJson.pk) + 1;
                newarticle.id = pk;

                dataJson.pk = pk;
                dataJson.articles.push(newarticle);

            }
            else
            {
                newarticle.id = pk;
                
                dataJson = {
                    pk : pk.toString(),
                    articles : [
                        newarticle
                    ]
                }

            }

            var newData = JSON.stringify(dataJson);
            fs.writeFile(path, newData, err => {
                // error checking
                if(err) throw err;
                
                //console.log("New Article added");
            });   


            return true;

        }
        catch(e){
            console.log(e);
            return false;
        }

    }

    updateArticle(id,articletitle,articleauthor,articlebody,articleimage)
    {
        try{

            let articleid = parseInt(id);

            let dataJson = {};
            var data = fs.readFileSync(path);
            dataJson = JSON.parse(data);

            //console.log(dataJson.articles);

            let article = {};
            article = dataJson.articles.filter(a => a.id == articleid)[0];

            article.articletitle = articletitle;
            article.articleauthor = articleauthor;
            article.articlebody = articlebody;
            article.articleimage = articleimage;

            const date = new Date();
            const utcStr = date.toUTCString()

            article.modifiedonutc = utcStr;
        

            var newData = JSON.stringify(dataJson);
            fs.writeFile(path, newData, err => {
                // error checking
                if(err) throw err;
                
                //console.log("New Article added");
            });   


            return true;

        }
        catch(e){
            console.log(e);
            return false;
        }

    }

    delArticle(id)
    {
        let articleid = parseInt(id);

        let dataJson = {};
        var data = fs.readFileSync(path);
        dataJson = JSON.parse(data);

        
        let newArticles = dataJson.articles.filter(a => a.id != articleid);
        dataJson.articles = newArticles;

        
        
        var newData = JSON.stringify(dataJson);
        fs.writeFile(path, newData, err => {
            // error checking
            if(err) throw err;
            
            //console.log("New Article added");
        });   

    }
}

// exporting
module.exports = CrudArticle;