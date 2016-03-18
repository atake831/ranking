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
