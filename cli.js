#!/usr/bin/env node
'use strict';
var argv = require('commander'),    
    DnspodApi = require('./index.js'),
    packageJson = require('./package.json')
    ;

argv
  .version(packageJson.version)
  .option('-s, --server [server]', 'Which server you are using . (dnspod.com/dnspod.cn)')
  .option('-t, --token [token]', 'Dnspod login token. (xxxxx,xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)')
  .option('-a, --action [action]', 'The API action.(Record.List/Domain.List etc.)')
  .option('-p, --params [params]', 'The API params.(domain/subDomain etc.)')
  .parse(process.argv);


// define configs
var config = {
    server : argv.server,
    token : argv.token
};

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