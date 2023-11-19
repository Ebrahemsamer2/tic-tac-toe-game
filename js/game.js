let game = {
    activePlayer: 0,

    init: () => {
        game.resetBoard();

        game.applyActions();
    },

    resetBoard: () => {
        $(".box").text('');
        game.activePlayer = 0;
        $(".player.one .status").text('.');
    },

    applyActions: () => {
        $(".box").on("click", (e) => {
            let target = e.target;
            if($(target).text()) {
                return false;
            }

            player.play(target, () => {
                game.activePlayer = game.activePlayer == 0 ? 1 : 0;
                $(".player .status").text('');
                $(".player."+ (game.activePlayer == 0 ? 'one' : 'two') +" .status").text('.');
            });
        });
    },
};


$(document).ready(() => {
    game.init();
});