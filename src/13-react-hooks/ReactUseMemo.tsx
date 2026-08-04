import { useEffect, useMemo, useRef, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { USEMEMO_EXM1, USEMEMO_EXM2 } from './exm'

export default function ReactUseMemo() {
  return (
    <section>
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useMemo</h2>
      <p>비용이 큰 연산에 대한 결과를 저장(메모이제이션) 해 두고 이 저장된 값을 반환하는 훅</p>
      <article className="flex justify-between">
        <CodeBlock content={USEMEMO_EXM1} />
        <ul className="flex-1 max-h-fit list-decimal ml-5 pl-6 text-sm bg-pink-400/20 rounded-lg py-3 border border-pink-400/50">
          <li>첫 번째 인수: 어떤 값을 반환하는 생성 함수</li>
          <li> 번째 인수: 해당 함수가 의존하는 값의 배열</li>
        </ul>
      </article>
      <p>
        • 렌더링 발생 시 의존성 배열의 값이 변경되지 않았으면? &rarr;{' '}
        <span className="text-white">이전 값 반환</span>
      </p>
      <p>
        • 렌더링 발생 시 의존성 배열의 값이 변경되었으면? &rarr;{' '}
        <span className="text-white">새로 연산해서 반환</span>
      </p>
      <article className="py-5">
        <h4 className="text-white font-bold">useMemo를 이용한 컴포넌트 메모이제이션</h4>
        <div className="flex gap-3">
          <CodeBlock content={USEMEMO_EXM2} />
          <ExampleComponent />
        </div>
        <p>
          triggerRendering으로 강제 렌더링을 일으켰으나 EmoizedComponent는 리렌더링되지 않는 것을
          확인
        </p>
      </article>
    </section>
  )
}

function ExampleComponent() {
  const [value, setValue] = useState(10)
  const [, triggerRendering] = useState(false)

  const appRenderCount = useRef(0)
  appRenderCount.current++

  const Memoization = useMemo(() => <Expensive value={value} />, [value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value) || 0)
  }

  function handleClick() {
    triggerRendering((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-5 py-3">
      <div className="flex gap-5 rounded w-fit">
        <input
          type="number"
          className="p-2 border-slate-400/20 focus:outline-none border rounded"
          value={value}
          onChange={handleChange}
        />
        <button onClick={handleClick} className="px-3 cursor-pointer bg-slate-600/10 rounded ">
          렌더링!
        </button>
      </div>
      <div className="p-3 bg-slate-700/30 border border-slate-600/60 rounded flex flex-col gap-2">
        <div className="flex justify-between gap-5">
          <span>출력 결과</span>
          <span>{value + 10000}</span>
        </div>
        <p className="text-xs text-slate-400">App 카운트 : {appRenderCount.current}</p>
      </div>
      <div>{Memoization}</div>
    </div>
  )
}

export function Expensive({ value }: { value: number }) {
  const childRenderCount = useRef(0)
  childRenderCount.current++

  useEffect(() => {
    console.log(value, '변경')
  }, [value])

  return (
    <div className="p-3 bg-slate-700/30 border border-slate-600/60 rounded flex flex-col gap-2">
      <div className="flex justify-between gap-5">
        <span>출력 결과</span>
        <span>{value + 10000}</span>
      </div>
      <p className="text-xs text-slate-400">Child 카운트 : {childRenderCount.current}</p>
    </div>
  )
}
