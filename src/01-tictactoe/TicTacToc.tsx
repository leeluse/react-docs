import { useState } from 'react'


export default function TicTacToc() {
    const [history, setHistory] = useState([Array.from({ length: 9 }, () => null)])
    const [arr, setArr] = useState(Array.from({ length: 9 }, () => null));

    return (
        <div className='flex'>
            <Board history={history} setHistory={setHistory} arr={arr} setArr={setArr} />
            <GameHistory history={history} setArr={setArr} />
        </div>
    )
}

export function GameHistory({ history, setArr }: { history: string[][], setArr: (arg0: string[]) => void }) {
    function clickHistory(item) {
        setArr(item)
    }

    return (
        <section>
            <p className='status'>History</p>
            <div className='game-history'>
                {history.map((v, idx) => idx !== 0 && (
                    <button onClick={() => clickHistory(v)} key={idx}>{`${idx} 번째 스택`}</button>
                ))}
            </div>
        </section>
    )
}


export function Board({ history, setHistory, arr, setArr }:
    { history: string[][], setHistory: (arg0: string[][]) => void, arr: string[], setArr: (arg0: string[]) => void }) {
    const [isX, setIsX] = useState(false);
    const [curr, next] = isX ? ["X", "O"] : ["O", "X"];

    function onSquareClick(i: number) {
        if (arr[i] || ValidationWinner(arr)) return;
        const newArr = [...arr];
        newArr[i] = next;
        setHistory([...history, newArr])


        setIsX(prev => !prev);
        setArr(newArr);
    }

    return (
        <section>
            <p className='status'>{ValidationWinner(arr) ? `Winner : ${curr}` : `Next : ${next}`}</p>
            <div className='board-row'>
                {arr.map((value, i) => (
                    <Square key={i} value={value} onSquareClick={() => onSquareClick(i)} />
                ))}
            </div>
        </section>
    )
}



export function Square({ value, onSquareClick }: { value: string, onSquareClick: () => void }) {
    return (
        <button className='square' onClick={onSquareClick}>{value}</button>
    )
}


export function ValidationWinner(arr: string[]) {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const [x, y, z] of lines) {
        if (arr[x] && arr[x] === arr[y] && arr[y] === arr[z]) {
            return arr[x]
        }
    }

}