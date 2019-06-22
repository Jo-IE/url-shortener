var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var router = express.Router();
var url_controller = require('./urlController')






router.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

//router.use(express.static(path.join(__dirname, 'public')));

router.get('/', url_controller.index);

  
router.post('/', url_controller.index_post)
router.get('/:url', url_controller.url_get)

module.exports=router;