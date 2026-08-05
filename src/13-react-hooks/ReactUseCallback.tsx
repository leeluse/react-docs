import CodeBlock from '../components/CodeBlock'
import { USECALLBACK_EXM1, USECALLBACK_EXM2 } from './exm'

export default function ReactUseCallback() {
  return (
    <section id="use-callback">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useCallback</h2>
      <p>• useMemo는 값을 기억하는 것이라면 useCallback은 인수로 넘겨 받은 콜백을 기억하는 것</p>
      <p>• 특정 함수를 새로 만들지 않고 재사용하는 것</p>
      <div className="flex gap-4">
        <div className="flex-1">
          <CodeBlock content={USECALLBACK_EXM1} />
        </div>
        <div>
          <h4 className="text-primary font-semibold pb-3">현재 코드의 문제점</h4>
          <code className="code-tag">memo</code>를 사용해 메모이제이션 했으나 App의 자식 컴포넌트
          전체가 렌더링됨
          <ul className="py-2">
            <li>
              ChildComponent에 <code className="code-tag">memo</code>로{' '}
              <span className="bg-emerald-400/10 p-1 rounded">name, value, onChange</span> 기억
              &rarr; 값이 변경되지 않았을 시에는 렌더링되지 않도록 유도
            </li>
            <li className="border-l-2 pl-3 mt-5 bg-pink-400/5 text-white">
              위 memo가 적용되지 않는 이유?
            </li>
            <p>
              state 값이 바뀌면서 App 컴포넌트 리렌더링 &rarr; 매번{' '}
              <code className="code-tag pink">onChange</code> 함수가 재생성
            </p>
          </ul>
          <ul className="flex-1 max-h-fit pl-2 text-sm bg-pink-400/20 rounded-lg my-4 py-3 border border-pink-400/50">
            <li>첫 번째 인수: 콜백 함수</li>
            <li>두 번째 인수: 의존하는 값의 배열</li>
          </ul>
          <p>* 수정 후 코드</p>
          <CodeBlock content={USECALLBACK_EXM2} />
        </div>
      </div>
    </section>
  )
}
