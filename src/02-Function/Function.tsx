import { Arrow } from '../07-life-cycle/LifeCycle'
import CodeBlock from '../components/CodeBlock'

export default function Function() {
  return (
    <section className="flex flex-col m-5 gap-15 py-25">
      <h1 className="text-[45px] font-bold text-white"># Function</h1>
      <WhatIsFunction />
      <HowToFunction />
      <FunctionRules />
    </section>
  )
}

function WhatIsFunction() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">함수란 무엇인가?</h2>
      <p className="font-bold text-[15px] py-2 text-white">• 함수의 기본 정의</p>
      <p>
        자바스크립트에서 말하는 함수는 값을 행하거나 계산하는 등의 과정을 표현하고, 이를 하나의
        블록으로 감싸서 실행 단위 만들어 놓은 것을 의미한다.
      </p>
      <div className="flex gap-5 py-5">
        <section className="flex-1">
          <CodeBlock
            content="function sum(a,b) {
        return a + b;
      }
      sub(10, 24) // 34
      "
          />
        </section>
        <section className="flex-1">
          <div className="flex flex-col text-[15px] w-fit">
            <span>• function으로 시작해 닫는 괄호까지가 함수를 정의한 부분이다</span>
            <span>• a, b는 각각 매개변수라고 하고 return으로 작성된 것이 반환값이다</span>
            <span>• 리액트의 함수 컴포넌트 또한 이러한 기초적 형태를 따라 만들어진 것</span>
            <div className="text-white flex flex-col items-center my-6 text-sm">
              <span className="border px-5 py-2 rounded">Component라는 함수 선언</span>
              <Arrow />
              <span className="border px-5 py-2 rounded">props라는 단일 객체를 받음</span>
              <Arrow />
              <span className="border px-5 py-2 rounded">return문으로 JSX 반환</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function HowToFunction() {
  return (
    <main>
      <h2 className="font-bold text-2xl text-primary">함수의 종류?</h2>
      <article className="py-3 text-sm">
        <p className="font-bold text-[15px] text-white">• 함수 선언문 </p>
        <CodeBlock
          content={`function add(a, b) {
          return a + b
        }`}
        />
        <p>
          표현식이란 무언가 값을 산출하는 구문을 의미하는데, 함수 선언문은 표현식이 아닌 일반
          문(statement)으로 분류된다
        </p>
        <p>앞선 함수 선언으로는 어떤 값도 표현되지 않았기 때문에 표현식이 아니라 문이다</p>
        <p className="text-purple-300">
          함수 선언문은 말 그대로 '선언'이며 어떤 값도 표현하지 않으므로 표현식과는 다르게 변수에
          할당할 수 없는 것이 자연스럽다
        </p>
      </article>
      <article className="py-5 text-sm">
        <p className="font-bold text-[15px] text-white">• 함수 표현식 </p>
        <div className="border p-3 rounded m-4 border-slate-400/40">
          <h3 className="font-bold text-primary">일급 객체란?</h3>
          <span className="whitespace-pre">
            {`프로그래밍에서 일급 객체는 다른 객체들에게 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 말함\n`}
          </span>
          <span className="whitespace-pre font-semibold text-white/80 text-xs">{`JS에서 함수는 일급 객체임\n`}</span>
          <span className="whitespace-pre  text-pink-300/70 text-xs">{`-> 함수는 다른 함수의 매개변수가 될 수 있음\n`}</span>
          <span className="whitespace-pre  text-pink-300/70 text-xs">{`-> 함수는 반환값이 될 수 있음\n`}</span>
          <span className="whitespace-pre  text-pink-300/70 text-xs">{`-> 함수는 할당이 가능함\n`}</span>
        </div>
        <CodeBlock
          content={`const sum = function (a, b) {
              return a + b;
            }
sum(10, 24) // 34
              `}
        />
        <p className="pb-4">
          함수 표현식에서는 할당하려는 함수의 이름을 생략하는 것이 일반적이다(위의 sum과 같이)
        </p>
        <CodeBlock
          content={`
            const sum = function add(a, b) {
              // 함수 몸통에서 현재 실행 중인 함수를 참조하는 데 사용할 수 있다.
              // 실제 프로덕션에서는 절대 사용하지 않고 그러지 않아야 한다.
    console.log(arguments.callee.name)
    return a + b
}
sum(10, 24)
// add
add(10, 24) // Uncaught ReferenceError: add is not defined`}
        />
        <span className="whitespace-pre">
          위 함수 표현식 예제에서는 실제로 함수를 호출하기 위해 사용한 것은 sum이다
        </span>
        <span className="whitespace-pre bg-blue-500/20">
          add는 실제 함수 내부에서만 유효한 "식별자"일 뿐 함수 외부에서 호출하는 데 사용할 수 없는
          식별자이다
        </span>
        <span className="whitespace-pre text-red-400/70">
          함수 표현식에서 함수에 이름을 주는 것은 함수 호출에 전혀 도움이 안 되는, 코드를 읽는 데
          방해만 되는 요소임을 알 수 있다
        </span>
      </article>

      <section className="border rounded  border-slate-400/40 p-3 my-3 text-sm flex flex-col">
        <h2 className="font-bold text-purple-500 pb-2 text-md">
          함수 표현식과 함수 선언식의 차이?
        </h2>
        <span>
          함수 표현식과 함수 선언 식 외 두 가지 함수 선언 방식을 보기 전에 이 두 방식의 차이점을
          알아야 한다
        </span>
        <span>둘의 가장 큰 차이점은 호이스팅(hoistring) 여부이다</span>
        <div className="py-3 flex flex-col">
          <h4 className="text-white text-md font-semibold">호이스팅이란?</h4>
          <span>
            함수의 호이스팅은 함수 선언문이 마치 코드 맨 앞단에 작성된 것처럼 작동하는 JS의 특징이다
          </span>
          <CodeBlock
            content={`
              hello() // hello

// 함수 선언식
function hello() { // 함수가 중간에서 선언되었어도 정상적으로 동작
  console.log('hello')
}

hello() // hello
            `}
          />
          <span>
            함수의 호이스팅은 함수에 대한 선언을 실행 전에 미리 메모리에 등록하는 작업을 의미한다
          </span>
          <span className="text-pink-300 pb-4">
            이런 함수의 호이스팅이라는 특징으로 함수 선언문이 미리 메모리에 등록이 되었고 코드
            순서와 상관없이 정상적으로 함수를 호출할 수 있게 된다
          </span>
          <CodeBlock
            content={`
             console.log(typeof hello === 'undefined') // true

hello() // ReferenceError: hello is not defined
 
// 함수 표현식
var hello = function () {
  console.log('hello')
}

hello() // hello
            `}
          />
          <span>함수 표현식은 함수를 변수에 할당했다 해도 변수에 대한 호이스팅으로 적용된다</span>
          <span>
            var는 호이스팅 시점에 undefined로 초기화되기 때문에, 앞선 함수 선언문과 달리 정상적으로
            호출되지 않는다
          </span>
          <div className="flex gap-2 py-3 items-center justify-center">
            <span className="text-white border border-purple-400 p-2 rounded">
              런타임 이전: undefined로 초기화
            </span>
            <span className="text-white border border-blue-400 p-2 rounded">
              런타임 시점: 함수가 할당되어 동작
            </span>
          </div>
        </div>
      </section>
      <article className="py-5 text-sm flex flex-col">
        <p className="font-bold text-[15px] text-white">• Function 생성자</p>
        <CodeBlock
          content={`const add = new Function('a', 'b', 'return a + b')

add(10, 24)
              `}
        />
        <span>
          new 키워드를 사용해 함수를 생성하고 매개변수, 함수의 몸통을 모두 문자열로 작성해야 한다는
          특징으로 보았을 때 이는 좋은 선택은 아니다
        </span>
        <span>
          그렇기 때문에 생성자 함수를 사용해서 함수를 만드는 방식은 JS에서 eval을 사용하는 것만큼
          권장되지 않는다
        </span>
      </article>
      <article className="py-5 text-sm flex flex-col">
        <p className="font-bold text-[15px] text-white">• 화살표 함수</p>
        <CodeBlock
          content={`const add = (a, b) => {
              return a + b
            }

const add = (a, b) => a + b
              `}
        />
        <span>
          ES6에서 새롭게 추가된 함수 생성 방식이며 JS 개발자들 사이에서 각광받는 함수 정의 방식이다
        </span>
        <span>
          {`function이라는 키워드 대신 => 라는 화살표를 활용해서 함수를 만드는 편리성이 있다`}
        </span>
        <div className="p-3 border rounded m-3 border-slate-400/40">
          <h4 className="text-white font-bold">화살표 함수의 특징</h4>
          <ol>
            <li className="p-1">
              <span className="text-slate-300">
                1. construct 사용 불가 - 생성자 함수로 화살표 함수를 사용하는 것은 불가능
              </span>
              <CodeBlock
                content="const Car = (name) => { this.name = name }

const myCar = new Car('하이')            "
              />
            </li>
            <li className="p-1">
              <span className="text-slate-300">2. arguments가 존재하지 않음</span>
              <CodeBlock
                content="function hello() {
  console.log(arguments)
}
// Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]
hello(1, 2, 3)

const hi = () => {
  console.log(arguments)
}
// ReferenceError: arguments is not defined
hi(1, 2, 3)
                "
              />
            </li>
            <li className="p-1">
              <span className="text-slate-300">3. this 바인딩 - 가장 큰 차이점</span>
              <div className="flex flex-col">
                <span className="text-amber-100/80">{`• this -> 자신이 속한 객체나 자신이 생성할 인스턴스를 가리키는 값`}</span>
                <span className="text-amber-100/50">{`• 함수에서의 this -> 함수가 정의될 때 결정 X 함수가 호출될 때 결정 O`}</span>
                <span className="">일반 함수: this는 그 내부의 전역 객체를 가리킴</span>
              </div>
              <span className="">
                화살표 함수: 함수 자체의 바인딩이 없다 / 화살표 함수 내부에서 this를 참조하면 상위
                스코프의 this를 그대로 따름
              </span>
            </li>
          </ol>
        </div>
      </article>

      <article className="py-5 text-sm flex flex-col">
        <p className="font-bold text-[15px] text-white">• 즉시 실행 함수</p>
        <span>
          말 그대로 함수를 정의하는 순간 즉시 실행되는 함수를 의미하며 단 한 번만 호출되고 다시
          호출할 수 없는 함수다
        </span>
        <CodeBlock
          content="
        (function (a, b){
  return a + b
})(10, 24) // 34

((a, b) => {
  return a + b
},)(10, 24) // 34
        "
        />
        <span>
          함수 특성상 글로벌 스코프를 오염시키지 않는 독립적인 함수 스코프를 운용할 수 있다는 장점이
          있으며, 함수의 선언과 실행이 바로 그 자리에서 끝나기 때문에 즉시 실행 함수 내부에 있는
          값은 그 함수 내부가 아니고서야 접근 불가능
        </span>
        <span>
          코드 리뷰자 입장에서 다시 호출되지 않는다는 점을 각인시킬 수 있어 리팩토링 시 도움이 된다
        </span>
      </article>
      <article className="py-5 text-sm flex flex-col">
        <p className="font-bold text-[15px] text-white">• 고차 함수</p>
        <span>
          JS 함수가 일급 객체라는 특징을 활용하면 함수를 인수로 받거나 결과를 함수로 반환할 수
          있는데, 이런 함수를 고차 함수라고 한다
        </span>
        <CodeBlock
          content="
// ------------------------------------
// 함수를 매개변수로 받는 대표적 고차 함수, Array.prototype.map
const doubledArray = [1, 2, 3].map((item) => item * 2)
doubleArray // [2, 4, 6]

// ------------------------------------
// 함수를 반환하는 고차 함수
const add = function (a) {
  // a가 존재하는 클로저를 생성
  return function(b) {
    // b를 인수로 받아 두 합을 반환하는 또 다른 함수를 생성
    return a + b
  }
}
  add(1)(3) // 4
        "
        />
        <span>
          함수 특성상 글로벌 스코프를 오염시키지 않는 독립적인 함수 스코프를 운용할 수 있다는 장점이
          있으며, 함수의 선언과 실행이 바로 그 자리에서 끝나기 때문에 즉시 실행 함수 내부에 있는
          값은 그 함수 내부가 아니고서야 접근 불가능
        </span>
        <span>
          코드 리뷰자 입장에서 다시 호출되지 않는다는 점을 각인시킬 수 있어 리팩토링 시 도움이 된다
        </span>
      </article>
    </main>
  )
}

function FunctionRules() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary py-5">함수 생성 시 주의사항</h2>
      <article>
        <p className="font-bold text-white">• 사이드 이펙트를 억제하라</p>
        <p className="text-[15px]">
          함수의 부수 효과(side-effect)란 함수의 동작으로 인해 함수가 아닌 함수 외부에 끼치는
          영향으로, 부수 효과가 없는 함수를 순수 함수(pure function)라고 한다
        </p>
        <div className="flex gap-5 py-5">
          <section className="flex-1">
            <CodeBlock
              content="function PureComponent(props) {
      const {a, b} = props;
      return <div>{a + b}</div>
}
      "
            />
          </section>
          <section className="flex-1">
            <div className="flex flex-col text-[15px] w-fit">
              <span className="whitespace-pre">{`• 동일한 인수를 받으면 동일한 결과를 반환해야 한다\n    함수 실행과 결과가 예측 가능하도록 설계하자`}</span>
              <span className="whitespace-pre">{`• 작동 와중에 외부에 어떤 영향도 미치면 안 된다\n    useEffect의 작동을 최소화하자!`}</span>
            </div>
          </section>
        </div>
      </article>
      <article className="text-[15px] py-4">
        <p className="font-bold text-white text-[17px]">• 가능한 한 작게 만들어라</p>
        <p className="">
          JS 개발자들이 프로젝트를 만들 때 ESLint에
          <span className="font-semibold text-pink-400/80"> max-lines-per-function</span>
          이라는 규칙을 사용한다 이는 함수당 코드가 길어질 수록 Code Smell(코드 냄새)가 날 확률이
          커지기 때문이다
        </p>
        <p className=" text-purple-200/60">
          * 이 규칙은 기본적으로 50줄 이상이 넘어가면 과도하게 커진 함수로 분류되어 경고를
          출력하도록 한다
        </p>
        <p>이 외에도 얼마나 콜백이 많은지, 중첩이 많은지 이 규칙을 통해 확인 가능하다</p>
      </article>
      <article className="text-[15px] py-4">
        <p className="font-bold text-white text-[17px]">• 이해하기 쉬운 이름을 붙여라</p>
        <p className="">
          함수나 변수 네이밍은 시간이 지나도 중요하며 서비스가 점차 커지고 비즈니스 로직이 들어가는
          코드가 많을수록 더욱 어려워진다
        </p>
        <p className="">
          프로젝트 내부 프레임워크에
          <span className="font-semibold text-yellow-400/80"> Terser</span>가 설치되어 있다면 한글로
          네이밍하는 것도 좋은 방법이다
        </p>
        <p className=" text-purple-200/60">
          * 이것은 JS 코드를 맹글링(mangling, 코드를 컴파일러가 이해할 수 있는 수준으로 단순화)한다
        </p>
        <section className="border-s-2 p-3 m-3 border-s-slate-400">
          <span className="text-white">hook의 콜백 함수에 네이밍 짓기</span>
          <p>
            useEffect나 useCallback 등의 훅에 넘겨 주는 콜백 함수에 네이밍을 붙여 주면 가독성에
            도움이 된다
          </p>
          <CodeBlock
            content="
            useEffect(function apiRequest() {
      // api 요청을 보내는 로직
}, [])
        "
          />
        </section>
      </article>
    </div>
  )
}
