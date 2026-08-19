import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import Example from './Example'

const LIFECYCLE_CODES = {
  constructor: {
    title: 'constructor',
    code: `constructor(props) {
  super(props);
  this.state = {
    counter: 0
  };
  // 이벤트 바인딩 등 초기화 작업 수행
}`,
    desc: '컴포넌트의 생성자 메서드로 초기 state를 설정하거나 이벤트 핸들러를 바인딩하는 용도로 사용됩니다.',
  },
  getDerivedStateFromProps: {
    title: 'getDerivedStateFromProps',
    code: `static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null;
}`,
    desc: 'props로 받아온 값을 내부 state에 동기화할 때 사용합니다. 마운트와 업데이트 시 렌더링 전에 실행됩니다.',
  },
  render: {
    title: 'render',
    code: `render() {
  return (
    <div>
      <h1>{this.state.counter}</h1>
    </div>
  );
}`,
    desc: '컴포넌트의 모양새를 정의하고 가상 DOM을 반환합니다. 라이프사이클 메서드 중 유일한 필수 메서드입니다.',
  },
  componentDidMount: {
    title: 'componentDidMount',
    code: `componentDidMount() {
  // 첫 렌더링 완료 및 DOM 반영 후 호출
  this.timer = setInterval(() => this.tick(), 1000);
}`,
    desc: '첫 렌더링을 완전히 마친 뒤 실행됩니다. API 요청, 타이머 등록, 외부 라이브러리 연동 등에 사용됩니다.',
  },
  shouldComponentUpdate: {
    title: 'shouldComponentUpdate',
    code: `shouldComponentUpdate(nextProps, nextState) {
  // 특정 상태가 변경되었을 때만 업데이트 진행
  return nextProps.id !== this.props.id;
}`,
    desc: '새로운 props나 state를 받았을 때 리렌더링 진행 여부(true/false)를 결정하여 최적화를 수행합니다.',
  },
  getSnapshotBeforeUpdate: {
    title: 'getSnapshotBeforeUpdate',
    code: `getSnapshotBeforeUpdate(prevProps, prevState) {
  // 실제 DOM 반영 직전 상태(예: 스크롤 위치)를 캡처
  if (prevState.list.length < this.state.list.length) {
    const list = this.listRef.current;
    return list.scrollHeight - list.scrollTop;
  }
  return null;
}`,
    desc: '연산된 결과가 실제 브라우저 DOM에 반영되기 직전 실행되며, 이때의 DOM 상태를 기록해 componentDidUpdate로 전달할 수 있습니다.',
  },
  componentDidUpdate: {
    title: 'componentDidUpdate',
    code: `componentDidUpdate(prevProps, prevState, snapshot) {
  // 리렌더링 완료 후 snapshot 값을 바탕으로 조작
  if (snapshot !== null) {
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight - snapshot;
  }
}`,
    desc: '리렌더링 및 브라우저 DOM 반영 완료 직후 호출되며, 이전 데이터와 대조하여 추가적인 작업을 하기에 적합합니다.',
  },
  componentWillUnmount: {
    title: 'componentWillUnmount',
    code: `componentWillUnmount() {
  // 컴포넌트가 DOM에서 사라지기 직전에 정리
  clearInterval(this.timer);
}`,
    desc: '컴포넌트가 브라우저 DOM에서 제거(언마운트)되기 직전에 수행되며, 등록했던 타이머나 리스너를 정리(Clean-up)합니다.',
  },
} as const

const TIMER_CLASS_CODE = `import { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 }; // 1) 초기화
  }

  componentDidMount() {
    // 2) 마운트 직후: 구독/타이머/데이터 로드
    this.id = setInterval(() => {
      this.setState(s => ({ seconds: s.seconds + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    // 3) 업데이트 직후: 이전 값과 비교해 후처리
    if (prevProps.userId !== this.props.userId) {
      this.reload();
    }
  }

  componentWillUnmount() {
    // 4) 언마운트 직전: 정리(타이머 해제 등)
    clearInterval(this.id);
  }

  render() {
    return <p>{this.state.seconds}초</p>;
  }
}`

const TIMER_FUNCTION_CODE = `import { useState, useEffect } from "react";

// 클래스의 세 메서드를 useEffect 하나로
function Timer({ userId }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // componentDidMount
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // componentWillUnmount
  }, []);

  useEffect(() => {
    // componentDidUpdate (userId 변경 시)
    reload(userId);
  }, [userId]);

  return <p>{seconds}초</p>;
}`

type SelectedMethod = keyof typeof LIFECYCLE_CODES

export default function LifeCycle() {
  const [selectedMethod, setSelectedMethod] = useState<SelectedMethod | null>('constructor')

  return (
    <div className="text-base-text flex flex-col gap-10 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # Life Cycle
        </h1>

        <article className="flex flex-col gap-3">
          <p className="font-semibold text-base sm:text-lg text-base-heading mt-2">
            • 컴포넌트의 Life Cycle 메서드
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            모든 리액트 컴포넌트는 라이프 사이클(수명 주기)이 존재합니다. 컴포넌트의 수명은{' '}
            <span className="text-primary font-semibold">
              페이지에서 렌더링되기 전 준비 과정 &rarr; 실제 브라우저 노출 &rarr; 최종 소멸(삭제)
            </span>
            의 일련의 단계를 거칩니다.
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            리액트 프로젝트를 진행하면서 특정 타이밍에 일부 연산을 실행하거나 최적화해야 하는 경우
            생명주기 메서드 혹은 이와 대등한 훅을 사용합니다.
          </p>
          <div className="flex flex-wrap gap-3 py-2 text-xs sm:text-sm font-medium">
            <span className="text-base-heading bg-primary-bg border border-primary-border px-3 py-2 rounded-lg">
              1. 컴포넌트 첫 렌더링 시 필요한 작업
            </span>
            <span className="text-base-heading bg-primary-bg border border-primary-border px-3 py-2 rounded-lg">
              2. 컴포넌트 업데이트 전후 필요한 작업
            </span>
            <span className="text-base-heading bg-primary-bg border border-primary-border px-3 py-2 rounded-lg">
              3. 불필요한 업데이트를 방지하는 최적화 작업
            </span>
          </div>
          <p className="text-red-500 dark:text-red-400 font-semibold text-sm sm:text-base mt-1">
            ※ 중요! 명시적인 라이프 사이클 메서드들은 오직 클래스형 컴포넌트에서만 기본 제공되어
            사용 가능합니다.
          </p>
        </article>

        <article className="flex flex-col gap-3 mt-4">
          <p className="font-semibold text-base sm:text-lg text-base-heading mt-2">
            • Life Cycle 메서드의 이해
          </p>
          <p className="text-sm sm:text-base">라이프 사이클의 주요 접두사 패턴:</p>
          <div className="flex flex-col sm:flex-row gap-4 my-2">
            <div className="flex-1 border border-base-border/50 bg-black/5 dark:bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-primary text-xs sm:text-sm font-semibold shrink-0">
                Will 접두사
              </span>
              <span className="text-xs sm:text-sm leading-normal">
                어떤 작업을 작동하기 <strong>전에</strong> 실행되는 메서드
              </span>
            </div>
            <div className="flex-1 border border-base-border/50 bg-black/5 dark:bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold shrink-0">
                Did 접두사
              </span>
              <span className="text-xs sm:text-sm leading-normal">
                어떤 작업을 작동한 <strong>후에</strong> 실행되는 메서드
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base mt-2 flex-wrap">
            <span className="font-semibold text-base-heading">생명주기 카테고리:</span>
            <span className="text-xs sm:text-sm font-bold bg-pink-500/10 border border-pink-500/20 text-primary px-2.5 py-1 rounded-md">
              마운트
            </span>
            <span className="text-xs sm:text-sm font-bold bg-blue-500/10 border border-blue-500/20 text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-md">
              업데이트
            </span>
            <span className="text-xs sm:text-sm font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-md">
              언마운트
            </span>
          </div>
        </article>

        {/* Layout with sticky side-panel */}
        <div className="flex flex-col lg:flex-row gap-8 py-4 items-stretch">
          <div className="flex-1 flex flex-col gap-6">
            <LifeCycleGraph />
            <Mount selectedMethod={selectedMethod} onSelectMethod={setSelectedMethod} />
            <Update selectedMethod={selectedMethod} onSelectMethod={setSelectedMethod} />
            <Unmount selectedMethod={selectedMethod} onSelectMethod={setSelectedMethod} />
          </div>

          {/* Code Preview Sidebar */}
          {selectedMethod && (
            <div className="w-full lg:w-95 shrink-0 border border-slate-200/50 dark:border-zinc-800/50 rounded-xl bg-slate-500/5 dark:bg-zinc-900/40 p-5 flex flex-col gap-4 h-fit lg:sticky lg:top-6 self-start">
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-zinc-800/50 pb-2.5">
                <h3 className="font-extrabold text-sm sm:text-base text-base-heading">
                  코드 미리보기
                </h3>
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="text-xs text-base-text/50 hover:text-base-text transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-primary font-mono bg-pink-500/10 dark:bg-pink-950/20 border border-pink-500/20 px-2 py-0.5 rounded w-fit">
                  {LIFECYCLE_CODES[selectedMethod].title}()
                </span>
                <p className="text-xs text-base-text/70 leading-relaxed">
                  {LIFECYCLE_CODES[selectedMethod].desc}
                </p>
              </div>
              <div className="mt-1">
                <CodeBlock content={LIFECYCLE_CODES[selectedMethod].code} />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-base-border/30 pt-8 mt-6 flex flex-col gap-8">
          <p className="font-bold text-lg sm:text-xl text-base-heading">
            • 컴포넌트의 Life Cycle 메서드 살펴보기
          </p>
          <RenderMethod />
          <ConstructorMethod />
          <GetDerivedStateFromPropsMethod />
          <ComponentDidMount />
          <ShouldComponentUpdate />
          <GetSnapshotBeforeUpdate />
          <ComponentDidUpdate />
          <ComponentWillUnmount />
          <ComponentDidCatch />
        </div>

        <div className="pt-8 mt-6 flex flex-col gap-8">
          <ClassVsFunctionalLifeCycle />
        </div>

        <div className="border-t border-base-border/30 pt-8 mt-6 flex flex-col gap-4">
          <ExampleLifeCycleFlow />
        </div>
      </section>
    </div>
  )
}

export function ExampleLifeCycleFlow() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-base-heading">Life Cycle 실습</h2>
      <p className="text-sm sm:text-base leading-relaxed">
        개발자 도구에서 console을 확인할 경우 라이프 사이클의 작동 순서를 파악할 수 있습니다.
      </p>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch mt-3">
        <div className="flex-1 min-w-0 bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-base-border/40">
          <Example />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between border border-base-border/40 p-5 rounded-xl bg-black/10">
          <p className="text-base-heading font-bold text-sm sm:text-base border-b border-base-border/30 pb-2 mb-2">
            • 최초 Mount Log 순서
          </p>
          <div className="text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto text-slate-600 dark:text-zinc-300 flex-1 flex flex-col justify-center py-2">
            <div>🟢 [Mount Phase] constructor - 컴포넌트 생성</div>
            <div className="text-primary">🔍 [Mount & Update Phase] getDerivedStateFromProps</div>
            <div className="pl-4 text-slate-500">
              ➡️ props 색상(#000000)과 state 색상(null)이 다르므로 state 동기화
            </div>
            <div className="text-yellow-600 dark:text-yellow-400">
              🎨 [Render] render - 가상 DOM 렌더링
            </div>
            <div className="text-sky-600 dark:text-sky-400">
              ✨ [Mount Phase] componentDidMount - 첫 렌더링 완료 및 실제 DOM 마운트 완료
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RenderMethod() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">1. render() 메서드</span>
      <div className="w-full">
        <CodeBlock content="render() {...}" />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        컴포넌트의 모양새를 정의하기 때문에 가장 중요한 메서드이며 라이프 사이클 메서드 중 유일한
        필수 메서드입니다. 메서드 내부에서 this.state, this.props에 접근 가능하며 리액트 요소를
        반환합니다.
      </p>
      <p className="leading-relaxed text-sm sm:text-base text-red-500 dark:text-red-400 font-medium">
        ⚠️ 주의: 메서드 내부에서 이벤트 핸들러 외부의 setState를 무조건 호출하면 무한 루프가
        발생하며, 직접 브라우저 DOM을 제어해서도 안 됩니다. DOM 제어는 componentDidMount에서
        처리되어야 합니다.
      </p>
    </div>
  )
}

export function ConstructorMethod() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        2. constructor 메서드
      </span>
      <div className="w-full">
        <CodeBlock content="constructor(props) {...}" />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        컴포넌트의 생성자 메서드로, 컴포넌트가 메모리에 인스턴스화될 때 가장 먼저 호출됩니다. 초기
        state 설정 및 바인딩 등을 진행하는 용도입니다.
      </p>
    </div>
  )
}

export function GetDerivedStateFromPropsMethod() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        3. getDerivedStateFromProps 메서드
      </span>
      <div className="w-full">
        <CodeBlock
          content={`static getDerivedStateFromProps(nextProps, prevState) {\n  if(nextProps.value !== prevState.value) {\n    return { value: nextProps.value }\n  }\n  return null;\n}`}
        />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        v16.3 이후에 설계된 메서드로, props로 받아온 값을 내부 state에 결합/동기화할 때 사용합니다.
        컴포넌트가 마운트될 때와 업데이트될 때 모두 자동 실행됩니다.
      </p>
    </div>
  )
}

export function ComponentDidMount() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        4. componentDidMount 메서드
      </span>
      <div className="w-full">
        <CodeBlock content="componentDidMount() {...}" />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        컴포넌트가 렌더링을 완전히 마친 뒤 실행됩니다. JS 외부 라이브러리 연동, 이벤트 등록,
        setTimeout/setInterval 예약, 네트워크 API 요청 등 비동기 사이드 이펙트를 안전하게 처리할 수
        있는 타이밍입니다.
      </p>
    </div>
  )
}

export function ShouldComponentUpdate() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        5. shouldComponentUpdate 메서드
      </span>
      <div className="w-full">
        <CodeBlock content="shouldComponentUpdate(nextProps, nextState) {...}" />
      </div>
      <div className="leading-relaxed text-sm sm:text-base flex flex-col gap-1.5">
        <p>
          props나 state가 바뀌었을 때 컴포넌트 리렌더링 작업을 계속 진행할지 여부를 결정합니다.
          반드시 true 또는 false를 반환해야 합니다.
        </p>
        <p>
          메서드를 명시하지 않으면 기본적으로 true를 반환하며, 성능 최적화를 위해 false를
          반환함으로써 특정 렌더링 작업을 건너뛰게 만들 수 있습니다.
        </p>
      </div>
    </div>
  )
}

export function GetSnapshotBeforeUpdate() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        6. getSnapshotBeforeUpdate 메서드
      </span>
      <div className="w-full">
        <CodeBlock
          content={`getSnapshotBeforeUpdate(prevProps, prevState) {\n  if(prevState.array !== this.state.array) {\n    const { scrollTop, scrollHeight } = this.list\n    return { scrollTop, scrollHeight };\n  }\n  return null;\n}`}
        />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        렌더링을 통해 연산된 결과가 실제 브라우저 DOM에 반영되기 바로 직전 단계에서 실행되며, 이
        시점의 DOM 상태(예: 스크롤 위치)를 캡처해 반환하면 이 값을 componentDidUpdate의 세 번째
        인수인 snapshot으로 전달받아 후처리 할 수 있습니다.
      </p>
    </div>
  )
}

export function ComponentDidUpdate() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        7. componentDidUpdate 메서드
      </span>
      <div className="w-full">
        <CodeBlock content="componentDidUpdate(prevProps, prevState, snapshot) {...}" />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        리렌더링 및 브라우저 DOM 반영이 완전히 완료된 직후 실행됩니다. DOM에 직접 접근해 스타일을
        수정하거나 이전 값과 대조하여 추가적인 API 요청을 전송하기에 적합합니다.
      </p>
    </div>
  )
}

export function ComponentWillUnmount() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        8. componentWillUnmount 메서드
      </span>
      <div className="w-full">
        <CodeBlock content="componentWillUnmount() {...}" />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        컴포넌트가 DOM에서 완전히 제거(언마운트)되기 직전에 수행됩니다. componentDidMount에서 수행한
        타이머 제거, 글로벌 이벤트 바인딩 해제 등 클린업 코드를 작성하는 공간입니다.
      </p>
    </div>
  )
}

export function ComponentDidCatch() {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <span className="font-bold text-base-heading text-sm sm:text-base">
        9. componentDidCatch 메서드
      </span>
      <div className="w-full">
        <CodeBlock
          content={`componentDidCatch(error, info) {\n  this.setState({\n    error: true\n  });\n  console.log({ error, info })\n}`}
        />
      </div>
      <p className="leading-relaxed text-sm sm:text-base">
        하위 자식 컴포넌트 렌더링 도중 예외 에러가 던져졌을 때 이를 포착(Error Boundary)하여
        프로그램이 뻗지 않고 대체 에러 화면을 노출할 수 있도록 지원하는 특수한 메서드입니다.
      </p>
    </div>
  )
}

export function LifeCycleGraph() {
  const steps = [
    { title: '마운트', desc: '페이지에 컴포넌트가 나타나는 과정' },
    { title: '업데이트', desc: '데이터 변경으로 리렌더링되는 과정' },
    { title: '언마운트', desc: 'DOM에서 컴포넌트가 소멸하는 과정' },
  ]
  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 py-6 w-full">
      {steps.map(({ title, desc }) => (
        <div
          key={title}
          className="flex-1 border border-base-border/50 bg-black/5 dark:bg-white/5 rounded-xl p-5 flex flex-col justify-center items-center gap-2 text-center"
        >
          <span className="text-base-heading font-extrabold text-lg">{title}</span>
          <p className="text-xs sm:text-sm text-slate-500 leading-normal">{desc}</p>
        </div>
      ))}
    </div>
  )
}

function Mount({
  selectedMethod,
  onSelectMethod,
}: {
  selectedMethod: SelectedMethod | null
  onSelectMethod: (method: SelectedMethod) => void
}) {
  return (
    <div className="py-6">
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">1. 마운트</h3>
      <p className="text-sm sm:text-base mb-4">
        DOM이 생성되고 웹 브라우저 상에 나타나는 것을 의미합니다.
      </p>
      <div className="flex flex-col gap-3 max-w-3xl bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-base-border/40">
        <MountMethod title="컴포넌트 만들기" desc="인스턴스 생성" isArrow={true} />
        <MountMethod
          title="constructor"
          desc="생성자 함수 호출"
          isArrow={true}
          onShowCode={() => onSelectMethod('constructor')}
          isSelected={selectedMethod === 'constructor'}
        />
        <MountMethod
          title="getDerivedStateFromProps"
          desc="Props를 State와 동기화"
          isArrow={true}
          onShowCode={() => onSelectMethod('getDerivedStateFromProps')}
          isSelected={selectedMethod === 'getDerivedStateFromProps'}
        />
        <MountMethod
          title="render"
          desc="UI 렌더링"
          isArrow={true}
          onShowCode={() => onSelectMethod('render')}
          isSelected={selectedMethod === 'render'}
        />
        <MountMethod
          title="componentDidMount"
          desc="첫 마운트 직후 사이드 이펙트 실행"
          isArrow={false}
          onShowCode={() => onSelectMethod('componentDidMount')}
          isSelected={selectedMethod === 'componentDidMount'}
        />
      </div>
    </div>
  )
}

function Update({
  selectedMethod,
  onSelectMethod,
}: {
  selectedMethod: SelectedMethod | null
  onSelectMethod: (method: SelectedMethod) => void
}) {
  return (
    <div className="py-6">
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">2. 업데이트</h3>
      <p className="text-sm sm:text-base mb-2">
        다음 4가지 경우에 리렌더링 및 업데이트가 발생합니다:
      </p>
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-semibold mb-4">
        <span className="bg-black/10 dark:bg-white/5 border border-base-border/50 px-2.5 py-1 rounded">
          1. props 변경
        </span>
        <span className="bg-black/10 dark:bg-white/5 border border-base-border/50 px-2.5 py-1 rounded">
          2. state 변경
        </span>
        <span className="bg-black/10 dark:bg-white/5 border border-base-border/50 px-2.5 py-1 rounded">
          3. 부모 컴포넌트 리렌더링
        </span>
        <span className="bg-black/10 dark:bg-white/5 border border-base-border/50 px-2.5 py-1 rounded">
          4. forceUpdate 호출
        </span>
      </div>
      <div className="flex flex-col gap-3 max-w-3xl bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-base-border/40">
        <UpdateMethod title="업데이트 요인 발생" desc="Props/State 등 상태 변화" isArrow={true} />
        <UpdateMethod
          title="getDerivedStateFromProps"
          desc="Props 데이터 동기화"
          isArrow={true}
          onShowCode={() => onSelectMethod('getDerivedStateFromProps')}
          isSelected={selectedMethod === 'getDerivedStateFromProps'}
        />
        <UpdateMethod
          title="shouldComponentUpdate"
          desc="업데이트 작업 진행 여부 결정 (true/false)"
          isArrow={true}
          onShowCode={() => onSelectMethod('shouldComponentUpdate')}
          isSelected={selectedMethod === 'shouldComponentUpdate'}
        />
        <UpdateMethod
          title="render"
          desc="재렌더링"
          isArrow={true}
          onShowCode={() => onSelectMethod('render')}
          isSelected={selectedMethod === 'render'}
        />
        <UpdateMethod
          title="getSnapshotBeforeUpdate"
          desc="실제 DOM 반영 바로 전 상태 캡처"
          isArrow={true}
          onShowCode={() => onSelectMethod('getSnapshotBeforeUpdate')}
          isSelected={selectedMethod === 'getSnapshotBeforeUpdate'}
        />
        <UpdateMethod title="DOM 업데이트" desc="브라우저 상에 변경된 DOM 출력" isArrow={true} />
        <UpdateMethod
          title="componentDidUpdate"
          desc="업데이트 완료 직후 조작"
          isArrow={false}
          onShowCode={() => onSelectMethod('componentDidUpdate')}
          isSelected={selectedMethod === 'componentDidUpdate'}
        />
      </div>
    </div>
  )
}

function Unmount({
  selectedMethod,
  onSelectMethod,
}: {
  selectedMethod: SelectedMethod | null
  onSelectMethod: (method: SelectedMethod) => void
}) {
  return (
    <div className="py-6">
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">3. 언마운트</h3>
      <p className="text-sm sm:text-base mb-4">
        컴포넌트를 실제 브라우저 DOM 상에서 완전히 걷어내는 과정입니다.
      </p>
      <div className="flex flex-col gap-3 max-w-3xl bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-base-border/40">
        <UnmountMethod title="언마운트 작업 실행" desc="DOM에서 컴포넌트 탈착" isArrow={true} />
        <UnmountMethod
          title="componentWillUnmount"
          desc="클린업 정리 작업 전송"
          isArrow={false}
          onShowCode={() => onSelectMethod('componentWillUnmount')}
          isSelected={selectedMethod === 'componentWillUnmount'}
        />
      </div>
    </div>
  )
}

export const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 text-slate-400/60 my-0.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export function MountMethod({
  title,
  desc,
  isArrow,
  onShowCode,
  isSelected,
}: {
  title: string
  desc: string
  isArrow: boolean
  onShowCode?: () => void
  isSelected?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-pink-500/5 border rounded-lg transition-all ${
          isSelected
            ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_12px_rgba(236,72,153,0.2)]'
            : 'border-pink-500/20'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-52.5 justify-between sm:justify-start">
          <span className="font-bold text-primary text-sm">{title}</span>
          {onShowCode && (
            <button
              onClick={onShowCode}
              className="px-2 py-0.5 text-[10px] font-semibold border rounded border-pink-500/30 text-primary bg-pink-500/5 hover:bg-pink-500/25 transition-all font-mono cursor-pointer"
            >
              코드 보기
            </button>
          )}
        </div>
        <span className="text-xs sm:text-sm text-slate-500 flex-1">{desc}</span>
      </div>
      {isArrow && (
        <div className="flex justify-center sm:justify-start sm:pl-10">
          <Arrow />
        </div>
      )}
    </div>
  )
}

export function UnmountMethod({
  title,
  desc,
  isArrow,
  onShowCode,
  isSelected,
}: {
  title: string
  desc: string
  isArrow: boolean
  onShowCode?: () => void
  isSelected?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-yellow-500/5 border rounded-lg transition-all ${
          isSelected
            ? 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_12px_rgba(234,179,8,0.2)]'
            : 'border-yellow-500/20'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-52.5 justify-between sm:justify-start">
          <span className="font-bold text-yellow-600 dark:text-yellow-400 text-sm">{title}</span>
          {onShowCode && (
            <button
              onClick={onShowCode}
              className="px-2 py-0.5 text-[10px] font-semibold border rounded border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/5 hover:bg-yellow-500/25 transition-all font-mono cursor-pointer"
            >
              코드 보기
            </button>
          )}
        </div>
        <span className="text-xs sm:text-sm text-slate-500 flex-1">{desc}</span>
      </div>
      {isArrow && (
        <div className="flex justify-center sm:justify-start sm:pl-10">
          <Arrow />
        </div>
      )}
    </div>
  )
}

export function UpdateMethod({
  title,
  desc,
  isArrow,
  onShowCode,
  isSelected,
}: {
  title: string
  desc: string
  isArrow: boolean
  onShowCode?: () => void
  isSelected?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-blue-500/5 border rounded-lg transition-all ${
          isSelected
            ? 'border-sky-500 bg-blue-500/10 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
            : 'border-blue-500/20'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-52.5 justify-between sm:justify-start">
          <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">{title}</span>
          {onShowCode && (
            <button
              onClick={onShowCode}
              className="px-2 py-0.5 text-[10px] font-semibold border rounded border-sky-500/30 text-sky-600 dark:text-sky-400 bg-blue-500/5 hover:bg-blue-500/25 transition-all font-mono cursor-pointer"
            >
              코드 보기
            </button>
          )}
        </div>
        <span className="text-xs sm:text-sm text-slate-500 flex-1">{desc}</span>
      </div>
      {isArrow && (
        <div className="flex justify-center sm:justify-start sm:pl-10">
          <Arrow />
        </div>
      )}
    </div>
  )
}

export function ClassVsFunctionalLifeCycle() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-bold text-base-heading border-b border-base-border/30 pb-3 mb-2">
        # 함수형 + useEffect로의 매핑
      </h2>
      <p className="leading-relaxed text-sm sm:text-base">
        함수형 컴포넌트는 클래스형 생명주기 메서드 대신{' '}
        <code className="code-tag pink">useEffect</code> 및 React API를 활용해 동일한 작업을
        수행합니다. 아래의 핵심 대응표와 구현 예제를 통해 패러다임의 변화를 비교해 보세요.
      </p>

      {/* 상단: 코드 비교 (2단 그리드) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* 클래스형 컴포넌트 코드 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold bg-pink-500/10 border border-pink-500/20 text-primary rounded-md">
              Class
            </span>
            <h3 className="text-lg font-bold text-base-heading">클래스형 컴포넌트</h3>
          </div>
          <CodeBlock content={TIMER_CLASS_CODE} />
        </div>

        {/* 함수형 컴포넌트 코드 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold bg-blue-500/10 border border-blue-500/20 text-sky-600 dark:text-sky-400 rounded-md">
              Function
            </span>
            <h3 className="text-lg font-bold text-base-heading">함수형 컴포넌트 (useEffect)</h3>
          </div>
          <CodeBlock content={TIMER_FUNCTION_CODE} />
        </div>
      </div>

      {/* 하단: 주요 메서드 및 매핑 테이블 (flex-col) */}
      <div className="flex flex-col gap-8 mt-6">
        {/* 주요 메서드 정리 테이블 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm sm:text-base text-base-heading">
            • 주요 메서드 정리
          </h4>
          <div className="overflow-x-auto rounded-lg border border-base-border/50 bg-black/5 dark:bg-white/5">
            <table className="min-w-full divide-y divide-base-border/30 text-left text-xs sm:text-sm">
              <thead className="bg-black/10 dark:bg-white/5 text-base-heading font-semibold">
                <tr>
                  <th className="px-4 py-3">메서드</th>
                  <th className="px-4 py-3">호출 시점</th>
                  <th className="px-4 py-3">용도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-border/30">
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">constructor</td>
                  <td className="px-4 py-3 text-slate-400">인스턴스 생성</td>
                  <td className="px-4 py-3 text-slate-400">state 초기화, 바인딩</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">render</td>
                  <td className="px-4 py-3 text-slate-400">매 렌더</td>
                  <td className="px-4 py-3 text-slate-400">UI 계산(순수)</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">componentDidMount</td>
                  <td className="px-4 py-3 text-slate-400">첫 렌더 커밋 후</td>
                  <td className="px-4 py-3 text-slate-400">데이터 로드, 구독</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    shouldComponentUpdate
                  </td>
                  <td className="px-4 py-3 text-slate-400">업데이트 전</td>
                  <td className="px-4 py-3 text-slate-400">리렌더 여부 결정(최적화)</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    getDerivedStateFromProps
                  </td>
                  <td className="px-4 py-3 text-slate-400">렌더 전</td>
                  <td className="px-4 py-3 text-slate-400">props로 state 파생</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    getSnapshotBeforeUpdate
                  </td>
                  <td className="px-4 py-3 text-slate-400">DOM 반영 직전</td>
                  <td className="px-4 py-3 text-slate-400">스크롤 위치 등 캡처</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">componentDidUpdate</td>
                  <td className="px-4 py-3 text-slate-400">업데이트 커밋 후</td>
                  <td className="px-4 py-3 text-slate-400">변경 후처리</td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    componentWillUnmount
                  </td>
                  <td className="px-4 py-3 text-slate-400">제거 직전</td>
                  <td className="px-4 py-3 text-slate-400">정리</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 함수형 + useEffect로의 매핑 테이블 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm sm:text-base text-base-heading">
            • 함수형 + useEffect로의 매핑
          </h4>
          <div className="overflow-x-auto rounded-lg border border-base-border/50 bg-black/5 dark:bg-white/5">
            <table className="min-w-full divide-y divide-base-border/30 text-left text-xs sm:text-sm">
              <thead className="bg-black/10 dark:bg-white/5 text-base-heading font-semibold">
                <tr>
                  <th className="px-4 py-3">클래스 생명주기</th>
                  <th className="px-4 py-3">함수형 (useEffect / API)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-border/30">
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">componentDidMount</td>
                  <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400">
                    {'useEffect(() => { ... }, [])'}
                  </td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">componentDidUpdate</td>
                  <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400">
                    {'useEffect(() => { ... }, [dep])'}
                  </td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    componentWillUnmount
                  </td>
                  <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400">
                    {'useEffect(() => { return () => { ... } }, [])'}
                  </td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    shouldComponentUpdate
                  </td>
                  <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400">
                    React.memo + useMemo / useCallback
                  </td>
                </tr>
                <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold">
                    getDerivedStateFromProps
                  </td>
                  <td className="px-4 py-3 text-slate-400">렌더 중 계산 or key로 상태 리셋</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 사고방식의 전환 */}
      <div className="border-l-4 border-violet-500 pl-4 py-3 bg-violet-500/10 rounded-r-lg mt-6">
        <h4 className="font-bold text-violet-600 dark:text-violet-400 text-sm sm:text-base mb-1">
          💡 사고방식의 전환
        </h4>
        <p className="leading-relaxed text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
          클래스는 <strong>'시점(언제)'</strong>을 중심으로 생각합니다 (마운트될 때, 업데이트될 때).
          <br />
          반면 함수형은 <strong>'동기화(무엇과 무엇을 맞출까)'</strong>를 중심으로 생각합니다.
          <code>useEffect</code>는 "이 의존성과 외부 시스템을 동기화하라"는 선언입니다.
        </p>
      </div>
    </div>
  )
}
