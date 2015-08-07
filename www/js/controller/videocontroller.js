var video = angular.module('video',[])

    .controller('VideoCtrl',["$scope","$state","$stateParams","SessionManagerService","VideoService",function ($scope,$state,$stateParams,SessionManagerService,VideoService) {
        var categoryID = $stateParams.categoryID;
        var isCategoryStoreInSession = SessionManagerService.isCategoryStoreInSession(categoryID);

        $scope._videos = [];
        var _skip = 0;
        var _total = 0;
        if (isCategoryStoreInSession) {

        } else {
           VideoService.getAllVideoByCategoryFirstTime(categoryID).then(
                function (response) {
                    var videos = response.data;
                    for(var x in videos){
                        $scope._videos.push(videos[x]);
                        _total = videos[x].total;
                    }
                }, function (data) {
                    // Handle error here
                });
            _skip =+ 5;
            console.log($scope._videos);
        }

        $scope.loadMoreVideo = function() {
            console.log("load more");
            _skip =+5;
            VideoService.getAllVideoByCategory(categoryID,_skip).then(
                function (response) {
                    var videos = response.data;
                    for(var x in videos){
                        $scope._videos.push(videos[x]);
                    }

                }, function (data) {
                    // Handle error here
                });
            //SessionManagerService.

            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.canWeLoadMoreVideo = function() {
            return ($scope._videos.length < _total) ? false : true;
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


