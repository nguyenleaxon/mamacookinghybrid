var category = angular.module('CategoryModule', [])
    .controller('HomeCtrl', function ($scope, $state) {
        alert("fdfd");
        $scope.items = [
            'http://assets.eatingwell.com/sites/default/files/imagecache/standard/recipes/BV7560.jpg',
            'http://www.notempire.com/images/uploads/coffee-intox.jpg',
            'http://www.lookytasty.com/wp-content/uploads/2012/08/baileysncream300.jpg',
            'http://cafesguide.com/assets/pages/6a/4e/6a4e4c935103dd9b2e98200e36422174_330.jpg',
            'http://i6.cdnds.net/12/38/450x450/baileys-latte.jpg',
            'http://www.koktelbar.ru/images/vict4.jpg',
            'http://www.diyinspired.com/wp-content/uploads/2012/01/baileys-coffee.jpg',
            'http://www.spiritdrinks.com/img/drinks/lg/baileyscoffee.jpg',
            'http://www.spiritdrinks.com/img/drinks/lg/AlpineBaileys.jpg'
        ];




    })