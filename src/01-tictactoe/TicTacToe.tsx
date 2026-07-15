import { useState } from 'react'

export default function TicTacToc() {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array.from({ length: 9 }, () => null),
  ])
  const [arr, setArr] = useState<(string | null)[]>(Array.from({ length: 9 }, () => null))

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start py-8">
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
    <section className="flex flex-col items-center min-w-30">
      <h3 className="pb-3 text-lg font-bold text-base-heading">History</h3>
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
        {history.map(
          (v, idx) =>
            idx !== 0 && (
              <button
                className="border border-base-border text-base-text hover:text-primary hover:border-primary w-28 rounded-md text-xs sm:text-sm py-1.5 font-medium transition-all"
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
    <section className="flex flex-col items-center">
      <p className="pb-4 text-lg font-bold text-base-heading text-center">
        {ValidationWinner(arr) ? `Winner : ${curr}` : `Next Player : ${next}`}
      </p>
      <div className="grid grid-cols-3 gap-1 bg-base-border/20 p-1 rounded-lg">
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
    <button
      className="border border-base-border/50 size-16 sm:size-20 flex items-center justify-center text-xl sm:text-2xl font-bold rounded bg-base-bg text-base-heading hover:bg-primary-bg/30 transition-colors cursor-pointer"
      onClick={onSquareClick}
    >
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
