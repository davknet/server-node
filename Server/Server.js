
/** 
 *  Prefer to use var when declaring variables because 
 *   I'm going to use try catch  keywords, so if you modify 
 *  Please take it in mined 
 * 
 */

var  https          = require('https');
var  UnifiedServer  = require('./UnifiedServer');
var  http    = require("http");
var  url     = require("url");
var  config  = require("./Config");
var  fs      = require('fs');
var  decoder = require("string_decoder").StringDecoder;
var  { router , handler } = require('./Routes');


            try{
           
            var server  = new  UnifiedServer( { http  , url , decoder  , config , fs , router , handler });    
            server.startServer();
            UnifiedServer.setSSl(server , server.config.key , server.config.cert );
            UnifiedServer.setHttps(server , https );
            server.startSecuredServer();

            }catch(e){
    
                console.log()
                console.error("an error occurred :", e.message); 
                console.error(e.stack);
    
            }finally{
    
                console.log("test 10 "); 
    
            }