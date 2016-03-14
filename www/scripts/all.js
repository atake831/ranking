(function($){
    var get_html_player = function(player){
            var winner = player.winner ? 'winner' : '';
            var ID = player.ID ? player.ID : '';

            var html_player = '       <div class="player ' + winner + ' player-' + ID + '" data-id="' + ID + '">';

            if( player.url ){
                html_player += '        <a class="name" href="' + player.url + '">';
                html_player += '           ' + player.name;
                html_player += '        </a>';
            }else{
                html_player += '           ' + player.name;
            }

            html_player += '       </div>';

            return html_player;
        },

        get_html_match = function(match){
            var html_match = '   <div class="match">';

            if(match.player1)
            html_match += get_html_player(match.player1);

            if(match.player2)
            html_match += get_html_player(match.player2);

            html_match += '   </div>';

            return html_match;
        },

        get_html_separator = function(r, total){

            var html_separator = '<div class="separator-brackets rd-' + r + '">';
            for( var s = 1; s <= total; s++ ){
                html_separator += '<div class="line"></div>';
            }
            html_separator += '</div>';

            return html_separator;

        },

        get_html_header = function(titles, max_brackets){

            var html_titles = '';

            html_titles += '<div class="brackets-header">';

            if( titles ){
                if ( Array.isArray(titles) ){

                    $.each( titles, function(i, title){
                        html_titles += '<div class="title">' + title + '</div>';
                    });

                }else{

                    for(i = 1; i <= max_brackets; i++){
                        if( i == max_brackets) html_titles += '<div class="title">Champion</div>';
                        else if( i == (max_brackets-1) && max_brackets > 2 ) html_titles += '<div class="title">Final</div>';
                        else if( i == (max_brackets-2) && max_brackets > 3 ) html_titles += '<div class="title">Semifinal</div>';
                        else html_titles += '<div class="title">Round ' + i + '</div>';
                    }
                }

                }

            html_titles += '</div>';

            return html_titles;
        },

        get_html = function(rounds, titles){
            var html  = '';

            html += get_html_header(titles, rounds.length);
            html += '<div class="container-brackets">';

            $.each(rounds, function(r, round){
                html += '<div class="round rd-' + (r + 1) + '">';

                $.each(round, function(r, match){
                    html += get_html_match( match );
                });

                html += '</div>';

                if( (rounds.length != (r+1)) ){
                    html += get_html_separator( (r + 1), round.length );
                }


            });
            html += '</div>';

            return html;
        },

        key = function(i){
            return ( 23 *  Math.pow( 2, (i-2) ) ) + ( 20 * Math.pow( 2, (i-3) ) ) + ( 40 * ( Math.pow( 2, (i-3) ) - 1) )
        },

        get_style_brackets = function(max_brackets){
            var css = '';
            max_brackets = max_brackets ? max_brackets : 0;
            for(i = 2; i <= max_brackets; i++){

                var mtl = i == 2 ? 23 + 9.5 : key(i) + 19.5;
                var mtr = i == 2 ? 23 - 1.5 : key(i) + 8.5;
                var mbp = (2 * mtr) + 40;
                var hl = (2 * mtl) + 40;

                css += '/*-- Round ' + i + ' --*/';
                css += '.container-brackets .round.rd-' + i + '{ margin-top: ' + mtr + 'px; }';
                css += '   .container-brackets .round.rd-' + i + ' .match .player{ margin-bottom: ' + mbp + 'px; }';

                css += '/*-- lines ' + i + ' --*/';
                css += '.container-brackets .separator-brackets.rd-' + i + ' .line{';
                css += '   height: ' + hl + 'px;';
                css += '   margin-bottom: ' + hl + 'px;';
                css += '}';
                css += '   .container-brackets .separator-brackets.rd-' + i + ' .line:first-child{ margin-top: ' + mtl + 'px; }';

            }

            return css;

        },

        get_width_container = function(max_brackets){
                return (max_brackets)*150 + (max_brackets-1)*80 - (max_brackets-1)*75;
        },

        get_height_container = function(max_brackets){
            return key(max_brackets+1);
        },

        set_style = function(styles, n_brackets){

            var css,
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            css = ".left{float: left}";
            css += ".right{float: right}";
            css += ".brackets-header{";
            css += "    margin-bottom: 20px;";
            css += "    height: 30px;";
            css += "    width: " + get_width_container( n_brackets ) + "px !important;";
            css += "}";
            css += ".brackets-header .title{";
            css += "    color: " + styles.color_title + " !important;";
            css += "}";
            css += ".brackets-header .title{ float: left; width: 150px;  margin-right: 5px; text-align: center;}";
            css += ".brackets-header .title:last-child{ margin-right: 0px;}";
            css += ".container-brackets *,";
            css += ".container-brackets *:before,";
            css += ".container-brackets *:after {";
            css += "  -webkit-box-sizing: content-box !important;";
            css += "     -moz-box-sizing: content-box !important;";
            css += "          box-sizing: content-box !important;";
            css += "}";
            css += ".container-brackets{";
            css += "    position: relative;";
            css += "    overflow: hidden;";
            css += "    margin: 10px;";
            css += "    width: " + get_width_container( n_brackets ) + "px !important;";
            css += "    height: " + get_height_container( n_brackets ) + "px !important;";
            css += "}";
            css += ".container-brackets .round{ width: 150px; margin-left: -75px; float: left;}";
            css += "    .container-brackets .round:first-child{ margin-left: 0; }";
            css += "    .container-brackets .round .match{}";
            css += "        .container-brackets .round .match:last-child{ margin-bottom: 0px;}";
            css += "        .container-brackets .round .match .player{";
            css += "            border: solid 1px " + styles.border_color + ";";
            css += "            border-radius: " + styles.border_radius_player + ";";
            css += "            height: 21px;";
            css += "            padding: 0 5px;";
            css += "            /*width: calc(100% - 10px);*/";
            css += "            line-height: 21px;";
            css += "            background: " + styles.bg_player + ";";
            css += "        }";
            css += "            .container-brackets .round .match .player.hover{ background: " + styles.bg_player_hover + "; color: " + styles.color_player_hover + ";}";
            css += "                .container-brackets .round .match .player .name{";
            css += "                    text-align: center;";
            css += "                    text-decoration: none;";
            css += "                    cursor: pointer;";
            css += "                   width: 100%;";
            css += "                    margin-left: 10px;";
            css += "                    /*display: block;*/";
            css += "                    color: " + styles.color_player + ";";
            css += "                }";
            css += "                .container-brackets .round .match .player.hover a{";
            css += "                    color: " + styles.color_player_hover + " !important;";
            css += "                }";
            css += ".container-brackets .separator-brackets{ width: 80px; float: left;}";
            css += "    .container-brackets .separator-brackets .line{";
            css += "        border: 1px solid " + styles.border_color + ";";
            css += "        border-left: none;";
            css += "        border-radius: 0 " + styles.border_radius_lines + " " + styles.border_radius_lines + " 0;";
            css += "    }";
            css += "        .container-brackets .separator-brackets .line:last-child{ margin-bottom: 0; }";
            css += "/*-- First ronda --*/";
            css += "    .container-brackets .round.rd-1 .match{ margin-bottom: 40px; }";
            css += "        .container-brackets .round.rd-1 .match .player{ margin-bottom: 20px; }";
            css += "/*-- First lines --*/";
            css += ".container-brackets .separator-brackets.rd-1 .line{";
            css += "    height: 42px;";
            css += "    margin-bottom: 62px;";
            css += "}";
            css += "    .container-brackets .separator-brackets.rd-1 .line:first-child{ margin-top: 11px; }";

            css += get_style_brackets( n_brackets );

            style.type = 'text/css';

            if ( style.styleSheet ){
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);

        }

        ;


    $.fn.brackets = function( options ){
        
        var opts = $.extend({}, $.fn.brackets.defaults, options);

        if( ! opts.rounds ){
            console.error("Round not found :(");
            return false;
        }

        if( this.length >= 1){
            this.each(function(){
                var $this = $(this);

                //-- add html brackets
                var container_brackets = get_html( opts.rounds, opts.titles )
                $this.html( container_brackets );
                set_style( opts, opts.rounds.length )

                //-- add event hover winner

                $('.player', $this).on( {
                    mouseover: function(){
                        var $this = $(this); 
                        ID = $this.data('id');
                        $(".player[data-id='" + ID + "']").addClass('hover');
                        //  alert(ID)
                    }, 
                    mouseout: function(){
                        $(".player").removeClass('hover');
                    },
                    
                });

            });
        }else{
            console.error('Object not found :( ');
        }

    };

    $.fn.brackets.defaults = {
        rounds: false,
        titles: false,
        color_title: 'black',
        border_color: 'black',
        color_player: 'black',
        bg_player: 'white',
        color_player_hover: 'black',
        bg_player_hover: 'white',
        border_radius_player: '0px',
        border_radius_lines: '0px',
    };


})(jQuery);

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.


(function () {
    "use strict";

    var app = angular.module('app', ['ngRoute', 'ui.calendar', 'ui.bootstrap']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: 'views/home.html' })
            .when('/select', { templateUrl: 'views/select.html' })
            .when('/me', { templateUrl: 'views/profile.html' })
            .when('/admin', { templateUrl: 'views/admin.html' })
            .when('/tournament', { templateUrl: 'views/tournament.html' })
            .otherwise({redirectTo: '/home'});
    });

    app.controller('AppController', function ($scope, $location) {
        $(document).ready(function(){
            // $location.path('/home');
            $location.path('/tournament');
        });
    });
    app.controller('TournamentController', function ($scope, $location) {
        var rounds = [
            //-- round 1
            [
                {
                  player1: { name: "Player 111", winner: true, ID: 111 },
                  player2: { name: "Player 112", ID: 112 },
                },
                {
                  player1: { name: "Player 112", winner: true, ID: 112 },
                  player2: { name: "Player 212", ID: 212 }
                },
                {
                  player1: { name: "Player 113", winner: true, ID: 113 },
                  player2: { name: "Player 213", ID: 213 }
                },
                {
                  player1: { name: "Player 114", winner: true, ID: 114 },
                  player2: { name: "Player 214", ID: 214 }
                },
                {
                  player1: { name: "Player 115", winner: true, ID: 115 },
                  player2: { name: "Player 215", ID: 215 }
                },
                {
                  player1: { name: "Player 116", winner: true, ID: 116 },
                  player2: { name: "Player 216", ID: 216 }
                },
                {
                  player1: { name: "Player 117", winner: true, ID: 117 },
                  player2: { name: "Player 217", ID: 217 }
                },
                {
                  player1: { name: "Player 118", winner: true, ID: 118 },
                  player2: { name: "Player 218", ID: 218 }
                },
            ],
            //-- round 2
            [
                {
                  player1: { name: "Player 111", winner: true, ID: 111 },
                  player2: { name: "Player 212", ID: 212 }
                },
                {
                  player1: { name: "Player 113", winner: true, ID: 113 },
                  player2: { name: "Player 214", ID: 214 }
                },
                {
                  player1: { name: "Player 115", winner: true, ID: 115 },
                  player2: { name: "Player 216", ID: 216 }
                },
                {
                  player1: { name: "Player 117", winner: true, ID: 117 },
                  player2: { name: "Player 218", ID: 218 }
                },
            ],
            //-- round 3
            [
                {
                  player1: { name: "Player 111", winner: true, ID: 111 },
                  player2: { name: "Player 113", ID: 113 }
                },
                {
                  player1: { name: "Player 115", winner: true, ID: 115 },
                  player2: { name: "Player 218", ID: 218 }
                },
            ],
            //-- round 4
            [
                {
                  player1: { name: "Player 113", winner: true, ID: 113 },
                  player2: { name: "Player 218", winner: true, ID: 218 },
                },
            ],
            //-- Champion
            [
                {
                  player1: { name: "Player 113", winner: true, ID: 113 },
                },
            ],
        ];

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
        $scope.showReservation = true;
        $scope.cancel = function() {
            alert('予約を取り消しました');
            $scope.showReservation = false;
        };
        $scope.confirm = function() {
            alert('予約を確定しました');
            $scope.showReservation = false;
            $scope.eventSources[0].events.push({
                title: "竹口",
                start: "2016-02-18T12:00:00",
                end: "2016-02-18T14:00:00",
            });
        };
        $scope.eventSources = [
            {
                events: [
                    {
                        title: "中塚",
                        start: "2016-02-18T10:00:00",
                        end: "2016-02-18T12:00:00",
                    },
                    {
                        title: "田中",
                        start: "2016-02-18T15:00:00",
                        end: "2016-02-18T18:00:00",
                    }
                ],
                color: '#F6CECE',
                textColor: 'black',
                borderColor: 'white'
            }
        ];

        $scope.uiConfig = {
            calendar: {
                header: {
                    left: ''
                },
                firstDay: 1, // 1:月曜日
                weekends: true,
                weekNumbers: false,
                contentHeight: 450,
                defaultView: 'agendaWeek',
                allDaySlot: false,
                axisFormat: 'H時',
                slotDuration: '00:30:00',
                snapDuration: '00:30:00',
                scrollTime: '09:00:00',
                minTime: '06:00:00',
                maxTime: '25:00:00',
                timeFormat: 'H(:mm)',
                columnFormat: {
                    week: "M/D ddd",
                },
                buttonText: {
                    prev:     '<', // <
                    next:     '>', // >
                    today:    '今日',
                    month:    '月',
                    week:     '週',
                    day:      '日'
                },
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
                selectable: true,
                select: function(start, end, event, view) {
                    $rootScope.selected = {
                        start: start,
                        end: end
                    };
                    $location.path('/select');
                    // alert("selected: " + start + " - " + end );
                },
                selectHelper: true,
                unselectAuto: true,
                unselectCancel: '',
            }
        };
    });
    app.controller('SelectController', function ($scope, $location, $rootScope) {
        $scope.start = $rootScope.selected.start;
        $scope.end = $rootScope.selected.end;
        $scope.courts = [
            { 
                name: '豊洲',
            },
            { 
                name: '川口',
            },
        ];
        $scope.selectedCourt = $scope.courts[0];
        $scope.reserve = function() {
            alert("予約を受け付けました");
            $location.path('/home');
        }
    });
    app.controller('HomeController', function ($scope, $rootScope, $location) {
        $scope.tournament = function() {
            $location.path('/tournament');
        }
        $scope.admin = function() {
            $location.path('/admin');
        }
        $scope.eventSources = [
            {
                events: [
                    {
                        title: "所沢",
                        start: "2016-02-18T10:00:00",
                        end: "2016-02-18T12:00:00",
                    },
                    {
                        title: "所沢",
                        start: "2016-02-18T15:00:00",
                        end: "2016-02-18T20:00:00",
                    }
                ],
                color: '#F6CECE',
                textColor: 'black',
                borderColor: 'white'
            },
            {
                events: [
                    {
                        title: "豊洲",
                        start: "2016-02-18T06:00:00",
                        end: "2016-02-18T08:00:00",
                    },
                    {
                        title: "豊洲",
                        start: "2016-02-18T09:00:00",
                        end: "2016-02-18T12:00:00",
                    }
                ],
                color: '#A9E2F3',
                textColor: 'black',
                borderColor: 'white'
            }
        ];
        
        $scope.uiConfig = {
            calendar: {
                header: {
                    left: ''
                },
                firstDay: 1, // 1:月曜日
                weekends: true,
                weekNumbers: false,
                contentHeight: 450,
                defaultView: 'agendaWeek',
                allDaySlot: false,
                axisFormat: 'H時',
                slotDuration: '00:30:00',
                snapDuration: '00:30:00',
                scrollTime: '09:00:00',
                minTime: '06:00:00',
                maxTime: '25:00:00',
                timeFormat: 'H(:mm)',
                columnFormat: {
                    week: "M/D ddd",
                },
                buttonText: {
                    prev:     '<', // <
                    next:     '>', // >
                    today:    '今日',
                    month:    '月',
                    week:     '週',
                    day:      '日'
                },
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
                selectable: true,
                select: function(start, end, event, view) {
                    $rootScope.selected = {
                        start: start,
                        end: end
                    };
                    $location.path('/select');
                },
                selectHelper: true,
                unselectAuto: true,
                unselectCancel: '',
            }
        };
    });

    // protoはcordova使わない
    // document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    //
    // function onDeviceReady() {
    //     // Handle the Cordova pause and resume events
    //     document.addEventListener( 'pause', onPause.bind( this ), false );
    //     document.addEventListener( 'resume', onResume.bind( this ), false );
    //
    //     // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    // };
    //
    // function onPause() {
    //     // TODO: This application has been suspended. Save application state here.
    // };
    //
    // function onResume() {
    //     // TODO: This application has been reactivated. Restore application state here.
    // };
} )();
