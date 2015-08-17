var information = angular.module('information', [])
    .controller('InformationCtrl',['$scope','$state','$cordovaEmailComposer',function ($scope,$state,$cordovaEmailComposer) {

       /* $cordovaEmailComposer.isAvailable().then(function() {
            alert("Available");
        }, function () {
            alert("Not Available");
        });*/
        cordova.plugins.email.addAlias('gmail', 'com.google.android.gm');
        $scope.subject = "";
        $scope.body = ""

        $scope.sendEmail = function(subject,body) {
            var email = {
                app: 'gmail',
                to: 'nguyenleaxon@gmail.com',
                subject: subject,
                body: body,
                isHtml: true
            };
            $cordovaEmailComposer.open(email).then(null, function () {
                $scope.subject = "";
                $scope.body = ""


            });
        }


    }])