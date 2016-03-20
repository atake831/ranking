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
            .when('/profile/:id', { templateUrl: 'views/profile.html' })
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
        $("#topbar").scrollupbar();
    });

    app.controller('AppController', function($scope, $rootScope, $location, Data, $uibModal) {
        $(document).ready(function(){
            // $location.path('/home');
            // $location.path('/ranking');
            // $location.path('/profile/1');
            $location.path('/tournaments');
        });

        function changeBackgroundImage(color) {
            $.each(['gray', 'yellow', 'blue'], function(index, value) {
                $('body').removeClass(value);
            });
            $('body').addClass(color);
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
                location: "#/ranking",
                text: "ランキング"
            },
        ];
        $rootScope.navbarRight = [
            {
                click: showSigninModal,
                text: "Signup/Login"
            },
        ];

        Data.currentRole = 'user';
        var rootScope = $rootScope;
        $rootScope.common = {
            logout: function() {
                alert("ログアウトしました");
                rootScope.common.role.changeLogoutUser();
                $location.path('/home');
            },
            role: {
                changeLogoutUser: function() {
                    Data.currentRole = 'logout-user';
                    changeBackgroundImage('gray');
                    $rootScope.navbarLeft = [
                        {
                            location: "#/ranking",
                            text: "ランキング"
                        },
                        {
                            location: "#/tournaments",
                            text: "大会一覧"
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
                            location: "#/ranking",
                            text: "ランキング"
                        },
                        {
                            location: "#/tournaments",
                            text: "大会一覧"
                        },
                        {
                            location: "#/profile/1",
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
                            location: "#/facility/profile",
                            text: "施設情報"
                        },
                        {
                            location: "#/facility/tournaments",
                            text: "運営トーナメント"
                        },
                        {
                            location: "#/facility/tournament/result",
                            text: "当日サポート"
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
                    changeBackgroundImage('yellow');
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
                            click: function() {
                                rootScope.common.logout();
                            },
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

    app.controller('RankingController', function ($scope, $rootScope, $location) {
        $scope.players = Src.PLAYERS;
        $scope.profile = function(id) {
            console.log(id);
            $location.path("profile/" + id);
        };
    });
    app.controller('TournamentsController', function ($scope, $rootScope, $uibModal) {
        $scope.tournaments = Src.TOURNAMENTS;

        $('.hcaption').hcaptions();

        function showJoinModal() {
            $uibModal.open({
                templateUrl: 'views/tournament/join.html',
                controller: 'TournamentJoinController',
                backdrop: true,
                scope: $scope,
            });
        }

        $scope.join = function() {
            showJoinModal();
        };
        $scope.movie = function() {
            console.log("movie");
        };
    });
    app.controller('TournamentJoinController', function ($scope, $rootScope, $uibModalInstance, $timeout) {
        $scope.join = function() {
        };
        $scope.close = function() {
            $uibModalInstance.close();
        };
        var source = [
          "ActionScript",
          "AppleScript",
          "Asp",
          "BASIC",
          "C",
          "C++",
          "Clojure",
          "COBOL",
          "ColdFusion",
          "Erlang",
          "Fortran",
          "Groovy",
          "Haskell",
          "Java",
          "JavaScript",
          "Lisp",
          "Perl",
          "PHP",
          "Python",
          "Ruby",
          "Scala",
          "Scheme"
        ];
        $scope.change = function() {
            var candidates = [];
            for ( var i = 0 ; i < Src.PLAYERS.length ; i++ ) {
                if ( Src.PLAYERS[i].name.toLowerCase().includes($scope.input.toLowerCase()) ) {
                    candidates.push(Src.PLAYERS[i].name);
                }
            }
            $scope.candidates = candidates;
        };
        $scope.complete = function(name) {
            $scope.input = name.split(" ")[0];
            $scope.candidates = [];
        };
    });
    app.controller('RegisterController', function ($scope, $rootScope) {
    });
    app.controller('RacketController', function ($scope, $rootScope, $uibModalInstance) {
        $scope.close = function() {
            $uibModalInstance.close();
        };
    });
    app.controller('ProfileController', function ($scope, $rootScope, $routeParams, $uibModal) {
        $scope.player = Src.PLAYERS[$routeParams.id - 1];

        function showRacketModal() {
            $uibModal.open({
                templateUrl: 'views/racket.html',
                controller: 'RacketController',
                backdrop: true,
                scope: $scope,
            });
        }

        $scope.racket = function() {
            showRacketModal();
        };

        var data = {
            labels: ["2015年6月", "7月", "8月", "9月", "10月", "11月", "12月", "2016年1月", "2月", "3月"],
            datasets: [
                {
                    label: "ランキングの推移",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [-48, -37, -42, -33, -22, -15, -19, -7, 0, 0]
                },
            ]
        };

        var ctx = document.getElementById("rankingChart").getContext("2d");
        var options = {
            scaleOverride: true,
            scaleSteps: 5,
            scaleStepWidth : 10,
            scaleStartValue: -50,
            bezierCurve : false,
            tooltipTemplate: function(label) {
                if ( label.value == 0 ) {
                    return 1 + "位";
                }
                else {
                    return -label.value + "位";
                }
            },
            scaleLabel: function(label) {
                if ( label.value == 0 ) {
                    return 1 + "位";
                }
                else {
                    return -label.value + "位";
                }
            },
        };
        var lineChart = new Chart(ctx).Line(data, options);


    });
    app.controller('ParticipateController', function ($scope, $rootScope) {
    });
    app.controller('HistoryController', function ($scope, $rootScope) {
    });
    app.controller('FacilityRegisterController', function ($scope, $rootScope) {
    });
    app.controller('FacilityProfileController', function ($scope, $rootScope) {
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
    app.controller('FacilityTournamentResultController', function ($scope, $rootScope, Brackets) {
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
    });

})();
