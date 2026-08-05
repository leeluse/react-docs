import CodeBlock from '../components/CodeBlock'
import { USEREF_EXM1, USEREF_EXM2, USEREF_EXM3, USEREF_EXM4 } from './exm'

export default function ReactUseRef() {
  return (
    <section>
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useRef</h2>
      <p>• useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장</p>
      <p>
        • 반환값인 객체 내부에 있는 <code className="code-tag">current</code>를 사용해 값을 변경
        &rarr; 그 값이 변하더라도 렌더링을 발생시키지 않음
      </p>
      <CodeBlock content={USEREF_EXM1} />

      <article>
        <div className="my-5">
          <h4 className="font-bold text-white">useRef가 왜 필요할까?</h4>
          <div className="flex gap-4">
            <CodeBlock content={USEREF_EXM2} />
            <div className="flex-1">
              <p className="border p-2 my-2 rounded bg-slate-600/10 border-slate-700/50 flex-1 h-fit">
                렌더링에 영향을 미치지 않는 고정된 값을 관리하기 위해 <code>useRef</code>를
                사용한다면 <code>useRef</code>를 사용하지 않고 함수 외부에서 값을 선언해서 관리하는
                것도 동일하지 않을까?
              </p>
              <p className="py-3">
                1. 컴포넌트가 실행되어 렌더링되지 않았어도{' '}
                <code className="bg-slate-400/20 p-1 rounded text-amber-200">value</code>
                라는 값이 기본적으로 존재함(메모리에 불필요한 값을 갖게 한다)
              </p>
              <p>
                2. 컴포넌트가 여러 번 생성된다면 각 컴포넌트에서 가리키는 값이 모두{' '}
                <code className="bg-slate-400/20 p-1 rounded text-amber-200">value</code>로 동일해짐
              </p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h4 className="font-bold text-white">useRef 사용 예시</h4>
          <div className="flex gap-4">
            <CodeBlock content={USEREF_EXM3} />
            <div className="flex-1">
              <ul className="flex-1 max-h-fit pl-2 text-sm bg-pink-400/20 rounded-lg my-4 py-3 border border-pink-400/50">
                <li>1. DOM에 직접 접근하려고 하는 경우</li>
                <li>2. 리렌더링 시 값이 영향을 끼치면 안 되는 경우</li>
              </ul>
              <p className="text-white text-sm my-4">
                useRef의 최초값은 return에 DOM이 렌더링되기 전! &rarr;{' '}
                <span className="border-b">undefined 반환</span>
              </p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h4 className="font-bold text-white">useRef를 사용한 usePrevious 구현</h4>
          <CodeBlock content={USEREF_EXM4} />
        </div>
      </article>
    </section>
  )
}
