var db = null;
angular.module('mamacooking', ['ionic', 'oc.lazyLoad', 'LocalStorageModule','ngCordova'])
    .constant('ApiEndpoint', {
        url: 'http://192.168.1.5:3000/'
    })
    .run(function ($ionicPlatform,$cordovaSQLite) {
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

           db = $cordovaSQLite.openDB({name:'menauan'});

          //  db = window.sqlitePlugin.openDatabase({name: 'menauan.db', location: 1});

          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS video (id integer primary key,videoId text,videoname text,url text,image text)");




            var admobid = {};
            // select the right Ad Id according to platform
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = { // for Android
                    banner: 'ca-app-pub-6869992474017983/9375997553',
                    interstitial: 'ca-app-pub-6869992474017983/1657046752'
                };
            };

           /* var defaultOptions = {
                bannerId: admobid.banner,
                interstitialId: admobid.interstitial,
                adSize: 'SMART_BANNER',
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                bgColor: '#30619D', // color name, or '#RRGGBB'
                isTesting: true,
                autoShow: true
            };
            AdMob.setOptions( defaultOptions );*/

            AdMob.createBanner({
                adId: admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                autoShow: true,
                isTesting: true,
                overlap:true
            });

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
                    templateUrl: "templates/information.html",
                    controller: 'InformationCtrl'
                }
            },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: "information",
                            files: ['js/controller/informationcontroller.js']
                        }
                        ]);
                    }]
                }
        })
        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/app/home');
    });



