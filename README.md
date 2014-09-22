route-generator
======================

A simple route generator for NodeJs.

## Installation

`npm install route-generator`

## Usage

```javascript
var routerGenerator  = require("route-generator");

var rg = new routerGenerator({
    scheme: 'https',
    host: 'www.google.com',
    defaultAttributes: {
        "default": 1
    },
    routes: {
        test1: 'test1/{var1}/{var2}'
    }
});

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));
// output: https://www.google.com/test1/1/2?default=1

rg.addRoute('test2', 'test2/{var1}');

console.log(rg.generate('test2', { var1: '1', var2: '2' }, true));
// output: https://www.google.com/test2/1?default=1&var2=2

rg.setScheme('http');

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));
// output: http://www.google.com/test1/1/2?default=1

rg.setHost('google.com');

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));
// output: http://google.com/test1/1/2?default=1

rg.addRoutes({
    test3: 'test3',
    test4: 'test3-{var1}-{var2}-{var3}'
});

console.log(rg.generate('test3', { var1: '1', var2: '2' }, true));
// output: http://bidaway.com/test3?default=1&var1=1&var2=2

console.log(rg.generate('test4', { var1: '1', var2: '2' }, true));
// output: http://bidaway.com/test3-1-2-{var3}?default=1

rg.setPrefix('prefix/');

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));
// output: http://bidaway.com/prefix/test1/1/2?default=1
```