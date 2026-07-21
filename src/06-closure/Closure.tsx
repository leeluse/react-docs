import CodeBlock from '../components/CodeBlock'

const REACT_CLOSURE_EXM = `
function Component() {
  const [first, setfirst] = useState(second)

  function handleClick() {
    // useState 호출은 위에서 끝났지만,
    // setState는 계속 최신값(prev)를 알고 있다
    // 이는 클로저를 활용했기 때문이다
    setState((prev) => prev + 1)
  
  }
  
}
`

const CLOSURE_EXM = `
function add() {
  const a = 18 // a의 유효 범위: add, innerAdd
  function innerAdd() {
    const b = 20 // b의 유효 범위: innerAdd
    console.log(a + b);
  }
  innerAdd();
}
add()
`

const CLOSURE_EXM2 = `
var global = \n'global scope'

function hello() {
  console.log(global)
}
console.log(global) // global scope
hello() // global scope
console.log(global === window.global) // true
`

const CLOSURE_EXM3 = `
if(true) {
  var global = 'global scope'
}
console.log(global) // 'global scope'
console.log(global === window.global) // true
`

const CLOSURE_EXM4 = `
var x = 10

function foo() {
  var x = 100
  console.log(x) // 100

  function bar() {
    var x = 1000
    console.log(x) // 1000                   
  }
}
console.log(x)
`

const CLOSURE_EXM5 = `
function outerFunction() {
  var x = 'hello'
  function innerFunction() {
    console.log(x)  
  }
  return innerFunction  
}

const innerFunction = outerFunction()
innerFunction() // "hello"
`
const CLOSURE_EXM6 = `
// 해당 counter 변수의 문제점
// 1. 전역 레벨에 선언되어 있어 window.counter를 활용하면 누구나 쉽게 해당 변수에 접근 가능하다
// ㄴ 그렇기에 useState는 리액트가 별도로 관리하는 클로저 내부에서만 접근 가능하다
var counter = 0

function handleClick() {
  counter++
}
`

const CLOSURE_EXM7 = `
function Counter() {
  var counter = 0

  return {
    increase: function () {
      return ++counter
    },
    decrease: function () {
      return --counter
    },
    counter: function () {
      console.log("counter에 접근!")
      return counter
    }
  }
}

var c = Counter()

console.log(c.increase()) // 1
console.log(c.increase()) // 2
`
const CLOSURE_EXM8 = `
  for(var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000)
  }    
`

const CLOSURE_EXM9 = `
  for(var i = 0; i < 5; i++) {
    setTimeout(
      function(sec) {
        return function() {
          console.log(sec)
        }}(i),
      i*1000
    )
  }    
`
const CLOSURE_EXM10 = `
// 일반적인 함수
  const aButton = document.getElementById('a')
  
  function heavyJob() {
    const longArr = Array.from({ length: 10000 }, (_, i) => i + 1)
    console.log(longArr.length)
  }

  aButton.addEventListener('click', heavyJob)
`
const CLOSURE_EXM11 = `
// 긴 작업을 클로저로 처리
  function heavyJobWithClosure() {
    const longArr = Array.from({ length: 10000 }, (_, i) => i + 1)
    return function() {
      console.log(longArr.length)
    }
  }
    
  const innerFunc = heavyJobWithClosure()
  bButton.addEventListener('click', function() {
    innerFunc()
  })
`

export default function Closure() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
        # Closure
      </h1>

      <article className="flex flex-col gap-3">
        <h2 className="font-bold text-xl sm:text-2xl text-primary">클로저의 정의</h2>
        <div className="flex flex-col gap-3 text-sm sm:text-base leading-relaxed">
          <p className="font-semibold text-base sm:text-lg text-base-heading mt-2">• Closure란?</p>
          <p>
            클로저는 함수와 함수가 선언된 어휘적(Lexical Scope) 환경의 조합입니다. 16.8 버전을
            기점으로 클로저라는 개념이 리액트에서 적극적으로 사용됨에 따라
            <span className="font-semibold text-base-heading">
              리액트의 작동 원리는 클로저를 빼놓고서 이해하기 어렵습니다.
            </span>
          </p>

          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              <p className="leading-relaxed">
                <span className="border-b border-base-border/70 pb-0.5 text-base-heading font-medium">
                  함수와 함수가 선언된 어휘적 환경의 조합
                </span>
                이라는 문장에서 가장 이해하기 어려운 부분은
                <span className="text-primary font-semibold">어휘적 환경</span>일 것입니다.
              </p>
              <div className="flex flex-col p-4 border border-base-border/50 bg-black/5 dark:bg-white/5 rounded-lg text-xs sm:text-sm gap-1.5">
                <span>{`add 함수 내부 -> 변수 a, 함수 innerAdd`}</span>
                <span className="pl-3">{`innerAdd 함수 내부 -> 변수 b`}</span>
                <span className="pl-3 text-primary">{`외부에 있는 a, 내부 변수 b -> 합한 30을 출력`}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CodeBlock content={CLOSURE_EXM} />
            </div>
          </div>
        </div>
      </article>

      <article className="flex flex-col gap-4 mt-6">
        <h2 className="font-bold text-xl sm:text-2xl text-primary">변수의 유효 범위, 스코프</h2>
        <p className="text-sm sm:text-base leading-relaxed">
          클로저는 변수의 유효 범위에 따라서 어휘적 환경이 결정되는데 이를 스코프라고 하며, JS는
          다양한 스코프가 존재합니다.
        </p>

        <h3 className="font-semibold text-base sm:text-lg text-base-heading mt-2">
          • 전역 스코프 (Global Scope)
        </h3>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <CodeBlock content={CLOSURE_EXM2} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-4 text-sm sm:text-base">
            <p className="leading-relaxed">
              전역 스코프에 선언한 변수는 코드 어디서든 호출 가능합니다. 브라우저 환경에서의 전역
              객체는 window, Node.js 환경에서는 global이며, 이 객체에 전역 레벨 스코프가
              바인딩됩니다.
            </p>
            <div className="flex gap-4 justify-center items-center w-full mt-2">
              <div className="flex-1 border p-4 border-pink-500/25 bg-pink-500/5 rounded-lg text-center">
                <span className="text-xs sm:text-sm font-semibold text-base-heading">
                  브라우저 환경
                </span>
                <div className="p-2 border border-pink-500/20 bg-pink-500/10 mt-2 rounded font-mono text-xs text-primary font-bold">
                  window
                </div>
              </div>
              <div className="flex-1 border p-4 border-sky-500/25 bg-sky-500/5 rounded-lg text-center">
                <span className="text-xs sm:text-sm font-semibold text-base-heading">
                  Node.js 환경
                </span>
                <div className="p-2 border border-sky-500/20 bg-sky-500/10 mt-2 rounded font-mono text-xs text-sky-600 dark:text-sky-400 font-bold">
                  global
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-base sm:text-lg text-base-heading mt-4">
          • 함수 스코프 (Function Scope)
        </h3>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <CodeBlock content={CLOSURE_EXM3} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-2 text-sm sm:text-base leading-relaxed">
            <p>
              JS는 기본적으로 함수 레벨 스코프를 따르며, if문 등의 {} 블록은 기본적으로 스코프
              범위를 새로 결정하지 않습니다.
            </p>
            <p>
              위 코드에서 global 변수는 if문 블록 내부에 선언되었으나 외부에서도 접근 가능합니다.
              <span className="text-primary font-semibold">
                (var 선언 변수는 함수형 스코프만 따르기 때문)
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex-1 min-w-0">
            <CodeBlock content={CLOSURE_EXM4} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-3 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-base-heading">• 중첩된 스코프가 존재하는 경우</p>
            <p>
              자바스크립트의 스코프는 식별자를 검색할 때 가장 가까운 안쪽 스코프에서 바깥쪽으로
              순차적으로 확인합니다. (Scope Chain)
            </p>
            <div className="flex flex-col gap-2 text-xs sm:text-sm mt-1">
              <div className="flex items-center gap-2">
                <span className="border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 rounded-lg font-medium text-amber-800 dark:text-amber-300 min-w-37.5 text-center">
                  bar 내부 스코프
                </span>
                <span>&rarr;</span>
                <span className="border border-base-border bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg font-mono text-base-heading">
                  var x = 1000 참조
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-pink-500/20 bg-pink-500/10 px-3 py-1.5 rounded-lg font-medium text-primary min-w-37.5 text-center">
                  foo 내부 스코프
                </span>
                <span>&rarr;</span>
                <span className="border border-base-border bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg font-mono text-base-heading">
                  var x = 100 참조
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 rounded-lg font-medium text-purple-700 dark:text-purple-300 min-w-37.5 text-center">
                  전역 스코프
                </span>
                <span>&rarr;</span>
                <span className="border border-base-border bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg font-mono text-base-heading">
                  var x = 10 참조
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="flex flex-col gap-3 mt-6">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• 클로저의 활용</h3>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <CodeBlock content={CLOSURE_EXM5} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-4 text-sm sm:text-base leading-relaxed">
            <div className="flex flex-col border border-base-border/50 bg-black/5 dark:bg-white/5 p-4 rounded-lg gap-2">
              <p className="font-semibold text-base-heading">
                함수 스코프의 상태 보존 &rarr;{' '}
                <span className="text-primary font-bold">클로저</span>
              </p>
              <ol className="list-decimal list-inside text-xs sm:text-sm flex flex-col gap-1 text-base-text">
                <li>자바스크립트 함수는 본인이 선언될 때의 렉시컬 스코프를 기억합니다.</li>
                <li>해당 함수가 외부에서 호출되더라도 그 내부 스코프 상태에 접근이 가능합니다.</li>
              </ol>
            </div>
            <ul className="flex flex-col gap-1.5 list-disc list-inside mt-1 text-xs sm:text-sm">
              <li>outerFunction이 innerFunction을 반환하고 종료됩니다.</li>
              <li>반환된 함수를 변수에 할당해 실행합니다.</li>
              <li>
                실행 시 참조하는 변수 x는 이미 생명주기가 끝난 outerFunction의 스코프를 유지해
                가리킵니다.
              </li>
              <li className="text-primary font-semibold">
                반환받은 자식 함수를 통해 소멸했어야 할 부모 함수의 변수에 계속해서 동적으로
                접근합니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 min-w-0 my-3">
          <p className="font-semibold text-md sm:border-l-2 sm:pl-4 border-pink-400/50 text-pink-400/70">
            누구나 접근이 가능하다는 것은, <span>누구나 수정이 가능하다는 것이다</span>
          </p>
          <CodeBlock content={CLOSURE_EXM6} />
          <CodeBlock content={CLOSURE_EXM7} />
          <ul className="mt-4 leading-relaxed flex flex-col gap-2 list-inside text-xs sm:text-sm ">
            <span className="text-base-heading font-bold mb-1">해당 코드 작성 시 이점</span>
            <li className="bg-black/5 dark:bg-white/5 px-1 rounded border border-base-border/30">
              counter 변수의 캡슐화
            </li>
            <li className="bg-black/5 dark:bg-white/5 px-1 rounded border border-base-border/30">
              외부로부터의 직접 접근 제한(메서드로부터 변수 수정 가능) 동작
              <span className="pl-2 text-xs text-primary"> 예: 리액트의 useState</span>
            </li>
          </ul>
          <li className="py-10">
            <p className="text-amber-300">
              useState 함수 호출이 Component 내부 첫 줄에서 종료 됐는데, 왜 setState에서 prev를
              사용할 수 있을까?
            </p>
            <span className="border-b border-b-amber-300/40 px-2 pb-1 text-white">
              {`-> useState는 클로저가 활용된 React Hook`}
            </span>
            <CodeBlock content={REACT_CLOSURE_EXM} />
            <p className="pt-2">
              외부 함수인 <span className="text-pink-300">useState</span>가 반환한 내부 함수, 즉
              메서드인 <span className="text-green-300">setState</span>는 useState의 지역 변수를
              클로저를 통해 기억하기 때문에, 호출이 끝나도 자신이 선언된 외부 함수가 선언되어있는
              환경<span className="text-slate-500">(state가 저장되어 있는 렉시컬 환경)</span>을
              기억하기 때문에, 계속해서 state를 사용할 수 있고, 이전 값을 참조할 수 있는 것이다.
            </p>
          </li>
        </div>
      </article>
      <article className="text-sm sm:text-md ">
        <h2 className="font-bold text-xl sm:text-2xl text-primary">주의할 점</h2>
        <hr className="my-2 border-base-border/40" />
        <p className="pt-2">
          클로저는 굉장히 어렵고 다루기 쉽지 않은 개념이기도 하며 사용 시 주의해야 한다
        </p>
        <CodeBlock content={CLOSURE_EXM8} />
        <p className="flex flex-col">
          <span>• 위 코드의 의도: 0부터 시작해 1초 간격으로 consoel.log(i)를 출력</span>
          <span className="text-amber-300/80">• 실제 동작: 0, 1, 2, 3, 4 초 뒤 5만 출력</span>
        </p>
        <div className="border p-3 my-4 flex flex-col gap-1 rounded ">
          <p className="font-semibold text-base-heading">
            <span className="">{`모두 5로 출력되는 이유는? -> `}</span>
            <span className="font-semibold text-primary">i는 전역 변수로 동작하고 있다</span>
          </p>

          <span className="whitespace-pre-line">
            {` 자바스크립트는 함수 레벨 스코프를 따르기 때문에, var는 for문의 존재와 상관없이 해당 구문이 선언된 함수 레벨 스코프를 바라보고 있게 된다.              함수 내부 실행이 아니라면 전역 스코프에 var i가 등록되어 있을 것이다.
              for문을 다 순화한 이후, setTimeout을 실행하려 했을 때는 이미 태스크 큐의 var i는 이미 5로 업데이트되어 있을 것이다.`}
          </span>
          <p className="text-white/80">
            해결 방법: <span className="text-pink-300">함수 레벨 스코프를 갖는 var</span> 대신{' '}
            <span className="text-blue-300">블록 레벨 스코프를 갖는 let</span> 사용하기
          </p>
        </div>
        <CodeBlock content={CLOSURE_EXM9} />
        <div className="border-l-2 border-blue-300/60 pl-4 my-3">
          <p className="whitespace-pre pb-2">
            이 함수는 for문 내부에 <span className="code-tag pink">function(sec)</span>으로 즉시
            실행 익명 함수를 선언했다.
          </p>
          <p className="whitespace-pre pb-2">
            이 즉시 실행 함수를 i를 인수로 받는데, 이 함수 내부에서 이를{' '}
            <span className="code-tag blue">sec</span>
            이라고 하는 인수에 저장해 두었다가 <span className="code-tag">setTimeout</span>의 콜백
            함수에 넘기게 된다.
          </p>
          <p>
            이렇게 될 경우 <span className="code-tag">setTimeout</span>의 콜백 함수가 바라보는
            클로저는 즉시 실행 함수가 되는데, 이 즉시 실행 익명 함수는 각 for문마다 생성되고
            실행되기를 반복한다.
          </p>
          <p>
            즉, 고유한 <span className="code-tag blue">sec</span>를 가지게 되므로 올바르게 실행할 수
            있게 된다
          </p>
        </div>
      </article>
      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h2 className="font-bold text-xl sm:text-2xl text-primary">어휘적 비용</h2>
        <p className="flex flex-col">
          <span>
            클로저는{' '}
            <span className="font-bold text-white">함수와 함수가 선언된 어휘적 환경의 조합</span>을
            봐야 한다
          </span>
          <span>
            클로저를 사용할 때는 비용이 들고, 클로저가 생성될 때마다 선언적 환경을 기억해야 하기
            때문에 추가 비용이 든다
          </span>
        </p>
        <div className="flex sm:flex-row flex-col gap-4">
          <CodeBlock content={CLOSURE_EXM10} />
          <CodeBlock content={CLOSURE_EXM11} />
        </div>
        <div className="p-4 rounded-lg border border-base-border/50 bg-black/5 dark:bg-white/5 my-4 flex flex-col gap-3">
          <p className="leading-relaxed">
            데모 및 힙 스냅샷 분석을 통해 알 수 있듯이,{' '}
            <strong>클로저를 사용하는 방식이 메모리 관점에서 압도적으로 부정적인 영향</strong>을
            미치고 있다.
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-xs sm:text-sm pl-2 leading-relaxed">
            <li>
              <span className="font-semibold text-base-heading">
                클로저 방식 (<span className="code-tag text-xs">heavyJobWithClosure</span>)
              </span>
              : 클로저의 기본 원리에 따라 내부 함수가 외부 함수의 선언적 환경(Lexical Environment)을
              계속해서 참조 및 기억하게 된다. 이 때문에 해당 내부 함수가 호출되는 시점이나 사용
              여부와 무관하게, 스크립트가 실행되는 시작 단계부터 대용량 배열이 메모리에 영구적으로
              상주하게 되며 가비지 컬렉터(GC)에 의해 해제되지 않는다.
            </li>
            <li>
              <span className="font-semibold text-base-heading">
                일반 함수 방식 (<span className="code-tag text-xs">heavyJob</span>)
              </span>
              : 함수가 실행(클릭)되는 순간에만 일시적으로 변수가 선언되고 연산이 수행되며, 실행이
              끝남과 동시에 해당 함수 스코프가 종료되므로 대용량 배열의 메모리가 GC에 의해 즉시
              수거되어 상시 메모리 용량에 거의 영향을 주지 않는다.
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-medium">
            💡 결론: 클로저는 강력한 패턴이지만, 대용량 데이터를 처리하는 환경에서는 자원(메서드 및
            참조 변수)이 메모리에 상주할 수 있으므로 생명 주기를 면밀히 고려하여 신중하게 설계해야
            한다.
          </p>
        </div>
      </article>
    </div>
  )
}
