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

    module.factory('Brackets', function(Util, $compile) {
        // 奇数にする
        var PLAYER_BOX_HEIGHT = 57;
        var LINE_BORDER_PX = 1;
        var INITIAL_PLAYER_SPACE = 40;

        return {
            create: function($scope, element, players, rounds) {
                this.$scope = $scope;
                this.players = players;
                this.rounds = this.prepare_rounds(rounds);
                var round_num = this.rounds.length;

                var container = $('<div>', {'class': 'container-brackets'})[0];

                this.create_round(container, rounds, 1);
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
                $compile(element)(this.$scope);
            },

            set_game_result: function(round_id, match_id, winner_id) {
                this.rounds[round_id][Math.floor(match_id / 2)][match_id % 2] = winner_id;
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

            create_blank_player: function(player_num){
                return $('<div>', {
                    'class': 'player hidden player-' + player_num,
                })[0];
            },

            create_player: function(player_id, player_num){
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
                    'class': 'player player-' + player_num,
                    'data-id': player_data.id,
                })[0];

                var player_name = $('<p>', {
                    'class': 'name',
                    text: player_data.name.split(" ")[0],
                })[0];
                player_name.setAttribute("ng-click", "profile(" + player_data.id + ")");
                player.appendChild(player_name);

                player.appendChild($('<p>', {
                    'class': 'name',
                    text: pair_name[player_data.id - 1]
                })[0]);

                return player;
            },

            create_match: function(round, match_data, match_num){
                if ( match_data.length == match_num ) return round;
                var current_match_data = match_data[match_num];

                var match = $('<div>', {
                    'class': 'match match-' + round.children.length
                })[0];
                for ( var i = 0 ; i < current_match_data.length ; i++ ) {
                    if ( current_match_data[i] ) {
                        match.appendChild(this.create_player(current_match_data[i], i));
                    }
                    else {
                        match.appendChild(this.create_blank_player(i));
                    }
                }
                round.appendChild(match);

                return this.create_match(round, match_data, ++match_num);
            },

            create_separator: function(round_num, separator_num){
                var separator = $('<div>', {
                    'class': 'separator-brackets rd-' + round_num
                })[0];
                for ( var i = 0; i < separator_num; i++ ) {
                    var line = $('<div>', {'class': 'line'})[0];
                    line.setAttribute("ng-click", 
                        "game_result( " + round_num + ", " + i + ")"
                    );
                    separator.appendChild(line);
                }

                return separator;
            },

            create_round: function(container, round_data, round_num) {
                var current_round_data = round_data[round_num - 1];

                var round = $('<div>', {'class': 'round rd-' + round_num})[0];
                this.create_match(round, current_round_data, 0);

                container.appendChild(round);

                var sparator = this.create_separator( round_num, round.children.length );
                container.appendChild(sparator);

                if ( round_data.length == round_num ) {
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
