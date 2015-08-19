var video = angular.module('video', [])

    .controller('VideoCtrl', ["$scope", "$state", "$stateParams", "SessionManagerService", "VideoService", "$ionicLoading", function ($scope, $state, $stateParams, SessionManagerService, VideoService, $ionicLoading) {

        var categoryID = $stateParams.categoryID;
        var isCategoryStoreInSession = SessionManagerService.isCategoryStoreInSession(categoryID);
        var value = {};

        if (isCategoryStoreInSession) {
            value = SessionManagerService.getVideoBySession(categoryID);
            $scope._videos = value.videos;
        } else {
            value.videos = [];
            value.firstTime = true;
            value.skip = 0;
            value.total = 0;
            $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 1000
            });
            setTimeout(function () {
                VideoService.getAllVideoByCategoryFirstTime(categoryID).then(
                    function (response) {
                        var videoResponse = response.data;
                        var totalResponse;
                        for (var x in videoResponse) {
                            value.videos.push(videoResponse[x]);
                            totalResponse = videoResponse[x].total;
                        }
                        $scope._videos = value.videos;
                        value.skip = +5;
                        value.total = totalResponse;
                        SessionManagerService.storeVideoInSession(categoryID, value);
                        $ionicLoading.hide();
                    }, function (data) {
                        $ionicLoading.hide();
                        alert("Server Error !!! Can not get video first time");
                    });
            }, 1000);
        }

        $scope.loadMoreVideo = function () {
            console.log("load more");
            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 1000
            });
            setTimeout(function () {
                VideoService.getAllVideoByCategory(categoryID, value.skip).then(
                    function (response) {
                        var videoResponse = response.data;
                        for (var x in videoResponse) {
                            value.videos.push(videoResponse[x]);
                        }
                        $scope._videos = value.videos;
                        value.skip = value.skip + 5;
                        SessionManagerService.storeVideoInSession(categoryID, value);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $ionicLoading.hide();
                    }, function (data) {
                        alert("Đã xảy ra lỗi kết nối với máy chủ");
                        $ionicLoading.hide();
                    });
            }, 1000);
        };

        $scope.canWeLoadMoreVideo = function () {
            return (value.videos.length < value.total) ? true : false;

        }


        $scope.gotoShowVideoScreen = function (video) {
            //  $state.go('app.listvideo', {'video': angular.toJson($scope.videos)});
            $state.go('app.showvideo', {'video': angular.toJson(video)});
        }


        /*  $scope.videos = angular.fromJson($stateParams.video);
         console.log("video controller" + $scope.videos);
         $scope.playVideo = function(url) {
         YoutubeVideoPlayer.openVideo('3Yw6nF9W_4g');
         //  YoutubeVideoPlayer.openVideo('YOUTUBE_VIDEO_ID');
         }*/


    }])
    .controller('VideoDetailsCtrl', ["$scope", "$state", "$stateParams", "SessionManagerService", "VideoService","$cordovaSocialSharing","$ionicLoading","$cordovaSQLite", function ($scope, $state, $stateParams, SessionManagerService, VideoService,$cordovaSocialSharing,$ionicLoading,$cordovaSQLite) {
        $scope.video = angular.fromJson($stateParams.video);
        $scope.playVideo = function (url) {
            YoutubeVideoPlayer.openVideo(url);
        }

        $scope.addVideoToFavourist = function (video) {
            var value = {};
            var isVideoStoreInSession =  SessionManagerService.getAllVideoFromFavourist();
            if (isVideoStoreInSession === null) {
               value.videos = [];
                value.videos.push(video);
                SessionManagerService.addVideoToFavourist(value);
            } else {
                value = SessionManagerService.getAllVideoFromFavourist();
                value.videos.push(video);
                SessionManagerService.addVideoToFavourist(value);
            }
        }



        $scope.insertVideo = function(videoId,videoname,url,image) {

            var query = "INSERT INTO video (videoId,videoname,url,image) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [videoId,videoname,url,image]).then(function(res) {
                alert("Đã lưu video vào mục yêu thích")
            }, function (err) {
                alert("Đã xảy ra lỗi kết nối với máy chủ")
            });
        }

        $scope.shareVideoToFacebook = function(message,image,link) {
            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 1000
            });
            setTimeout(function () {
            $cordovaSocialSharing.shareViaFacebook(message,null,link)
                .then(function(result) {
                    $ionicLoading.hide();
                }, function(err) {
                    $ionicLoading.hide();
                });
            }, 1000);
        }

    }])


