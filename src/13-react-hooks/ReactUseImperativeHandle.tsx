import CodeBlock from '../components/CodeBlock'
import { USEIMPERATIVEHANDLE_EXM1, USEIMPERATIVEHANDLE_EXM2, USEIMPERATIVEHANDLE_EXM3 } from './exm'

export default function ReactUseImperativeHandle() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <ImperativeHandleHeader />
        <WhatIsImperativeHandle />
      </section>
    </div>
  )
}

export function WhatIsImperativeHandle() {
  return (
    <section id="what-is-imperative-handle">
      <h3 className="text-lg text-white font-bold pt-4">ImperativeHandle이란?</h3>
      <div className="py-4">
        <p>부모에게 넘겨 받은 ref를 원하는 대로 수정할 수 있는 훅이다</p>
        <CodeBlock content={USEIMPERATIVEHANDLE_EXM2} />
        <CodeBlock content={USEIMPERATIVEHANDLE_EXM3} />
        <p>
          <code className="text-white">useImperativeHandle</code>을 사용하면 부모 컴포넌트에서
          노출되는 값을 원하는 대로 바꿀 수 있다
        </p>
        <p>
          원래 ref는 <code className="code-tag pink">{`{current: <HTMLElement>}`}</code>와 같은
          형태로 <span className="bg-slate-400/20 px-2 rounded text-white">HTMLElement</span>만 주입
          가능한 객체지만, 여기선 전달받은 ref에{' '}
          <code className="text-white">useImperativeHandle</code> 훅을 사용해서 추가적인 동작을
          정의한다
        </p>
      </div>
    </section>
  )
}

export function ImperativeHandleHeader() {
  return (
    <section id="use-imperative-handle">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useImperativeHandle</h2>
      <p>실제 개발 과정에서 자주 볼 수 없는 훅이지만 일부 사례에서 유용하게 활용된다</p>
      <h3 className="text-lg text-white font-bold pt-4">forwardRef란?</h3>
      <div className="py-2">
        <p>
          <code className="text-white">ref</code>는{' '}
          <span className="border-b">useRef의 반환 객체</span>로, 리액트 컴포넌트의 props인{' '}
          <code className="text-white">ref</code>에 넣어 DOM에 접근하는 용도로 주로 사용된다
        </p>
        <p>
          key와 마찬가지로 <code className="text-white">ref</code>도 리액트에서 컴포넌트의 props로
          사용 가능한 예약어로서 별도로 선언되어 있지 않음에도 사용 가능하다
        </p>
        <div className="border p-3 my-4 rounded-lg border-slate-500/50 bg-slate-700/20">
          <p className="pb-2 text-white">
            상위 컴포넌트에서 <code className="text-slate-400">예약어 ref</code>를 props로 넘긴다면
            아래와 같은 경고문과 <code className="text-slate-400">undefined</code>가 반환되는 것을
            알 수 있다
          </p>
          <div className="flex flex-col gap-2">
            <CodeBlock content="<ChildComponent ref={inputRef} />" />
            <code className="text-gray-500">
              `ref` is not a prop. Trying to access it will result in `undefiend` being returned. If
              you neet to access the same value within the child component, you should pass it as a
              diffrent prop
            </code>
          </div>
          <p className="pt-4 pb-2 text-white">
            이를 전달하기 위해서는 아래처럼 <code className="text-slate-400">예약어 ref</code>가
            아닌 다른 props로 전달해 줘야 한다
          </p>
          <div className="flex flex-col gap-2">
            <CodeBlock content="<ChildComponent parentRef={inputRef} />" />
          </div>
        </div>
        <div>
          <p>
            이와 같은 기능을 제공하는 것이 forwordRef인데, 단순히 props로 구현할 수 있음에도 왜
            사용할까?
          </p>
          <p className="border-l-2 pl-3 text-primary mt-2 font-semibold">
            forwordRef는 <code>ref</code>를 전달하는 데 있어 일관성을 유지 가능
          </p>
          <CodeBlock content={USEIMPERATIVEHANDLE_EXM1} />
          <p>
            forwardRef를 사용하면 부모 컴포넌트에서 동일하게 props.ref를 통해 ref를 넘겨줄 수 있게
            된다
          </p>
        </div>
        <h4 className="mt-6 border border-red-400/50 rounded-lg py-5 px-4 text-red-300/70 font-semibold">
          ❗React 19에서는 forwardRef 없이 일반 prop처럼 ref를 받을 수 있다
        </h4>
      </div>
    </section>
  )
}
