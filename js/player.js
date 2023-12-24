let player = {
    simple: 'X',

    play: (target, callback) => {
        player.playProcess(target);
        if(callback !== undefined) {
            callback();
        }
    },

    generateComputerMove: () => {
        const randomIndex = Math.floor(Math.random() * 9);
        const indexBox = $(".box:nth-child("+ (randomIndex + 1) +")").text();

        return indexBox.trim() == '' ? randomIndex : player.generateComputerMove();
    },

    playAsComputer: (callback) => {
        let index = player.generateComputerMove();
        let target = ".box:nth-child("+ (index + 1) +")";
        player.playProcess(target);
        
        if(callback !== undefined) {
            callback();
        }
    },

    playProcess: (target) => {
        player.simple = game.activePlayer == 0 ? 'X' : 'O';
        $(target).text(player.simple);
        let moveIndex = $(target).index();
        game.storeMove(moveIndex);
        if(!game.checkWinner())
        {
            game.switchPlayers();
        } else {
            game.announcePlayer();
        }
    }
};