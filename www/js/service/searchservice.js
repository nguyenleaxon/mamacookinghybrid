search.service('SearchService', function ($http, $log) {
    this.getAllVideoByName = function (videoName) {
        if (videoName === undefined) {
            videoName = "bo";
        }

        var requestVideo = {};
        requestVideo.videoName = videoName;
        var promise = $http({
            method: 'POST',
            url: 'http://192.168.1.5:3000/findAllVideoByName',
            data: requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
            $log.log(data);
            alert("loi")
        });
        return promise;
    }
})