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
    };

    var create_match = function(round, match_data){
        if ( match_data.length == 0 ) return round;
        var current_match_data = match_data.shift();

        var match = $('<div>', {'class': 'match'})[0];
        $.each(current_match_data, function() {
            match.appendChild(create_player(this));
        });
        round.appendChild(match);

        return create_match(round, match_data);
    };

    var create_separator = function(round_num, separator_num){

        var separator = $('<div>', {
            'class': 'separator-brackets rd-' + round_num
        })[0];
        for ( var i = 0; i < separator_num; i++ ) {
            var line = $('<div>', {'class': 'line'})[0];
            separator.appendChild(line);
        }

        return separator;
    };

    var create_round = function(container, round_data, round_num) {
        var current_round_data = round_data.shift();

        var round = $('<div>', {'class': 'round rd-' + round_num})[0];
        create_match(round, current_round_data);

        container.appendChild(round);

        if ( round_data.length == 0 ) return container;

        var sparator = create_separator( round_num, round.children.length );
        container.appendChild(sparator);

        return create_round(container, round_data, ++round_num);
    };

    var set_style = function(max_brackets){
        max_brackets = max_brackets ? max_brackets : 0;
        var pre_round_margin_top = pre_player_margin_bottom = 0;
        for (i = 1; i <= max_brackets; i++) {
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
        var round_num = rounds.length;
        var opts = $.extend({}, $.fn.brackets.defaults, options);
        var brackets = $(this)[0];

        var container = $('<div>', {'class': 'container-brackets'})[0];

        create_round(container, rounds, 1);
        brackets.appendChild( container );
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
