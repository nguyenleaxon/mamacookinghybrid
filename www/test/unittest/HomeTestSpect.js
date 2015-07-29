'use strict'

describe('Hello World example', function() {

    beforeEach(module('home'));

    var HomeController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        HomeController = $controller('HomeController', {
            $scope: scope
        });
    }));
    it('says hello world!', function () {
        expect(scope.greeting).toEqual("Hello world!");
    });
});