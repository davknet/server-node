/**
 *  Config file 
 */
 




var environment = {};


environment.staging = {

    'httpPort'  : 3000 ,
    'httpsPort' : 3001 ,
    'envName'   : 'staging'

};



environment.production = {


    'httpPort'  : 5000 ,
    'httpsPort' : 5001 ,
    'envName'   : 'production' 
};




const currentEvironment   = typeof( process.env.NODE_ENV  )        == 'string' ? process.env.NODE_ENV.toLowerCase() : '' ;
const environmentToExport = typeof(environment[currentEvironment]) == 'object' ? environment[currentEvironment] : environment.staging ; 
module.exports            = environmentToExport ;