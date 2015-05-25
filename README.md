# dnspod-api

A dnspod api for nodejs. 
(使用最新认证方式，兼容DNSPOD国际版和国内版)

## Features

- For dnspod.com or dnspod.cn.

- Multiple-instance.

- Implementation by promise.

- Use login token replace user & password auth.


## DNSPOD API documents

The actions and params that you can find.

> Dnspod.cn : https://www.dnspod.cn/docs  
> Dnspod.com : https://www.dnspod.com/docs  

## How to get token

First of all, you should get the login token.  

> Dnspod.cn : https://support.dnspod.cn/Kb/showarticle/tsid/227  
> Dnspod.com : https://www.dnspod.com/docs/info.html#get-the-user-token


## Install

```sh
npm install dnspod-api -g
```

## Useage

### BIN Example
```sh
dnspod-api --token 'xxxxx,xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' --action 'Domain.List'
```

or  

```sh
dnspod-api -s 'dnspod.cn' -t 'xxxxx,xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' -a 'Record.List' -p '{"domain": "your-domain.com", "sub_domain": "@"}'
```

**Warning:** If the token string have `$`, please replace it with `\$`.

### API Example

```js

// new dnspodApi instance
var dnspodApi =  new DnspodApi({
    server : 'dnspod.cn', // dnspod.com (default) | dnspod.cn
    token : 'xxxxx,xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // your login token, you can find how to get token in then top.
});

// do actions
dnspodApi.do({
    action : 'Domain.List'
})
.then(
    // success
    function(domainListData){
        
        console.log('Domain List: ', domainListData);
        
        return dnspodApi.do({
            action : 'Record.List',
            params : {
                domain : 'your-domain.com',
                sub_domain : '@'
            }
        });

    },
    // error
    function(error) {
        console.log(error);
    }
)
.then(
    function(recordListData){
        console.log('Record List: ', recordListData);
    },
    // error
    function(error) {
        console.log(error);
    }
)
//.then ....
```
