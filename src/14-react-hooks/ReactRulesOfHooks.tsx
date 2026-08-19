import CodeBlock from '../components/CodeBlock'
import {
  RULES_EXM,
  RULES_EXM2,
  RULES_EXM3,
  RULES_EXM4,
  RULES_EXM5,
  RULES_EXM6,
  RULES_EXM7,
  CONTEXT_PERF_USECONTEXT_JSX,
  CONTEXT_PERF_USECONTEXT_TSX,
  CONTEXT_PERF_USEMEMO_JSX,
  CONTEXT_PERF_USECALLBACK_JSX,
  CONTEXT_PERF_REACTMEMO_JSX,
  CONCURRENT_USE_TRANSITION_JSX,
  CONCURRENT_USE_DEFERRED_VALUE_JSX,
  NEW_HOOKS_USE_ACTION_STATE_JSX,
  NEW_HOOKS_USE_FORM_STATUS_JSX,
  NEW_HOOKS_USE_OPTIMISTIC_JSX,
  USEID,
  USE_SYNC_IMPERATIVE,
  NEW_HOOKS_USE_JSX,
} from './exm'

export default function ReactRulesOfHooks() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # Hook 심화
        </h1>

        {/* Hooks의 2가지 규칙 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Hooks의 2가지 규칙</h2>
          <div className="border rounded py-4 px-4 text-white border-primary/30 bg-primary-bg/20">
            <p className="font-semibold">• 훅은 최상위에서만 호출한다</p>
            <p className="font-semibold">• 훅은 React 함수 안에서만 호출한다</p>
            <span className="text-sm pl-2 text-slate-400 block mt-1">
              해당 규칙 덕분에 React는 호출 순서로 각 훅의 상태를 추적할 수 있다
            </span>
            <CodeBlock content={RULES_EXM} />
          </div>
        </div>

        {/* SECTION 1: Hooks 완전정복 ① 상태와 참조 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-black text-primary border-b border-primary/20 pb-2 mb-4">
            Hooks 완전정복 ① 상태와 참조
          </h2>

          <UseStateRules />
          <UseReducerRules />
          <UseRefRules />
        </div>

        {/* Divider */}
        <hr className="border-base-border/20 my-4" />

        {/* SECTION 2: Hooks 완전정복 ② 컨텍스트와 성능 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-black text-primary border-b border-primary/20 pb-2 mb-4">
            Hooks 완전정복 ② 컨텍스트와 성능
          </h2>

          <p className="text-sm sm:text-base leading-relaxed">
            prop을 여러 단계로 내려보내는 번거로움(prop drilling)을{' '}
            <code className="code-tag pink">useContext</code>로 해결하고, 불필요한 재계산·재렌더를{' '}
            <code className="code-tag">useMemo</code>, <code className="code-tag">useCallback</code>
            , <code className="code-tag">React.memo</code>로 최적화하는 법을 배웁니다.
          </p>

          {/* useContext Section */}
          <section id="use-context" className="flex flex-col gap-4 pt-2">
            <h3 className="font-bold text-lg sm:text-xl text-white">useContext — 전역적 값 공유</h3>
            <p className="leading-relaxed">
              Context는 트리 깊숙이 값을 전달할 때 중간 컴포넌트를 거치지 않고 바로 꽂아 줍니다.
              테마, 로그인 사용자, 언어 설정 등에 적합합니다.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
              <div>
                <span className="text-xs font-bold text-primary-heading block mb-1">
                  JSX Example
                </span>
                <CodeBlock content={CONTEXT_PERF_USECONTEXT_JSX} />
              </div>
              <div>
                <span className="text-xs font-bold text-primary-heading block mb-1">
                  TSX Example
                </span>
                <CodeBlock content={CONTEXT_PERF_USECONTEXT_TSX} />
                <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-sm">
                  <span className="font-bold block mb-1">💡 React 18 이하와 React 19의 차이</span>
                  React 19부터는 <code className="text-white">{`<ThemeContext>`}</code> 자체를
                  Provider로 사용할 수 있습니다. 이전 버전에서는{' '}
                  <code className="text-white">{`<ThemeContext.Provider value={theme}>`}</code>{' '}
                  형태로 사용해야 했습니다.
                </div>
              </div>
            </div>

            {/* Warning Alert */}
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex flex-col gap-2 mt-4 text-red-200">
              <span className="font-bold text-base flex items-center gap-1">
                ⚠️ Context와 리렌더링 주의점
              </span>
              <p className="text-sm leading-relaxed">
                Provider의 <code className="text-white font-semibold">value</code>가 바뀌면 그 값을
                <code className="text-white font-semibold mx-1">useContext</code>로 구독하는 모든
                컴포넌트가 리렌더됩니다. 값에 객체를 넣을 때는{' '}
                <code className="text-white font-semibold">useMemo</code>로 감싸고, 자주 바뀌는 값과
                거의 안 바뀌는 값은 Context를 분리하여 설계하세요.
              </p>
            </div>
          </section>

          {/* useMemo Section */}
          <section
            id="use-memo"
            className="flex flex-col gap-4 border-t border-base-border/20 pt-6"
          >
            <h3 className="font-bold text-lg sm:text-xl text-white">useMemo — 값 메모이제이션</h3>
            <p className="leading-relaxed">
              비싼 계산 결과를 의존성 배열의 값들이 바뀔 때만 다시 계산하도록
              캐싱(메모이제이션)합니다.
            </p>
            <CodeBlock content={CONTEXT_PERF_USEMEMO_JSX} />
          </section>

          {/* useCallback Section */}
          <section
            id="use-callback"
            className="flex flex-col gap-4 border-t border-base-border/20 pt-6"
          >
            <h3 className="font-bold text-lg sm:text-xl text-white">
              useCallback — 함수 메모이제이션
            </h3>
            <p className="leading-relaxed">
              함수는 매 렌더마다 새로 만들어집니다. 메모된 자식(
              <code className="code-tag pink">React.memo</code>)에 콜백을 넘기거나, 다른 훅의
              의존성으로 쓸 때 함수 정체성(참조 값)을 유지하려면{' '}
              <code className="code-tag">useCallback</code>을 사용합니다.
            </p>
            <CodeBlock content={CONTEXT_PERF_USECALLBACK_JSX} />
          </section>

          {/* React.memo Section */}
          <section
            id="react-memo"
            className="flex flex-col gap-4 border-t border-base-border/20 pt-6"
          >
            <h3 className="font-bold text-lg sm:text-xl text-white">
              React.memo — 컴포넌트 메모이제이션
            </h3>
            <p className="leading-relaxed">
              props가 바뀌지 않으면 컴포넌트의 재렌더링을 건너뜁니다. 전달되는 콜백 함수가 매번
              새로운 참조라면 <code className="code-tag pink">memo</code>가 무의미하므로, 반드시{' '}
              <code className="code-tag">useCallback</code> /{' '}
              <code className="code-tag">useMemo</code>와 짝을 이뤄 사용해야 효과가 납니다.
            </p>
            <CodeBlock content={CONTEXT_PERF_REACTMEMO_JSX} />
          </section>

          {/* Premature Optimization Alert */}
          <div className="bg-sky-500/10 border border-sky-500/30 p-4 rounded-lg flex flex-col gap-2 mt-4 text-sky-200">
            <span className="font-bold text-base flex items-center gap-1">
              💡 섣부른 최적화 주의
            </span>
            <p className="text-sm leading-relaxed">
              <code className="text-white">memo</code>, <code className="text-white">useMemo</code>,
              <code className="text-white">useCallback</code>도 각각 비용(메모리 할당 및 비교
              연산)이 따릅니다. 먼저 프로파일러를 통해 성능을 측정하고, 실제 병목이 발생하는 곳에만
              선택적으로 적용하세요.
            </p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              * React 19의 React Compiler(React Forget)는 이러한 수동 최적화를 상당 부분
              자동화하므로, 앞으로는 개발자가 직접 훅으로 감싸는 수작업이 줄어들 예정입니다.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-base-border/20 my-4" />

        {/* SECTION 3: Hooks 완전정복 ③ 동시성과 신규 훅 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-black text-primary border-b border-primary/20 pb-2 mb-4">
            Hooks 완전정복 ③ 동시성과 신규 훅
          </h2>

          <p className="text-sm sm:text-base leading-relaxed">
            React 18의 동시성(Concurrent) 훅과 React 19에서 추가된 폼·비동기 관련 훅을 정리합니다.
            무거운 UI의 반응성을 지키고, 폼 제출을 간결하게 만드는 도구들입니다.
          </p>

          {/* Concurrency Hooks */}
          <div className="flex flex-col gap-4 border-t border-base-border/20 pt-6">
            <h3 className="font-bold text-lg sm:text-xl text-white">
              1. React 18 동시성(Concurrency) 훅
            </h3>
            <p className="text-sm leading-relaxed">
              긴 렌더링 작업으로 인해 메인 스레드가 막혀 사용자 입력에 반응하지 못하는 문제를
              해결하기 위해 도입되었습니다.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div>
                <span className="font-semibold text-base-heading block mb-1">• useTransition</span>
                <p className="text-sm text-slate-400 mb-2">
                  큰 목록 갱신처럼 무거운 업데이트를 "전환"으로 표시하면, React가 그 작업 때문에
                  입력 같은 급한 업데이트가 막히지 않게 됩니다.
                </p>
                <CodeBlock content={CONCURRENT_USE_TRANSITION_JSX} />
              </div>
              <div className="border-t border-base-border/10 pt-4 mt-2">
                <span className="font-semibold text-base-heading block mb-1">
                  • useDeferredValue
                </span>
                <p className="text-sm text-slate-400 mb-2">
                  빠르게 바뀌는 값의 "한 박자 늦은" 버전을 만들어 무거운 렌더를 미룹니다.
                </p>
                <CodeBlock content={CONCURRENT_USE_DEFERRED_VALUE_JSX} />
              </div>
              <div className="border-t border-base-border/10 pt-4 mt-2">
                <span className="font-semibold text-base-heading block mb-1">• useId</span>
                <p className="text-sm text-slate-400 mb-2">
                  SSR에서도 서버/클라이언트가 일치하는 안정적인 고유 id를 만듭니다.
                </p>
                <CodeBlock content={USEID} />
              </div>
              <div className="border-t border-base-border/10 pt-4 mt-2">
                <span className="font-semibold text-base-heading block mb-1">
                  • useSyncExternalStore / useImperativeHandle
                </span>
                <p className="text-sm text-slate-400 mb-2">
                  useSyncExternalStore는 외부 스토어(상태관리 라이브러리, 브라우저 API)를 안전하게
                  구독합니다
                </p>
                <p className="text-sm text-slate-400 mb-2">
                  useImperativeHandle은 ref로 노출할 메서드를 직접 정의할 때 씁니다(focus(),
                  scrollTo()만 노출)
                </p>
                <CodeBlock content={USE_SYNC_IMPERATIVE} />
              </div>
            </div>
          </div>

          {/* React 19 Form Hooks */}
          <div className="flex flex-col gap-4 border-t border-base-border/20 pt-6">
            <h3 className="font-bold text-lg sm:text-xl text-white">
              2. React 19 폼(Form) 및 비동기 관련 훅
            </h3>
            <p className="text-sm leading-relaxed">
              비동기 작업이 얽힌 폼 상태 업데이트를 직관적이고 간편하게 관리하기 위한 강력한
              기능들입니다.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div>
                <span className="font-semibold text-base-heading block mb-1">• use</span>
                <p className="text-sm text-slate-400 mb-2">
                  렌더 중 Promise나 Context를 읽습니다. Promise가 끝날 때까지 Suspense로 대기합니다.
                  (다룬 훅과 달리 조건문 안에서도 호출 가능)
                </p>
                <CodeBlock content={NEW_HOOKS_USE_JSX} />
              </div>

              <div>
                <span className="font-semibold text-base-heading block mb-1">
                  • useActionState (이전 useFormState)
                </span>
                <p className="text-sm text-slate-400 mb-2">
                  비동기 액션(Form Action)의 제출 결과와 진행 상태(
                  <code className="text-white">isPending</code>)를 함께 얻을 때 사용합니다.
                </p>
                <CodeBlock content={NEW_HOOKS_USE_ACTION_STATE_JSX} />
              </div>

              <div className="border-t border-base-border/10 pt-4 mt-2">
                <span className="font-semibold text-base-heading block mb-1">• useFormStatus</span>
                <p className="text-sm text-slate-400 mb-2">
                  {`자식 컴포넌트가 부모 <form> 의 제출 상태를 읽습니다(prop 전달 없이)`}
                </p>
                <CodeBlock content={NEW_HOOKS_USE_FORM_STATUS_JSX} />
              </div>

              <div className="border-t border-base-border/10 pt-4 mt-2">
                <span className="font-semibold text-base-heading block mb-1">• useOptimistic</span>
                <p className="text-sm text-slate-400 mb-2">
                  서버 응답을 기다리는 동안 UI를 미리 낙관적으로 갱신합니다
                </p>
                <CodeBlock content={NEW_HOOKS_USE_OPTIMISTIC_JSX} />
              </div>
            </div>

            {/* Info Alert: Next.js Server Actions */}
            <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-lg flex flex-col gap-2 mt-4 text-indigo-200">
              <span className="font-bold text-base flex items-center gap-1">
                ℹ️ 이 훅들은 어디서 빛날까
              </span>
              <p className="text-sm leading-relaxed">
                <code className="text-white">useActionState</code> ·{' '}
                <code className="text-white">useFormStatus</code> ·{' '}
                <code className="text-white">useOptimistic</code>는 Next.js의 Server Actions와
                결합할 때 진가를 발휘합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export function UseStateRules() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl pt-4 font-bold text-white">useState 심화</h3>
      <div>
        <p>
          <span className="text-primary font-semibold ">지연 초기화(lazy init)</span>
          <span className="text-white"> : 초기값 계산이 비싸면 함수를 전달해 첫 렌더에만 계산</span>
        </p>
        <CodeBlock content={RULES_EXM2} />
      </div>
      <div>
        <p>
          <span className="text-primary font-semibold ">배칭(batching)</span>
          <span className="text-white">
            {' '}
            : React는 한 이벤트 안의 여러 setState를 모아 한 번만 리렌더합니다
          </span>
        </p>
        <p>React 18+는 비동기 콜백에서도 자동 배칭</p>
        <CodeBlock content={RULES_EXM3} />
      </div>
      <div>
        <p>
          <span className="text-primary font-semibold ">상태 갱신은 비동기적으로 반영</span>
          <span className="text-white"> : setState 직후의 변수는 아직 옛 값입니다</span>
        </p>
        <CodeBlock content={RULES_EXM4} />
      </div>
    </div>
  )
}

export function UseReducerRules() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl pt-4 font-bold text-white">useReducer 심화</h3>
      <div>
        <p>
          <span className="text-primary font-semibold ">
            상태 전이가 여러 갈래이거나 다음 상태가 이전 상태에 강하게 의존하면 useReducer가
            깔끔해짐
          </span>
          <span className="text-white"> reducer = </span>
          <code className="code-tag pink">(state, action) &rarr; newState</code>
        </p>
        <CodeBlock content={RULES_EXM5} />
      </div>
      <div className="border p-4 rounded border-primary-bg">
        <h4 className="text-primary font-semibold ">useState vs useReducer</h4>
        <p>
          독립적인 단순 값이면 <span className="code-tag pink">useState</span> , 서로 얽힌 여러
          값·복잡한 전이·테스트 가능한 순수 로직이 필요하면{' '}
          <span className="code-tag pink">useReducer</span> 를 고르세요. reducer는 컴포넌트 밖 순수
          함수라 단위 테스트가 쉽습니다
        </p>
      </div>
    </div>
  )
}

export function UseRefRules() {
  return (
    <div className="flex flex-col mt-6">
      <h3 className="text-xl pt-4 font-bold text-base-heading flex items-center">useRef 심화</h3>
      <h4 className=" font-semibold pl-2 pt-4 text-primary">useRef의 대표적인 2가지 용도</h4>
      <p className="pl-2 pb-4 pt-2 text-red-500/60 text-sm">
        <code className="rounded-sm p-0.5 code-tag pink mr-1">.current</code>에 값이 들어 있으면,
        바꿔도 리렌더되지 않습니다
      </p>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col p-4 rounded-lg bg-white/40 dark:bg-zinc-900/40 border border-base-border/30">
            <span className="text-primary font-bold text-xs mb-1">용도 ①</span>
            <span className="font-semibold text-base-heading text-sm sm:text-base">
              DOM 노드 직접 참조
            </span>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 leading-relaxed">
              특정 DOM 요소에 포커스를 주거나, 크기 및 위치 정보를 구하는 등 직접 조작이 필요할 때
              사용합니다.
            </p>
          </div>
          <div className="flex flex-col p-4 rounded-lg bg-white/40 dark:bg-zinc-900/40 border border-base-border/30">
            <span className="text-primary font-bold text-xs mb-1">용도 ②</span>
            <span className="font-semibold text-base-heading text-sm sm:text-base">
              렌더링과 무관한 가변 값 보관
            </span>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 leading-relaxed">
              리렌더링을 유발하지 않으며 컴포넌트 생명주기 동안 값이 유지되는 변수(예: 타이머 ID,
              스크롤 위치 등)를 보관할 때 사용합니다.
            </p>
          </div>
        </div>
        <div>
          <CodeBlock content={RULES_EXM6} />
          <div className="pl-5 border-l-2 border-base-border/50 my-5">
            <p className="font-semibold text-lg text-white ">state vs ref</p>
            <div>
              <p>
                화면에 반영되어야 하는 값 &rarr; <span className="code-tag">state</span>
              </p>
              <p>
                {' '}
                화면과 무관하게 기억만 하면 되는 값(타이머 id, 직전 값, DOM 노드) &rarr;{' '}
                <span className="code-tag">ref</span>
              </p>
            </div>
          </div>
          <CodeBlock content={RULES_EXM7} />
        </div>
      </div>
    </div>
  )
}
