video.service('VideoService',['$http','$log','ApiEndpoint',function ($http,$log,ApiEndpoint) {

    this.getAllVideoByCategory = function (categoryID, skip) {
        var requestVideo = {};
        requestVideo.categoryID = categoryID;
        requestVideo.skip = skip;
        console.log(requestVideo);
        var promise = $http({
            method: 'POST',
            url: ApiEndpoint.url+'getAllVideoByCategory',
            data: requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
            $log.log(data);
            alert("loi")
        });
        return promise;
    }

    this.getAllVideoByCategoryFirstTime = function (categoryID) {

        var requestVideo = {};
        requestVideo.categoryID = categoryID;
        requestVideo.skip = 0;
        console.log(requestVideo);
        var promise = $http({
            method: 'POST',
            url: ApiEndpoint.url+'getAllVideoFirstTime',
            data: requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
          //  $log.log(data);
            alert("Đã xảy ra lỗi kết nối với máy chủ")
        });
        return promise;
    }
}])