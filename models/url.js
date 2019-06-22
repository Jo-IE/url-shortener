var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var btoa = require("btoa");
var bases = require('bases')

var UrlSchema = new Schema({
  url_name: {type: String},
  count: {type: Number}
})

UrlSchema
.virtual('short_url')
.get(function(){
   return '/shorten/' + btoa(this._id)
   
})

UrlSchema
.virtual('short_url_code')
.get(function(){
   return btoa(this._id)
})

UrlSchema
.set('toObject', { getters: true });

/*UrlSchema
.virtual('display_short_url')
.get(function(){
  return 
})*/

module.exports = mongoose.model('Url', UrlSchema);
