let game = {
    activePlayer: 0,
    active: 1,
    playersMoves: {
        0: {},
        1: {},
    },
    winningMaps: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    init: () => {
        game.resetBoard();

        game.applyActions();
    },

    resetBoard: () => {
        $(".box").text('');
        game.activePlayer = 0;
        $(".player.one .status").text('.');
    },

    storeMove: (moveIndex) => {
        game.playersMoves[game.activePlayer][moveIndex] = moveIndex;
    },

    switchPlayers: () => {
        game.activePlayer = game.activePlayer == 0 ? 1 : 0;
        $(".player .status").text('');
        $(".player."+ (game.activePlayer == 0 ? 'one' : 'two') +" .status").text('.');
    },

    checkWinner: () => {
        let activePlayerMoves = game.playersMoves[game.activePlayer];
        let winFlag = false;
        game.winningMaps.forEach(map => {
            if(map[0] == activePlayerMoves[map[0]] && map[1] == activePlayerMoves[map[1]] && map[2] == activePlayerMoves[map[2]])
            {
                winFlag = true;
            }
        });
        return winFlag;
    },

    announcePlayer: () => {
        if (!$(".win_flag").length) {
            $(".player."+ (game.activePlayer == 0 ? 'one' : 'two')).append('<span class="win_flag d-block">Winner</span>');
        }
        game.active = 0;
    },

    applyActions: () => {
        $(".box").on("click", (e) => {
            let target = e.target;
            if($(target).text() || !game.active) {
                return false;
            }

            player.play(target, () => {
                let moveIndex = $(target).index();
                game.storeMove(moveIndex);
                
                if(!game.checkWinner())
                {
                    game.switchPlayers();
                } else {
                    game.announcePlayer();
                }
            });
        });

    },
};


$(document).ready(() => {
    game.init();
});