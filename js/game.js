let game = {
    activePlayer: 0,
    active: 1,
    playersMoves: {
        0: {},
        1: {},
    },
    playerType: 2,
    player1: 'Player One',
    player2: 'Player Two',
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

        game.gameSettingsModal = new bootstrap.Modal(document.getElementById('game-settings'), {});
        game.showGameSettings();
    },

    showGameSettings: () => {
        game.gameSettingsModal.show();
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

        $("input[name='playerType']").on('change', (e) => {
            let playerType = $("input[name='playerType']:checked").val();
            console.log(playerType)
            if(playerType == 2)
            {
                $(".computer-settings-form").addClass('d-none');
                $(".players-settings-form").removeClass('d-none');
            } else {
                $(".computer-settings-form").removeClass('d-none');
                $(".players-settings-form").addClass('d-none');
            }
        });
        
        $("#game-settings-done-btn").on('click', (e) => {
            let playerType = $("input[name='playerType']:checked").val();
            if(playerType == 2)
            {
                game.player1 = $("#player1_name").val();
                game.player2 = $("#player2_name").val();
            } else {
                game.player1 = $("#player_vs_computer_name").val();
                game.player2 = $("#computer_name").val();
            }
            $(".player.one > h2").text(game.player1);
            $(".player.two > h2").text(game.player2);

            game.gameSettingsModal.hide();
        });

    },
};


$(document).ready(() => {
    game.init();
});