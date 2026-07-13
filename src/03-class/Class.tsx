import CodeBlock from '../components/CodeBlock'

const ClassBaseExample = `class Car {\n  // constructor는 생성자이다. \n  // 최초에 생성 시 어떤 인수를 받을 지 결정할 수 있으며, 객체를 초기화하는 용도로도 사용된다\n  constructor(name) {\n    this.name = name\n  }\n  hook() {    // 메서드\n    console.log(this.name + \'이 경적을 울립니다.\')\n  }\n  static hello() {    // 정적 메서드\n    console.log(\'저는 자동차입니다.\')\n  }\n  set age(value) {  // setter\n    this.carAge = value;\n  }\n  get age() {  // getter\n    return this.carAge\n  }\n}`

const ClassBaseExample2 = `\n// Car 클래스를 사용해 car 객체를 만들었다\nconst myCar = new Car(\'자동차\')\n\n// 메서드 호출\nmyCar.hook()\n\n// 정적 메서드는 클래스에서 직접 호출한다\nCar.hello()\n\n// 정적 메서드는 클래스로 만든 객체에서 호출할 수 없다\n// myCar.hello() // 에러 발생\n\n// setter를 만들면 값을 할당할 수 있다\nmyCar.age = 32\n\n// getter로 값을 가져올 수 있다.\nconsole.log(myCar.age, myCar.name) // 32 자동차`

const ClassBaseExample3 = `\n// constructor는 여러 개 사용 불가\nclass Car {\n  constructor (name) {\n    this.name = name\n  }\n  // SyntaxError: A class may only have one constructor \n  // constructor (name) {\n  //   this.name = name\n  // }\n}\n\nclass Car {\n  // constructor는 없어도 가능함\n}`

const ClassBaseExample4 = `\nclass Car {\n  constructor(name) {\n    // 값을 받으면 내부에 프로퍼티로 할당된다\n    this.name = name\n  }\n}\n\nconst myCar = new Car(\'자동차\') // 프로퍼티 값을 넘겨 주었다`

const ClassBaseExample5 = `\nclass Car {\n  constructor(name) {\n    this.name = name\n  }\n\n  get firstCharacter() {\n    return this.name[0]\n  }\n\n  set firstCharacter(char) {\n    this.name = [char, ...this.name.slice(1)].join(\'\')\n  }\n}\n\nconst myCar = new Car(\'자동차\')\nmyCar.firstCharacter // \'자\'를 가져온다\nmyCar.firstCharacter = \'차\' // \'차\'를 할당한다\n\nconsole.log(myCar.firstCharacter, myCar.name) // 차, 자동차`

const ClassBaseExample6 = `\nclass Car {\n  constructor(name) {\n    this.name = name\n  }\n  // 인스턴스 메서드 정의\n  hello() {\n    console.log(\'안녕하세요 \' + this.name + \'입니다.\')\n  }\n}`

const ClassBaseExample7 = `\nclass Car {\n  static hello() {\n    console.log(\'안녕하세요\')\n  }\n}\nconst myCar = new Car()\n// myCar.hello() // 에러 발생: myCar.hello is not a function\nCar.hello() // 안녕하세요`

const ClassBaseExample8 = `\nclass Car {\n  constructor(name) {\n    this.name = name\n  }\n\n  hook() {\n    console.log(this.name + \' 경적을 울립니다\')\n  }\n}\n\nclass Truck extends Car {\n  constructor(name) {\n    // 부모 클래스의 constructor, 즉 Car의 constructor를 호출하는 과정\n    super(name)\n  }\n\n  load() {\n    console.log(\'짐을 싣습니다.\')\n  }\n}\n\nconst myCar = new Car(\'자동차\')\nmyCar.hook() // 자동차 경적을 울립니다\nconst truck = new Truck(\'트럭\')\ntruck.hook() // 트럭 경적을 울립니다\ntruck.load() // 트럭 짐을 싣습니다`

export default function ClassComponentApp() {
  return (
    <section className="flex flex-col gap-10 py-6 text-base-text">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6"># Class</h1>
      <WhatIsClass />
    </section>
  )
}

export function WhatIsClass() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">클래스란?</h2>
      <p className="font-semibold text-base sm:text-lg text-base-heading mt-2">
        JS의 클래스는 특정한 객체를 만들기 위한 일종의 템플릿으로, 특정한 형태의 객체를 반복적으로
        만들기 위한 구조입니다.
      </p>
      <p className="leading-relaxed text-sm sm:text-base">
        클래스를 활용하면 객체를 만드는 데 필요한 데이터나 이를 조작하는 코드를 추상화해 객체를 더
        편리하게 생성할 수 있습니다.
      </p>
      
      <div className="flex flex-col lg:flex-row gap-6 py-3">
        <div className="flex-1 min-w-0">
          <CodeBlock content={ClassBaseExample} />
        </div>
        <div className="flex-1 min-w-0">
          <CodeBlock content={ClassBaseExample2} />
        </div>
      </div>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h3 className="font-bold text-base-heading pt-4 text-base sm:text-lg">• constructor</h3>
        <p className="leading-relaxed">
          constructor는 생성자로, 객체를 생성하고 초기화하는 데 사용하는 특수한 메서드입니다.
        </p>
        <p className="leading-relaxed text-red-500 dark:text-red-400 font-medium">
          클래스 내에 단 하나만 존재할 수 있으며, 여러 개를 선언하면 에러가 발생합니다.
        </p>
        <CodeBlock content={ClassBaseExample3} />
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h3 className="font-bold text-base-heading pt-4 text-base sm:text-lg">• Property</h3>
        <p className="leading-relaxed">
          프로퍼티는 클래스로 인스턴스를 생성할 때 내부에 정의할 수 있는 속성값을 의미합니다.
        </p>
        <p className="leading-relaxed">
          기본적으로 인스턴스 생성 시 constructor 내부에는 빈 객체가 할당되어 있어, 이 객체에
          프로퍼티의 키와 값을 매핑해 활용할 수 있도록 돕습니다.
        </p>
        <CodeBlock content={ClassBaseExample4} />
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h3 className="font-bold text-base-heading pt-4 text-base sm:text-lg">• Getter / Setter</h3>
        <p className="leading-relaxed">
          getter와 setter를 지정해 프로퍼티에 접근하거나 값을 변경할 때의 비즈니스 로직을 구현할 수 있습니다.
        </p>
        <CodeBlock content={ClassBaseExample5} />
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h3 className="font-bold text-base-heading pt-4 text-base sm:text-lg">• 인스턴스 메서드</h3>
        <p className="leading-relaxed">클래스 내부에서 선언한 일반 메서드를 인스턴스 메서드라고 합니다.</p>
        <p className="leading-relaxed">이들은 클래스의 prototype에 등록되므로 프로토타입 메서드라고 부르기도 합니다.</p>
        <CodeBlock content={ClassBaseExample6} />
        <p className="pt-3 leading-relaxed">
          Car라는 클래스를 선언하고 그 내부에서 hello라는 인스턴스 메서드를 정의하여 아래와 같이
          인스턴스 생성 후 직접 호출 가능합니다.
        </p>
        <CodeBlock
          content={`const myCar = new Car(\'자동차\')\nmyCar.hello() // 인스턴스 메서드 호출`}
        />
        <p className="pt-3 leading-relaxed">
          Object.getPrototypeOf를 사용하면, 인수로 넘겨준 변수의 prototype 구조를 확인할 수 있습니다.
        </p>
        <CodeBlock
          content={`const myCar = new Car(\'자동차\')\nObject.getPrototypeOf(myCar) // {constructor: f, hello: f}`}
        />
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h3 className="font-bold text-base-heading pt-4 text-base sm:text-lg">• 정적 메서드</h3>
        <p className="leading-relaxed">
          정적 메서드는 클래스의 인스턴스가 아닌 클래스 자체 식별자를 통해 바로 호출하는 메서드입니다.
        </p>
        <CodeBlock content={ClassBaseExample7} />
        <p className="leading-relaxed">
          정적 메서드 내부의 this는 클래스의 인스턴스가 아닌 클래스 함수 자체를 가리키므로,
          인스턴스 기반의 일반적인 this.state 등에는 접근할 수 없습니다.
        </p>
        <p className="leading-relaxed">
          이러한 이유로 리액트 클래스 컴포넌트 생명 주기 메서드인 
          <span className="code-tag blue">
            static getDerivedStateFromProps(props, state)
          </span>
          에서는 this.state에 접근할 수 없습니다.
        </p>
        <p className="leading-relaxed">
          인스턴스를 생성하지 않아도 직접 접근하고 호출할 수 있어, 유틸리티 성격의 공통 로직을 구현할 때 유용합니다.
        </p>
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <h3 className="font-bold text-base-heading pt-4 text-base sm:text-lg">• 상속</h3>
        <p className="leading-relaxed">
          리액트에서 클래스 컴포넌트를 만들기 위해 
          <span className="code-tag pink">
            extends React.Component
          </span>
           또는 
          <span className="code-tag pink">
            extends React.PureComponent
          </span>
          를 사용하는 것은 대표적인 상속의 예시입니다.
        </p>
        <p className="leading-relaxed">
          extends 키워드를 사용해 부모 클래스를 상속받아 자식 클래스에서 해당 기능을 기반으로 확장해 나갑니다.
        </p>
        <CodeBlock content={ClassBaseExample8} />
        <p className="leading-relaxed">
          자식 클래스인 Truck 객체에서도 부모로부터 상속받은 hook 메서드를 그대로 활용 가능한 것을 확인할 수 있습니다.
        </p>
      </article>
    </div>
  )
}