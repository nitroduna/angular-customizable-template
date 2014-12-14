"use strict";
angular.module('app', ['customizableTemplate'])

.controller('AppController', [function() {
    var localScope = this;

    localScope.cams = [{
        name: 'Black Diamond C3 Camalots',
        reviews: 58
    }, {
        name: 'Metolius Master Cam',
        reviews: 34
    }, {
        name: 'DMM Dragon Cams',
        reviews: 57
    }, {
        name: 'Totem Cams',
        reviews: 98
    }];

    localScope.ropes =  [{
        name: 'Beal Tiger 10mm Rope with Unicore',
        reviews: 75
    }, {
        name: 'Edelrid Granite 9.8mm X 60M',
        reviews: 25
    }, {
        name: 'Beal Cobra II 8.6mm Rope with Unicore',
        reviews: 95
    }];

 }]);
