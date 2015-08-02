home.service('HomeService', ['$http', '$log', function ($http, $log) {

    this.getAllCategories = function () {
        var promise = $http({
            method: 'POST',
            url: 'http://localhost:3000/categories'
        }).success(function (data) {
            $log.log(data);
        }).error(function (data, status, headers, config) {
            $log.log(data);
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
}])