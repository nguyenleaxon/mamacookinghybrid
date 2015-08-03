video.service('VideoService', function ($http, $log) {

    this.getAllVideoByCategory = function (categoryID,skip) {
        var requestVideo = {};
        requestVideo.categoryID = categoryID;
        requestVideo.skip = skip;
        console.log(requestVideo);
        var promise = $http({
            method: 'POST',
            url: 'http://localhost:3000/getAllVideoByCategory',
            data:requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
            $log.log(data);
            alert("loi")
        });
        return promise;
    }

    this.getAllVideoByCategoryFirstTime = function(categoryID) {

        var requestVideo = {};
        requestVideo.categoryID = categoryID;
        requestVideo.skip = 0;
        console.log(requestVideo);
        var promise = $http({
            method: 'POST',
            url: 'http://localhost:3000/getAllVideoFirstTime',
            data:requestVideo
        }).success(function (data) {

        }).error(function (data, status, headers, config) {
            $log.log(data);
            alert("loi")
        });
        return promise;
    }
})