


/** 
 *  Prefer to use var when declaring variables because 
 *   I'm going to use try catch  keywords, so if you modify 
 *  Please take it in mined 
 * 
 */

var  http    = require("http");
var  https   = require('https');
var  url     = require("url");
var  decoder = require("string_decoder").StringDecoder;
var  { ExceptionError } = require('./CustomException') ;









class UnifiedServer{


   constructor( { http  , url , decoder  , config , fs , router , hendler   } ){

         

         if(  ( typeof http.createServer !== 'function' || typeof http.Server !== 'function' ) ){

             throw new ExceptionError( " The HTTP module does not provide the expected API. " , 500  );
         }

        //  if ( https != null && ( typeof https.createServer !== 'function' || typeof https.Server !== 'function' ) ){

        //       throw new ExceptionError('The HTTPS module does not provide the expected API.');
        //   }

         if( typeof url.parse   !== 'function'   ){

              throw new ExceptionError('Please provide url module !!! ');
         }

         if( typeof decoder  !== 'function' ){

              throw new ExceptionError('Please provide string_decoder module !!! ');
         }

         if( typeof fs.readFileSync !== 'function'){

              throw new Error('Please provide fs module !!! ');
         }
        
         if( typeof router !== 'object'){

                throw new Error('Please provide router !!! ');
         }
        
         if( typeof handler !== 'object'){

                  throw new Error('Please provide handler !!! ');
         }


         this.https         =  null;
         this.http          = http   ;
         this.config        = config ;
         this.url           = url    ;
         this.stringDecoder = stringDecoder ;
         this.fileManager   = fs ;
         this.router        = router;
         this.handler       = handler;
         this.httpskeys     = null ;
         this.server        = http.createServer((req ,  res ) => { 

            this.handleServerRequest(req , res );

         });


         if( !( this.server  instanceof  http.Server ) ){

            throw new ExceptionError("Please import http modeule !!!\n server must be instance of http.Server !!! ") ;
   
        }

   } 



    static  setSSl( server , key , cert ){

        server.httpskeys  = {

            'key' : server.fileManager.readFileSync(key) ,
            'cert': server.fileManager.readFileSync(cert)

      };

    }




    
    handleServerRequest( req , res ){

      this.parse_url      = this.url.parse(req.url ,  true );
      this.path           = this.parsed_url.pathname        ;
      this.trimmed_path   = this.path.replace(/^\/+|\/+$/g , '').replace( /\//g , '_') ;
      this.method         = req.method.toLocaleLowerCase();
      this.header         = req.headers ;
      this.queryStringObj = this.parsed_url.query ;
      this.buffer         = '' ;
      this.stringDecoder  = new this.decoder('utf-8') ;


      req.on( 'data' , (data) => { 

        this.buffer      = this.stringDecoder.write(data);

      });

      req.on('end' , () => { 

        this.buffer += this.stringDecoder.end();
        let data  = {
            "base_url"       : `http://${req.headers.host}${this.path}` ,
            "path"           :  this.path                               ,
            "trimmed_path"   :  this.trimmed_path                       ,
            "method"         :  this.method                             ,
            "header"         :  this.method                             ,
            "queryStringObj" :  this.queryStringObj                     ,
            "buffer"         :  JSON.parse(this.buffer)                 

        };


        console.log(data);

      });
          

    }



}