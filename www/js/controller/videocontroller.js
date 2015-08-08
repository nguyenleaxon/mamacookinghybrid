var video = angular.module('video',[])

    .controller('VideoCtrl',["$scope","$state","$stateParams","SessionManagerService","VideoService",function ($scope,$state,$stateParams,SessionManagerService,VideoService) {
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
            setTimeout(function () {
            VideoService.getAllVideoByCategoryFirstTime(categoryID).then(
                function (response) {
                    var videoResponse = response.data;
                    var totalResponse;
                    for(var x in videoResponse){
                        value.videos.push(videoResponse[x]);
                        totalResponse = videoResponse[x].total;
                    }
                    $scope._videos = value.videos;
                    value.skip = +5;
                    value.total = totalResponse;
                    SessionManagerService.storeVideoInSession(categoryID,value);
                }, function (data) {
                    alert("Server Error !!! Can not get video first time");
                });
            }, 3000);
        }

        $scope.loadMoreVideo = function() {
            console.log("load more");
            setTimeout(function () {
            VideoService.getAllVideoByCategory(categoryID,value.skip).then(
                function (response) {
                    var videoResponse = response.data;
                    for(var x in videoResponse){
                        value.videos.push(videoResponse[x]);
                    }
                    $scope._videos = value.videos;
                    value.skip = value.skip + 5;
                    SessionManagerService.storeVideoInSession(categoryID,value);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, function (data) {
                   alert("server error");
                });
            }, 3000);
        };

        $scope.canWeLoadMoreVideo = function() {
           return (value.videos.length < value.total) ? true : false;
          /*  if (value.videos.length == value.total) {
                return false;
            } else {
                return true;
            }*/
        }


        $scope.gotoShowVideoScreen = function(video) {
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
    .controller('VideoDetailsCtrl',["$scope","$state","$stateParams","SessionManagerService","VideoService",function ($scope,$state,$stateParams,SessionManagerService,VideoService){
        $scope.video = angular.fromJson($stateParams.video);

        $scope.playVideo = function(url) {
            YoutubeVideoPlayer.openVideo(url);
            //  YoutubeVideoPlayer.openVideo('YOUTUBE_VIDEO_ID');
        }
    }])


