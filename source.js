const player = (name, sign, turn) => {
    const _playerName = name;
    const _playerSign = sign;
    let _playerTurn = turn;
    const play = (index, playerSign) => {
        gameBoard.setBoard(index, playerSign);
    }
    const playTurn = () => {
        return _playerTurn;
    }

    const playSign = () => {
        return _playerSign;
    }

    const setTurn = () => {
        _playerTurn = !_playerTurn;
    }

    const playerName = () => {
        return _playerName;
    }
    return {
        play,
        playTurn,
        playSign,
        setTurn,
        playerName
    };
}

const gameBoard = (() => {
    let _board = new Array(9);
    const fields = document.querySelectorAll(".field");
    const title = document.querySelector('.title');
    const winMsg = document.createElement('h3');

    const getBoard = (index) => _board[index];
    const setBoard = (index, sign) => {
        _board[index] = sign;
    }
    const prepareField = (field, _player, _playerNext, e) => {
        _board[e.target.id] = _player.playSign();
        field.textContent = _player.playSign();
        field.style.color = 'white';
        //set player turns
        _player.setTurn();
        _playerNext.setTurn();
        //check end game condition
        if (checkWin(_player.playSign())){
            popUpMsg(_player.playerName());
        }

    }
    const prepareBoard = (_player1, _player2) => {
        fields.forEach(field => {
            field.addEventListener('click', (e) => {
                if(_player1.playTurn() == true && e.target.textContent == ''){
                    prepareField(field, _player1, _player2, e);
                } else if (_player2.playTurn() == true && e.target.textContent == ''){
                    prepareField(field, _player2, _player1, e);
                } else {
                    return;
                }
            })
        });
    }
    const checkWin = (sign) => {
        if (_board[0] === sign && _board[1] === sign && _board[2] === sign
            || _board[3] === sign && _board[4] === sign && _board[5] === sign
            || _board[6] === sign && _board[7] === sign && _board[8] === sign
            || _board[0] === sign && _board[3] === sign && _board[6] === sign
            || _board[1] === sign && _board[4] === sign && _board[7] === sign
            || _board[2] === sign && _board[5] === sign && _board[8] === sign
            || _board[0] === sign && _board[4] === sign && _board[8] === sign
            || _board[2] === sign && _board[4] === sign && _board[6] === sign){
                return true;
        } else{
            return false;
        }
    }
    const popUpMsg = (winName) => {
        const modal = document.querySelector(".modal");
        console.log(modal);
        const closeButton = document.querySelector(".close-button");
        modal.classList.add('show-modal');
        console.log(modal);
        closeButton.addEventListener("click", () => {
            modal.classList.remove('show-modal');
        });
        window.addEventListener("click", (e) => {
            if (e.target === modal){
                modal.classList.remove('show-modal');
            }
        })
        const winMsg = document.querySelector("h1");
        winMsg.textContent = `${winName} is the Winner!`;
        restart();
    }
    const restart = () => {
        _board = new Array(9);
        fields.forEach(field => {
            field.textContent = '';
        })
    }
    return {
        setBoard,
        getBoard,
        prepareBoard
    };
})();

const gameController = (() => {
    let player1 = player("temp1", "X", true);
    let player2 = player("temp2", "O", false);
    gameBoard.prepareBoard(player1, player2);
})();

