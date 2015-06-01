var Q = require('q'),
    merge = require('merge'),
    request = require('request')
    ;

// export.
var DnspodApi = function(config){
    
    var 
        defaultConfig = {
            
            // defaults
            server : 'dnspod.com', // dnspod.com (default) | dnspod.cn
            token : null, // xxxxx,xxxxxxxxxx
            
            // post settings
            format: 'json',
            error_on_empty: 'yes',
            userAgent : 'Node Dnspod Api'
            
        },
        config = merge.recursive(true, defaultConfig, config)
        ;
    
    // set config.url from config.server
    config.server = config.server ? config.server : 'dnspod.com';
    
    if(config.server == 'dnspod.com'){
        config.url = 'https://api.dnspod.com'
    }else{
        config.url = 'https://dnsapi.cn'
    }
    
    // if no token, show errors.
    if(!config.token){
        throw new Error('Need login token, you can find "How to get token" in README.md.');
    }
    
    // what you want to do
    this.do = function(args){
        
        if(!args){
            throw new Error('Need params, example : { action : "Domain.List", params : { domain : "xunuo.com", sub_domain : "test" } }, you can find "API documents" in README.md.');
        }
        
        if(!args.action){
            throw new Error('Need action in arguments. example : "Record.List" / "Domain.List" / "domainInfo", you can find "API documents" in README.md.');
        }
        
        if(!args.params){
            args.params = {};
        }
        
        var deferred = Q.defer();
        
        // console.log(config);
        
        // deal with different between dnspod.com and ddnsapi.cn
        if(config.server == 'dnspod.com'){
            args.params.user_token = config.token;
        }else{
            args.params.login_token = config.token;
            args.params.lang = 'cn';
        }
        
        // define format with config.json
        args.params.format = config.format;
        
        // define error_on_empty with config.error_on_empty
        args.params.error_on_empty = config.error_on_empty
        

        request.post({
                url: config.url + '/' + args.action,
                headers: {
                  'User-Agent': config.userAgent
                },
                form: args.params,
                json: true,
                encoding:'utf8'
            },
            function(error, response, callback){
                
                // retrun the arguments
                var responseArgs = merge.recursive(true, args);
                
                if(error){
                    error.args = responseArgs;
                    deferred.reject(error);
                    return;
                }
                
                if(response.statusCode == 200){
                    
                    callback.args = responseArgs;
                    deferred.resolve(callback);
                    
                }else{
                    deferred.reject({
                        args : responseArgs,
                        errorCode : response.statusCode 
                    })
                }

            }
        );
        
        return deferred.promise;
    }
    
};


module.exports = DnspodApi;
