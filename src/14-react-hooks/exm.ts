export const USEDEBUGVALUE_EXM1 = `
// 현재 시간을 반환하는 사용자 정의 훅
function useDate() {
  const date = new Date()

  useDebugValue(date, (date) => 현재 시간 + date.toISOString())
  return date
}
`

export const USEDEBUGVALUE_EXM2 = `
export default function App() {
  const date = useDate()
  const [counter, setCounter] = useState(0)

  function handleClick() {
    setCounter((prev) => prev + 1)
  }

  return (
    <div>
      <h1>{counter} {date.toISOString()}</h1>
      <button onClick={handleClick}>+</button>
    </div>
  )

}
`

export const USELAYOUTEFFECT_EXM1 = `
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect', count)
  }, [count])
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect', count)
  }, [count])

  function handleClick() {
    setCount((prev) => prev + 1)
  }
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>up</button>
    </>
  )
}
`

export const USEIMPERATIVEHANDLE_EXM2 = `
const Input = forwardRef((props, ref) => {
// useImperativeHandle을 사용하면 ref의 동작을 추가 정의할 수 있다
  useImperativeHandle(
    ref, () => ({ 
      alert: () => alert(props.value),
      // useEffect의 deps와 같다
    }), [props.value]
  )
  return <input ref={ref} {...props} />
})
`

export const USEIMPERATIVEHANDLE_EXM3 = `
function App() {
  // input에 사용할 ref
  const inputRef = useRef()
  // input의 value
  const [text, setText] = useState('')

  function handleClick() {
    inputRef.current.alert()
  }

  function handleChange(e) {
    setText(e.target.value)
  }
  return (
    <>
      <Input ref={inputRef} value={text} onChange={handleChange} />
      <button onClick={handleClick}>Focus</button>
    </>
  )
  
}
`

export const USEIMPERATIVEHANDLE_EXM1 = `
const ChildComponent = forwardRef((props, ref) => {
    return <input ref={ref} />
  }
)
function ParentComponent() {
  const inputRef = useRef()
  return (
      <ChildComponent ref={inputRef} />
  )
}
`

export const USEREDUCER_EXM5 = `
const useReducer = (reducer, initArg, init) => {
  const [state, setState] = useState(
  // 초기화 함수 있을 경우 초기값과 초기화 함수 실행
  // 없을 경우 초기값
   init ? init(initArg) : initArg
  )

  // 값을 업데이트하는 dispatch를 넣어 준다
  const dispatch = useCallback(
    (action) => setState((prev) => reducer(prev, action)),
    [reducer],
  )

  return useMemo(() => [state, dispatch], [state, dispatch])
}
`
export const USEREDUCER_EXM4 = `
  export default function App() {
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
      <>
        <div>{state.count}</div>
        <button onClick={handleUpButtonClick}>up</button>
        <button onClick={handleDownButtonClick}>down</button>
        <button onClick={handleResetButtonClick}>reset</button>
      </>
    )
  }
`

export const USEREDUCER_EXM1 = `
type State = {
  count: number
}
type Action = {
  type: 'up' | 'down' | 'reset';
  payload?: State
}
`

export const USEREDUCER_EXM2 = `
// 무거운 연산이 포함된 게으른 초기화 함수
function init(count: State): State {
  // count: State를 받아서 초깃값을
  // 어떻게 정의할 지 연산하면 된다
  return count
}
// 초기값 설정
const initialState = {
  count: 0
}
`
export const USEREDUCER_EXM3 = `
// state와 action을 기반으로 state가 어떻게 변경될지 정의
function reducer(state: State, action: Action)
  : State {
  switch (action.type) {
  // action의 타입이 'up'일 경우
    case 'up':
      return { count: state.count + 1 }
  // action의 타입이 'down'일 경우
    case 'down':
      return { count: state.count - 1 > 0 
               ? state.count - 1 : 0}
  // action의 타입이 'reset'일 경우
    case 'reset':
      return init(action.payload || { count: 0 })
    default:
      throw new Error('Unexpected action type')
  }
}
`

export const USECONTEXT_EXM2 = `
const MyContext = createContext<{ hello: string } | undefined>(undefined)

function ParentComponent({
  children,
  text
}: PRopsWithChildren) {
  return (
    <MyContext.Provider value={{ hello: 'react' }}>{children}</MyContext.Provider>
  )
}

function useMyContext() {
  const context = useContext(MyContext)
  if(context === undefined) {
    throw new Error(
      'useMyContext는 ContextProvider 내부에서만 사용할 수 있습니다.',
    )
  }
  return context
}

function ChildComponent() {
  // 타입이 명확히 설정돼 있어 굳이 undefined 체크를 하지 않아도 된다
  // 이 컴포넌트가 Provider 하위에 없다면 에러가 발생할 것이다
  const { hello } = useMycontext()
  return <>{hello}</>
}


function ParentComponent() {
  return (
    <>
      <ContextProvider text='react'>
        <ChildComponent />
      </Context.Provider>
    </>
  )
}
`

export const USECONTEXT_EXM1 = `
const Context = createContext<{ hello: string } | undefined>(undefined)

function ParentComponent() {
  return (
    <>
    <Context.Provider value={{ hello: 'react' }}>
      <Context.Provider value={{ hello: 'react' }}>
        <Child />
      </Context.Provider>
    </Context.Provider>
    </>
  )
}
function ChildComponent() {
  const value = useContext(Context)
  
  // react가 아닌 javascript가 반환된다.
  return <>{value ? value.hello : ''}</>
}
`

export const USEREF_EXM4 = `
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value]) // value가 변경되면 그 값을 ref에 넣어 둔다

  return ref.current
}

function SomeComponent() {
  const [counter, setCounter] = useState(0)
  const previousCounter = usePrevious(counter)

    // 0
    // 1, 0
    // 2, 1
    // 3, 2
    return (
      <button onClick={handleClick}>
        {counter} {previousCounter}
      </button>
    )

}
`

export const USEREF_EXM3 = `
function RefComponent() {
  const inputRef = useRef()

  // 이때는 미처 렌더링이 실행되기 전(반환되기 전)이므로 undefined를 반환한다
  console.log(inputRef.current)

  useEffect(() => {
    console.log(inputRef.current)  // <input type="text"></input>
  }, [inputRef])

  return (
    <input ref={inputRef} type="text" />
  )
}
`

export const USEREF_EXM2 = `
let value = 0

function Component() {
  function handleClick() {
    value += 1  
  }

  //..
}
`

export const USEREF_EXM1 = `
function RefComponent() {
  const count = useRef(0)

  function handleClick() {
    count.current += 1
  }
  // 버튼을 아무리 눌러도 변경된 count 값이 렌더링되지 않음
  return <button onClick={handleClick}>{count.current}</button>
}
`

export const USECALLBACK_EXM2 = `
  const toggle1 = useCallback(() => {
    setStatus1(!status1)
  }, [status1])

  const toggle2 = useCallback(() => {
    setStatus2(!status2)
  }, [status2])
  `

export const USECALLBACK_EXM1 = `
  const ChildComponent = memo(({ name, value, onChange }) => {
    // 렌더링이 수행되는지 확인하기 위해 넣음
    useEffect(() => {
      console.log('rendering!, name)
    })

    return (
      <>
        <h1>{name}</h1>
        <button onClick={onClick}>toggle</button>
      </>
    )
  })

  function App() {
    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)

  }

  const toggle1 = () => {
    setStatus1(!status1)
  }

  const toggle2 = () => {
    setStatus2(!status2)
  }

  return (
    <>
      <ChildComponent name="1" value={status1} onChange={toggle1}/>
      <ChildComponent name="2" value={status2} onChange={toggle2}/>
    </>
  )
}
`

export const USEMEMO_EXM2 = `
  function ExpensiveComponent({ value }) {
    useEffect(() => {
      console.log('rendering!')
    })
    return <span>{value + 1000}</span>
  }

  function App() {
    const [value, setValue] = useState(10)
    const [, triggerRendering] = useState(false)
  }

  // 컴포넌트의 props를 기준으로 컴포넌트 자체를 메모이제이션했다.
  const MemoizedComponent = useMemo(
    () => <ExpensiveComponent value={value} />,
    [value],
  )

  function handleChange(e) {
    setValue(Number(e.target.value))
  }

  function handleClick() {
    triggerRendering((prev) => !prev)
  }
  
  return (
    <>
      <input value={value} onChange={handleChange} />
      <button onClick={handleClick}>렌더링 발생!</button>
      {MemoizedComponent}
    </>
  )
}
`

export const USEMEMO_EXM1 = `
const memoizedValue = duseMemo(() => expensiveComputation(a, b), [a, b])
`

export const USEEFFECT_EXM8 = `
useEffect(async () => {
  //useEffect에 async 함수를 넣어주면 아래 에러 발생
  // Effect callbacks are synchronous to prevent race conditions
  const response = await fetch('https://some.data.com')
  const data = await response.json()
  setData(data)
}, [])
`

export const USEEFFECT_EXM7_3 = `
function Component({id}: {id: string}) {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    ;(
    async () => {
      const result = await fetchInfo(id, {signal: controller.signal})
      setInfo(info)
      } )()
    
  }, [id])
  return <div>...</div>
}
`

export const USEEFFECT_EXM7_2 = `
function Component({id}: {id: string}) {
  const [info, setInfo] = useState(null)
  const constrollerRef = useRef(0)
  const fetchInformation = useCallback(async (fetchId: string) => {
    constrollerRef.current?.abort()
    constrollerRef.current = new AbortController()

    const result = await fetchInfo(fetchId, { signal: controllerRef.signal })
    setInfo(await result.json())

    }, [])

    useEffect(() => {
      fetchInformation(id)
      return () => {
        controllerRef.current?.abort()
      }
    }, [id, fetchInformation])
    return <div>...</div>
}
`

export const USEEFFECT_EXM7_1 = `
useEffect(
  function logActiveUser() {
    logging(user.id)
}, [user.id])
`

export const USEEFFECT_EXM6 = `
const MyReact = (function () {
  const global = {
    hooks: [],
  }

  let index = 0

  function useEffect(callback, dependencies) {
    const hooks = global.hooks

    // 이전 훅 정보가 있는지 확인한다
    const previousDependencies = hooks[index]

    // 변경 됐는 지 확인
    // 이전 값이 있다면 이전 값을 얕은 비교로 비교해 변경이 일어났는지 확인한다
    // 이전 값이 없다면 최초 실행이므로 변경이 일어난 것으로 간주해 실행을 유도한다
    const isDependenciesChanged = previousDependencies
      ? dependencies.some(
          (value, idx) =>
            !Object.is(value, previousDependencies[idx]),
        )
      : true

  // 변경이 일어났다면 첫 번째 인수인 콜백 함수를 실행
    if (isDependenciesChanged) {
      callback()
    }

  //  현재 의존성을 훅에 다시 저장한다
    hooks[index] = dependencies
  // 다음 훅이 일어날 때를 대비하기 위해 index 추가한다
    index++
  }

  return { useEffect }
})()
`

export const USEEFFECT_EXM5 = `
function Component() {
  console.log('렌더링됨')
}

function Component() {
  useEffect(() => {
    console.log('렌더링됨')
  })
}
`

export const USEEFFECT_EXM4 = `
export default function App() {
  const [counter, setCounter] = useState(0)

  function handleClick() {
    setCounter((prev) => prev + 1)
  }

  useEffect(() => {
    function addMouseEvent() {
      console.log(counter)
    }
  }
  
  window.addEventListner('click', addMouseEvent)

  // 클린업 함수
  return() => {
    console.log("클린 업 함수 실행!", counter)
    window.removeEventListner('click', addMouseEvent) 
   }
  }, [counter])

  return (
  <>
  <h1>{counter}</h1>
  <button onClick={handleClick}>Add</button>
  </>
  )
}
`

export const USEEFFECT_EXM3 = `
클린업 함수 실행! 0
1

클린업 함수 실행! 1
2

클린업 함수 실행! 2
3

클린업 함수 실행! 3
4
`

export const USEEFFECT_EXM2 = `
function Component() {
 const [counter, setCounter] = useState(0)
 
 useEffect(() => {
  console.log('useEffect')
 }, [counter])

 function handleClick() {
  setCounter((prev) => prev + 1) 
 }

 return (
  <>
  <h1>{counter}</h1>
  <button onClick={handleClick}>Add</button>
  </>
 )
}
`

export const USEEFFECT_EXM1 = `
function Component() {
  // ... 
  useEffect(() => {
    // do something
  }, [props, state])
}
`

export const LAZY_INIT_EXM = `
// 게으른 초기화
// 함수를 실행해 값을 반환하는 것이다.
const [value, setValue] = useState(() => Number.parseInt(..))
`

export const USESTATE_EXM1 = `
  import { useState } from 'react'

const [first, setfirst] = useState(second)
`

export const USESTATE_EXM2 = `
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

export const USESTATE_EXM3 = `
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

export const USESTATE_EXM4 = `
function useState(initialValue) {
  let value = initialValue

  function setValue(newValue) {
    value = newValue
  }

  return [value, setValue]
}
`
export const USESTATE_EXM5 = `
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

export const USESTATE_EXM6 = `
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
