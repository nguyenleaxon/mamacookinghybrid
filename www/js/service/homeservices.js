home.service('HomeService', ['$http', '$log','ApiEndpoint', function ($http, $log,ApiEndpoint) {

    this.getAllCategories = function () {
        var promise = $http({
            method: 'POST',
            url: ApiEndpoint.url+'categories'
        }).success(function (data) {
            $log.log(data);
        }).error(function (data, status, headers, config) {
            $log.log(data);
        });
        return promise;
    }


}])