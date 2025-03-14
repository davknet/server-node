










 class CustomException extends Error{

    constructor( message , statusCode ){

         super(message);
         this.name       = this.constructor.name ;
         this.statusCode = statusCode || 500 ;
         Error.captureStackTrace(this, this.constructor ) ;

         const stackLine = this.stack.split("\n")[1].trim(); 
         const match     = stackLine.match(/\((.*):(\d+):(\d+)\)/);

         if (match) {
          this.fileName     = match[1];  
          this.lineNumber   = match[2]; 
          this.columnNumber = match[3];
      }
        
    }

    


}



module.exports =  CustomException ;