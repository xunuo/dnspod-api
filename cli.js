#!/usr/bin/env node
'use strict';
var argv = require('commander'),    
    DnspodApi = require('./index.js'),
    packageJson = require('./package.json')
    ;

argv
  .version(packageJson.version)
  .option('-s, --server [server]', 'server type.')
  .option('-t, --token [token]', 'dnspod login token.')
  .option('-a, --action [action]', 'server domain.')
  .option('-p, --params [params]', 'server port.')
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