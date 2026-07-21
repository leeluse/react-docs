import CodeBlock from '../components/CodeBlock'

const FunctionalExample = `function App() {\n  const name = \'리액트\';\n\n  return (\n    <div className="react">{name}</div>\n  );\n}`

const ClassExample = `class App extends Component {\n  render() {\n    const name = \'react\';\n\n    return (\n      <div className="react">{name}</div>\n    );\n  }\n}`

const ES6BeforeExample = `\nfunction Dog(name) {\n    this.name = name;\n}\n\nDog.prototype.say = function () {\n    console.log(this.name + \' 멍멍!\');\n}\n\nvar dog = new Dog(\'흰둥이\');\ndog.say(); // 흰둥이: 멍멍!`

const ArrowExample = `\nsetTimeout(function() {\n    console.log("Hello");\n}, 1000)    // 일반 함수\n\nsetTimeout(() => {\n    console.log("Hello");\n}, 1000)     // 화살표 함수`

const ArrowExample_common = `\nfunction BlackDog() {\n    this.name = \'흰둥이\';\n    return {\n        name: \'검둥이\',\n        bark: function() {\n            console.log(this.name + "멍멍");\n        }\n    }\n}\n\nconst blackDog = new BlackDog();\nblackDog.bark(); // 검둥이: 멍멍!`

const ArrowExample_arrow = `\nclass WhiteDog {\n  constructor() {\n    this.name = \'흰둥이\';\n  }\n  render() {\n    return {\n        name: \'검둥이\',\n        bark: () => {\n            console.log(this.name + "멍멍");\n        }\n    }\n  }\n}\n\nconst whiteDog = new WhiteDog();\nwhiteDog.render().bark() // 흰둥이 멍멍!`

const ES6AfterExample = `\nclass Dog {\n    constructor(name) {\n        this.name = name;\n    }\n    say() {\n        console.log(this.name + \' 멍멍!\');\n    }\n}\n\nvar dog = new Dog(\'흰둥이\');\ndog.say(); // 흰둥이 멍멍!`

export default function ClassComponentApp() {
  return (
    <section className="flex flex-col gap-10 py-6 text-base-text">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6"># Component</h1>
      <ClassVsFunction />
      <ES6 />
      <ArrowFunction />
    </section>
  )
}

export function ES6() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">ES6 이전과 이후</h2>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <p className="font-semibold text-base sm:text-lg text-base-heading">• ES6 이전 JS</p>
          <p className="leading-relaxed text-sm sm:text-base">
            자바스크립트에는 원래 클래스(class)가 존재하지 않았습니다. 구현을 하고 싶은 경우에는 class 대신 prototype이라는 문법을 사용해야 했습니다.
          </p>
          <CodeBlock content={ES6BeforeExample} />
          <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-lg flex flex-col gap-2">
            <p className="font-bold text-sm sm:text-base text-base-heading">클래스형 컴포넌트 특징</p>
            <ul className="text-sm flex flex-col gap-1.5 list-disc list-inside">
              <li>render 함수가 꼭 있어야 합니다.</li>
              <li>render 함수 내부에서 JSX를 반환해야 합니다.</li>
            </ul>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <p className="font-semibold text-base sm:text-lg text-base-heading">• ES6 이후 JS</p>
          <p className="leading-relaxed text-sm sm:text-base">
            ES6부터 출시된 초기 함수형 컴포넌트는 state와 라이프사이클 API를 다룰 수 없었으나, React 16.8 Hooks 도입으로 해결되었습니다.
          </p>
          <CodeBlock content={ES6AfterExample} />
          <div className="p-5 rounded-lg bg-purple-500/10 border border-purple-500/20 flex flex-col gap-2">
            <p className="font-bold text-sm sm:text-base text-base-heading">함수형 컴포넌트의 장점</p>
            <ul className="text-sm flex flex-col gap-1.5 list-disc list-inside">
              <li>클래스형 컴포넌트보다 작성하기 훨씬 간결합니다.</li>
              <li>선언이 편하고 메모리 소모가 상대적으로 적습니다.</li>
              <li>빌드 후 결과물의 번들 파일 크기가 더 작아 배포 효율이 높습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ClassVsFunction() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">함수형 컴포넌트 vs 클래스형 컴포넌트</h2>
      <p className="leading-relaxed text-sm sm:text-base">
        리액트에서 컴포넌트를 선언하는 방식은 크게 함수형 컴포넌트와 클래스형 컴포넌트 두 가지가 존재합니다.
      </p>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <h3 className="font-semibold text-base sm:text-lg text-base-heading">• 클래스형 컴포넌트</h3>
          <CodeBlock content={ClassExample} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <h3 className="font-semibold text-base sm:text-lg text-base-heading">• 함수형 컴포넌트</h3>
          <CodeBlock content={FunctionalExample} />
        </div>
      </div>
      <article className="text-sm sm:text-base mt-2">
        <p className="leading-relaxed">
          <span className="font-semibold text-base-heading">주요 차이점:</span> state 관리 및 라이프사이클 기능 수행 방식의 차이, 그리고 클래스의 경우 메서드를 내부 프로토타입에 임의로 정의한다는 점 등이 있습니다.
        </p>
      </article>
    </div>
  )
}

export function ArrowFunction() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">ES6의 화살표 함수</h2>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-base sm:text-lg text-base-heading">• Arrow Function</p>
        <p className="leading-relaxed text-sm sm:text-base">
          화살표 함수(Arrow function)는 ES6에서 추가된 새로운 표현식으로, 기존 function 선언식을 온전히 대체하기보다 매개변수로 콜백을 넘기는 등 특정 상황에서 간결함을 극대화할 때 유용합니다.
        </p>
        <CodeBlock content={ArrowExample} />
        
        <div className="bg-black/5 dark:bg-white/5 p-5 rounded-lg border border-base-border/50 mt-6 flex flex-col gap-4">
          <p className="font-bold text-sm sm:text-base text-base-heading">
            화살표 함수가 일반 함수를 완전히 대체하지 못하는 이유 (this 바인딩 차이)
          </p>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-semibold text-base-heading">• 일반 function으로 구현 시</p>
              <CodeBlock content={ArrowExample_common} />
              <p className="text-xs sm:text-sm leading-relaxed">
                일반 함수는 <span className="font-semibold text-base-heading">자신이 속한 객체</span>를 this로 가리킵니다.
              </p>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-semibold text-base-heading">• 화살표 함수로 구현 시</p>
              <CodeBlock content={ArrowExample_arrow} />
              <p className="text-xs sm:text-sm leading-relaxed">
                화살표 함수는 <span className="font-semibold text-base-heading">자신이 선언된 상위 컨텍스트(렉시컬 환경)</span>의 this를 그대로 상속하여 가리킵니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}