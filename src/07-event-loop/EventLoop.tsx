'use client'
import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { StackIcon } from '../components/icons'

const CODE_EXAMPLE = `
console.log(1)        

setTimeout(() => {     
 console.log(2)   
}, 0)

setTimeout(() => {
 console.log(3)
}, 100)

console.log(4)
`

const CALL_STACK = `
function bar() {
  console.log('bar')
}       

function baz() {
  console.log('baz')
}

function foo() {
  console.log('foo')
  bar()
  baz()
}

foo()
`

const CALL_STACK2 = `
function bar() {
  console.log('bar')
}       

function baz() {
  console.log('baz')
}

function foo() {
  console.log('foo')
  setTimeout(bar(), 0) // setTimeout만 추가
  baz()
}

foo()
`

const MICRO_TASK = `
function foo() {
  console.log('foo')
}       

function bar() {
  console.log('bar')
}

function baz() {
  console.log('baz')
}

setTimeout(foo, 0)

Promise.resolve().then(bar).then(baz)
`

const STACK_STEPS = [
  { stack: ['foo()'], console: [] }, // 0: foo()가 호출 스택에 들어감
  { stack: ['foo()', "console.log('foo')"], console: [] }, // 1: foo() 내부에 console.log()가 존재하므로 호출 스택에 들어감
  { stack: ['foo()'], console: ['foo'] }, // 2: console.log() 실행 완료 후 빠져나감 (foo()는 아직 존재)
  { stack: ['foo()', 'bar()'], console: ['foo'] }, // 3: bar()가 호출 스택에 들어감
  { stack: ['foo()', 'bar()', "console.log('bar')"], console: ['foo'] }, // 4: bar() 내부에 console.log()가 존재하므로 호출 스택에 들어감
  { stack: ['foo()', 'bar()'], console: ['foo', 'bar'] }, // 5: console.log() 및 bar() 실행 완료 후 빠져나감 (foo(), bar()는 아직 존재)
  { stack: ['foo()'], console: ['foo', 'bar'] }, // 6: 더 이상 bar()에 남은 것이 없어 호출 스택에서 제거됨 (foo()는 아직 존재)
  { stack: ['foo()', 'baz()'], console: ['foo', 'bar'] }, // 7: baz()가 호출 스택에 들어감
  { stack: ['foo()', 'baz()', "console.log('baz')"], console: ['foo', 'bar'] }, // 8: baz() 내부에 console.log()가 존재하므로 호출 스택에 들어감
  { stack: ['foo()', 'baz()'], console: ['foo', 'bar', 'baz'] }, // 9: console.log() 및 baz() 실행 완료 후 빠져나감 (foo(), baz()는 아직 존재)
  { stack: ['foo()'], console: ['foo', 'bar', 'baz'] }, // 10: 더 이상 baz()에 남은 것이 없어 호출 스택에서 제거됨 (foo()는 아직 존재)
  { stack: [], console: ['foo', 'bar', 'baz'] }, // 11: 더 이상 foo()에 남은 것이 없어 호출 스택에서 제거됨
  { stack: [], console: ['foo', 'bar', 'baz'] }, // 12: 호출 스택 비워짐
]

const STACK_STEPS2 = [
  { stack: ['foo()'], console: [] }, // 0: foo()가 호출 스택에 들어감
  { stack: ['foo()', "console.log('foo')"], console: [] }, // 1: foo() 내부에 console.log()가 존재하므로 호출 스택에 들어감
  { stack: ['foo()'], console: ['foo'] }, // 2: console.log() 실행 완료 후 빠져나감 (foo()는 아직 존재)
  { stack: ['foo()', 'setTimeout(bar, 0)'], console: ['foo'] }, // 3: setTimeout(bar, 0)이 호출 스택에 들어감
  { stack: ['foo()'], console: ['foo'] }, // 4: setTimeout이 백그라운드(Web API)로 bar를 보내고 호출 스택에서 제거됨
  { stack: ['foo()', 'baz()'], console: ['foo'] }, // 5: baz()가 호출 스택에 들어감
  { stack: ['foo()', 'baz()', "console.log('baz')"], console: ['foo'] }, // 6: baz() 내부에 console.log()가 존재하므로 호출 스택에 들어감
  { stack: ['foo()', 'baz()'], console: ['foo', 'baz'] }, // 7: console.log() 및 baz() 실행 완료 후 빠져나감 (foo(), baz()는 아직 존재)
  { stack: ['foo()'], console: ['foo', 'baz'] }, // 8: 더 이상 baz()에 남은 것이 없어 호출 스택에서 제거됨 (foo()는 아직 존재)
  { stack: [], console: ['foo', 'baz'] }, // 9: 더 이상 foo()에 남은 것이 없어 호출 스택에서 제거됨
  { stack: ['bar()'], console: ['foo', 'baz'] }, // 10: 호출 스택이 비워지자, 이벤트 루프가 태스크 큐의 bar()를 호출 스택으로 가져옴
  { stack: ['bar()', "console.log('bar')"], console: ['foo', 'baz'] }, // 11: bar() 내부에 console.log()가 존재하므로 호출 스택에 들어감
  { stack: ['bar()'], console: ['foo', 'baz', 'bar'] }, // 12: console.log() 및 bar() 실행 완료 후 빠져나감
  { stack: [], console: ['foo', 'baz', 'bar'] }, // 13: 더 이상 bar()에 남은 것이 없어 호출 스택에서 제거됨
  { stack: [], console: ['foo', 'baz', 'bar'] }, // 14: 호출 스택 비워짐
]

const STACK_LOGIC = [
  'foo()가 호출 스택에 들어감',
  'foo() 내부에 console.log()가 존재하므로 호출 스택에 들어감',
  'console.log() 실행 완료 후 빠져나감 (foo()는 아직 존재)',
  'bar()가 호출 스택에 들어감',
  'bar() 내부에 console.log()가 존재하므로 호출 스택에 들어감',
  'console.log() 및 bar() 실행 완료 후 빠져나감 (foo(), bar()는 아직 존재)',
  '더 이상 bar()에 남은 것이 없어 호출 스택에서 제거됨 (foo()는 아직 존재)',
  'baz()가 호출 스택에 들어감',
  'baz() 내부에 console.log()가 존재하므로 호출 스택에 들어감',
  'console.log() 및 baz() 실행 완료 후 빠져나감 (foo(), baz()는 아직 존재)',
  '더 이상 baz()에 남은 것이 없어 호출 스택에서 제거됨 (foo()는 아직 존재)',
  '더 이상 foo()에 남은 것이 없어 호출 스택에서 제거됨',
  '호출 스택 비워짐',
]
const STACK_LOGIC2 = [
  'foo()가 호출 스택에 들어감',
  "foo() 내부에 console.log('foo')가 존재하므로 호출 스택에 들어감",
  "console.log('foo') 실행 완료 후 빠져나감 (foo()는 아직 존재)",
  'setTimeout(bar(), 0)이 호출 스택에 들어감',
  '타이머 이벤트가 실행되며 태스크 큐로 들어가고 즉시 스택에서 제거됨',
  'baz()가 호출 스택에 들어감',
  "baz() 내부에 console.log('baz')가 존재하므로 호출 스택에 들어감",
  "console.log('baz') 실행 완료 후 빠져나감 (foo(), baz()는 아직 존재)",
  '더 이상 baz()에 남은 것이 없어 호출 스택에서 제거됨 (foo()는 아직 존재)',
  '더 이상 foo()에 남은 것이 없어 호출 스택에서 제거됨',
  '호출 스택이 비워지자, 이벤트 루프가 태스크 큐의 bar()를 호출 스택으로 가져옴',
  "bar() 내부에 console.log('bar')가 존재하므로 호출 스택에 들어감",
  "console.log('bar') 실행 완료 후 빠져나감 (bar()는 아직 존재)",
  '더 이상 bar()에 남은 것이 없어 호출 스택에서 제거됨',
  '호출 스택 비워짐',
]

export default function EventLoop() {
  return (
    <section className="flex flex-col gap-10 py-6 text-sm sm:text-base">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
        # Event Loop
      </h1>
      <SingleThread />
      <EventLoopMain />
    </section>
  )
}

export function SingleThread() {
  return (
    <main>
      <h2 className="font-bold text-xl sm:text-2xl text-primary">자바스크립트는 싱글 스레드이다</h2>
      <p className="text-sm sm:text-base py-1">
        자바스크립트는 한 번에 하나의 작업만 동기 방식으로 처리 가능하다
      </p>
      <section>
        <h3 className="font-bold text-sm sm:text-md py-3 text-slate-300">
          {' '}
          * 동기 방식에서 프로세스 진행
        </h3>
        <div className="flex items-center justify-between sm:p-4 sm:mx-30">
          <div className="p-2 border rounded-md bg-amber-50/5 text-slate-400">요청 시작</div>
          <div>
            <div className="text-center -rotate-90 text-white">↓</div>
            <p className="text-xs text-white hidden sm:block">모든 태스크 대기 상태</p>
          </div>
          <div className="p-2 border rounded-md bg-amber-50/5 text-slate-400">응답 받기 완료</div>
          <div className="text-center -rotate-90 text-white">↓</div>
          <div className="p-2 border rounded-md bg-amber-50/5 text-slate-400">다음 요청 시작</div>
        </div>
      </section>
      <article className="flex gap-4 pt-8 sm:flex-row flex-col ">
        <div className="flex flex-col flex-1 border p-3 rounded border-slate-500">
          <h3 className="font-bold text-md sm:text-lg text-white pb-1 ">프로세스란(process)</h3>
          <p>프로세스란 프로그램을 구동해 프로그램의 상태가 메모리상에서 실행하는 작업 단위</p>
          <p>
            {`-> 하나의 프로그램 실행은 하나의 프로세스를 갖고 그 프로세스 내부에서 실행되는 작업 단위를
            의미`}
          </p>
        </div>
        <div className="flex flex-col flex-1 border p-3 rounded border-slate-500">
          <h3 className="font-bold text-md sm:text-lg text-white pb-1">스레드란(thread)</h3>
          <p>
            하나의 프로세스는 여러 개의 스레드를 만들 수 있고, 스레드끼리 메모리 공유가 가능해 여러
            작업을 동시에 수행할 수 있다
          </p>
          <p>
            이러한 이유로 스레드를 여러 개 활용하면서 동시 다발적인 작업을 처리할 수 있게 된 것이다
          </p>
        </div>
      </article>
      <div className="flex flex-col">
        <h3 className="font-bold pt-8 text-md sm:text-lg text-white pb-1">
          자바스크립트는 왜 싱글 스레드로 설계되었나?
        </h3>
        <div>
          <h4 className="text-pink-300/80">멀티 스레드 장단점</h4>
          <p className="text-sm py-1">
            <span className="border px-1 py-0.5 rounded code-tag pink">장점</span> 위처럼 여러
            스레드로 동시 다발적 작업 가능
          </p>
          <p className="text-sm py-1">
            <span className="border px-1 py-0.5 rounded code-tag blue">단점</span> 같은 자원에 대해
            여러 번 수정하는 등 동시성 문제 / 내부적 처리 복잡도 증가 / 하나의 스레드 문제가 타
            스레드에 영향을 끼칠 가능성 존재
          </p>
        </div>
        <h4 className="font-bold pt-8 text-md sm:text-lg text-white pb-1">
          최초의 자바스크립트는 HTML을 그리는 데 한정적인 도움을 주는 보조적 역할이다
        </h4>
        <section className="h-fit border-l-2 p-4 mt-4 mb-2">
          <p className="flex gap-20 pb-2">
            <span>1995년 경</span>
            <span>
              넷스카이프 개발자 브렌던 아이크
              <br />• 브라우저에서 아주 간단한 스크립트를 지원할 목적으로 Live Script(JavaScript의
              전신)를 만듬
              <br />• 10일 만에 첫 버전 완성 &rarr; 이미지 로드, 경고창, 폼 처리 등의 기초적 역할
              제공
            </span>
          </p>
          <p className="flex gap-15 pt-2">
            <span>현재(2026~)</span>
            <span>
              자바스크립트는 DOM을 조작하며 웹 페이지 내에서 온갖 일을 처리함
              <br />• JS가 멀티 스레드였다면 여러 스레드가 DOM을 조작해 문제를 야기했을 것
            </span>
          </p>
        </section>
        <section className="py-2">
          <h2 className="text-white font-bold">자바스크립트에서의 비동기(asynchronous)</h2>
          <h3 className="font-bold text-sm sm:text-md py-3 text-slate-300/80">
            {' '}
            * 비동기 방식에서 프로세스 진행
          </h3>
          <div className="flex justify-between w-fit mx-auto gap-10">
            <CodeBlock content={CODE_EXAMPLE} />
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-primary pb-2">Run-to-Completion에 따른 동작 순서</p>
              {[1, 4, 2, 3].map((v) => (
                <span className="border p-2 rounded">{`console.log(${v})`}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export function EventLoopMain() {
  const [mode, setMode] = useState<'sync' | 'async'>('sync')
  const [step, setStep] = useState(-1)

  const steps = mode === 'sync' ? STACK_STEPS : STACK_STEPS2
  const logic = mode === 'sync' ? STACK_LOGIC : STACK_LOGIC2
  const codeContent = mode === 'sync' ? CALL_STACK : CALL_STACK2

  const currentStack = step === -1 ? [] : steps[step].stack
  const currentConsole = step === -1 ? [] : steps[step].console

  const handleModeChange = (newMode: 'sync' | 'async') => {
    setMode(newMode)
    setStep(-1)
  }

  const handleNext = () => {
    if (step >= logic.length - 1) {
      setStep(-1)
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (step > -1) {
      setStep((prev) => prev - 1)
    }
  }

  return (
    <main>
      <h2 className="font-bold text-xl sm:text-2xl text-primary">이벤트 루프란?</h2>
      <p className="text-sm sm:text-base py-1">
        자바스크립트 런타임 외부에서 자바스크립트의 비동기 실행을 돕기 위해 만들어진 장치
      </p>
      <p className="flex gap-2">
        <span>JS 런타임 &rarr;</span>
        <span className="code-tag pink">V8</span>
        <span className="code-tag pink">Spider Monkey</span>
      </p>
      <article className="flex gap-4 pt-8 sm:flex-row flex-col ">
        <div className="flex flex-col flex-1 border p-4 rounded-lg border-slate-700 relative bg-slate-900/10">
          <h3 className="font-bold text-md sm:text-lg text-white pb-1 ">
            호출 스택(Call Stack) 시뮬레이션
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            호출 스택은 자바스크립트에서 수행해야 할 코드나 함수를 순차적으로 담아두는 스택
          </p>

          {/* Tab Selector */}
          <div className="flex gap-2 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800 w-fit mb-4">
            <button
              onClick={() => handleModeChange('sync')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition duration-200 cursor-pointer ${
                mode === 'sync'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              동기 코드 (Call Stack)
            </button>
            <button
              onClick={() => handleModeChange('async')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition duration-200 cursor-pointer ${
                mode === 'async'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              비동기 코드 (setTimeout)
            </button>
          </div>

          <section className="py-2">
            <div className="flex flex-col gap-4">
              {/* Step Explanation Board */}
              <div className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-200 min-h-[68px] flex items-center justify-between gap-4">
                <div>
                  {step === -1 ? (
                    <span className="text-slate-400 font-medium">
                      👉 "시뮬레이션 시작" 버튼을 눌러 단계별 호출 스택 변화를 확인해보세요.
                    </span>
                  ) : (
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-xs text-primary font-bold tracking-wider uppercase">
                        Step {step + 1} / {logic.length}
                      </span>
                      <span className="font-semibold text-white">{logic[step]}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">
                  {step !== -1 && (
                    <button
                      onClick={handlePrev}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600 transition duration-200 cursor-pointer"
                    >
                      이전
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-sm shadow-primary/10 flex items-center"
                  >
                    <StackIcon className="w-4 h-4 mr-1.5" />
                    {step === -1
                      ? '시뮬레이션 시작'
                      : step === logic.length - 1
                        ? '다시 보기'
                        : '다음 단계'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full items-stretch">
                <div className="flex-1 min-w-0">
                  <CodeBlock content={codeContent} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-6 items-center justify-center border border-slate-700/50 rounded-lg p-5 bg-slate-950/40">
                  {/* Call Stack Cup */}
                  <div className="flex flex-col items-center w-full sm:w-1/2">
                    <span className="text-xs text-slate-400 font-bold mb-2">CALL STACK</span>
                    <div className="flex flex-col gap-2 w-full max-w-40 min-h-55 border-r-4 border-l-4 border-b-4 border-slate-500 rounded-b-xl p-3 bg-slate-900/70 justify-end">
                      {currentStack.map((frame, idx) => (
                        <div
                          key={idx}
                          className="w-full py-2 px-3 rounded bg-primary/20 border border-primary text-white text-xs font-bold text-center transition-all duration-300"
                        >
                          {frame}
                        </div>
                      ))}
                      {currentStack.length === 0 && (
                        <div className="text-slate-600 text-xs text-center py-16 font-mono">
                          (empty)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Console Output */}
                  <div className="flex flex-col w-full sm:w-1/2 max-w-[160px]">
                    <span className="text-xs text-slate-400 font-bold mb-2">CONSOLE</span>
                    <div className="border border-slate-800 rounded-md bg-black/90 p-3 text-xs font-mono h-[220px] overflow-y-auto space-y-1">
                      {currentConsole.map((log, idx) => (
                        <div key={idx} className="text-green-400">
                          {`> "${log}"`}
                        </div>
                      ))}
                      {currentConsole.length === 0 && (
                        <div className="text-slate-600 italic">No output</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
      <article className="py-10">
        <h2 className="font-bold text-xl sm:text-2xl text-primary">태스크 큐와 마이크로 큐</h2>
        <div>
          <h3 className="font-bold text-base sm:text-lg text-base-heading py-2">• 태스크 큐</h3>
          <p>
            태스크 큐는{' '}
            <span className="text-white font-semibold">실행해야 할 태스크의 Set 형태의 집합</span>
            이며, 이벤트 루프는 이러한 태스크 큐를 한 개 이상 갖고 있음
            <br />
            <span>실행해야 할 태스크</span> &rarr;{' '}
            <span className="code-tag blue">동기 함수의 콜백 함수</span>,{' '}
            <span className="code-tag blue">이벤트 핸들러</span>,{' '}
            <span className="code-tag pink">setTimeout</span>,{' '}
            <span className="code-tag pink">setInterval</span>,{' '}
            <span className="code-tag pink">setImmediate</span> 등을 의미
          </p>
          <p className="py-4">
            <span>
              이벤트 루프는 호출 스택에 실행할 코드가 있는지, 태스크 큐에 대기 중인 함수가 있는지
              반복해서 확인
            </span>
            <br />
            <span>호출 스택이 비어 있을 경우 &rarr; 태스크 큐 확인</span>
            <span>
              &rarr; 태스크 큐에서 가장 오래된 것부터 순차적으로 꺼내와서 실행 &rarr; 태스크 큐가 빌
              때까지 반복
            </span>
          </p>
          <h3 className="font-bold pt-8 text-md sm:text-lg text-white pb-1">
            비동기 함수를 수행하는 주체는?
          </h3>
          <p>
            n초 뒤 setTimeout 요청을 하는 작업은 누가 처리하나? fetch 를 기반으로 실행되는 네트워크
            요청은 누가 보내고 응답 받나? 이러한 작업은 메인 스레드가 아닌 태스크 큐가 할당되는
            별도의 스레드에서 수행된다
          </p>
          <section className="flex gap-10 py-3 justify-center">
            <div className="border py-2 px-4 flex  items-center justify-between flex-col rounded">
              <span className="text-primary font-semibold">JS 코드 실행</span>
              <span>싱글 스레드 내부에서 처리</span>
            </div>
            <div className="border py-2 px-4 flex  items-center justify-between flex-col rounded">
              <span className="text-primary font-semibold">태스크 큐 작업 처리</span>
              <span>브라우저/Node.js의 역할</span>
            </div>
          </section>
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg text-base-heading py-2">
            • 마이크로 태스크 큐
          </h3>
          <p>
            이벤트 루프는 하나의 마이크로 태스크 큐를 갖고 있으며{' '}
            <span className="text-white font-semibold">기존의 태스크 큐와 다른 태스크를 처리</span>
            한다
            <br />
            <span>실행해야 할 태스크</span> &rarr; <span className="code-tag blue">Promise</span>{' '}
            <span className="code-tag pink">queueMicroTask</span>{' '}
            <span className="code-tag pink">process.nextTick</span>{' '}
            <span className="code-tag pink">MutationObserver</span> 등을 의미
          </p>
          <h4 className="pt-4 font-bold border-b w-fit text-pink/80">
            마이크로 태스크 큐는 태스크 큐보다 우선 순위가 높다
          </h4>
          <div className="flex justify-between w-fit mx-auto gap-10 py-4">
            <CodeBlock content={MICRO_TASK} />
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-primary pb-2">실행 순서</p>
              {['bar', 'baz', 'foo'].map((v) => (
                <span className="border p-2 rounded">{`console.log(${v})`}</span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
