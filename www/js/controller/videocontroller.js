var video = angular.module('video', [])

    .controller('VideoCtrl',["$scope","$state","$stateParams","SessionManagerService",function ($scope,$state,$stateParams,SessionManagerService) {
        var categoryID = $stateParams.categoryID;
        var isCategoryStoreInSession = SessionManagerService.isCategoryStoreInSession(categoryID);
        var vdie = angular.fromJson($stateParams.video);
        $scope._videos = [];
        if (isCategoryStoreInSession) {

        } else {
            $scope._videos = angular.fromJson($stateParams.video);

            console.log($scope._videos);
        }




        $scope.loadMoreVideo = function() {
           /* $http.get('/more-items').success(function(items) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });*/
            console.log("load more");
            for(var x in vdie){
                $scope._videos.push(vdie[x]);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.canWeLoadMoreVideo = function() {
            return ($scope._videos.length == 20) ? false : true;
        }



      /*  $scope.videos = angular.fromJson($stateParams.video);
         console.log("video controller" + $scope.videos);
         $scope.playVideo = function(url) {
         YoutubeVideoPlayer.openVideo('3Yw6nF9W_4g');
         //  YoutubeVideoPlayer.openVideo('YOUTUBE_VIDEO_ID');
         }*/


    }])

    .controller('VideoCtrlPaginate', function ($scope, $stateParams,$state) {
        var categoryID = $stateParams.cat;
       /*$scope.videos = [
            'http://assets.eatingwell.com/sites/default/files/imagecache/standard/recipes/BV7560.jpg',
            'http://www.notempire.com/images/uploads/coffee-intox.jpg',
            'http://www.lookytasty.com/wp-content/uploads/2012/08/baileysncream300.jpg',
            'http://cafesguide.com/assets/pages/6a/4e/6a4e4c935103dd9b2e98200e36422174_330.jpg',
            'http://i6.cdnds.net/12/38/450x450/baileys-latte.jpg',
            'http://www.koktelbar.ru/images/vict4.jpg',
            'http://www.diyinspired.com/wp-content/uploads/2012/01/baileys-coffee.jpg',
            'http://www.spiritdrinks.com/img/drinks/lg/baileyscoffee.jpg',
            'http://www.spiritdrinks.com/img/drinks/lg/AlpineBaileys.jpg'
        ];*/

        $scope._list = [];

        $scope.populateList = function() {

            for (var i = 0; i <= 9; i++) {

                var firstName = faker.name.firstName();
                var lastName = faker.name.lastName();

                $scope._list.push({ name: firstName + " " + lastName,
                    address: faker.address.streetAddress(),
                    phone: faker.phone.phoneNumber(),
                    image: faker.internet.avatar()
                });
            }
            console.log($scope._list.length);

            /*$scope.$broadcast('scroll.infiniteScrollComplete');*/
        }

        $scope.canWeLoadMoreContent = function() {
            return ($scope._list.length > 49) ? false : true;
        }

        $scope.populateList();




    })
