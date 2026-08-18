import { useReducer } from 'react'
import CodeBlock from '../components/CodeBlock'
import {
  USEREDUCER_EXM1,
  USEREDUCER_EXM2,
  USEREDUCER_EXM3,
  USEREDUCER_EXM4,
  USEREDUCER_EXM5,
} from './exm'

export default function ReactUseReducer() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <ReducerHeader />
        <ReducerExm />
        <UseStateToUseReducer />
      </section>
    </div>
  )
}

export function ReducerHeader() {
  return (
    <section id="use-reducer">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useReducer</h2>
      <p>useState의 심화 버전으로 좀 더 복잡한 상태값을 미리 정의해 놓은 시나리오에 따라 관리</p>
      <div className="flex flex-col gap-3 py-2">
        <p className="text-white">• 반환값은 useState와 동일하게 길이가 2인 배열이다</p>
        <p>
          <span className="ml-4 bg-primary/30 px-3 py-1 mr-2 rounded text-white">
            <code>state</code>
          </span>
          현재 useReducer가 갖고 있는 값을 의미하며 반환하는 배열의 첫 번째 요소
        </p>
        <p>
          <span className="ml-4 bg-primary/30 px-3 py-1 mr-2 rounded text-white">
            <code>dispatcher</code>
          </span>
          state를 업데이트하는 함수로 useReducer가 반환하는 배열의 두 번째 요소
        </p>
      </div>
      <div className="flex flex-col gap-3 py-2">
        <p className="text-white">• useState의 인수와 달리 2개~3개의 인수를 필요로 한다</p>
        <p>
          <span className="ml-4  bg-pink-400/30 px-3 py-1 mr-2 rounded text-white">
            <code>reducer</code>
          </span>
          useReducer의 기본 action을 정의하는 함수며, 이 <code>reducer</code>는 useReducer의 첫 번째
          인수로 넘겨 줘야 한다
        </p>
        <p>
          <span className="ml-4  bg-pink-400/30 px-3 py-1 mr-2 rounded text-white">
            <code>initialState</code>
          </span>
          두 번째 인수로, useReducer의 초깃값을 의미
        </p>
        <p>
          <span className="ml-4  bg-pink-400/30 px-3 py-1 mr-2 rounded text-white">
            <code>init</code>
          </span>
          useState의 인수로 함수를 넘겨줄 때처럼 초깃값을 지연해서 생성시키고 싶을 때 사용하는 옵션
          함수
        </p>
      </div>
    </section>
  )
}

export function ReducerExm() {
  return (
    <article>
      <h3 className="font-bold text-lg sm:text-xl text-white">useReducer 사용 예시</h3>
      <div className="flex gap-5 py-3">
        <div className="flex flex-col flex-1">
          <h4 className="text-white">상태 및 액션 타입 선언부</h4>
          <CodeBlock content={USEREDUCER_EXM1} />
          <span>• state의 변화를 발생시킬 action의 타입을 정의</span>
          <span>• 넘겨줄 값(payload)를 정의</span>
          <div className="flex flex-col pt-2">
            <CodeBlock content={USEREDUCER_EXM2} />
            <span>• 초기값 및 초기화 함수 설정</span>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h4 className="text-white">Reducer 내부</h4>
          <CodeBlock content={USEREDUCER_EXM3} />
          <span>• state의 변화를 발생시킬 action의 타입을 정의</span>
          <span>• 넘겨줄 값(payload)를 정의</span>
        </div>
      </div>
      <div className="pt-3 flex gap-5">
        <CodeBlock content={USEREDUCER_EXM4} />
        <RealUseReducer />
      </div>
      <div className="mt-8 flex flex-col gap-6 border-t border-base-border/20 pt-6">
        <div className="bg-base-card/10 border border-base-border/20 rounded-xl p-5 flex flex-col gap-3">
          <p className="leading-relaxed text-base-text">
            <span className="text-white font-semibold">useReducer</span>는 state에 대한 접근은
            컴포넌트 내부에서만 가능하게 하고, 상세 정의를 컴포넌트 외부에 위치시켜 이를 통해 사전에
            정의된{' '}
            <code className="text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded text-sm font-semibold">
              dispatcher
            </code>
            로만 상태를 변경할 수 있도록 제한 <br />
            &rarr; 상태 변경 로직이 dispatcher로 캡슐화되어 오직{' '}
            <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm font-semibold">
              reducer
            </code>{' '}
            내부에서만 안전하게 상태 변경
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg sm:text-xl text-white flex items-center gap-2">
            useReducer 사용 시 장점
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-base-border/20 bg-base-card/5 hover:bg-base-card/10 transition-colors">
              <span className="text-primary font-bold text-xs uppercase tracking-wider">
                01. 상태 그룹화
              </span>
              <h5 className="text-white font-semibold text-base">유사한 State 통합 관리</h5>
              <p className="text-sm text-base-text leading-relaxed">
                여러 개의 성격이 비슷한 복잡한 state를 하나의 reducer 안에서 객체 형태로 묶어서
                관리하기에 매우 용이합니다.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-base-border/20 bg-base-card/5 hover:bg-base-card/10 transition-colors">
              <span className="text-pink-400 font-bold text-xs uppercase tracking-wider">
                02. 관심사 분리
              </span>
              <h5 className="text-white font-semibold text-base">비즈니스 로직 분리</h5>
              <p className="text-sm text-base-text leading-relaxed">
                상태를 표현하는 UI 컴포넌트 로직과 실제 복잡한 상태 변경을 유발하는 비즈니스 로직이
                완전히 분리되어 코드 가독성과 유지보수성이 높아집니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function RealUseReducer() {
  type State = {
    count: number
  }
  type Action = {
    type: 'up' | 'down' | 'reset'
    payload?: State
  }

  // 게으른 초기화 함수
  function init(count: State): State {
    return count
  }

  // 초기값
  const initialState = {
    count: 0,
  }

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      // action의 타입이 'up'일 경우
      case 'up':
        return { count: state.count + 1 }
      // action의 타입이 'down'일 경우
      case 'down':
        return { count: state.count - 1 > 0 ? state.count - 1 : 0 }
      // action의 타입이 'reset'일 경우
      case 'reset':
        return init(action.payload || { count: 0 })
      default:
        throw new Error('Unexpected action type')
    }
  }

  const [state, dispatcher] = useReducer(reducer, initialState, init)

  function handleUpButtonClick() {
    dispatcher({ type: 'up' })
  }
  function handleDownButtonClick() {
    dispatcher({ type: 'down' })
  }
  function handleResetButtonClick() {
    dispatcher({ type: 'reset', payload: { count: 1 } })
  }

  return (
    <div className="flex flex-col gap-3 p-4 flex-1 border border-base-border/30 rounded-lg max-w-xs h-fit mt-2 bg-base-card/10">
      <div className="text-xl font-semibold  text-white">Count: {state.count}</div>
      <div className="flex flex-col  gap-2">
        <button
          className="bg-primary/30 px-3 py-1.5 rounded text-white hover:bg-primary/50 transition-colors cursor-pointer text-sm font-medium"
          onClick={handleUpButtonClick}
        >
          up
        </button>
        <button
          className="bg-primary/30 px-3 py-1.5 rounded text-white hover:bg-primary/50 transition-colors cursor-pointer text-sm font-medium"
          onClick={handleDownButtonClick}
        >
          down
        </button>
        <button
          className="bg-primary/30 px-3 py-1.5 rounded text-white hover:bg-primary/50 transition-colors cursor-pointer text-sm font-medium"
          onClick={handleResetButtonClick}
        >
          reset
        </button>
      </div>
    </div>
  )
}

export function UseStateToUseReducer() {
  return (
    <article>
      <h3 className="font-bold text-lg sm:text-xl text-white">useState로 useReducer 구현하기</h3>
      <CodeBlock content={USEREDUCER_EXM5} />
      <p>
        useReducer와 useState 둘의 공통점은 결국 클로저를 활용해 값을 가둬서{' '}
        <code className="text-white">state</code>를 관리한다는 것이다
      </p>
    </article>
  )
}
