#!/usr/bin/env node
'use strict';
var argv = require('commander'),    
    DnspodApi = require('./index.js'),
    packageJson = require('./package.json')
    ;

argv
  .version(packageJson.version)
  .option('-u, --url [url]', 'server url.')
  .option('-t, --token [token]', 'dnspod login token.')
  .option('-a, --action [action]', 'server domain.')
  .option('-p, --params [params]', 'server port.')
  .parse(process.argv);


// define configs
var config = {
    token : argv.token
};
if(argv.url){
    config.url = argv.url;
}

// init
var dnspodApi =  new DnspodApi(config);

// do action
dnspodApi.do({
    action : argv.action,
    params : argv.params ? JSON.parse(argv.params) : {}
})
.then(
    // success
    function(callback){
        console.log(callback);
    },
    // error
    function(error) {
        console.log(error);
    }
);