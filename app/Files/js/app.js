    var app = angular.module("LAN", ['ngRoute', 'ngSanitize']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/Home', {
            templateUrl: "views/Home.html"
        })
        .when('/AddTips', {
            templateUrl: "views/AddTips.html"
        })
        .when('/DeathTips', {
            templateUrl: "views/DeathTips.html"
        })
        .when('/Overview', {
            templateUrl: "views/Overview.html"
        })
        .when('/About', {
            templateUrl: "views/About.html"
        })
        .when('/SubHome', {
            templateUrl: "views/SubHome.html"
        })
        .when('/DeathSub', {
            templateUrl: "views/DeathSub.html"
        })
        .when('/OverviewSub', {
            templateUrl: "views/OverviewSub.html"
        });
});
