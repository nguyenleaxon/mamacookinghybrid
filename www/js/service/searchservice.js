search.service('SearchService', function ($http, $log) {
    this.getAllVideoByName = function (videoName) {
        if (videoName === undefined) {
            videoName = "bo";
        }

        var requestVideo = {};
        requestVideo.videoName = videoName;
        var promise = $http({
            method: 'POST',
            url: 'http://localhost:3000/findAllVideoByName',
            data: requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
            $log.log(data);
            alert("loi")
        });
        return promise;
    }
})