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
}])