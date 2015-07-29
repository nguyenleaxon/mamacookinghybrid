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

    this.getAllVideosByCat = function(categoryID) {

        var requestVideo = {};
        requestVideo.categoryID = categoryID;
        console.log(requestVideo);
        var promise = $http({
            method: 'POST',
            url: 'http://localhost:3000/videos',
            data:requestVideo
        }).success(function (data) {
            $log.log(data);
        }).error(function (data, status, headers, config) {
            $log.log(data);
            alert("loi")
        });
        return promise;
    }
}])