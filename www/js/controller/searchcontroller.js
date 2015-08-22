var search = angular.module('search', [])
    .controller('SearchCtrl', function ($scope, $state,SearchService,$ionicLoading,$ionicPlatform,$cordovaSQLite) {
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
                        $ionicLoading.hide();
                        alert("Không tìm thấy kết quả nào");

                    });
            }, 1000);

        }

        $scope.playVideo = function(videoID) {
            YoutubeVideoPlayer.openVideo(videoID);
        }

        $scope.insertVideoFromSearch = function(videoId,videoname,url,image) {

            var query = "INSERT INTO video (videoId,videoname,url,image) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [videoId,videoname,url,image]).then(function(res) {
                alert("Đã lưu video vào mục yêu thích")
            }, function (err) {
                alert("Đã xảy ra lỗi kết nối với máy chủ")
            });
        }

    })