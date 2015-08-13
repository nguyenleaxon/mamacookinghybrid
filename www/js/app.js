angular.module('mamacooking', ['ionic', 'oc.lazyLoad', 'LocalStorageModule','ngCordova'])

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

            if(window.plugins && window.plugins.AdMob) {
                var admob_key = device.platform == "Android" ? "pub-7732165171285075" : "IOS_PUBLISHER_KEY";
                var admob = window.plugins.AdMob;
                admob.createBannerView(
                    {
                        'publisherId': admob_key,
                        'adSize': admob.AD_SIZE.BANNER,
                        'bannerAtTop': false
                    },
                    function() {
                        admob.requestAd(
                            { 'isTesting': false },
                            function() {
                                admob.showAd(true);
                            },
                            function() { console.log('failed to request ad'); }
                        );
                    },
                    function() { console.log('failed to create banner view'); }
                );
            } else {
                console.log("faile to connect app")
            }

        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mamacooking')
            .setStorageType('sessionStorage')
            .setNotify(true, true);

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                cache: false
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
                cache:false,
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html",
                        controller: 'SearchCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: "search",
                            files: ['js/controller/searchcontroller.js']
                        },{
                            name: "search",
                            files: ['js/service/searchservice.js']
                        }

                        ]);
                    }]
                }
            })


            .state('app.favourist', {
                cache: false,
                url: "/favourist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/favourist.html",
                        controller: 'VideoFavoristCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: "videofavorist",
                            files: ['js/controller/videofavoristcontroller.js']
                        },
                            {
                                name: 'sessionmanager',
                                files: ['js/helper/sessionmanager.js']
                            }

                        ]);
                    }]
                }
            })

         .state('app.info', {
            url: "/information",
            views: {
                'menuContent': {
                    templateUrl: "templates/information.html"
                }
            }
        })
        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/app/home');
    });



