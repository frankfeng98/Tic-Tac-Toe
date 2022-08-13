const player = (name, sign, turn) => {
    let _playerName = name;
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

    const setName = (name) => {
        _playerName = name;
    }

    const playerName = () => {
        return _playerName;
    }
    return {
        play,
        playTurn,
        playSign,
        setTurn,
        playerName,
        setName
    };
}

const gameBoard = (() => {
    let _board = new Array(9);
    const fields = document.querySelectorAll(".field");
    const title = document.querySelector('.title');
    const winMsg = document.createElement('h3');
    const restartElement = document.querySelector('.restart');
    const modal_restart = document.querySelector(".modal-restart");
    const modal_start = document.querySelector(".modal-start");
    const start = document.querySelector(".start-name");

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
        if (checkDraw()){
            popUpMsg("Everyone");
        }

    }
    const checkDraw = () => {
        let temp = 0;
        _board.forEach(field => {
            if (field === 'O' || field === 'X'){
                temp++;
            }
        })
        return temp === 9;
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
        restartElement.addEventListener('click', restart);
        start.addEventListener('click', () => {
            enterName(_player1, _player2);
        })
    }

    const enterName = (_player1, _player2) => {
        const start = document.querySelector(".start-game");

        modal_start.classList.add('show-modal');
        window.addEventListener("click", (e) => {
            if (e.target === modal_start){
                modal_start.classList.remove('show-modal');
                showName(_player1, _player2);
            }
        })

        start.addEventListener('click', () => {
            modal_start.classList.remove('show-modal');
            showName(_player1, _player2);
        })
    }

    const showName = (_player1, _player2) => {
        const left = document.querySelector(".left");
        const right = document.querySelector(".right");
        const player1_name = document.querySelector("#player1").value;
        const player2_name = document.querySelector("#player2").value;
        left.textContent = player1_name;
        right.textContent = player2_name;
        _player1.setName(player1_name);
        _player2.setName(player2_name);
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
        const closeButton = document.querySelector(".close-button");
        modal_restart.classList.add('show-modal');
        window.addEventListener("click", (e) => {
            if (e.target === modal_restart){
                modal_restart.classList.remove('show-modal');
                restart();
            }
        })
        const winMsg = document.querySelector("h1");
        winMsg.textContent = `${winName} is the Winner!`;
    }
    const restart = () => {
        _board = new Array(9);
        fields.forEach(field => {
            field.textContent = '';
        })
        modal_restart.classList.remove('show-modal');
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

