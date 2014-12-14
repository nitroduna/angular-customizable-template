"use strict";
angular.module('app')

// Defines a directive based on a HTML template, allowing the customization
// of some well defined parts of the template with custom HTML.
.directive('productList', [function productListDirective() {
    var dir = {
        restrict: 'EA',
        templateUrl: 'directives/product-list.html',

        // The directive used an "isolated" scope, so the template HTML of the directive
        // does not have direct access to the client scope of the directive.
        // The mechanism used by "ct-compound-template" allows the clients to override
        // well defined parts of the template using full HTML that have access to the scope
        // of the client code.
        scope: {
            products: '=',
            // The header and footer attributes allows the customization
            // of text parts of the product-list template, but you cannot
            // customize those parts using full HTML using these attributes.
            header: '@',
            footer: '@'
        },

        // The directive is forced to use "transclusion" to allow the clients
        // to define custom parts inside the directive.
        // TODO: Think of a system that allows to use "ct-template-part" directive
        //       in directives that do not use "transclusion".
        transclude: true
    };

    return dir;
}]);
