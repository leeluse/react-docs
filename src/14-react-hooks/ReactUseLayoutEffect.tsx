import CodeBlock from '../components/CodeBlock'
import { USELAYOUTEFFECT_EXM1 } from './exm'

export default function ReactUseLayoutEffect() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <UseLayoutEffectHeader />
      </section>
    </div>
  )
}

export function UseLayoutEffectHeader() {
  return (
    <section id="use-imperative-handle">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useLayoutEffect</h2>
      <p className="flex gap-4 items-center pt-4">
        <code className="px-3 py-1 bg-primary/30 rounded text-white">useLayoutEffect</code>이 함수의
        시그니처는 useEffect와 동일하나 모든 DOM의 변경 후에 동기적으로 발생함
      </p>
      <div className="py-5 flex flex-col justify-between gap-2 sm:gap-6">
        <div className="flex-1">
          <CodeBlock content={USELAYOUTEFFECT_EXM1} />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <p className="font-bold text-base-heading mt-4 mb-1">• 예제 동작 순서</p>
            <ul className="list-decimal pl-8 py-4 text-sm rounded bg-primary/10 border border-primary/30">
              <li>리액트가 DOM을 업데이트</li>
              <li>
                <code>useLayoutEffect</code>를 실행
              </li>
              <li>브라우저에 변경 사항을 반영</li>
              <li>
                <code>useEffect</code>를 실행
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p className="border-l-2 border-primary/50 text-primary pl-4 mb-3">
              모든 DOM의 변경 후 useLayoutEffect의 콜백 함수 실행이 동기적으로 발생하는 것
            </p>
            <span>
              • <code className="text-white">useLayoutEffect</code>: 브라우저에 변경 사항이 반영되기
              전 실행 &rarr; 콜백 종료 후 렌더링으로 성능 문제 가능성
            </span>
            <span>
              • <code className="text-white">useEffect</code>: 브라우저에 변경 사항이 반영된 후 실행
            </span>
          </div>
        </div>
      </div>
      <p className="font-bold text-base-heading pb-2 py-5">
        useLayoutEffect를 언제 사용하는 것이 좋을까?
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <span>DOM 계산은 됐지만 이것이 화면에 반영되기 전 하고 싶은 작업이 있을 경우</span>
        <div className="flex gap-4">
          <span className="bg-pink-400/20 px-3 rounded text-white text-sm py-1">
            DOM 요소를 기반으로 한 애니메이션
          </span>
          <span className="bg-pink-400/20 px-3 rounded text-white text-sm py-1">
            스크롤 위치 제어
          </span>
        </div>
      </div>
    </section>
  )
}
