(function() {
    "use strict";

    var app = angular.module('app', ['ranking', 'ngRoute', 'ui.bootstrap']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: 'views/home.html' })
            .when('/ranking', { templateUrl: 'views/ranking.html' })
            .when('/tournaments', { templateUrl: 'views/tournaments.html' })
            .when('/tournament/detail', { templateUrl: 'views/tournament/detail.html' })

            // 一般ユーザー
            .when('/register', { templateUrl: 'views/register.html' })
            .when('/profile', { templateUrl: 'views/profile.html' })
            .when('/participate', { templateUrl: 'views/participate.html' })
            .when('/history', { templateUrl: 'views/history.html' })

            // 施設ユーザー
            .when('/facility/register', { templateUrl: 'views/facility/register.html' })
            .when('/facility/profile', { templateUrl: 'views/facility/profile.html' })
            .when('/facility/tournaments', { templateUrl: 'views/facility/tournaments.html' })
            .when('/facility/tournament/detail', { templateUrl: 'views/facility/tournament/detail.html' })
            .when('/facility/tournament/create', { templateUrl: 'views/facility/tournament/create.html' })
            .when('/facility/tournament/edit', { templateUrl: 'views/facility/tournament/edit.html' })
            .when('/facility/tournament/manage', { templateUrl: 'views/facility/tournament/manage.html' })
            .when('/facility/tournament/result', { templateUrl: 'views/facility/tournament/result.html' })

            // JPAユーザー
            .when('/jpa/users', { templateUrl: 'views/jpa/users.html' })
            .when('/jpa/facilities', { templateUrl: 'views/jpa/facilities.html' })
            .when('/jpa/facility/detail', { templateUrl: 'views/jpa/facility/detail.html' })
            .when('/jpa/tournaments', { templateUrl: 'views/jpa/tournaments.html' })
            .when('/jpa/tournament/detail', { templateUrl: 'views/jpa/tournament/detail.html' })

            .otherwise({redirectTo: '/home'});
    });

    app.factory('Data', function() {
        var data = {};
        return data;
    });

    app.run(function($rootScope, API, Data, Auth) {
    });

    app.controller('AppController', function($scope, $rootScope, $location, Data, $uibModal) {
        $(document).ready(function(){
            $location.path('/home');
            // $location.path('/tournaments');
        });

        function changeBackgroundImage(color) {
            $('body').css(
                'background-image', 
                "url('../images/background-image-" + color + ".png')"
            );
        }
        function showSigninModal() {
            $uibModal.open({
                templateUrl: 'views/signin.html',
                controller: 'SigninController',
                backdrop: true,
                scope: $scope,
            });
        }
        $rootScope.navbarLeft = [
            {
                location: "#/tournament",
                text: "トーナメント"
            },
            {
                location: "#/tournament",
                text: "トーナメント"
            },
        ];
        $rootScope.navbarRight = [
            {
                click: showSigninModal,
                text: "Signup/Login"
            },
        ];

        Data.currentRole = 'user';
        $rootScope.common = {
            logout: function() {
                this.showLogin();
            },
            role: {
                changeLogoutUser: function() {
                    Data.currentRole = 'logout-user';
                    changeBackgroundImage('gray');
                    $rootScope.navbarLeft = [
                        {
                            location: "#/tournament",
                            text: "トーナメント"
                        },
                    ];
                    $rootScope.navbarRight = [
                        {
                            click: showSigninModal,
                            text: "Signup/Login"
                        },
                    ];
                },
                changeLoggedinUser: function() {
                    Data.currentRole = 'loggedin-user';
                    changeBackgroundImage('gray');
                    $rootScope.navbarLeft = [
                        {
                            location: "#/tournament",
                            text: "トーナメント"
                        },
                        {
                            location: "#/tournament",
                            text: "プロフィール"
                        },
                    ];
                    $rootScope.navbarRight = [
                        {
                            location: "#/logout",
                            text: "Logout"
                        },
                    ];
                },
                changeFacility: function() {
                    Data.currentRole = 'facility';
                    changeBackgroundImage('blue');
                    $rootScope.navbarLeft = [
                        {
                            location: "#/my_tournament",
                            text: "運営トーナメント"
                        },
                        {
                            location: "#/creat_tournament",
                            text: "トーナメント作成"
                        },
                    ];
                    $rootScope.navbarRight = [
                        {
                            location: "#/logout",
                            text: "Logout"
                        },
                    ];
                },
                changeAdmin: function() {
                    Data.currentRole = 'admin';
                    changeBackgroundImage('red');
                    $rootScope.navbarLeft = [
                        {
                            location: "#/facilities",
                            text: "施設一覧"
                        },
                        {
                            location: "#/tournaments",
                            text: "トーナメント一覧"
                        },
                    ];
                    $rootScope.navbarRight = [
                        {
                            location: "#/logout",
                            text: "Logout"
                        },
                    ];
                },
            }
        };
    });

    app.controller('SigninController', function ($scope, $rootScope, $uibModalInstance) {
        $scope.close = function() {
            $uibModalInstance.close();
        };
        $scope.admin = function() {
            $rootScope.common.role.changeAdmin();
            $scope.close();
        }
        $scope.facility = function() {
            $rootScope.common.role.changeFacility();
            $scope.close();
        }
        $scope.user = function() {
            $rootScope.common.role.changeLoggedinUser();
            $scope.close();
        }
    });

    app.controller('RankingController', function ($scope, $rootScope) {
    });
    app.controller('TournamentsController', function ($scope, $rootScope, Brackets) {
        var players = Src.PLAYERS;
        var rounds = Src.ROUNDS;

        Brackets.create($(".brackets")[0], players, rounds);

        // $(".brackets").brackets(players, rounds, {});
        $scope.admin = function() {
            $rootScope.common.role.changeAdmin();
        }
        $scope.facility = function() {
            $rootScope.common.role.changeFacility();
        }
    });
    app.controller('TournamentDetailController', function ($scope, $rootScope) {
    });
    app.controller('RegisterController', function ($scope, $rootscope) {
    });
    app.controller('ProfileController', function ($scope, $rootscope) {
    });
    app.controller('ParticipateController', function ($scope, $rootscope) {
    });
    app.controller('HistoryController', function ($scope, $rootscope) {
    });
    app.controller('FacilityRegisterController', function ($scope, $rootscope) {
    });
    app.controller('FacilityProfileController', function ($scope, $rootscope) {
    });
    app.controller('FacilityTournamentsController', function ($scope, $rootScope) {
    });
    app.controller('FacilityTournamentDetailController', function ($scope, $rootScope) {
    });
    app.controller('FacilityTournamentCreateController', function ($scope, $rootScope) {
    });
    app.controller('FacilityTournamentEditController', function ($scope, $rootScope) {
    });
    app.controller('FacilityTournamentManageController', function ($scope, $rootScope) {
    });
    app.controller('FacilityTournamentResultController', function ($scope, $rootScope) {
    });
    app.controller('JpaUsersController', function ($scope, $rootScope) {
    });
    app.controller('JpaFacilitiesController', function ($scope, $rootScope) {
    });
    app.controller('JpaFacilityDetailController', function ($scope, $rootScope) {
    });
    app.controller('JpaTournamentsController', function ($scope, $rootScope) {
    });
    app.controller('JpaTournamentsDetailController', function ($scope, $rootScope) {
    });

    app.controller('TournamentController', function ($scope, $rootScope, $location) {
    });

    app.controller('HomeController', function ($scope, $rootScope, $location, Data)  {
        $scope.tournament = function() {
            $location.path('/tournaments');
        }
        $scope.logout = function() {
            $rootScope.common.role.changeLogoutUser();
        }
        $scope.login = function() {
            $rootScope.common.role.changeLoggedinUser();
        }
        $scope.admin = function() {
            $rootScope.common.role.changeAdmin();
        }
        $scope.facility = function() {
            $rootScope.common.role.changeFacility();
        }
    });

})();
