angular.module('mamacooking', ['ionic', 'oc.lazyLoad', 'LocalStorageModule'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider,$urlRouterProvider, $httpProvider, $ocLazyLoadProvider,localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mamacooking')
            .setStorageType('sessionStorage')
            .setNotify(true, true);

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: 'HomeCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: "home",
                            files: ['js/controller/homecontroller.js']
                        },
                            {
                                name: 'home',
                                files: ['js/service/homeservices.js']
                            }

                        ]);
                    }]
                }
            })
            .state('app.listvideo', {
                url: "/listvideo?:categoryID",
                views: {
                    'menuContent': {
                        templateUrl: "templates/listvideo.html",
                        controller: 'VideoCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: "video",
                            files: ['js/controller/videocontroller.js']
                        },
                            {
                                name: 'video',
                                files: ['js/service/videoservices.js']
                            },
                            {
                                name: 'sessionmanager',
                                files: ['js/helper/sessionmanager.js']
                            }

                        ]);
                    }]
                }
            })

            .state('app.showvideo', {
                url: "/showvideo/?video}",
                views: {
                    'menuContent': {
                        templateUrl: "templates/showvideo.html",
                        controller: 'VideoDetailsCtrl'
                    }
                }
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })
            .state('app.favourist', {
                url: "/favourist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/favourist.html"
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
