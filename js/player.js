let player = {
    simple: 'X',

    play: (target, callback) => {
        player.simple = game.activePlayer == 0 ? 'X' : 'O';
        $(target).text(player.simple);

        if(callback !== undefined) {
            callback();
        }
    },
};