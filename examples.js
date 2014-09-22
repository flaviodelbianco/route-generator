var routerGenerator  = require("./index");

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

rg.addRoute('test2', 'test2/{var1}');

console.log(rg.generate('test2', { var1: '1', var2: '2' }, true));

rg.setScheme('http');

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));

rg.setHost('google.com');

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));

rg.addRoutes({
    test3: 'test3',
    test4: 'test3-{var1}-{var2}-{var3}'
});

console.log(rg.generate('test3', { var1: '1', var2: '2' }, true));
console.log(rg.generate('test4', { var1: '1', var2: '2' }, true));

rg.setPrefix('prefix/');

console.log(rg.generate('test1', { var1: '1', var2: '2' }, true));