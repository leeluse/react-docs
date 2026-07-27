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
      <div className="flex gap-5 justify-center items-center">
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
          위 과정을 거친 뒤 리액트의 각 컴포넌트 렝더링 결과물을 기반으로 새 가상 DOM과 기존 V-DOM을
          비교해 실제 DOM에 반영하기 위한 변경사항을 수집 {`->`}
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
          <span className="border border-sky-300/50 px-3 py-2 rounded flex gap-2 ">
            클래스 컴포넌트{` `}
            <code className="code-tag blue">componentDidMount</code>
            <code className="code-tag blue">componentDidUpdate</code>
          </span>
          <span className="border px-3 py-2 rounded border-sky-300/50 flex gap-2 ">
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
  return (
    <>
      <h2 className="font-bold text-lg sm:text-xl text-white py-3">클래스 컴포넌트의 렌더링</h2>
      <section className="text-center flex w-full gap-3">
        <article className="grid grid-cols-3 gap-4 relative h-fit flex-1">
          <div className="border rounded flex flex-col items-center ">
            <strong className="py-2">생성될 때</strong>
            <div>
              <div className="border px-2 py-1 size-fit rounded bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium">
                constructor
              </div>
              <div className="border px-4 py-1 size-fit rounded bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium absolute z-1000 left-7.5 bottom-5">
                componentDidMount
              </div>
            </div>
          </div>
          <div className="border rounded  flex flex-col items-center justify-center">
            <strong className="py-2">업데이트할 때</strong>
            <div className="text-xs flex gap-1">
              <code className="text-white">New props</code>
              <code className="text-white">setState</code>
              <code className="text-white">forceUpdate()</code>
            </div>
            <div className="flex flex-col gap-2">
              <div className="border px-20 py-1 size-fit rounded bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium absolute z-1000 left-10 top-22">
                static getDerivedStateFromProps
              </div>
              <div className="border px-2 py-1 mt-20 size-fit rounded bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium">
                shouldComponentUpdate
              </div>
              <div className="border px-44  py-1 size-fit rounded bg-indigo-50 text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/20 dark:text-indigo-300 font-medium absolute z-1000 left-10 top-46">
                render
              </div>
              <div className="border px-2 py-1 mt-13 size-fit rounded bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300 font-medium">
                getSnapshotBeforeUpdate
              </div>
              <div className="border px-27  py-1 size-fit rounded bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300 font-medium absolute z-1000 left-10 top-70">
                React DOM 및 refs 업데이트
              </div>
              <div className="border px-2 py-1 mt-14 size-fit rounded bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300 mb-5">
                componentDidUpdate
              </div>
            </div>
          </div>
          <div className="border rounded  flex flex-col items-center justify-between">
            <strong className="py-2">제거할 때</strong>
            <div className="border px-2 py-1 mb-5 size-fit rounded bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300">
              componentWillUnmount
            </div>
          </div>
        </article>
        <div className="w-fit flex flex-col items-center justify-between my-15 shrink-0">
          <div className="max-w-35 flex flex-col">
            <span className="text-white">"Render 단계"</span>
            <span className="text-xs">
              순수하고 부작용이 없습니다. React에 의해 일시 중지, 중단 또는 재시작될 수 있습니다
            </span>
          </div>
          <div className="max-w-35 flex flex-col">
            <span className="text-white">"Pre-Commit 단계"</span>
            <span className="text-xs">DOM을 읽을 수 있습니다</span>
          </div>
          <div className="max-w-35 flex flex-col">
            <span className="text-white">"Commit 단계"</span>
            <span className="text-xs">
              DOM을 사용하여 부작용을 실행하고 업데이트를 예약할 수 있습니다
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
