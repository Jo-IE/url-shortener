var Url = require('../models/url');
var {body, validationResult} = require('express-validator');
var {sanitizeBody} = require('express-validator');

//display url entry form on GET

exports.index = function(req, res){
    res.render('index', {title: 'Url Shortener'});
}

//handle url entry on POST

exports.index_post = [
    //validate url entry
    body('url').isLength({min:1}).trim().withMessage('Url field must not be Empty')
    .isURL().withMessage('URL must be a valid URL'),
    
    //sanitize url entry
    //sanitizeBody('url').escape(),
    function(req, res, next){
        const errors = validationResult(req)
        
         var url = new Url({
                url_name: req.body.url,
            })
            
        if(!errors.isEmpty()){
            res.render('index', {title:'Url Shortener', url: url, errors: errors.array()})
        }
        else{
            //no errors process POST
            Url.findOne({'url_name':url.url_name},function(err, existingUrl){
                if (err){return next(err)}
            
            if(existingUrl){
                
            //url exists, render it
            console.log(existingUrl.short_url)
            res.render('short_url', {title: "Shortened Url", url: existingUrl});
            
            }else{
                //url doesnt exist, save it and genrate short url
                url.save(function(err, savedUrl){
                if (err){return next(err)}
                res.render('short_url', {title: "Shortened Url", url: savedUrl});
            });
            }
            })
            } 
        }
];

//redirect to original URL on GET

exports.url_get = function(req, res, next){
    //var shortenedUrl = req.params.url;
    console.log(req.params.url)
    //search database for original url
   Url.find({}, function(err, allUrls){
        if (err){return next(err)}
        allUrls.forEach(function(obj){
            if(obj.short_url_code === req.params.url){
                res.redirect(obj.url_name)
            }
        })
      
    })
     
};
