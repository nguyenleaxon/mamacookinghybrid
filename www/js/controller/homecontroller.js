var home = angular.module('home', [])

    .controller('HomeCtrl', ['$scope', '$state', '$ionicLoading', 'HomeService', function ($scope, $state, $ionicLoading, HomeService) {

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


    }])
