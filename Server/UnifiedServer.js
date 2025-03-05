


/** 
 *  Prefer to use var when declaring variables because 
 *   I'm going to use try catch  keywords, so if you modify 
 *  Please take it in mined 
 * 
 */


var   CustomeException  = require('./CustomException') ;










class UnifiedServer{


   constructor( { http , url , decoder  , config , fs , router , handler   } ){

         

         if(  ( typeof http.createServer !== 'function' || typeof http.Server !== 'function' ) ){

             throw new CustomeException( " The HTTP module does not provide the expected API. "   );
         }

    

         if( typeof url.parse   !== 'function'   ){

              throw new CustomeException('Please provide url module !!! ');
         }

         if( typeof decoder  !== 'function' ){

              throw new CustomeException('Please provide string_decoder module !!! ');
         }

         if( typeof fs.readFileSync !== 'function'){

              throw new CustomeException('Please provide fs module !!! ');
         }
        
         if( typeof router !== 'object'){

                throw new CustomeException('Please provide router !!! ');
         }
        
         if( typeof handler !== 'object'){

                  throw new CustomeException('Please provide handler !!! ');
         }


         this.https         =  null;
         this.http          = http   ;
         this.config        = config ;
         this.url           = url    ;
         this.stringDecoder = decoder;
         this.fileManager   = fs ;
         this.router        = router;
         this.handler       = handler ;
         this.httpskeys     = null ;
         this.server        = http.createServer((req ,  res ) => { 

            this.handleServerRequest(req , res );

         });


         if( !( this.server  instanceof  http.Server ) ){

            throw new CustomeException("Please import http modeule !!!\n server must be instance of http.Server !!! ") ;
   
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
      this.path           = this.parse_url.pathname         ;
      this.trimmed_path   = this.path.replace(/^\/+|\/+$/g , '').replace( /\//g , '_') ;
      this.method         = req.method.toLocaleLowerCase();
      this.header         = req.headers ;
      this.queryStringObj = this.parse_url.query ;
      this.buffer         = '' ;
      this.str_decoder    = new this.stringDecoder('utf-8') ;


      req.on( 'data' , (data) => { 

        this.buffer      =  this.str_decoder.write(data);

      });

      req.on('end' , () => { 

        this.buffer +=  this.str_decoder.end();
        let data  = {
            "base_url"       : `http://${req.headers.host}${this.path}` ,
            "path"           :  this.path                               ,
            "trimmed_path"   :  this.trimmed_path                       ,
            "method"         :  this.method                             ,
            "header"         :  this.method                             ,
            "queryStringObj" :  this.queryStringObj                     ,
            "buffer"         :  JSON.parse(this.buffer)                 

        };


       if(this.router && this.handler ){

        this.choosenRoute = typeof this.router[this.trimmed_path] !== 'undefined' ? this.router[this.trimmed_path] : this.handler.notFound ;

        this.choosenRoute(data , (statusCode , payload )=> {

            statusCode  = typeof statusCode == 'number' ? statusCode : 200;
            payload     = typeof payload    == 'object' ? payload    : {} ;
            let payload_string  =  JSON.stringify(payload);
            res.setHeader("Content-Type" , "application/json") ;
            res.writeHead(statusCode) ;
            res.end(payload_string);


         });

       }else{
        
        console.error("invalid route handler for:", this.trimmed_path);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Internal Server Error" }));

       }

       

      });
          

    }


    startServer(){


         this.httpPort   = this.config ? this.config.httpPort  : 3000  ;
        

        this.server.listen(   this.httpPort  , () => {

          console.log(` http server started and listen on port ${   this.httpPort  } and env_name is  ${this.config.envName }`);

        } );

    }


    static setHttps( server , https ){

        if (typeof https.createServer !== 'function'){

            throw new CustomException('The HTTPS module does not provide the expected API.');
        }

        server.https = https ;


         server.securedServer = https.createServer( server.httpskeys , (req , res ) => {

            server.handleServerRequest(req , res );

            });

         if (!(server.securedServer instanceof https.Server)) {

            throw new CustomeException("Please import https modeule !!!\n securedServer  must be instance of https.Server !!! ");
       
        }


    }


    startSecuredServer(){

       this.httpsPort = this.config ? this.config.httpsPort : 30001 ;
       this.securedServer.listen(this.httpsPort , () =>{ 

        console.log(` The secured server started and listens on port ${this.httpsPort} the env_name is ${this.config.envName} !!!`);

       });
    }



}







       



module.exports =  UnifiedServer ;