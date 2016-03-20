const Src = (function() {
    return {
        PLAYERS: [
             { id: 1,  name: "竹口 輝", rank: 1, point: 10000, age: 26, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c0.120.331.331/s320x320/185331_108322522601186_1272144_n.jpg?oh=6cf3f0c19ab79185db3b1eb8a0751d0b&oe=57936893" },
             { id: 2,  name: "MARIA JOSE SANCHEZ ALAYETO", rank: 1, point: 10000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 3,  name: "FERNANDO BELASTEGUIN", rank: 2, point: 8000, age: 36, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 4,  name: "MARIA PILAR SANCHEZ ALAYETO", rank: 2, point: 8000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 5,  name: "PABLO LIMA", rank: 3, point: 6000, age: 32, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 6,  name: "ALEJANDRA SALAZAR BENGOECHEA", rank: 3, point: 6000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 7,  name: "FRANCISCO NAVARRO COMPAN", rank: 4, point: 4000, age: 28, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 8,  name: "MARTA MARRERO MARRERO", rank: 4, point: 4000, age: 23, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 9,  name: "MATIAS DIAZ SANGIORGIO", rank: 5, point: 2000, age: 24, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 10,  name: "ELISABETH AMATRIAIN ARMAS", rank: 5, point: 2000, age: 25, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 11,  name: "CARLOS DANIEL GUTIERREZ", rank: 6, point: 1000, age: 20, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 12,  name: "PATRICIA LLAGUNO ZIELINSKI", rank: 6, point: 1000, age: 33, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 13,  name: "JUAN MIERES PETRUF", rank: 7, point: 800, age: 24, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 14,  name: "CATALINA TENORIO", rank: 7, point: 800, age: 24, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
             { id: 15,  name: "MAXIMILIANO SANCHEZ", rank: 8, point: 500, age: 20, sex: 1, image: "https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c94.0.320.320/p320x320/10354686_10150004552801856_220367501106153455_n.jpg?oh=387283eef5f81b2a337459cdf366ac6f&oe=57978DDE"},
             { id: 16,  name: "CECILIA REITER", rank: 8, point: 500, age: 19, sex: 2, image: "https://scontent.xx.fbcdn.net/hprofile-xla1/v/t1.0-1/c94.0.320.320/p320x320/1379841_10150004552801901_469209496895221757_n.jpg?oh=052b1386484925c65d535ea215a96479&oe=57808AA7" },
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
