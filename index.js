var util = require('util'),
    extend = require('extend');

module.exports = function (params) {

    var routes = (params.routes) ? params.routes : {};
    var scheme = (params.scheme) ? params.scheme : 'http';
    var host = (params.host) ? params.host : '';
    var prefix = (params.prefix) ? params.prefix : '';
    var defaultAttributes = (params.defaultAttributes) ? params.defaultAttributes : {};

    this.addRoutes = function (routesObject) {
        if (typeof routesObject != 'object') {
            throw new Error("The attribute routes must be an object");
        }

        extend(routes, routesObject);

        return this;
    };

    this.addRoute = function (routeName, path) {
        if (typeof routeName != 'string') {
            throw new Error("The attribute routeName must be a string");
        }
        routes[routeName] = path;

        return this;
    };

    this.getRoute = function (routeName) {
        if (typeof routeName != 'string') {
            throw new Error("The attribute routeName is not a string");
        }
        return routes[routeName];
    };

    this.getRoutes = function () {
        return routes;
    }

    this.setScheme = function (schemeString) {
        scheme = schemeString;

        return this;
    };

    this.getScheme = function () {
        return scheme;
    };

    this.setHost = function (hostString) {
        host = hostString;

        return this;
    };

    this.getHost = function () {
        return host;
    };

    this.setPrefix = function (prefixString) {
        prefix = prefixString;

        return this;
    };

    this.getPrefix = function () {
        return prefix;
    };

    this.addDefaultAttributes = function (defaultAttributesObject) {
        if (typeof defaultAttributesObject != 'object') {
            throw new Error("The attribute defaultAtrtributes must be an object");
        }

        extend(defaultAttributes, defaultAttributesObject);

        return this;
    };

    this.addDefaultAttribute = function (defaultAttributeName, value) {
        if (typeof defaultAttributeName != 'string') {
            throw new Error("The attribute defaultAttributeName must be a string");
        }
        defaultAttributes[defaultAttributeName] = path;

        return this;
    };

    this.getDefaultAttribute = function (defaultAttributeName) {
        if (typeof defaultAttributeName != 'string') {
            throw new Error("The attribute defaultAttributeName is not a string");
        }
        return defaultAttributes[defaultAttributeName];
    };

    this.getDefaultAttributes = function () {
        return defaultAttributes;
    }

    this.generate = function (routeName, attributes, absolute) {
        var url = '',
            queryString = [],
            hasQS = false;

        if (routeName) {
            if (routes[routeName]) {
                var route = prefix+routes[routeName];
                if (absolute) {
                    url = this.getScheme()+'://'+_rtrim(this.getHost(), '/')+'/'+_ltrim(route, '/');
                } else {
                    url = route;
                }

                if (typeof(attributes) != 'object') {
                    var attributes = {};
                }

                var attr = extend(defaultAttributes, attributes);

                for (var i in attr) {
                    if (url.indexOf(i) >= 0) {
                        url = url.replace("{"+i+"}", attr[i]);
                    } else {
                        queryString.push(i+'='+attr[i]);
                        hasQS = true;
                    }
                }
            } else {
                throw new Error("The route with name '"+routeName+"' doesn't exists.");
            }

            if (hasQS) {
                url = url+'?'+queryString.join('&');
            }
        } else {
            throw new Error("Missing the routeName argument");
        }
        return url;
    };

    // Helpers

    _rtrim = function (str, chr) {
        if (str.substring(str.length-1) == chr) {
            str = str.substring(0, str.length-1);
        }

        return str;
    };

    _ltrim = function (str, chr) {
        if (str.substring(0, 1) == chr) {
            str = str.substring(1, str.length);
        }

        return str;
    };
}