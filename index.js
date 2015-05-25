var Q = require('q'),
    merge = require('merge'),
    request = require('request')
    ;

// export.
var DnspodApi = function(config){
    
    var 
        defaultConfig = {
            url : 'https://dnsapi.cn', // https://api.dnspod.com | https://dnsapi.cn
            token : null, // xxxxx,xxxxxxxxxx
            format: 'json',
            error_on_empty: 'yes',
            userAgent : 'Node Dnspod Api'
        },
        config = merge.recursive(true, defaultConfig, config)
        ;
    
    
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
        if(config.url.indexOf('dnsapi.cn') != -1){
            args.params.login_token = config.token;
            args.params.lang = 'cn';
        }else{
            args.params.user_token = config.token;
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
                
                if(error){
                    deferred.reject(error);
                    return;
                }
                
                if(response.statusCode == 200){
                    
                    if(callback.status.code == '1'){
                        deferred.resolve(callback);
                    }else{
                        deferred.reject(callback);
                    }
                    
                }else{
                    deferred.reject({
                        errorCode : response.statusCode 
                    })
                }

            }
        );
        
        return deferred.promise;
    }
    
};


module.exports = DnspodApi;
