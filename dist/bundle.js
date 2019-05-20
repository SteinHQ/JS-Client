(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SteinStore = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var readSheet=require("./src/read"),appendRow=require("./src/append"),deleteRows=require("./src/delete"),editRows=require("./src/edit");function SteinStore(a){this.url=a.endsWith("/")?a:a+"/"}SteinStore.prototype.read=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=b.limit,d=b.offset,e=b.search;return readSheet(this.url,a,{limit:c,offset:d,search:e})},SteinStore.prototype.append=function(a,b){return appendRow(this.url,a,b)},SteinStore.prototype.edit=function(a,b){var c=b.search,d=b.set,e=b.limit;return editRows(this.url,a,{search:c,set:d,limit:e})},SteinStore.prototype["delete"]=function(a,b){var c=b.search,d=b.limit;return deleteRows(this.url,a,{search:c,limit:d})},module.exports=SteinStore;

},{"./src/append":4,"./src/delete":6,"./src/edit":7,"./src/read":8}],2:[function(require,module,exports){
module.exports = window.fetch || (window.fetch = require('unfetch').default || require('unfetch'));

},{"unfetch":3}],3:[function(require,module,exports){
module.exports=function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(JSON.parse(s.responseText))},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})};


},{}],4:[function(require,module,exports){
"use strict";var isRequired=require("./argIsRequired"),fetch=require("isomorphic-unfetch");module.exports=function(a,b,c){isRequired([c,"object"]),a+="".concat(b);var d={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)};return new Promise(function(b,c){fetch(a,d).then(function(a){b(a.json())})["catch"](function(a){c(a)})})};

},{"./argIsRequired":5,"isomorphic-unfetch":2}],5:[function(require,module,exports){
"use strict";function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}module.exports=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];for(var d=0;d<b.length;d++){var e=b[d][0],f=b[d][1];if(_typeof(e)!==f)throw new Error("Not all required params were supplied")}};

},{}],6:[function(require,module,exports){
"use strict";var isRequired=require("./argIsRequired"),fetch=require("isomorphic-unfetch");module.exports=function(a,b,c){var d=c.search,e=c.limit;isRequired([b,"string"],[d,"object"]),e=!isNaN(e)&&e?e:null,a+="".concat(b);// data to post
var f={condition:d,limit:e},g={method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)};return new Promise(function(b,c){fetch(a,g).then(function(a){b(a.json())})["catch"](function(a){c(a)})})};

},{"./argIsRequired":5,"isomorphic-unfetch":2}],7:[function(require,module,exports){
"use strict";var isRequired=require("./argIsRequired"),fetch=require("isomorphic-unfetch");module.exports=function(a,b,c){var d=c.search,e=c.set,f=c.limit;isRequired([b,"string"],[d,"object"],[e,"object"]),f=!isNaN(f)&&f?f:null,a+="".concat(b);// data to post
var g={condition:d,set:e,limit:f},h={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)};return new Promise(function(b,c){fetch(a,h).then(function(a){b(a.json())})["catch"](function(a){c(a)})})};

},{"./argIsRequired":5,"isomorphic-unfetch":2}],8:[function(require,module,exports){
"use strict";var isRequired=require("./argIsRequired"),fetch=require("isomorphic-unfetch");module.exports=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},d=c.limit,e=c.offset,f=c.search;isRequired([b,"string"]);var g=[d?"limit=".concat(d):"",e?"offset=".concat(e):"",f?"search=".concat(JSON.stringify(f)):""];return a+="".concat(b,"?").concat(g.filter(function(a){return!!a}).join("&")),new Promise(function(b,c){fetch(a).then(function(a){b(a.json())})["catch"](function(a){c(a)})})};

},{"./argIsRequired":5,"isomorphic-unfetch":2}]},{},[1])(1)
});
