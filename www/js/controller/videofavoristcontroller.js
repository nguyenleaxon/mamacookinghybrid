var videofavorist = angular.module('videofavorist', [])

    .controller('VideoFavoristCtrl', ["$scope", "$state", "$stateParams", "SessionManagerService", "$ionicLoading","$cordovaSQLite", function ($scope,$state,$stateParams,SessionManagerService,$ionicLoading,$cordovaSQLite) {
        $scope._videos = [];
        var query = "SELECT * FROM video";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                   $scope._videos.push(res.rows.item(i));
                }
            } else {
                alert("No Record Found");
            }
        }, function (err) {
            console.error(err);
        });

        $scope.playFavoristVideo = function(videoID) {
            YoutubeVideoPlayer.openVideo(videoID);
        }

        $scope.deleteDB = function() {
            $cordovaSQLite.deleteDB({name:'menauan.db'});
        }

        $scope.removeVideoFromDB = function(index,id) {
            var query = "DELETE FROM video where id = ?";

           $cordovaSQLite.execute(db, query,[id]).then(function(res) {
               $scope._videos.splice(index,1);
           }, function (err) {
                console.error(err);
            });
        }

    }])