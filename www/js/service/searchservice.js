search.service('SearchService',['$http','$log','ApiEndpoint',function ($http,$log,ApiEndpoint) {
    this.getAllVideoByName = function (videoName) {
        if (videoName === undefined) {
            videoName = "bo";
        }

        var requestVideo = {};
        requestVideo.videoName = videoName;
        var promise = $http({
            method: 'POST',
            url: ApiEndpoint.url+'findAllVideoByName',
            data: requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
            //$log.log(data);
            alert("Đã xảy ra lỗi kết nối với máy chủ")
        });
        return promise;
    }
}])