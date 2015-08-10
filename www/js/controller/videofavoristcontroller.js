var videofavorist = angular.module('videofavorist', [])

    .controller('VideoFavoristCtrl', ["$scope", "$state", "$stateParams", "SessionManagerService", "$ionicLoading", function ($scope, $state, $stateParams, SessionManagerService, $ionicLoading) {

        var value = SessionManagerService.getAllVideoFromFavourist();
        if (value === null) {
            $scope._videos = [];
        } else {
            $scope._videos = value.videos;
        }

        $scope.playFavoristVideo = function(videoID) {
            YoutubeVideoPlayer.openVideo(videoID);
        }


    }])