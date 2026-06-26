import { useState } from 'react'

export default function TicTacToc() {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array.from({ length: 9 }, () => null),
  ])
  const [arr, setArr] = useState<(string | null)[]>(Array.from({ length: 9 }, () => null))

  return (
    <div className="h-full flex gap-2 m-auto ">
      <Board history={history} setHistory={setHistory} arr={arr} setArr={setArr} />
      <GameHistory history={history} setHistory={setHistory} setArr={setArr} />
    </div>
  )
}

export function GameHistory({
  history,
  setHistory,
  setArr,
}: {
  history: (string | null)[][]
  setHistory: (arg0: (string | null)[][]) => void
  setArr: (arg0: (string | null)[]) => void
}) {
  function clickHistory(item: (string | null)[]) {
    setArr(item)
    const index = history.findIndex((v) => v === item)
    setHistory([...history].slice(0, index + 1))
  }

  return (
    <section className=" flex flex-col m-auto items-center min-w-30 ">
      <h3 className="pb-2 font-bold">History</h3>
      <div className="flex flex-col gap-1  overflow-auto">
        {history.map(
          (v, idx) =>
            idx !== 0 && (
              <button
                className="border w-30 rounded-sm text-sm py-1 font-light"
                onClick={() => clickHistory(v)}
                key={idx}
              >{`${idx}번째 스택`}</button>
            ),
        )}
      </div>
    </section>
  )
}

export function Board({
  history,
  setHistory,
  arr,
  setArr,
}: {
  history: (string | null)[][]
  setHistory: (arg0: (string | null)[][]) => void
  arr: (string | null)[]
  setArr: (arg0: (string | null)[]) => void
}) {
  const [isX, setIsX] = useState(false)
  const [curr, next] = isX ? ['X', 'O'] : ['O', 'X']

  function onSquareClick(i: number) {
    if (arr[i] || ValidationWinner(arr)) return
    const newArr = [...arr]
    newArr[i] = next
    setHistory([...history, newArr])

    setIsX((prev) => !prev)
    setArr(newArr)
  }

  return (
    <section className="m-auto">
      <p className="pb-2 font-bold text-center">
        {ValidationWinner(arr) ? `Winner : ${curr}` : `Next : ${next}`}
      </p>
      <div className="grid grid-cols-3">
        {arr.map((value, i) => (
          <Square key={i} value={value} onSquareClick={() => onSquareClick(i)} />
        ))}
      </div>
    </section>
  )
}

export function Square({
  value,
  onSquareClick,
}: {
  value: string | null
  onSquareClick: () => void
}) {
  return (
    <button className="border bordr size-25" onClick={onSquareClick}>
      {value}
    </button>
  )
}

export function ValidationWinner(arr: (string | null)[]) {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const [x, y, z] of lines) {
    if (arr[x] && arr[x] === arr[y] && arr[y] === arr[z]) {
      return arr[x]
    }
  }
}
