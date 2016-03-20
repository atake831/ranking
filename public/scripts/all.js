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
            // $location.path('/tournaments');
            // $location.path('/facility/tournaments');
            $location.path('/facility/tournament/result');
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
                            click: function() {
                                rootScope.common.logout();
                            },
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
                            click: function() {
                                rootScope.common.logout();
                            },
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
    app.controller('FacilityTournamentsController', function ($scope, $rootScope, $location) {
        $scope.tournaments = Src.TOURNAMENTS;
        $scope.support = function() {
            $location.path("facility/tournament/result");
        };
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

(function() {
    var module = angular.module('ranking', []);

    module.filter('add_tournament_detail', function() {
        return function(input) {
            for ( var i = 0 ; i < input.length ; i++ ) {
                for ( var j = 0 ; j < Src.TOURNAMENTS.length ; j++ ) {
                    if ( input[i].tournament_id == 
                         Src.TOURNAMENTS[j].id )
                    {
                        input[i].tournament = Src.TOURNAMENTS[j];
                        break;
                    }
                }
            }

            return input;
        };
    });

    module.filter('grade_name', function() {
        return function(grade_id) {
            for ( var i = 0 ; i < Src.TOURNAMENT_GRADE.length ; i++ ) {
                if ( grade_id == Src.TOURNAMENT_GRADE[i].id ) {
                    return Src.TOURNAMENT_GRADE[i].name;
                }
            }
        };
    });

    module.filter('first_name', function() {
        return function(name) {
            return name.split(" ")[0];
        };
    });

    module.filter('sex_str', function() {
        return function(sex) {
            if ( sex == 1 ) {
                return "男";
            }
            else {
                return "女";
            }
        };
    });

    module.filter('man', function() {
        return function(players) {
            return $.grep(players, function(player) {
                return player.sex == 1;
            });
        };
    });
    module.filter('woman', function() {
        return function(players) {
            return $.grep(players, function(player) {
                return player.sex == 2;
            });
        };
    });

    module.run(function($http) {
    });

    module.factory('Storage', function() {
        return {
            _localDataKey: 'RankingLocalData',
            _set: function(key, value) {
                localStorage.setItem(key, value);
            },
            _get: function(key) {
                return localStorage.getItem(key);
            },
            _remove: function(key) {
                return localStorage.removeItem(key);
            },
            set: function(key, value) {
                var localData = JSON.parse(this._get(_localDataKey)) || {};
                localData[key] = value;
                this._set(_localDataKey, JSON.stringify(localData));
            },
            get: function(key) {
                var localData = JSON.parse(this._get(_localDataKey));
                if ( localData ) {
                    return localData[key];
                }
                return null;
            },
            getAll: function() {
                return JSON.parse(this._get(_localDataKey));
            },
            remove: function(key) {
                var localData = JSON.parse(this._get(_localDataKey));
                if ( localData ) {
                    localData[key] = null;
                }
            },
            clear: function() {
                return localStorage.clear();
            },
        }
    });

    module.factory('Auth', function(Storage) {
        var key = 'auth_token_key';
        return {
            hasToken: function() {
                return this.getToken !== null;
            },
            setToken: function(token) {
                Storage.set(key, token);
            },
            getToken: function(token) {
                return Storage.get(key);
            },
        };
    });

    module.factory('API', function($http) {
        return {};
    });

    module.factory('Util', function() {
        return {
            shuffle_array: function (arr) {
                var i, j, temp;
                arr = arr.slice();
                i = arr.length;
                if ( i === 0 ) {
                    return arr;
                }
                while ( --i ) {
                    j = Math.floor(Math.random() * (i + 1));
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
                return arr;
            },
        };
    });

    module.factory('Brackets', function(Util) {
        // 奇数にする
        var PLAYER_BOX_HEIGHT = 57;
        var LINE_BORDER_PX = 1;
        var INITIAL_PLAYER_SPACE = 40;

        return {
            players: [],
            rounds: [],
            create: function(element, players, rounds) {
                this.players = players;
                this.rounds = this.prepare_rounds(rounds);
                var round_num = this.rounds.length;

                var container = $('<div>', {'class': 'container-brackets'})[0];

                this.create_round(container, this.rounds, 1);
                element.appendChild( container );
                this.set_style(round_num);

                //-- add event hover winner
                $('.player', element).on( {
                    mouseover: function(){
                        var id = $(this).data('id');
                        $(".player[data-id='" + id + "']").addClass('hover');
                    }, 
                    mouseout: function(){
                        $(".player").removeClass('hover');
                    },
                });
            },

            prepare_rounds: function(rounds) {
                if ( !rounds || rounds.length == 0 ) {
                    rounds = this.create_random_first_round();
                }

                var last_round = rounds[rounds.length - 1];
                if ( last_round.length == 1 ) {
                    if ( last_round[0].length == 2 ) { 
                        rounds.push([ [ null ] ]);
                    }
                    return rounds;
                }

                var new_round = [];
                for ( var i = 0 ; i < last_round.length / 2 ; i++ ) {
                    new_round.push([null, null]);
                }
                rounds.push(new_round);

                return this.prepare_rounds(rounds);
            },

            create_random_first_round: function() {
                var ids = [];
                $.each(this.players, function(index, player) {
                    ids.push(player.id);
                });
                shuffled_array = Util.shuffle_array(ids);
                var matches = [];
                for ( var i = 0 ; i < shuffled_array.length ; i++ ) {
                    matches.push([ shuffled_array[i], shuffled_array[++i] ]);
                }
                return [ matches ];
            },

            create_blank_player: function(){
                return $('<div>', {
                    'class': 'player hidden',
                })[0];
            },

            create_player: function(player_id){
                var player_data = this.players.find(function(player) {
                    return player.id == player_id;
                });
                var pair_name = [
                    '佐藤', '鈴木', '高橋', '田中', 
                    '伊藤', '山本', '渡辺', '中村',
                    '小林', '加藤', '吉田', '山田',
                    '佐々木', '山口', '松本', '井上'
                ];
                var player = $('<div>', {
                    'class': 'player',
                    'data-id': player_data.id,
                })[0];
                player.appendChild($('<p>', {
                    'class': 'name',
                    text: player_data.name.split(" ")[0],
                })[0]);
                player.appendChild($('<p>', {
                    'class': 'name',
                    text: pair_name[player_data.id - 1]
                })[0]);
                if ( player_data.url ) {
                    player.click(function() {
                        console.log("player clicked !!");
                        // location.href(player_data.url);
                    });
                }

                return player;
            },

            create_match: function(round, match_data){
                if ( match_data.length == 0 ) return round;
                var current_match_data = match_data.shift();

                var match = $('<div>', {'class': 'match'})[0];
                for ( var i = 0 ; i < current_match_data.length ; i++ ) {
                    if ( current_match_data[i] ) {
                        match.appendChild(this.create_player(current_match_data[i]));
                    }
                    else {
                        match.appendChild(this.create_blank_player());
                    }
                }
                round.appendChild(match);

                return this.create_match(round, match_data);
            },

            create_separator: function(round_num, separator_num){
                var separator = $('<div>', {
                    'class': 'separator-brackets rd-' + round_num
                })[0];
                for ( var i = 0; i < separator_num; i++ ) {
                    var line = $('<div>', {'class': 'line'})[0];
                    line.click(function() {
                        console.log("**** " + round_num + " " + i + " ****");
                    });
                    separator.appendChild(line);
                }

                return separator;
            },

            create_round: function(container, round_data, round_num) {
                var current_round_data = round_data.shift();

                var round = $('<div>', {'class': 'round rd-' + round_num})[0];
                this.create_match(round, current_round_data);

                container.appendChild(round);

                var sparator = this.create_separator( round_num, round.children.length );
                container.appendChild(sparator);

                if ( round_data.length == 0 ) {
                    return container;   
                }

                return this.create_round(container, round_data, ++round_num);
            },

            set_style: function(round_num){
                round_num = round_num ? round_num : 0;
                var pre_round_margin_top = pre_player_margin_bottom = 0;
                for (i = 1; i <= round_num; i++) {
                    var round_margin_top;
                    if ( i == 1 ) {
                        round_margin_top = 0;
                    }
                    else {
                        round_margin_top = 
                            ( PLAYER_BOX_HEIGHT * 2 + pre_player_margin_bottom ) / 2 - 
                            PLAYER_BOX_HEIGHT / 2 + pre_round_margin_top;
                    }

                    var player_margin_bottom = 
                        (2 * round_margin_top) + INITIAL_PLAYER_SPACE;
                    var line_margin_top = 
                        (PLAYER_BOX_HEIGHT - LINE_BORDER_PX) / 2 + round_margin_top;
                    var line_height = (2 * line_margin_top) + INITIAL_PLAYER_SPACE;

                    // Round
                    $(".round.rd-" + i).css("margin-top", round_margin_top + "px");
                    $(".round.rd-" + i + " .player").css("margin-bottom", player_margin_bottom + "px");
                        
                    // line
                    $(".separator-brackets.rd-" + i + " .line")
                        .css("height", line_height + "px")
                        .css("margin-top", line_margin_top + "px")
                        .css("margin-bottom", line_height + "px");

                    if ( i == round_num ) {
                        $(".round.rd-" + i + " .player").addClass('champion');
                        $(".separator-brackets.rd-" + i + " .line")
                            .addClass('last-line');
                    }

                    pre_round_margin_top = round_margin_top;
                    pre_player_margin_bottom = player_margin_bottom;
                }
            },
        };
    });
})();

const Src = (function() {
    return {
        PLAYERS: [
             { 
                 id: 1,  
                 name: "竹口 輝", 
                 rank: 1, 
                 point: 10000, 
                 age: 26, 
                 sex: 1, 
                 image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c0.120.331.331/s320x320/185331_108322522601186_1272144_n.jpg?oh=6cf3f0c19ab79185db3b1eb8a0751d0b&oe=57936893", 
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 2,  name: "MARIA JOSE SANCHEZ ALAYETO", rank: 1, point: 10000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 3,  name: "FERNANDO BELASTEGUIN", rank: 2, point: 8000, age: 36, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 4,  name: "MARIA PILAR SANCHEZ ALAYETO", rank: 2, point: 8000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 5,  name: "PABLO LIMA", rank: 3, point: 6000, age: 32, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 6,  name: "ALEJANDRA SALAZAR BENGOECHEA", rank: 3, point: 6000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 7,  name: "FRANCISCO NAVARRO COMPAN", rank: 4, point: 4000, age: 28, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 8,  name: "MARTA MARRERO MARRERO", rank: 4, point: 4000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 9,  name: "MATIAS DIAZ SANGIORGIO", rank: 5, point: 2000, age: 24, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 10,  name: "ELISABETH AMATRIAIN ARMAS", rank: 5, point: 2000, age: 25, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 11,  name: "CARLOS DANIEL GUTIERREZ", rank: 6, point: 1000, age: 20, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 12,  name: "PATRICIA LLAGUNO ZIELINSKI", rank: 6, point: 1000, age: 33, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 13,  name: "JUAN MIERES PETRUF", rank: 7, point: 800, age: 24, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 14,  name: "CATALINA TENORIO", rank: 7, point: 800, age: 24, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 15,  name: "MAXIMILIANO SANCHEZ", rank: 8, point: 500, age: 20, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
             { id: 16,  name: "CECILIA REITER", rank: 8, point: 500, age: 19, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7",
                 histories: [
                    {
                        tournament_id: 3,
                        rank: 2,
                        point: 4000,
                    },
                    {
                        tournament_id: 2,
                        rank: 1,
                        point: 6000,
                    },
                    {
                        tournament_id: 1,
                        rank: 5,
                        point: 1000,
                    },
                 ],
                 schedule: [ 
                    {
                        tournament_id: 6,
                    },
                    {
                        tournament_id: 7,
                    }
                 ],
             },
        ],
        TOURNAMENT_GRADE: 
        [
            { id: 1,  name: "JPAマスターズ" },
            { id: 2,  name: "オープン" },
            { id: 3,  name: "チャレンジャー" },
            { id: 4,  name: "ビギナー" },
        ],
        FACILITIES: 
        [
            {
                id: 1,
                name: "竹口パデルパーク",
                location: "渋谷",
                courts: [
                    {
                        id: 1,
                        type: "オムニ",
                    },
                    {
                        id: 2,
                        type: "オムニ",
                    },
                    {
                        id: 3,
                        type: "オムニ",
                    },
                ],
            }
        ],
        TOURNAMENTS: 
        [
            {
                id: 1, 
                grade_id: 2,
                facility_id: 1,
                name: "オープン 竹口パデルパークオープン",
                capacity_pair_num: 12,
                date: "2015-02-20",
                status: 1,
            },
            {
                id: 2, 
                grade_id: 1,
                facility_id: 1,
                name: "JPAマスターズ 竹口パデルパークマスターズ",
                capacity_pair_num: 16,
                date: "2016-01-28",
                status: 1,
            },
            {
                id: 3, 
                grade_id: 2,
                facility_id: 1,
                name: "オープン 竹口パデルパークオープン",
                capacity_pair_num: 12,
                date: "2016-02-12",
                status: 1,
            },
            {
                id: 4, 
                grade_id: 3,
                facility_id: 1,
                name: "チャレンジャー 竹口パデルパーク大会",
                capacity_pair_num: 12,
                date: "2016-02-30",
                status: 1,
            },
            {
                id: 5, 
                grade_id: 4,
                facility_id: 1,
                name: "ビギナー 竹口パデルパークビギナー大会",
                capacity_pair_num: 8,
                date: "2016-03-6",
                status: 1,
            },
            {
                id: 6, 
                grade_id: 1,
                facility_id: 1,
                name: "JPAマスターズ 竹口パデルパークマスターズ",
                capacity_pair_num: 16,
                date: "2016-03-28",
                status: 0,
            },
            {
                id: 7, 
                grade_id: 2,
                facility_id: 1,
                name: "オープン 竹口パデルパークオープン",
                capacity_pair_num: 12,
                date: "2016-04-12",
                status: 0,
            },
            {
                id: 8, 
                grade_id: 3,
                facility_id: 1,
                name: "チャレンジャー 竹口パデルパーク大会",
                capacity_pair_num: 12,
                date: "2016-04-30",
                status: 0,
            },
            {
                id: 9, 
                grade_id: 4,
                facility_id: 1,
                name: "ビギナー 竹口パデルパークビギナー大会",
                capacity_pair_num: 8,
                date: "2016-05-6",
                status: 0,
            },
        ],
        ROUNDS: [
            //-- round 1
            [
                [ 1, 2 ],
                [ 3, 4 ],
                [ 5, 6 ],
                [ 7, 8 ],
                [ 9, 10 ],
                [ 11, 12 ],
                [ 13, 14 ],
                [ 15, 16 ],
            ],
            // //-- round 2
            // [
            //     [ 1, 3, ],
            //     [ 5, 7, ],
            //     [ 9, 11, ],
            //     [ 13, 15, ],
            // ],
            // //-- round 3
            // [
            //     [ 1, 5 ],
            //     [ 9, 15 ],
            // ],
            // //-- round 4
            // [
            //     [ 1, 9 ],
            // ],
            // //-- Champion
            // [
            //     [ 9 ]
            // ],
        ]
    };
})();
