"use strict";

angular.module('customizableTemplate', ['ng'])

// The 'ct-compound-template' allows an element to contain template parts defined
// with the 'ct-template-part' directive which will be inserted in the placeholders
// defined by the 'ct-template-placeholder' directive.
// This directive allows to define customization placeholders in directives
// defined with templates and isolated scopes, using pieces of HTML declared
// in the same scope where the directive is used.
.directive('ctCompoundTemplate', [function() {
    var dir = {
        restrict: 'EA'
    };

    // Defines the API used by 'ct-template-part' and 'ct-template-placeholder'
    // to register template parts and placeholders.
    dir.controller = [function() {
        var ctrl = this;
        var templates = ctrl.templates = {};

        // Adds the transclude link function of a template part that will be
        // inserted in the placeholder identified by the given key.
        ctrl.addTemplate = function addTemplate(key, transclude) {
            templates[key] = templates[key] || {};
            templates[key].transclude = transclude;
            insertTemplatePart(key);
        };

        // Add the placeholder element whose content will be replaced
        // by a template part registered with the same key.
        ctrl.addPlaceholder = function addPlaceholder(key, element) {
            templates[key] = templates[key] || {};
            templates[key].element = element;
            insertTemplatePart(key);
        };

        // Replace the content of the element registered as a placeholder
        // by the template part using its transclude function.
        function insertTemplatePart(key) {
            var template = templates[key];
            if (template && template.transclude && template.element) {
                template.element.empty().append(template.transclude());
                templates[key] = undefined;
            }
        }
    }];

    return dir;
}])

// The 'ct-template-part' defines a template piece that can be inserted in the
// placeholder defined by the 'ct-template-placeholder' using the same key. The
// element and all its content it is removed from its original position in the DOM.
.directive('ctTemplatePart', [function() {
    var dir = {
        restrict: 'EA',
        require: '^ctCompoundTemplate',
        transclude: 'element'
    };

    dir.link = function(scope, element, attr, ctrl, transclude) {
        // Uses the 'template-key' attribute or the own directive name attribute.
        var key = attr.ctTemplatePart || attr.templateKey;
        ctrl.addTemplate(key, transclude);
    };

    return dir;
}])

// Defines the element that will be used as a placeholder of a template
// identified by the same key. The contents of the element directive are
// replaced only if a template part is registered with the same key. The
// contents are not removed if the template is not defined.
.directive('ctTemplatePlaceholder', [function() {
    var dir = {
        restrict: 'EA',
        require: '^ctCompoundTemplate'
    };

    dir.link = function(scope, element, attr, ctrl) {
        // Uses the 'template-key' attribute or the own directive name attribute.
        var key = attr.ctTemplatePlaceholder || attr.templateKey;
        ctrl.addPlaceholder(key, element);
    };

    return dir;
}]);




