var home = angular.module('home',[])

    .controller('HomeCtrl',['$scope','$state','$ionicLoading','HomeService',function ($scope,$state,$ionicLoading,HomeService) {

        $scope.loading = $ionicLoading.show({
            content: '<i class="icon ion-loading-c"></i>',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 50,
            showDelay: 1000
        });

        HomeService.getAllCategories().then(
           function (response) {
            $scope.categories = response.data;
            $ionicLoading.hide();
        }, function (data) {
                alert("Connection Fail")
                $ionicLoading.hide();
            console.log("DATA " + data);
        });

        $scope.getAllVideoByCategoryFirstTime = function(categoryID) {

            HomeService.getAllVideoByCategoryFirstTime(categoryID).then(
             function (response) {
                $scope.videos = response.data;
                console.log("TYPE" + $scope.videos);
                $ionicLoading.hide();
                $state.go('app.listvideo', {'video': angular.toJson($scope.videos),'categoryID':categoryID});
            }, function (data) {
                // Handle error here
            });

        }
    }])