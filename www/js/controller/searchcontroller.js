var search = angular.module('search', [])
    .controller('SearchCtrl', function ($scope, $state,SearchService,$ionicLoading) {
        $scope.clearSearch = function() {
            $scope.search = '';
        };

        $scope.searchVideoByName = function(videoname) {
            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 1000
            });
            setTimeout(function () {
                SearchService.getAllVideoByName(videoname).then(
                    function (response) {
                        $scope._videos = response.data;
                        $ionicLoading.hide();
                    }, function (data) {
                        alert("Server Error !!! Can not get video first time");
                    });
            }, 1000);

        }

    })