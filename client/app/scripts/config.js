/**
 * riskmanagementcoke - Responsive Admin Theme
 *
 * riskmanagementcoke theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider,$ocLazyLoadProvider,$httpProvider) {
    $urlRouterProvider.otherwise("anza");


    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $httpProvider.interceptors.push('authInterceptor'); //for authentication function

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};


    $stateProvider
        .state('index', { //abstract state
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Your Dashboard'}
        })
        .state('settings', {//abstract state
            abstract: true,
            url: "/settings",
            templateUrl: "views/common/content.html"
        })
        .state('landing', {
            url: "/landing",
            templateUrl: "views/landing.html",
            data: { pageTitle: 'Dashboard' , specialClass: 'landing-page'},
            resolve: {
                      loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                              {
                                  files: ['bower_components/iCheck/skins/css/custom.css','bower_components/iCheck/icheck.min.js']
                              }
                        ]);
                }
            }
        })

        .state('anza', {
            url: "/anza",
            templateUrl: "views/login.html",
            controller:"accessCtrl as mbwaKali",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('toka', {
            url: "/toka",
            templateUrl: "views/logout.html",
            controller:"accessCtrl as mbwaKali",
            data: { pageTitle: 'Logged Out', specialClass: 'gray-bg' }
        })
        .state('settings.users', {
            url: "/users",
            templateUrl: "views/users.html",
            controller: "watuCtrl as watu",
            data: { pageTitle: 'Users' },
            resolve: {
                      watuList: function (watuDb){
                            return watuDb.getWatus();
                          },
                      loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                            {
                                files: ['bower_components/footable/dist/footable.all.min.js', 'bower_components/footable/css/footable.core.css']
                            },
                            {
                                name: 'ui.footable',
                                files: ['bower_components/angular-footable/dist/angular-footable.js']
                            }
                        ]);
                }
            }
        })


        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl as chart",
            data: { pageTitle: 'Dashboard' },
            resolve: {

                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [ 'bower_components/flot/jquery.flot.js', 'bower_components/flot/jquery.flot.time.js', 'bower_components/flot.tooltip.pib/js/jquery.flot.tooltip.min.js', 'bower_components/jquery.flot.spline/index.js', 'bower_components/flot/jquery.flot.resize.js', 'bower_components/flot/jquery.flot.pie.js', 'bower_components/flot.curvedlines/curvedLines.js', 'bower_components/angular-flot/angular-flot.js', ]
                        },
                        {
                            files: ['bower_components/jquery.sparkline/index.js']
                        }

                    ]);
                }
            }
        })

        .state('logout', {
            url: "/logout",
            templateUrl: "views/logout.html",
            data: { pageTitle: 'Logged Out', specialClass: 'gray-bg' }
        })

        .state('index.underwrite', {
            url: "/underwrite",
            templateUrl: "views/underwrite.html",
            controller: "ulizaJirani as ulizaJirani",
            data: { pageTitle: 'Loan Approval' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'My Profile' }
        })
        .state('widgets', {
            url: "/widgets",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Widhets' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['bower_components/iCheck/css/custom.css','bower_components/iCheck/icheck.min.js']
                        }
                  ]);
                }
            }
        })


}

angular
    .module('riskmanagementapp')
    .config(config)
    .run(function($rootScope, $location, $state, auth) {

        $rootScope.$state = $state;

        $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                       , fromState, fromParams) {

            var isLogin = toState.name === "anza";
          //  console.log("isLogin ikoge--->"+isLogin);
            if(isLogin){
                return; // no need to redirect
            }

            // now, redirect only if not authenticated

            var userInfo = auth.isAuthed();
            //console.log("user is authenticated?"+userInfo);

            if(userInfo === false) {

                e.preventDefault(); // stop current execution
                $state.go('anza'); // go to login
            }
        });
    });
