(function($){
        // 奇数にする
        var PLAYER_BOX_HEIGHT = 25;
        var LINE_BORDER_px = 1;
        var INITIAL_PLAYER_SPACE = 40;
        var create_player = function(player_data){
            var ID = player_data.ID || '';
            var player = $('<div>', {
                'class': 'player player-' + ID,
                text: player_data.name,
                'data-id': ID,
            })[0];
            if ( player_data.url ) {
                player.click(function() {
                    location.href(player_data.url);
                });
            }

            return player;
            // var ID = player_data.ID || '';
            //
            // var html_player = '       <div class="player player-' + ID + '" data-id="' + ID + '">';
            //
            // if( player.url ){
            //     html_player += '        <a class="name" href="' + player.url + '">';
            //     html_player += '           ' + player.name;
            //     html_player += '        </a>';
            // }else{
            //     html_player += '           ' + player.name;
            // }
            //
            // html_player += '       </div>';
            //
            // return html_player;
        },

        create_match = function(round, match_data){
            if ( match_data.length == 0 ) return round;
            var current_match_data = match_data.shift();

            var match = $('<div>', {
                'class': 'match',
            })[0];
            $.each(current_match_data, function() {
                match.appendChild(create_player(this));
            });

            round.appendChild(match);

            return create_match(round, match_data);

            // var html_match = '   <div class="match">';
            //
            // if(match.player1)
            // html_match += get_html_player(match.player1);
            //
            // if(match.player2)
            // html_match += get_html_player(match.player2);
            //
            // html_match += '   </div>';
            //
            // return html_match;
        },

        create_separator = function(round_num, separator_num){

            var separator = $('<div>', {
                'class': 'separator-brackets rd-' + round_num
            })[0];
            for ( var i = 0; i < separator_num; i++ ) {
                var line = $('<div>', {
                    'class': 'line',
                })[0];
                separator.appendChild(line);
            }

            return separator;

            // var html_separator = '<div class="separator-brackets rd-' + r + '">';
            // for( var s = 1; s <= separator_num; s++ ){
            //     html_separator += '<div class="line"></div>';
            // }
            // html_separator += '</div>';
            //
            // return html_separator;
        },

        create_round = function(container, round_data, round_num) {
            var current_round_data = round_data.shift();

            var round = $('<div>', {
                'class': 'round rd-' + round_num,
            })[0];
            create_match(round, current_round_data);

            container.appendChild(round);

            if ( round_data.length == 0 ) return container;

            var sparator = create_separator( round_num, round.children.length );
            container.appendChild(sparator);

            return create_round(container, round_data, ++round_num);

            // var html = '<div class="container-brackets">';
            //
            // $.each(rounds, function(r, round){
            //     html += '<div class="round rd-' + (r + 1) + '">';
            //
            //     $.each(round, function(r, match){
            //         html += get_html_match( match );
            //     });
            //
            //     html += '</div>';
            //
            //     if( (rounds.length != (r+1)) ){
            //         html += get_html_separator( (r + 1), round.length );
            //     }
            // });
            // html += '</div>';
            //
            // return html;
        },


        set_style = function(max_brackets){
            max_brackets = max_brackets ? max_brackets : 0;
            var pre_round_margin_top = pre_player_margin_bottom = 0;
            for(i = 1; i <= max_brackets; i++){
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
                    (PLAYER_BOX_HEIGHT - LINE_BORDER_px) / 2 + round_margin_top;
                var line_height = (2 * line_margin_top) + INITIAL_PLAYER_SPACE;

                // Round
                $(".round.rd-" + i).css("margin-top", round_margin_top + "px");
                $(".round.rd-" + i + " .player").css("margin-bottom", player_margin_bottom + "px");
                    
                // line
                $(".separator-brackets.rd-" + i + " .line")
                    .css("height", line_height + "px")
                    .css("margin-top", line_margin_top + "px")
                    .css("margin-bottom", line_height + "px");

                pre_round_margin_top = round_margin_top;
                pre_player_margin_bottom = player_margin_bottom;
            }
        };

    $.fn.brackets = function(rounds, options){
        
        var opts = $.extend({}, $.fn.brackets.defaults, options);

        var brackets = $(this);

        var container = $('<div>', {
            'class': 'container-brackets',
        })[0];
        var round_num = rounds.length;
        create_round(container, rounds, 1);
        brackets[0].appendChild( container );
        set_style(round_num);

        //-- add event hover winner
        $('.player', brackets).on( {
            mouseover: function(){
                var ID = $(this).data('id');
                $(".player[data-id='" + ID + "']").addClass('hover');
            }, 
            mouseout: function(){
                $(".player").removeClass('hover');
            },
        });
    };

})(jQuery);

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
            // $location.path('/home');
            $location.path('/tournaments');
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
    app.controller('TournamentsController', function ($scope, $rootScope) {
        var rounds = Src.ROUNDS;

        $(".brackets").brackets(rounds, {});
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
        return {};
    });

})();

const Src = (function() {
    return {
        ROUNDS: [
            //-- round 1
            [
                [
                  { name: "Player 111", winner: true, ID: 111 },
                  { name: "Player 112", ID: 112 }
                ],
                [
                  { name: "Player 112", winner: true, ID: 112 },
                  { name: "Player 212", ID: 212 }
                ],
                [
                  { name: "Player 113", winner: true, ID: 113 },
                  { name: "Player 213", ID: 213 }
                ],
                [
                  { name: "Player 114", winner: true, ID: 114 },
                  { name: "Player 214", ID: 214 }
                ],
                [
                  { name: "Player 115", winner: true, ID: 115 },
                  { name: "Player 215", ID: 215 }
                ],
                [
                  { name: "Player 116", winner: true, ID: 116 },
                  { name: "Player 216", ID: 216 }
                ],
                [
                  { name: "Player 117", winner: true, ID: 117 },
                  { name: "Player 217", ID: 217 }
                ],
                [
                  { name: "Player 118", winner: true, ID: 118 },
                  { name: "Player 218", ID: 218 }
                ],
            ],
            //-- round 2
            [
                [
                  { name: "Player 111", winner: true, ID: 111 },
                  { name: "Player 212", ID: 212 }
                ],
                [
                  { name: "Player 113", winner: true, ID: 113 },
                  { name: "Player 214", ID: 214 }
                ],
                [
                  { name: "Player 115", winner: true, ID: 115 },
                  { name: "Player 216", ID: 216 }
                ],
                [
                  { name: "Player 117", winner: true, ID: 117 },
                  { name: "Player 218", ID: 218 }
                ],
            ],
            //-- round 3
            [
                [
                  { name: "Player 111", winner: true, ID: 111 },
                  { name: "Player 113", ID: 113 }
                ],
                [
                  { name: "Player 115", winner: true, ID: 115 },
                  { name: "Player 218", ID: 218 }
                ],
            ],
            //-- round 4
            [
                [
                  { name: "Player 113", winner: true, ID: 113 },
                  { name: "Player 218", winner: true, ID: 218 }
                ],
            ],
            //-- Champion
            [
                [
                  { name: "Player 113", winner: true, ID: 113 }
                ],
            ],
        ]
    };
})();
