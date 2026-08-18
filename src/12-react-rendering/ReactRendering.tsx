import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

const REND_EXM = `
  function Hello() {
    return (
      <TestComponent a={32} b='yceffort'> 
      안녕하세요
      </TestComponent>
    )
  }
`

const REND_EXM2 = `
  function Hello() {
    return React.createElement(
      TestComponent,
      { a: 35, b: 'yceffort' }, 
    )
  }
`

export default function ReactRendering() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 11. React Rendering (리액트 렌더링)
        </h1>
        <ReactReanderingMeaning />
        <ReactRenderingProcess />
        <RenderAndCommit />
        <ClassRenderingWithLifeCycle />
        <CommonRenderingScenario />
      </section>
    </div>
  )
}

export function ReactReanderingMeaning() {
  return (
    <article className="">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">리액트 렌더링이란?</h2>
      <div className="mb-4 mt-2 bg-pink-500/10 border border-pink-500/25 px-3 py-2 rounded-md leading-relaxed text-sm sm:text-md">
        <p className="text-blue-50">
          <span className="text-pink-400">리액트의 렌더링</span>: 리액트 어플리케이션 트리 안의 모든
          컴포넌트들이 현재 갖고 있는 props, state의 값을 기반으로{' '}
          <span className="text-pink-300/80">어떻게 UI를 구성하고</span> 이를 바탕으로
          <span className="text-pink-300/80"> 어떤 DOM 결과를 브라우저에 제공할 것</span>인지
          계산하는 일련의 과정침
        </p>
      </div>
      <div className="border-l-3 pl-5 text-white py-2 my-7">
        <p>리액트의 렌더링이 일어나는 이유?</p>
      </div>
      <section className="flex gap-10">
        <div className="block border p-3 rounded  text-center h-fit w-1/2">
          <span className="font-bold text-primary">최초 렌더링</span>
          <p className="text-start">
            사용자가 처음 진입 시 브라우저에 정보를 제공하기 위해 최초 렌더링 수행
          </p>
        </div>
        <div className="block border p-3 rounded text-center w-1/2">
          <span className="font-bold text-primary">리렌더링</span>
          <p className="text-start">
            최초 렌더링 이후 발생하는 모든 렌더링
            <ul className="list-decimal ml-5 text-start text-sm mt-1">
              <li>
                클래스 컴포넌트
                <ul className="list-disc ml-5 text-start text-sm mt-1">
                  <li>setState가 실행되는 경우</li>
                  <li>forceUpdate가 실행되는 경우</li>
                </ul>
              </li>
              <li>
                함수 컴포넌트
                <ul className="list-disc ml-5 text-start text-sm mt-1">
                  <li>부모 컴포넌트의 렌더링</li>
                  <li>useState()의 setter 실행</li>
                  <li>useReducer()의 dispatch 실행</li>
                </ul>
              </li>
              <li>컴포넌트의 key props 변경</li>
            </ul>
          </p>
        </div>
      </section>
    </article>
  )
}

export function ReactRenderingProcess() {
  return (
    <section className="py-10">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">리액트의 렌더링 과정</h2>
      <p>
        리액트는 key를 지정하여 형제 간의 요소를 구분하고, 이로 인해서 리렌더링될 요소를 파악할 수
        있다
      </p>
      <div className="border-l-3 border-l-white/80 p-4 my-3 flex flex-col gap-3">
        <p>
          1. 리액트 컴포넌트의 루트에서 차근차근 아래쪽으로 내려가면서 업데이트가 필요하다고 지정된
          모든 컴포넌트를 찾는다
        </p>
        <p>
          2. 위 과정에서 업데이트가 필요한 컴포넌트를 발견하면, 클래스 컴포넌트의 경우{' '}
          <code className="code-tag pink">render()</code>, 함수 컴포넌트의 경우{' '}
          <code className="code-tag pink">FucntionComponent()</code> 그 자체를 호출한 뒤, 결과물을
          저장한다.
        </p>
        <p className="flex flex-col">
          <span>
            3. 렌더링 결과물은 JSX 문법으로 구성되어 있고, 이게 자바스크립트로 컴파일되면서
            <code className="code-tag pink">React.createElement()</code>를 호출하는 구문으로
            변환된다
          </span>
          <span className="text-sm ">
            * <code className="text-white">React.createElement()</code>는 브라우저의 UI 구조를
            설명할 수 있는 일반적인 JS 객체를 반환함
          </span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row  gap-5 justify-center items-center">
        <CodeBlock content={REND_EXM} />
        <div className="flex items-center gap-1">
          <span>{'->'}</span>
          <span className="border text-center justify-center flex items-center px-3 h-fit py-2 rounded-full bg-primary-bg border-primary-border/50">
            React.createElement
          </span>
          <span>{'->'}</span>
        </div>

        <CodeBlock content={REND_EXM2} />
      </div>
      <p className="my-4">
        <span className="font-bold text-base-heading mr-3">결과물 : </span>
        <code className="bg-black/80 dark:bg-white/5 rounded px-2 py-1 mt-3 ">{`{type: TestCompoent,  porps: {a: 35, b: "yceffort", child: "안녕하세요" }}`}</code>
      </p>
      <div className="p-4 my-3 flex flex-col gap-3">
        <p>
          위 과정을 거친 뒤 리액트의 각 컴포넌트 렌더링 결과물을 기반으로 새 가상 DOM과 기존 V-DOM을
          비교해 실제 DOM에 반영하기 위한 변경사항을 수집 &rarr;
          <span className="text-white mx-2">이것이 재조정(Reconcilation)</span>
        </p>
      </div>
    </section>
  )
}

export function RenderAndCommit() {
  return (
    <section className="py-10">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">Render와 Commit</h2>

      <div className="flex flex-col gap-3">
        <p className="flex flex-col">
          <span className="font-semibold text-white py-2">• 렌더 단계(Render Phase)</span>
          <span>
            렌더링 프로세스에서 컴포넌트를 실행해 이 결과와 이전 가상 DOM을 비교하는 과정을 거쳐
            변경이 필요한 컴포넌트를 체크하는 과정
          </span>
          <span className="text-white/80 text-sm py-2">
            ㄴ 비교하는 것: <code className="code-tag">type</code>{' '}
            <code className="code-tag">key</code> <code className="code-tag">props</code>
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="flex flex-col">
          <span className="font-semibold text-white py-2">• 커밋 단계(Commit Phase)</span>
          <span>
            렌더 단계의 변경 사항을 실제 DOM에 적용해 사용자에게 보여주는 것
            <span className="text-white/80 text-sm py-2"> (해당 단계 후 브라우저 렌더링 발생)</span>
          </span>
        </p>
        <p>
          리액트가 먼저 DOM을 커밋 단계에서 업데이트하면, 만들어진 DOM 노드 및 인스턴스를 가리키도록
          리액트 내부를 참조하도록 업데이트
        </p>
        <p>이후 클래스 / 함수 컴포넌트의 생명주기 사이클 진행</p>
        <div className="flex gap-3 text-sky-200 ">
          <span className="border border-sky-300/50 px-3 py-2 rounded flex flex-col sm:flex-row gap-2 ">
            클래스 컴포넌트{` `}
            <code className="code-tag blue">componentDidMount</code>
            <code className="code-tag blue">componentDidUpdate</code>
          </span>
          <span className="border px-3 py-2 rounded border-sky-300/50 flex flex-col sm:flex-row gap-2 ">
            함수 컴포넌트{` `}
            <code className="code-tag blue">useLayoutEffect</code>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 my-5">
        <h4 className="font-semibold text-red-400/80">
          중요한 것! 리액트의 렌더링이 발생한다고 해서 항상 DOM이 업데이트되는 것은 아니다
        </h4>
        <p>
          렌더링을 수행했으나 커밋 단계까지 갈 필요가 없다면,{' '}
          <span className="font-semibold text-white">
            즉 변경사항을 계산했으나 실제 아무런 변경 사항이 감지되지 않았다면{' '}
          </span>
          커밋 단계는 생략될 수 있다
        </p>
      </div>
    </section>
  )
}

export function ClassRenderingWithLifeCycle() {
  const [activeTab, setActiveTab] = useState<'mount' | 'update' | 'unmount'>('mount')

  return (
    <>
      <h2 className="font-bold text-lg sm:text-xl text-white py-3">클래스 컴포넌트의 렌더링</h2>

      {/* Mobile View (< md) */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Tab buttons */}
        <div className="flex border border-slate-200/50 dark:border-zinc-800/60 rounded-xl p-1 bg-slate-100/50 dark:bg-zinc-900/50">
          <button
            onClick={() => setActiveTab('mount')}
            className={`flex-1 py-2 text-center rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'mount'
                ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
                : 'text-base-text/60 hover:text-base-text'
            }`}
          >
            생성 (Mount)
          </button>
          <button
            onClick={() => setActiveTab('update')}
            className={`flex-1 py-2 text-center rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'update'
                ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
                : 'text-base-text/60 hover:text-base-text'
            }`}
          >
            업데이트 (Update)
          </button>
          <button
            onClick={() => setActiveTab('unmount')}
            className={`flex-1 py-2 text-center rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'unmount'
                ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
                : 'text-base-text/60 hover:text-base-text'
            }`}
          >
            제거 (Unmount)
          </button>
        </div>

        {/* Tab content */}
        <div className="flex flex-col gap-6 bg-slate-500/5 dark:bg-zinc-800/10 border border-slate-200/50 dark:border-zinc-800/40 rounded-xl p-5 relative">
          {activeTab === 'mount' && (
            <>
              {/* Render Phase */}
              <div className="flex flex-col gap-3 relative pl-6 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-900" />
                <div className="flex flex-col">
                  <span className="text-indigo-400 font-bold text-sm">Render 단계</span>
                  <span className="text-[11px] text-base-text/60">
                    순수하고 부작용이 없습니다. React에 의해 일시 중지, 중단 또는 재시작될 수
                    있습니다.
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="border px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium text-xs sm:text-sm w-fit">
                    constructor
                  </div>
                  <div className="border px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium text-xs sm:text-sm w-fit">
                    static getDerivedStateFromProps
                  </div>
                  <div className="border px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium text-xs sm:text-sm w-fit">
                    render
                  </div>
                </div>
              </div>

              {/* Commit Phase */}
              <div className="flex flex-col gap-3 relative pl-6">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                <div className="flex flex-col">
                  <span className="text-emerald-400 font-bold text-sm">Commit 단계</span>
                  <span className="text-[11px] text-base-text/60">
                    DOM을 사용하여 부작용을 실행하고 업데이트를 예약할 수 있습니다.
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="border px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium text-xs sm:text-sm w-fit">
                    React DOM 및 refs 업데이트
                  </div>
                  <div className="border px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium text-xs sm:text-sm w-fit">
                    componentDidMount
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'update' && (
            <>
              {/* Render Phase */}
              <div className="flex flex-col gap-3 relative pl-6 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-900" />
                <div className="flex flex-col">
                  <span className="text-indigo-400 font-bold text-sm">Render 단계</span>
                  <span className="text-[11px] text-base-text/60">
                    순수하고 부작용이 없습니다. React에 의해 일시 중지, 중단 또는 재시작될 수
                    있습니다.
                  </span>
                </div>

                <div className="flex gap-1.5 flex-wrap my-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300">
                    New props
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300">
                    setState()
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300">
                    forceUpdate()
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="border px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium text-xs sm:text-sm w-fit">
                    static getDerivedStateFromProps
                  </div>
                  <div className="border px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium text-xs sm:text-sm w-fit">
                    shouldComponentUpdate
                  </div>
                  <div className="border px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium text-xs sm:text-sm w-fit">
                    render
                  </div>
                </div>
              </div>

              {/* Pre-Commit Phase */}
              <div className="flex flex-col gap-3 relative pl-6 border-l-2 border-amber-500/30">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-slate-900" />
                <div className="flex flex-col">
                  <span className="text-amber-400 font-bold text-sm">Pre-Commit 단계</span>
                  <span className="text-[11px] text-base-text/60">
                    DOM을 직접 읽을 수 있는 단계입니다.
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="border px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300 font-medium text-xs sm:text-sm w-fit">
                    getSnapshotBeforeUpdate
                  </div>
                </div>
              </div>

              {/* Commit Phase */}
              <div className="flex flex-col gap-3 relative pl-6">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                <div className="flex flex-col">
                  <span className="text-emerald-400 font-bold text-sm">Commit 단계</span>
                  <span className="text-[11px] text-base-text/60">
                    DOM을 사용하여 부작용을 실행하고 업데이트를 예약할 수 있습니다.
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="border px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium text-xs sm:text-sm w-fit">
                    React DOM 및 refs 업데이트
                  </div>
                  <div className="border px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium text-xs sm:text-sm w-fit">
                    componentDidUpdate
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'unmount' && (
            <>
              {/* Commit Phase */}
              <div className="flex flex-col gap-3 relative pl-6">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                <div className="flex flex-col">
                  <span className="text-emerald-400 font-bold text-sm">Commit 단계</span>
                  <span className="text-[11px] text-base-text/60">
                    DOM을 사용하여 부작용을 실행하고 업데이트를 예약할 수 있습니다.
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="border px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium text-xs sm:text-sm w-fit">
                    componentWillUnmount
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop View (>= md) */}
      <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_220px] gap-x-4 gap-y-3 relative">
        {/* Column background panels with centered dashed vertical lines */}
        <div className="col-start-1 row-start-1 row-span-8 bg-slate-500/5 dark:bg-zinc-800/10 border border-slate-200/50 dark:border-zinc-800/40 rounded-xl relative -z-10 flex justify-center">
          <div className="h-full border-r border-dashed border-slate-300/40 dark:border-zinc-700/40 pointer-events-none" />
        </div>
        <div className="col-start-2 row-start-1 row-span-8 bg-slate-500/5 dark:bg-zinc-800/10 border border-slate-200/50 dark:border-zinc-800/40 rounded-xl relative -z-10 flex justify-center">
          <div className="h-full border-r border-dashed border-slate-300/40 dark:border-zinc-700/40 pointer-events-none" />
        </div>
        <div className="col-start-3 row-start-1 row-span-8 bg-slate-500/5 dark:bg-zinc-800/10 border border-slate-200/50 dark:border-zinc-800/40 rounded-xl relative -z-10 flex justify-center">
          <div className="h-full border-r border-dashed border-slate-300/40 dark:border-zinc-700/40 pointer-events-none" />
        </div>

        {/* Headers */}
        <div className="col-start-1 row-start-1 text-center py-3 font-bold text-sm sm:text-base text-base-heading border-b border-slate-200/50 dark:border-zinc-800/40">
          생성될 때 (Mounting)
        </div>
        <div className="col-start-2 row-start-1 text-center py-3 font-bold text-sm sm:text-base text-base-heading border-b border-slate-200/50 dark:border-zinc-800/40">
          업데이트할 때 (Updating)
        </div>
        <div className="col-start-3 row-start-1 text-center py-3 font-bold text-sm sm:text-base text-base-heading border-b border-slate-200/50 dark:border-zinc-800/40">
          제거할 때 (Unmounting)
        </div>
        <div className="col-start-4 row-start-1 text-center py-3 font-bold text-sm sm:text-base text-primary border-b border-slate-200/50 dark:border-zinc-800/40">
          작업 단계
        </div>

        {/* Row 2: constructor & update triggers */}
        <div className="col-start-1 row-start-2 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-semibold text-xs sm:text-sm">
            constructor
          </div>
        </div>
        <div className="col-start-2 row-start-2 flex flex-col items-center justify-center p-3 gap-1">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300">
            New props
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300">
            setState()
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300">
            forceUpdate()
          </span>
        </div>

        {/* Render Phase Side Label */}
        <div className="col-start-4 row-start-2 row-span-4 border border-indigo-500/20 dark:border-indigo-500/30 bg-indigo-500/5 rounded-xl p-3 flex flex-col justify-center text-center gap-1.5">
          <span className="text-indigo-400 font-bold text-sm">Render 단계</span>
          <span className="text-[11px] text-base-text/60 leading-normal">
            순수하고 부작용이 없습니다. React에 의해 일시 중지, 중단 또는 재시작될 수 있습니다.
          </span>
        </div>

        {/* Row 3: static getDerivedStateFromProps */}
        <div className="col-start-1 col-span-2 row-start-3 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-semibold text-xs sm:text-sm">
            static getDerivedStateFromProps
          </div>
        </div>

        {/* Row 4: shouldComponentUpdate */}
        <div className="col-start-2 row-start-4 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-semibold text-xs sm:text-sm">
            shouldComponentUpdate
          </div>
        </div>

        {/* Row 5: render */}
        <div className="col-start-1 col-span-2 row-start-5 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-semibold text-xs sm:text-sm">
            render
          </div>
        </div>

        {/* Pre-Commit Phase Side Label */}
        <div className="col-start-4 row-start-6 border border-amber-500/20 dark:border-amber-500/30 bg-amber-500/5 rounded-xl p-3 flex flex-col justify-center text-center gap-1">
          <span className="text-amber-400 font-bold text-sm">Pre-Commit 단계</span>
          <span className="text-[11px] text-base-text/60 leading-normal">
            DOM을 직접 읽을 수 있는 단계입니다.
          </span>
        </div>

        {/* Row 6: getSnapshotBeforeUpdate */}
        <div className="col-start-2 row-start-6 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300 font-semibold text-xs sm:text-sm">
            getSnapshotBeforeUpdate
          </div>
        </div>

        {/* Commit Phase Side Label */}
        <div className="col-start-4 row-start-7 row-span-2 border border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-500/5 rounded-xl p-3 flex flex-col justify-center text-center gap-1.5">
          <span className="text-emerald-400 font-bold text-sm">Commit 단계</span>
          <span className="text-[11px] text-base-text/60 leading-normal">
            DOM을 사용하여 부작용을 실행하고 업데이트를 예약할 수 있습니다.
          </span>
        </div>

        {/* Row 7: React DOM 및 refs 업데이트 */}
        <div className="col-start-1 col-span-2 row-start-7 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-semibold text-xs sm:text-sm">
            React DOM 및 refs 업데이트
          </div>
        </div>

        {/* Row 8: componentDidMount, componentDidUpdate, componentWillUnmount */}
        <div className="col-start-1 row-start-8 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-semibold text-xs sm:text-sm">
            componentDidMount
          </div>
        </div>
        <div className="col-start-2 row-start-8 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-semibold text-xs sm:text-sm">
            componentDidUpdate
          </div>
        </div>
        <div className="col-start-3 row-start-8 flex items-center justify-center p-3">
          <div className="w-full text-center border py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-semibold text-xs sm:text-sm">
            componentWillUnmount
          </div>
        </div>
      </div>
    </>
  )
}

const COMMON_RENDER_EXM = `
export default function A() {
  return(
    <div>
      <h1> Hello React </h1>
      <B />
    </div>
  )
}


function B() {
  const [counter, setCounter] = useState(0);
  function buttonClickHandler() {
    setCouter((previous) => previous + 1);
  }

  return (
    <>
      <p>리액트는 {counter} 입니다.</p>
      <button onClick={buttonClickHandler}>
        +
      </button>
    </>
  )
}

function C({ number}) {
  return (
    <div>
      {number} <D />
    </div>
  )
}


function D() {
  return <>리액트 재밌다!</>
}
`

const MEMO_CODE_EXM = `
import { memo } from 'react'

// React.memo를 사용한 최적화
const D = memo(function D() {
  return <>리액트 재밌다!</>
});
`

export function CommonRenderingScenario() {
  return (
    <section>
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">일반적인 렌더링 시나리오</h2>
      <div className="flex gap-6 items-stretch">
        <div className="flex-1 min-w-0 ">
          <CodeBlock content={COMMON_RENDER_EXM} />
        </div>
        <div className="flex flex-col gap-2 flex-1 ">
          <ScenArticle type={'A'} />
          <ScenArticle type={'B'} />
          <ScenArticle type={'C'} />
          <ScenArticle type={'D'} />
        </div>
      </div>
      <div className="py-4 text-sm leading-relaxed text-base-text/90 space-y-5">
        <div>
          <p className="font-bold text-base-heading mb-1 border-l-2 pl-5">일반적인 렌더링 흐름:</p>
          <ol className="list-decimal pl-10 space-y-1.5 mt-2">
            <li>
              <strong>B 컴포넌트</strong>의{' '}
              <code className="bg-black/40 px-1 py-0.5 rounded text-pink-400">setState</code> 호출 →
              B의 리렌더링 작업이 렌더링 큐에 들어갑니다.
            </li>
            <li>
              리액트는 트리 최상단(<strong>A 컴포넌트</strong>)부터 아래로 경로를 탐색합니다.
            </li>
            <li>
              <strong>A 컴포넌트</strong>는 업데이트 대상이 아니므로{' '}
              <strong>작업 없이 통과(스킵)</strong>합니다.
            </li>
            <li>
              하위의 <strong>B 컴포넌트</strong>가 업데이트 필요하다고 체크되어 있으므로{' '}
              <strong>B 리렌더링 수행</strong>.
            </li>
            <li>
              B 컴포넌트가 리렌더링되며 하위의 <strong>C 컴포넌트</strong>를 새로 반환합니다.
            </li>
            <li>
              <strong>C 컴포넌트</strong>는 전달받는 props인{' '}
              <code className="bg-black/40 px-1 py-0.5 rounded text-blue-400">number</code>가
              업데이트되었으므로 리렌더링 대상으로 결정됩니다.
            </li>
            <li>
              C 컴포넌트가 리렌더링되며 하위의 <strong>D 컴포넌트</strong>를 새로 반환합니다.
            </li>
            <li>
              <strong>D 컴포넌트</strong>는 props 변경이 전혀 없으나,{' '}
              <strong>부모(C)가 리렌더링되었기 때문에 강제로 업데이트(리렌더링)</strong>됩니다.
            </li>
          </ol>
        </div>
        <div className="pt-2">
          <p className="font-bold text-base-heading mb-1 border-l-2 pl-5">
            D 컴포넌트에 memo를 추가할 경우:
          </p>
          <p className="pl-5 mt-2">
            만약 D 컴포넌트를{' '}
            <code className="bg-black/40 px-1 py-0.5 rounded text-emerald-400">React.memo</code>로
            감싸준다면, 부모 C가 리렌더링되더라도{' '}
            <strong>D의 props가 변경되지 않았으므로 8단계의 D 리렌더링은 건너뛰게(Skip)</strong>{' '}
            됩니다.
          </p>
          <div className="mt-3 pl-5 max-w-md">
            <CodeBlock content={MEMO_CODE_EXM} />
          </div>
        </div>
      </div>
    </section>
  )
}
export function ScenArticle({ type }: { type: string }) {
  const [count, setCount] = useState(0)
  function onClick() {
    setCount((previous) => previous + 1)
  }

  // JSX를 변수로 선언
  const A = (
    <div className="bg-slate-300">
      <h1 className="font-bold text-2xl py-2">Hello React!</h1>
      <p>{count} 리액트 재밌다!</p>
      <button onClick={onClick} className="border px-2 rounded bg-slate-200 border-slate-400">
        +
      </button>
    </div>
  )
  const B = (
    <>
      <h1 className="font-bold text-2xl py-2">Hello React!</h1>
      <div className="bg-slate-300">
        <p>{count} 리액트 재밌다!</p>
      </div>
      <div className="bg-slate-300">
        <button onClick={onClick} className="border px-2 rounded bg-slate-200 border-slate-400">
          +
        </button>
      </div>
    </>
  )
  const C = (
    <>
      <h1 className="font-bold text-2xl py-2">Hello React!</h1>
      <div className="bg-slate-300">
        <p>{count} 리액트 재밌다!</p>
      </div>
      <button onClick={onClick} className="border px-2 rounded bg-slate-200 border-slate-400">
        +
      </button>
    </>
  )
  const D = (
    <>
      <h1 className="font-bold text-2xl py-2">Hello React!</h1>
      <p>{count} 리액트 재밌다!</p>
      <div className="bg-slate-300">
        <button onClick={onClick} className="border px-2 rounded bg-slate-200 border-slate-400">
          +
        </button>
      </div>
    </>
  )

  return (
    <article className="flex gap-3 flex-1">
      <div className="bg-white text-black px-5">
        {type === 'A' && A}
        {type === 'B' && B}
        {type === 'C' && C}
        {type === 'D' && D}
      </div>
      <div className="h-full flex-1 rounded border border-slate-200 p-2 gap-1 bg-slate-100/50 flex flex-col items-end text-black font-semibold">
        <div
          className={`w-full text-right pr-2 text-xs rounded transition-all ${type === 'A' ? 'bg-slate-300 border border-slate-500 text-slate-700 shadow-inner' : 'bg-red-200'}`}
        >
          A
        </div>
        <div
          className={`w-[7/9] text-right pr-2 text-xs rounded transition-all ${type === 'B' ? 'bg-slate-300 border border-slate-500 text-slate-700 shadow-inner' : 'bg-yellow-200'}`}
        >
          B
        </div>
        <div
          className={`w-[3/9] text-right pr-2 text-xs rounded transition-all ${type === 'C' ? 'bg-slate-300 border border-slate-500 text-slate-700 shadow-inner' : 'bg-sky-200'}`}
        >
          C
        </div>
        <div
          className={`w-[1/9] text-right pr-2 text-xs rounded transition-all ${type === 'D' ? 'bg-slate-300 border border-slate-500 text-slate-700 shadow-inner' : 'bg-purple-200'}`}
        >
          D
        </div>
      </div>
    </article>
  )
}
