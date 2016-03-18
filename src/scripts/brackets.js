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
