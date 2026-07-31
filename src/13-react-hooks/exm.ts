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
