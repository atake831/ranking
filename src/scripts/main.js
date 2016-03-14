(function() {
    "use strict";

    var app = angular.module('app', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: 'views/home.html' })
            .when('/me', { templateUrl: 'views/profile.html' })
            .when('/admin', { templateUrl: 'views/admin.html' })
            .when('/tournament', { templateUrl: 'views/tournament.html' })
            .otherwise({redirectTo: '/home'});
    });

    app.factory('Data', function() {
        var data = {};
        return data;
    });

    app.run(function($rootScope, API, Data, Auth) {
        $rootScope.common = {
            logout: function() {
                this.showLogin();
            },
        };
    });

    app.controller('AppController', function($scope, $rootScope, $location) {
        $(document).ready(function(){
            $location.path('/home');
            // $location.path('/tournament');
        });
    });

    app.controller('TournamentController', function ($scope, $location) {
        var rounds = Src.ROUNDS;

        $(".brackets").brackets({
            rounds: rounds,
            color_title: 'black',
            border_color: 'black',
            color_player: 'white',
            bg_player: '#46CFB0',
            color_player_hover: 'white',
            bg_player_hover: '#E95546',
            border_radius_player: '5px',
            border_radius_lines: '5px',
        });
    });

    app.controller('AdminController', function ($scope, $location, $timeout) {

    });

    app.controller('HomeController', function ($scope, $rootScope, $location) {
        $scope.tournament = function() {
            $location.path('/tournament');
        }
        $scope.admin = function() {
            $location.path('/admin');
        }
    });

})();
