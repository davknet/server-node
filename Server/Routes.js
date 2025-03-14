/** 
 * 
 * Declare your routes here !!! 
 * use var instead of const because
 * i'm going to use try catch keywords 
 * 
 **/



var handler = {};




handler.api_base_user_data = function (data , calback ){

    // console.log( data.buffer )   ; 
    const userData = data.buffer ;

    calback( 200 ,  { "user" : userData }  ) ;


};




handler.notFound          = function( data , callback ){

    callback( 404 , { "data" :"Page Not Found" }  );
};



// white page 
var router  = {

    'api_base_user_data' : handler.api_base_user_data ,
} ;






module.exports = { router  , handler } ;