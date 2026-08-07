import { useDebugValue, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { USEDEBUGVALUE_EXM1, USEDEBUGVALUE_EXM2 } from './exm'

export default function ReactUseDebugValue() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <UseDebugValueHeader />
      </section>
    </div>
  )
}

export function UseDebugValueHeader() {
  return (
    <section id="use-debug-value">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useDebugValue</h2>
      <p className="flex gap-4 items-center pt-4">
        <code className="px-3 py-1 bg-primary/30 rounded text-white">useDebugValue</code>는 리액트
        어플리케이션을 개발할 때 디버깅하려는 정보를 훅에 사용해 개발자 도구에서 볼 수 있도록 한다
      </p>
      <div>
        <CodeBlock content={USEDEBUGVALUE_EXM1} />
      </div>
      <div>
        <CodeBlock content={USEDEBUGVALUE_EXM2} />
      </div>
      <Example />
      <p>리액트 개발자 도구 내에서 Components 영역 &rarr; hooks에서 확인 가능</p>
    </section>
  )
}

function useDate() {
  const date = new Date()

  useDebugValue(date, (date) => '현재 시간: ' + date.toISOString())
  return date
}

export function Example() {
  const date = useDate()
  const [counter, setCounter] = useState(0)

  function handleClick() {
    setCounter((prev) => prev + 1)
  }

  return (
    <div className="flex items-stretch rounded-lg border border-base-border/60 bg-code-bg/30 overflow-hidden max-w-md my-4 dark:border-zinc-800/80">
      <div className="flex items-center px-4 py-2 bg-white/20 dark:bg-zinc-950/20 font-bold text-primary border-r border-base-border/50 dark:border-zinc-800/80">
        {counter}
      </div>
      <div className="flex-1 flex items-center px-4 py-2 font-mono text-xs text-base-text select-all">
        {date.toISOString()}
      </div>
      <button
        onClick={handleClick}
        className="px-5 bg-primary hover:bg-primary/90 text-white font-bold transition-colors cursor-pointer border-none flex items-center justify-center"
      >
        +
      </button>
    </div>
  )
}
