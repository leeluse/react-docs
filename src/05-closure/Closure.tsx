import CodeBlock from '../components/CodeBlock'

const CLOSURE_EXM = `
function add() {
  const a = 18
  function innerAdd() {
    const b = 20
    console.log(a + b);
  }
  innerAdd();
}
add()
`

const CLOSURE_EXM2 = `
var global = 'global scope'

function hello() {
  console.log(global)
}
  console.log(global) // global scope
  hello() // global scope
  console.log(global === window.global) // true
`

export default function Closure() {
  return (
    <div>
      <section className="flex flex-col m-5 gap-10 py-25">
        <h1 className="text-[45px] font-bold text-white"># Closure</h1>
        <article>
          <div className="whitespace-pre-line">
            <h2 className="font-bold text-2xl text-primary py-5">클로저의 정의</h2>
            <p className="font-semibold text-lg text-white pb-3">• Closure란?</p>
            {`클로저는 함수와 함수가 선언된 어휘적(Lexical Scope)의 조합이다`}
            {`16.8 버전을 기점으로 클로저라는 개념이 리액트에서 적극적으로 사용됨에 따라 리액트의 작동 원리는 클로저를 빼놓고서 이해하기 어렵다`}
            <div className="flex min-w-full gap-10">
              <div className="flex-1 flex flex-col pt-2">
                <p className="whitespace">
                  <span className="text-white ">함수와 함수가 선언된 어휘적 환경의 조합</span>
                  <span>이라는 문장에서 가장 이해하기 어려운 부분은</span>
                  <span className="text-purple-400/70"> 어휘적 환경일 것</span>
                </p>
                <div className="flex flex-col p-4 border rounded-sm m-3 text-sm text-white/80">
                  <span>{`add 함수 내부 inner 함수 존재`}</span>
                  <span>{`-> 해당 inner 함수에서 b 변수를 선언`}</span>
                  <span>{`-> 자신의 외부에 있는 a와 b를 합해 30을 출력`}</span>
                </div>
              </div>
              <div className="flex-1">
                <CodeBlock content={CLOSURE_EXM} />
              </div>
            </div>
          </div>
        </article>
        <article>
          <h2 className="font-bold text-2xl text-primary py-5">변수의 유효 범위, 스코프</h2>
          {`클로저는 변수의 유효 범위에 따라서 어휘적 환경이 결정된다. 이를 스코프라고 하며, JS는 다양한 스코프가 있다
          `}
          <h3 className="font-semibold text-lg text-white pt-5 pb-3">
            • 전역 스코프 (Global Scope)
          </h3>
          <div className="whitespace-pre-line flex gap-10 mx-10">
            <CodeBlock content={CLOSURE_EXM2} />
            <section className="flex flex-col">
              <div className="flex-1">
                {`전역 스코프는 변수를 선언하면 어디서든 호출 가능함\n 브라우저 환경에서는 전역 객체는 window, Node.js 환경에서는 global이 있는데\n 바로 이 객체에 전역 레벨에서 선언한 스코프가 바인딩된다`}
              </div>
              <div className="flex gap-10 size-full items-center justify-center text-center">
                <div className="border px-7 py-3 border-pink-400/40 bg-pink-400/20 rounded-sm  text-white text-sm">
                  브라우저 환경
                  <div className="p-2 border border-slate-300/70 text-slate-300/80 mt-3 rounded">
                    window
                  </div>
                </div>
                <div className="border px-7 py-3 border-sky-400/40 bg-sky-400/20 rounded-sm text-white text-sm">
                  Node 환경
                  <div className="p-2 border border-slate-300/70 text-slate-300/80 mt-3 rounded">
                    global
                  </div>
                </div>
              </div>
            </section>
          </div>
          <h3 className="font-semibold text-lg text-white pt-5 pb-3">
            • 함수 스코프 (Function Scope)
          </h3>
          <div className="whitespace-pre-line flex gap-10 mx-10">
            <CodeBlock content={CLOSURE_EXM2} />
            <div className="flex-1">
              {`JS는 기본적으로 함수 레벨 스코프를 따른다
              {} 블록이 스코프 범위를 결정하지 않는다`}
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
{
  /*<span className="text-purple-400/50">{` 컴포넌트의 수명: 페이지에서 렌더링되기 전인 준비과정 -> 페이지에서 사라짐`}</span>
            <br></br>
            // <span>{`리액트로 프로젝트를 진행하면서 필연적으로 진행해야 하는 작업들이 있는데, 이를 테면 아래와 같은 작업들을 할 때 컴포넌트의 라이프사이클 메서드를 사용한다`}</span>
            <div className="flex  gap-3 py-4">
              <span className="text-white bg-purple-500/20 p-2 mx-1  rounded-md w-fit">
                컴포넌트를 처음으로 렌더링 시 필요한 작업
              </span>
              <span className="text-white bg-purple-500/20 p-2  mx-1 rounded-md w-fit">
                컴포넌트를 업데이트 전후 필요한 작업{' '}
              </span>
              <span className="text-white bg-purple-500/20 p-2  mx-1 rounded-md w-fit">
                불필요한 업데이트를 방지하는 작업{' '}
              </span>
            </div>
            <p className="text-red-400/60">
              중요! 라이프 사이클 메서드는 클래스형 컴포넌트에서만 사용 가능하다
            </p> */
}
