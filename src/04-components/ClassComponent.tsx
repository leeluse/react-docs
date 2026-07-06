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
      <h1 className="text-[45px] font-bold text-white"># Class Component</h1>
      <ClassVsFunction />
      <ES6 />
      <ArrowFunction />
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
            <ul className="pt-3 text-[14px]">
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
            <ul className="pt-3 text-[14px]">
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
