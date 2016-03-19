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
        $("#topbar").scrollupbar();
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

(function() {
    var module = angular.module('ranking', []);

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
        var PLAYER_BOX_HEIGHT = 25;
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
                var player = $('<div>', {
                    'class': 'player',
                    text: player_data.name,
                    'data-id': player_data.id,
                })[0];
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
             { id: 1,  name: "Player 1" },
             { id: 2,  name: "Player 2" },
             { id: 3,  name: "Player 3" },
             { id: 4,  name: "Player 4" },
             { id: 5,  name: "Player 5" },
             { id: 6,  name: "Player 6" },
             { id: 7,  name: "Player 7" },
             { id: 8,  name: "Player 8" },
             { id: 9,  name: "Player 9" },
             { id: 10, name: "Player 10" },
             { id: 11, name: "Player 11" },
             { id: 12, name: "Player 12" },
             { id: 13, name: "Player 13" },
             { id: 14, name: "Player 14" },
             { id: 15, name: "Player 15" },
             { id: 16, name: "Player 16" },
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
            //-- round 2
            [
                [ 1, 3, ],
                [ 5, 7, ],
                [ 9, 11, ],
                [ 13, 15, ],
            ],
            //-- round 3
            [
                [ 1, 5 ],
                [ 9, 15 ],
            ],
            //-- round 4
            [
                [ 1, 9 ],
            ],
            //-- Champion
            [
                [ 9 ]
            ],
        ]
    };
})();
