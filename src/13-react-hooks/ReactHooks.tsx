import CodeBlock from '../components/CodeBlock'

const LAZY_INIT_EXM = `
// 게으른 초기화
// 함수를 실행해 값을 반환하는 것이다.
const [value, setValue] = useState(() => Number.parseInt(..))
`
const USESTATE_EXM1 = `
  import { useState } from 'react'

const [first, setfirst] = useState(second)
`

const USESTATE_EXM2 = `
  function Component() {
    let state = 'hello'

    function handleButtonClick() {
      state = 'hi'
    }
    return (
      <>
      <h1>{state}</h1>
      <button onClick={handleButtonClick}>hi</button>
      </>
    )
  }
`

const USESTATE_EXM3 = `
  function Component() {
const [, triggerRerender] = useState(second)
let state = 'hello'

    function handleButtonClick() {
      state = 'hi'
      triggerRerender(1)
    }
    return (
      <>
      <h1>{state}</h1>
      <button onClick={handleButtonClick}>hi</button>
      </>
    )
  }
`

const USESTATE_EXM4 = `
function useState(initialValue) {
  let value = initialValue

  function setValue(newValue) {
    value = newValue
  }

  return [value, setValue]
}
`
const USESTATE_EXM5 = `
fucntion useState(initValue) {
  let internalState = initValue
  
  function state() {
    return internalState
  }

  funtion setState(newValue) {
    internalState = newValue
  }

  return [value, setValue]
}
`

const USESTATE_EXM6 = `
const MyReact = (function () {
  const global = {}
  let index = 0

  function useState(initValue) {
    // 1. 상태 저장 공간 초기화
    if(!global.states) {
      // 애플리케이션 전체의 states 배열을 초기화한다
      // 최초 접근이라면 빈 배열로 초기화한다
      global.states = []
    }  

    // states 정보를 조회해서 현재 상태값이 있는지 확인, 없다면 초깃값
    const currentState = global.states[index] || initialState
    // states의 값을 위에서 조회한 현재 값으로 업데이트
    global.states[index] = currentState

    // 즉시 실행 함수 setter를 만든다
    const setState = (function () {
      // 현재 index를 클로저로 가둬놔서 이후에도 계속해서 동일한 index에 접근할 수 있도록 한다.
      let currentIndex = index
      return function (value) {
        global.states[currentIndex] = value
        // 컴포넌트를 렌더링한다. 실제로 컴포넌트를 렌더링하는 코드는 생략했다.
      }
    })()
    // useState를 쓸 때마다 index를 하나씩 추가한다. 이 index는 setState에서 사용된다.
    // 즉, 하나의 state마다 index가 할당돼 있어 그 index가 배열의 값(global.states)을
    // 가리키고 필요할 때마다 그 값을 가져오게 한다.
    index = index + 1
    
    return [currentState, setState]
  }

  // 실제 useState를 사용하는 컴포넌트
  function Component() { 
    const [value, setValue] = useState(0)
    ...}
  }
})()
`

export default function ReactHooks() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <ReactUseState />
      </section>
    </div>
  )
}

export function ReactUseState() {
  return (
    <section>
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useState</h2>
      <p>함수 컴포넌트 내부에서 상태를 정의하고 상태를 관리할 수 있게 하는 훅</p>
      <p className="border-l-2 border-primary pl-2 py-2 text-white bg-primary/10 mt-2">
        useState 훅 사용법
      </p>
      <div className="flex py-3">
        <div className="flex-1">
          <CodeBlock content={USESTATE_EXM1} />
        </div>
        <ul className="flex-1 list-decimal ml-5 pl-6 text-sm bg-pink-400/20 rounded-lg py-3 border border-pink-400/50">
          <li>
            인수로 <code className="text-pink-400">state</code>의 초깃값 전달 (아무것도 넘겨주지
            않을 경우 초깃값은 undefined)
          </li>
          <li>반환값은 배열</li>
          <li>
            첫 번째 원소: <code className="text-pink-400">state</code> 값 자체를 사용 가능
            <br /> 두 번째 원소: 함수로서 <code className="text-pink-400">state</code>의 값 변경
            가능
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white"># 해당 코드가 동작하지 않는 이유?</h4>
        <CodeBlock content={USESTATE_EXM2} />
        <p>
          리액트에서 렌더링은 함수 컴포넌트의 <code className="text-sky-200">return</code>, 클래스
          컴포넌트의 <code className="text-amber-100">render</code> 함수를 통해서 이뤄짐
        </p>
        <p>이 실행 결과를 이전 리액트 트리와 비교해 리렌더링이 필요한 부분만 업데이트함</p>
      </div>
      <div>
        <div className="pt-5">
          <h4 className="font-bold text-white"># state가 변경되지 않는 이유는?</h4>
          <CodeBlock content={USESTATE_EXM3} />
          <p>
            <code className="code-tag pink">triggerRender()</code>를 호출해서 리액트에 렌더링이
            일어나게끔 했지만{' '}
            <span className="text-white">state는 변경된 값이 렌되링되지는 않는다</span>
          </p>
          <p>
            함수 컴포넌트에서 <code className="text-sky-200">return</code>의 반환 결과물을
            비교하도록 실행하지만{' '}
            <span className="bg-slate-300/20 text-slate-300">
              매번 렌더링 발생 == 함수는 새롭게 다시 실행
            </span>
            을 의미하고, 새롭게 실행된 함수에서 state는 매번 <code>hello</code>로 초기화되기
            때문이다
          </p>
        </div>
      </div>

      <article>
        <h3 className="font-bold text-md sm:text-lg text-white pt-10">useState 구조 파악하기</h3>
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex flex-1 flex-col">
            <CodeBlock content={USESTATE_EXM4} />
          </div>
          <p className="flex flex-1 flex-col gap-3">
            <span className="font-bold mt-2 text-primary">상태가 변경되지 않는 이유?</span>
            <code className="whitespace-pre-wrap bg-black/20 p-2 rounded-lg inline-block text-emerald-500/80">
              {`const [value, setValue] = useState(0)\nsetValue(1)\n\nconsole.log(value) // 0`}
            </code>
            <span>
              setValue로 변경했지만 구조 분해 할당으로 이미 state의 값(value)를 할당해 놓은
              상태이기에 반영 안 됨
            </span>
          </p>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex flex-1 flex-col">
            <CodeBlock content={USESTATE_EXM5} />
          </div>
          <p className="flex flex-1 flex-col gap-3">
            <span className="font-bold mt-2 text-pink-400">상태가 변경되는 이유</span>
            <code className="whitespace-pre-wrap bg-black/20 p-2 rounded-lg inline-block text-emerald-500/80">
              {`const [value, setValue] = useState(0)\nsetValue(1)\n\nconsole.log(value) // 1`}
            </code>
            <p>우리는 state를 상수처럼 사용하던 것을 함수로서 사용해 줬다</p>
            <p>
              리액트의 <span className="text-primary">클로저</span>를 이용해서, 함수가 종료된
              이후에도 스코프 내부의 지역 변수를 참조하도록 하는 것이다
            </p>
          </p>
        </div>
        <div className="py-5">
          <h3 className="font-bold text-primary border-l-2 pl-3">
            리액트의 useState Hook 구현 코드 예제
          </h3>
          <CodeBlock content={USESTATE_EXM6} />
          <p>* 실제 리액트 코드에서는 useReducer로 구현되어 있다</p>
        </div>
      </article>
      <div>
        <p className="text-lg font-bold text-white">게으른 초기화(lazy initialization)</p>
        <CodeBlock content={LAZY_INIT_EXM} />
        <p>
          게으른 초기화는 함수를 직접 실행하고 해당 함수의 반환 값을 인자로 전달하는 것인데,
          초기값이 복잡하고 무거운 연산이 있을 경우 사용하게끔 권장되어 있다
        </p>
        <p>게으른 초기화 함수는 state가 처음 만들어질 때만 사용된다(리렌더링 시 무시됨)</p>
      </div>
    </section>
  )
}
