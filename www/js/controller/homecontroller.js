var home = angular.module('home', [])

    .controller('HomeCtrl', ['$scope', '$state', '$ionicLoading','$ionicPlatform','HomeService', function ($scope, $state, $ionicLoading,$ionicPlatform, HomeService) {

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
                alert("Đã xảy ra lỗi kết nối với máy chủ");
                $ionicLoading.hide();
                console.log("DATA " + data);
            });


        $scope.displayVideos = function (categoryID) {
            $state.go('app.listvideo', {'categoryID': categoryID});
        }

        var callback = function(){
           if ($state.current.name==="app.home") {
               navigator.app.exitApp();
           }else {
               navigator.app.backHistory();
           }
        };
        var deregister = $ionicPlatform.registerBackButtonAction(callback, 100);
        $scope.$on('$destroy', deregister)

    }])
