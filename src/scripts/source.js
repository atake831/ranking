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
