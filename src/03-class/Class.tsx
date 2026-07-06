import CodeBlock from '../components/CodeBlock'

const FunctionalExample = `function App() {
  const name = '리액트';

  return (
    <div className="react">{name}</div>
  );
}`

const ClassExample = `class App extends Component {
  render() {
    const name = 'react';

    return (
      <div className="react">{name}</div>
    );
  }
}`

const ClassBaseExample = `class Car {
  // construct는 생성자이다. 
  // 최초에 생성 시 어떤 인수를 받을 지 결정할 수 있으며, 객체를 초기화하는 용도로도 사용된다
  constructor(name) {
    this.name = name
  }
  hook() {    // 메서드
    console.log(this.name + '이 경적을 울립니다.')
  }
  static hello() {    // 정적 메서드
    console.log('저는 자동차입니다.')
  }
  set age(value) {  // setter
    this.carAge = value;
  }
  get age() {  // getter
    return this.carAge
  }
}

`
const ClassBaseExample2 = `

// Car 클래스를 사용해 car 객체를 만들었다
const myCar = new Car('자동차')

// 메서드 호출
myCar.hook()

// 정적 메서드는 클래스에서 직접 호출한다
myCar.hello()

// 정적 메서드는 클래스로 만든 객체에서 호출할 수 없다
Car.hello()

// setter를 만들면 값을 할당할 수 있다
myCar.age = 32

// getter로 값을 가져올 수 있다.
console.log(myCar.age, myCar.name) // 32 자동차`

const ClassBaseExample3 = `
// constructor는 여러 개 사용 불가
class Car {
  constructor (name) {
    this.name = name
  }
  // SyntaxError: A class may only have one constructor 
  constructor (name) {
    this.name = name
  }
}

class Car {
  // constructor는 없어도 가능함
}
`

const ClassBaseExample4 = `
class Car {
  constructor(name) {
    // 값을 받으면 내부에 프로퍼티로 할당된다
    this.name = name
  }
}

const myCar = new Car('자동차') // 프로퍼티 값을 넘겨 주었다
`
const ClassBaseExample5 = `
class Car {
  constructor(name) {
    // 값을 받으면 내부에 프로퍼티로 할당된다
    this.name = name
  }

  get firstCharacter() {
    return this.name[0]
  }

  set firstCharacter(char) {
    this.name = [char, ...this.name.slice(1)].join('')
  }
}

const myCar = new Car('자동차')
myCar.firstCharacter // '자'를 가져온다
myCar.firstCharacter = '차' // '차'를 할당한다

console.log(myCar.firstCharacter, myCar.name) // 차, 자동차
`

const ClassBaseExample6 = `
class Car {
  constructor(name) {
    this.name = name
  }
  // 인스턴스 메서드 정의
  hello() {
    console.log('안녕하세요' + this.name + '입니다.')
  }
}


`
const ClassBaseExample7 = `
class Car {
  static hello() {
    console.log('안녕하세요')
  }
}
const myCar = new Car()
myCar.hello() // 에러 발생: myCar.hello is not a function
Car.hello() // 안녕하세요
`

const ClassBaseExample8 = `
class Car {
  constructor(name) {
    this.name = name
  }

  hook() {
    console.log(this.name + '경적을 울립니다')
  }
}

class Truck extends Car {
  constructor(name) {
  // 부모 클래스의 constructor, 즉 Car의 constructor를 호출하는 과정
    super(name)
  }

  load() {
    console.log('짐을 싣습니다.')
  }
}

const myCar = new Car('자동차')
myCar.hook() // 자동차 경적을 울립니다
const truck = new Truck('트럭')
truck.hook() // 트럭 경적을 울립니다
truck.load() // 트럭 짐을 싣습니다
`
const ES6BeforeExample = `
    function Dog(name) {
        this.name = name;
    }

    
    Dog.prototype.say = function () {
        console.log(this.name + ' 멍멍!');
    }
    
    
var dog = new Dog('흰둥이'); // 흰둥이: 멍멍!
dog.say();
`

const ArrowExample = `
    setTimeout(function() {
        console.log("Hello");
    }, 1000)    // 일반 함수

setTimeout(() => {
    console.log("Hello");
}, 1000)     // 화살표 함수
`

const ArrowExample_common = `
    function BlackDog() {
        this.name = '흰둥이';
        return {
            name: '검둥이',
            bark: function() {
                console.log(this.name + "멍멍");
            }
        }
    }

const blackDog = new BlackDog();
blackDog.bark(); // 검둥이: 멍멍!
`
const ArrowExample_arrow = `
   class WhiteDog() {
    this.name = '흰둥이';
    return {
        name: '검둥이',
        bark: () => {
            console.log(this.name + "멍멍");
            }
        }
    }

const whiteDog = new WhiteDog();
whiteDog.bark() // 흰둥이: 멍멍!
`

const ES6AfterExample = `
    class Dog(name) {
        this.name = name;
    }
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(this.name + ' 멍멍!');
    };

var dog = new Dog('흰둥이');
dog.say();
`

export default function ClassComponentApp() {
  return (
    <section className="flex flex-col m-5 gap-15 py-25">
      <h1 className="text-[45px] font-bold text-white"># Class</h1>
      <WhatIsClass />
      {/* <ClassVsFunction />
      <ES6 />
      <ArrowFunction /> */}
    </section>
  )
}

export function ES6() {
  return (
    <div className="">
      <h2 className="font-bold text-2xl text-primary py-5">ES6 이전과 이후</h2>
      <div className="flex gap-10">
        <div className="flex-1">
          <p className="font-bold text-[14px] text-white">• ES6 이전 JS</p>
          <p className="font-md text-[14px] py-3 whitespace-pre-wrap">
            {`자바스크립트에는 클래스(class)가 존재하지 않았다 \n-> 구현을 하고 싶은 경우에는 class 대신 prototype이라는 문법을 사용했어야 함`}
          </p>
          <CodeBlock content={ES6BeforeExample} />
          <div className="bg-purple-400/10 p-4 rounded-md">
            <p className="font-bold text-[14px] text-white">클래스형 컴포넌트 특징</p>
            <ul className="pt-5 text-[14px]">
              <li>• render 함수가 꼭 있어야 한다</li>
              <li>• render 함수 내부에서 JSX를 반환해야 한다</li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-[14px] text-white">• ES6 이후 JS</p>
          <p className="font-md text-[14px] py-3 whitespace-pre-wrap">
            {`ES6부터 나온 함수 컴포넌트는 useState, useEffect 등과 같은 라이프사이클 API를 사용할 수 없었으나,\nv16.8 업데이트 이후 Hooks가 도입되어 해결됨`}
          </p>
          <CodeBlock content={ES6AfterExample} />
          <div className="p-4 rounded-md bg-purple-400/10">
            <p className="font-bold text-[14px] text-white ">함수형 컴포넌트의 장점</p>
            <ul className="pt-5 text-[14px]">
              <li>• 클래스형 컴포넌트보다 선언하기 훨씬 편하다</li>
              <li>• 메모리 자원이 클래스형에 비해 상대적으로 적게 든다</li>
              <li>• 빌드 후 배포 시 함수형의 결과물이 파일 크기가 더 작다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhatIsClass() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary py-5">클래스란?</h2>
      <p className="font-semibold text-[14px] text-white">
        JS의 클래스는 특정한 객체를 만들기 위한 일종의 템플릿으로 특정한 형태의 객체를 만복적으로
        만들기 위한 것이 바로 클래스다
      </p>
      <p className="text-[14px]">
        클래스를 활용하면 객체를 만드는 데 필요한 데이터나 이를 조작하는 코드를 추상화해 객체를 더
        편리하게 생성할 수 있다
      </p>
      {/* <div className="flex gap-20 text-white"> */}
      <div className="flex gap-5 h-full">
        <div className="w-1/2">
          <CodeBlock content={ClassBaseExample} />
        </div>
        <div className="w-1/2">
          <CodeBlock content={ClassBaseExample2} />
        </div>
      </div>
      <article>
        <h3 className="font-bold text-white pt-10 pb-3text-lg">• constructor</h3>
        <p className="text-[14px]">
          constructor는 생성자로, 객체를 생성하는 데 사용하는 특수한 메서드이다
        </p>
        <p className="text-[14px]">단 하나만 존재할 수 있고, 여러 개를 생성하면 에러가 발생한다</p>
        <CodeBlock content={ClassBaseExample3} />
      </article>
      <article className="text-[14px]">
        <h3 className="font-bold text-white pt-10 pb-3 text-lg">• Property</h3>
        <p className="">
          프로퍼티란 클래스로 인스턴스를 생성할 때 내부에 정의할 수 있는 속성값을 의미한다
        </p>
        <p>
          기본적으로 인스턴스 생성 시 constructor 내부에는 빈 객체가 할당돼 있는데 바로 이 빈 객체에
          프로퍼티의 키와 값을 넣어서 활용할 수 있게 도와준다
        </p>
        <CodeBlock content={ClassBaseExample4} />
      </article>
      <article className="text-[14px]">
        <h3 className="font-bold text-white  pt-10 pb-3 text-lg">• Getter / Setter</h3>
        <p className="">getter란 클래스에서 무언가 값을 가져올 때 사용된다</p>
        <CodeBlock content={ClassBaseExample5} />
      </article>
      <article className="text-[14px]">
        <h3 className="font-bold text-white pt-10 pb-3 text-lg">• 인스턴스 메서드</h3>
        <p className="">클래스 내부에서 선언한 메서드를 인스턴스 메서드라고 한다</p>
        <p>인스턴스 메서드는 prototype에 선언되기에 프로토타입 메서드라고 불리기도 한다</p>
        <CodeBlock content={ClassBaseExample6} />
        <p className="pt-5">
          Car라는 클래스를 선언하고 그 내부에서 hello라는 인스턴스 메서드를 정의하여 아래와 같이
          선언 가능하다
        </p>
        <CodeBlock
          content={`const myCar = new Car('자동차')
myCar.hello() // 인스턴스 메서드를 이처럼 선언 가능`}
        />
        <p className="pt-5">
          Object.getPrototypeOf를 사용하면, 인수로 넘겨준 변수의 prototype을 확인할 수 있다
        </p>
        <CodeBlock
          content={`const myCar = new Car('자동차')
Object.getPrototypeOf(myCar) // {constructor: f, hello: f}`}
        />
      </article>
      <article className="text-[14px]">
        <h3 className="font-bold text-white pt-10 pb-3 text-lg">• 정적 메서드</h3>
        <p className="">
          정적 메서드는 특이하게 클래스의 인스턴스가 아닌 이름으로 호출할 수 있는 메서드다
        </p>
        <CodeBlock content={ClassBaseExample7} />
        <p className="">
          특징이라 함은 정적 메서드 내부의 this는 클래스의 인스턴스가 아닌 자신을 가리키기에
          일반적으로 쓰는 this를 사용할 수 없다
        </p>
        <p>
          이러한 이유로 리액트 클래스 컴포넌트 생명 주기 메서드인
          <span className="ml-1 bg-slate-300/10 rounded text-blue-200 px-1">
            static getDerivedStateFromProps(props, state)
          </span>
          에서는 this.state에 접근할 수 없다
        </p>
        <p className="">
          this에 접근은 불가능하지만 굳이 인스턴스를 생성하지 않아도 된다는 점, 생성하지 않아도 접근
          가능하기에 재사용 가능하다는 점이 있다
        </p>
      </article>
      <article className="text-[14px]">
        <h3 className="font-bold text-white pt-10 pb-3 text-lg">• 상속</h3>
        <p className="">
          리액트에서 클래스 컴포넌트를 만들기 위해서
          <span className="ml-1 bg-slate-300/10 rounded text-pink-200 px-1">
            extends React.Component
          </span>
          or
          <span className="ml-1 bg-slate-300/10 rounded text-pink-200 px-1">
            React.PureComponent
          </span>
          를 선언한 것을 볼 수 있다
        </p>
        <p className="">
          이 extends는 기존 클래스를 상속 받아서 자식 클래스에서 이 상속받은 클래스를 기반으로
          확장하는 개념으로 볼 수 있다
        </p>
        <CodeBlock content={ClassBaseExample8} />
        <p>
          보다시피 Car를 extends하여 Truck이라는 프로퍼티의 값을 전달하여 생성한 Truck 객체에서도,
          따로 정의하지 않은 hook 메서드를 사용할 수 있다
        </p>
      </article>
    </div>
  )
}

export function ClassVsFunction() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary py-5">함수형 컴포넌트 vs 클래스형 컴포넌트</h2>
      <p className="font-bold text-[14px] text-white pb-4">
        컴포넌트를 선언하는 방식은 총 두 가지이며, 하나는 함수형 컴포넌트 다른 하나는 클래스형
        컴포넌트를 선언하는 방식이 있다.
      </p>
      <div className="flex gap-20 text-white">
        <div className="flex-1 flex-col gap-3">
          <h3 className="font-bold">• 클래스형 컴포넌트</h3>
          <CodeBlock content={ClassExample} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold">• 함수형 컴포넌트</h3>
          <CodeBlock content={FunctionalExample} />
        </div>
      </div>
      <article className="font-md text-[14px]">
        <p className="">
          <span className=" text-white">둘의 차이점:</span> state와 라이프사이클 기능을 수행하는 것
          / 임의 메서드를 정의할 수 있다는 것
        </p>
      </article>
    </div>
  )
}

export function ArrowFunction() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary py-5">ES6의 화살표 함수</h2>
      <div className="flex gap-10">
        <div className="flex-1">
          <p className="font-bold text-[14px] text-white">• Arrow Function</p>
          <p className="font-md text-[14px] py-3 whitespace-pre-wrap">
            {`화살표 함수(Arrwo function)은  ES6 문법에서 함수를 표현하는 새로운 방식이지만, 그렇다고 해서 기존의 function 함수를 이용한 함수 선언 방식을 대체하지는 않는다. \n사용 용도가 조금 다르며 보통 함수를 파라미터로 전달할 때 유용하다.`}
          </p>
          <CodeBlock content={ArrowExample} />
          <div className="bg-slate-800/5 p-4 rounded-2xl border mt-10 border-slate-400/10">
            <p className="font-bold text-[16px] text-white pb-2">
              화살표 함수가 대체할 수 없는 이유?
            </p>
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-sm text-slate-300">• 일반 function으로 함수 구현 시</p>
                <CodeBlock content={ArrowExample_common} />
                <p className="text-[13px]">
                  일반 함수는 <span className="text-slate-300">자신이 종속된 객체를</span> this로
                  가리킨다
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-300">• 화살표 함수로 함수 구현 시</p>
                <CodeBlock content={ArrowExample_arrow} />
                <p className="text-[13px]">
                  화살표 함수는 <span className="text-slate-300">자신이 종속된 인스턴스를</span>{' '}
                  this로 가리킨다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
