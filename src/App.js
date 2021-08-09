import React, { useEffect, useState } from 'react';
import SquareComponent from "./modules/SquareComponent";
import swal from 'sweetalert';



const clearState = ["", "", "", "", "", "", "", "",];



function App() {
    const [gameState, updateGameState] = useState(clearState)
    const [isXChance, updateIsXChance] = useState(false)
    const [Reset, updateReset] = useState(true)
    const [XName, updateXName] = useState("")
    const [OName, updateOName] = useState("")


    const onUserClicked = (index) => {
        let strings = Array.from(gameState);
        if (strings[index])
            return;
        strings[index] = isXChance ? "X" : "0";
        updateIsXChance(!isXChance);
        updateGameState(strings);
    }

    const clearGame = () => {
        updateGameState(clearState);
        updateReset(!Reset);
        updateOName("")
    }
    useEffect(() => {
        swal({
            title: 'Are you sure want to start New \n \n\nTic Tac Toe Game?',
            // buttons: ["Yes", "No"],
            buttons: {
                // cancel: "No",
                No : true,
                Yes: true,
              },
        }).then((value) => {
            switch (value) {
                case "Yes":
                    swal("Enter X Player Name: ", {
                        content: "input",
                    }).then((Xresult) => {
                        if (Xresult) {
                            updateXName(Xresult);
                            console.log("XResult: " + XName);
                        }
                    }).then(() => {
                        swal("Enter X Player Name: ", {
                            content: "input",
                        }).then((Oresult) => {
                            if (Oresult) {
                                updateOName(Oresult);
                                console.log("Oresult: " + OName);
                            }
                        })
                    })
                  break;
             
                case "No":
                //   swal("Gotcha!", "Pikachu was caught!", "success");
                  break;
             
              }
        });

    }, [Reset])


    useEffect(() => {
        let winner = checkWinner();
        if (winner) {
            console.log(winner, XName, OName)
            if (winner === 'X') {
                swal("Good job!", ` ${XName} won the Game !`, "success").then(()=>{clearGame()});
            }
            if (winner === '0') {
                swal("Good job!", ` ${OName} won the Game !`, "success").then(()=>{clearGame()});
            }
        }
    }, [gameState])
    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        console.log('Class: App, Function: checkWinner ==', gameState[0], gameState[1], gameState[2]);
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }

    return (
        <div class="frist">
        <div className={(OName ? "app-header" : "Hide")} >
            <p className="heading-text">React Tic Tac Toe - 2020</p> 
            <p className="fc-aqua fw-600"> X player is {XName} and 0 Player is {OName}</p>
            <div className="row jc-center">
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(0)} state={gameState[0]} />
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(1)} state={gameState[1]} />
                <SquareComponent className="b-bottom" onClick={() => onUserClicked(2)} state={gameState[2]} />
            </div>
            <div className="row jc-center">
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(3)} state={gameState[3]} />
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(4)} state={gameState[4]} />
                <SquareComponent className="b-bottom" onClick={() => onUserClicked(5)} state={gameState[5]} />
            </div>
            <div className="row jc-center">
                <SquareComponent className="b-right" onClick={() => onUserClicked(6)} state={gameState[6]} />
                <SquareComponent className="b-right" onClick={() => onUserClicked(7)} state={gameState[7]} />
                <SquareComponent onClick={() => onUserClicked(8)} state={gameState[8]} />
            </div>
            <button className="clear-button" onClick={clearGame}>Clear Game</button>
        </div>
        </div>

    );
}

export default App;
