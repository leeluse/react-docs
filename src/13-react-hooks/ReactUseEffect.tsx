import { Arrow } from '../09-life-cycle/LifeCycle'
import CodeBlock from '../components/CodeBlock'
import {
  USEEFFECT_EXM1,
  USEEFFECT_EXM2,
  USEEFFECT_EXM3,
  USEEFFECT_EXM4,
  USEEFFECT_EXM5,
  USEEFFECT_EXM6,
  USEEFFECT_EXM7_1,
  USEEFFECT_EXM7_2,
  USEEFFECT_EXM7_3,
  USEEFFECT_EXM8,
} from './exm'

export default function ReactUseEffect() {
  return (
    <section className="mt-10">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useEffect</h2>
      <div className="flex flex-col pt-4">
        <h4 className="font-bold text-slate-300 pb-1 border-b mb-1 border-b-slate-600/30">
          useEffect의 정확한 정의
        </h4>
        <span className="text-white/90 pb-3 pt-2">
          useEffect는 어플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는
          매커니즘이다
        </span>
      </div>

      <p className="border-l-2 border-primary pl-2 py-2 text-white bg-primary/10 mt-5">
        useEffect 훅 사용법
      </p>
      <p className="pt-3">
        • 두 개의 인수를 받으며 첫 번째는 콜백, 두 번째는 의존성 배열이다 &rarr;
        <span className="bg-sky-400/20 mx-2 text-sky-100">
          의존성 배열의 값이 변경되면 첫 번째 콜백을 실행한다
        </span>
      </p>
      <p>
        • 클래스 컴포넌트의 생명주기 메서드와 비슷한 작동을 구현 가능하며{' '}
        <span className="border-b">
          의존성 배열에 빈 배열을 넣을 시 컴포넌트가 마운트될 때만 실행
        </span>
        된다
      </p>
      <p>
        • <code className="code-tag pink my-2">useEffect</code>는 클린업 함수를 반환할 수 있으며
        이는 컴포넌트가 언마운트될 때 실행된다
      </p>

      <div className="flex py-3">
        <div className="flex-1">
          <CodeBlock content={USEEFFECT_EXM1} />
        </div>
        <ul className="flex-1 max-h-fit list-decimal ml-5 pl-6 text-sm bg-pink-400/20 rounded-lg py-3 border border-pink-400/50">
          <li>의존성 배열이 변경된다</li>
          <li>의존성 배열이 변경되면 콜백이 실행된다</li>
        </ul>
      </div>
      <div className="flex py-3">
        <div className="flex-1">
          <CodeBlock content={USEEFFECT_EXM2} />
        </div>
        <ul className="flex-1 max-h-fit  px-4 mx-4 ">
          <li>
            버튼 클릭 시 counter의 값이 올라감 &rarr; 즉 함수 컴포넌트는 렌더링 시마다 고유의{' '}
            <code className="text-red-300">state</code>와{' '}
            <code className="text-red-300">props</code>를 갖고 있음
            <code className="whitespace-pre-wrap bg-black/20 p-2 rounded-lg text-xs inline-block text-emerald-500/80">
              {`function Component() {
const counter = 1;
//...
return (
    <>
        <p>{count}</p>
        <button onClick={handleClick}>+</button>
    </>
    )
}`}
            </code>
          </li>
          <li className="font-semibold bg-slate-400/10 mt-3 p-2 rounded text-slate-300 text-sm">
            <code className="code-tag pink">useEffect</code>는 프록시나 데이터 바인딩 등을 통해 값의
            변화를 관찰하는 것이 아님 <br />
            렌더링 때마다 의존성의 있는 값을 보면서 의존성이 이전과 다른 게 하나라도 있으면 부수
            효과가 발생함
          </li>
        </ul>
      </div>
      <div className="pt-3">
        <h4 className="font-bold text-white">useEffect 클린업 함수?</h4>
        <p className="pt-1">일반적으로 클린업 함수는 이벤트를 등록하고 지울 때 사용한다</p>
        <div className="flex gap-4">
          <div className="flex-1">
            <CodeBlock content={USEEFFECT_EXM4} />
          </div>
          <div className="flex-1">
            <CodeBlock content={USEEFFECT_EXM3} />
          </div>
        </div>
        <p>
          로그를 보면 클린업 함수는 이전 <span className="code-tag text-pink">counter</span> 값, 즉
          이전 <code className="code-tag pink">state</code>를 참조해 실행된다는 것을 알 수 있다
        </p>
        <p>
          클린업 함수는 새로운 값과 함께 렌더링된 뒤에 실행되기 때문에 위와 같은 메시지가 나타난다{' '}
          <br />
        </p>
      </div>
      <div className="pt-5">
        <h4 className="font-bold text-white">의존성 배열</h4>
        <p className="pt-1 ">비워 두거나 직접 원하는 값을 넣어 렌더링을 트리거한다</p>
        <section className="flex justify-around gap-5 py-7 text-sm">
          <div className="flex flex-col w-fit items-center gap-1">
            <span className="border p-1 w-full text-center rounded bg-indigo-500/20 text-indigo-300">
              전달 값 X
            </span>
            <Arrow />
            <span className="border p-1 px-2 text-center rounded w-full bg-indigo-500/20 text-indigo-300">
              의존성을 비교할 필요 X
            </span>
            <Arrow />
            <span className="border p-1 px-2 text-center rounded w-full bg-indigo-500/20 text-indigo-300">
              매 렌더링마다 실행
            </span>
          </div>
          <div className="flex flex-col w-fit items-center gap-1 ">
            <span className="border p-1 w-full text-center rounded bg-indigo-500/20 text-indigo-300">
              빈 배열 설정
            </span>
            <Arrow />
            <span className="border p-1 px-2 rounded w-full text-center bg-indigo-500/20 text-indigo-300">
              비교할 의존성 X
            </span>
            <Arrow />
            <span className="border p-1 px-2 rounded w-full bg-indigo-500/20 text-indigo-300">
              최초 렌더링 이후 실행 X{' '}
            </span>
          </div>
          <div className="flex flex-col w-fit items-center gap-1 ">
            <span className="border p-1 w-full text-center rounded bg-indigo-500/20 text-indigo-300">
              직접 원하는 값 설정
            </span>
            <Arrow />
            <span className="border p-1 px-2 rounded w-full text-center bg-indigo-500/20 text-indigo-300">
              배열 내 특정 값이 변경되었을 때 실행
            </span>
          </div>
        </section>
        <p>
          로그를 보면 클린업 함수는 이전 <code className="code-tag pink"> counter</code> 값, 즉 이전{' '}
          <code className="code-tag pink">state</code>를 참조해 실행된다는 것을 알 수 있다
        </p>
        <p>
          클린업 함수는 새로운 값과 함께 렌더링된 뒤에 실행되기 때문에 위와 같은 메시지가 나타난다{' '}
          <br />
        </p>
      </div>
      <div className="border-l pl-3 my-5">
        <h4 className="font-bold text-white">의존성 배열이 없는 useEffect를 쓰는 이유?</h4>
        <p>의존성 배열이 없다면, 매 렌더링마다 실행될 텐데 굳이 써야 할까? 싶을 수 있다</p>
        <CodeBlock content={USEEFFECT_EXM5} />
        <p>
          1. 서버 사이드 관점에서 useEffct는{' '}
          <span className="text-emerald-400">클라이언트 사이드에서 실행되는 것을 보장해 준다</span>
        </p>
        <p>
          2.{' '}
          <span className="text-emerald-400">useEffect는 컴포넌트 렌더링이 완료된 이후 실행</span>
          되기 때문에 1번과 다르게 서버 사이드 렌더링의 경우 서버에서도 실행된다
        </p>
        <p>
          이 작업은 컴포넌트의 반환을 지연한다 &rarr;{' '}
          <span className="bg-emerald-200/20 text-white p-1">
            무거운 작업일수록 렌더링을 방해해 성능 악화
          </span>
        </p>
      </div>
      <div className="py-5">
        <h3 className="font-bold text-primary border-l-2 pl-3">useEffect Hook 구현 코드 예제</h3>
        <CodeBlock content={USEEFFECT_EXM6} />
        <p>* 실제 리액트 코드에서는 useReducer로 구현되어 있다</p>
      </div>
      <article>
        <h4 className="font-bold text-white">useEffect 사용 시 주의할 점</h4>
        <ul className="list-decimal list-inside py-3">
          <li className="py-3">
            <span className="bg-slate-500/20 rounded-lg px-3 py-1 text-white">
              eslint-disable-line react-hooks/exhaustive-deps 주석을 자제하라
            </span>
            <br />
            <span className="text-sm">
              ESLint 룰은 useEffect 인수 내부에서 사용하는 값 중 의존성 배열에 포함돼 있지 않은 값이
              있을 시 경고를 발생시킴
            </span>
          </li>
          <li className="py-3">
            <span className="bg-slate-500/20 rounded-lg px-3 py-1 text-white">
              useEffect의 첫 번째 인수에 함수명을 부여하라
            </span>
            <br />
            <span className="text-sm ">
              내부 로직이 복잡할 경우 해당 useEffect가 뭘 하는 코드인지 파악이 힘듬 {`-> `}
              <span className="text-red-400">책임을 최소한으로 좁히고 목적이 명확해짐</span>
            </span>
            <div className="w-fit pl-5">
              <CodeBlock content={USEEFFECT_EXM7_1} />
            </div>
          </li>
          <li className="py-3">
            <span className="bg-slate-500/20 rounded-lg px-3 py-1 text-white">
              거대한 useEffect를 만들지 마라
            </span>
            <br />
            <span className="text-sm ">
              의존성 배열을 바탕으로 렌더링 시 변경될 때마다 사이드 이펙트 발생 시 성능에 악영향{' '}
              {`-> `}
              <span className="text-red-400">
                적은 의존성 배열을 사용하는 여러 개의 useEffect로 분리하기
              </span>
            </span>
            <div className="w-fit pl-5"></div>
          </li>
          <li className="py-3">
            <span className="bg-slate-500/20 rounded-lg px-3 py-1 text-white">
              불필요한 외부 함수를 만들지 마라
            </span>
            <br />
            <span className="text-sm ">
              콜백 또한 불필요하게 존재해서는 안 됨
              <br />
              적은 의존성 배열을 사용하는 여러 개의 useEffect로 분리하기
            </span>
            <div className="w-fit pl-5">
              <CodeBlock content={USEEFFECT_EXM7_2} />
              <p>
                수정 전: props를 받아서 그 정보를 바탕으로 API를 호출하지만 useEffect 밖에서
                선언하다 보니 불필요한 코드와 가독성 하락
              </p>
              <CodeBlock content={USEEFFECT_EXM7_3} />
              <p>
                수정 후: 외부에 있던 관련 함수를 내부로 가져왔더니 간결하지고, 불필요한 의존성도
                줄였음
              </p>
            </div>
          </li>
        </ul>
      </article>

      <article>
        <h4 className="text-primary font-semibold">
          useEffect의 콜백 인수로 비동기 함수를 넣을 수 없는 이유
        </h4>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <CodeBlock content={USEEFFECT_EXM8} />
          </div>
          <div className="flex flex-col justify-between">
            <p>
              useEffect 내부에서 state를 결과에 따라 업데이트 하는 로직이 있을 경우{' '}
              <span className="text-primary">경쟁 상태(race condition)</span> 발생 가능성 존재
            </p>
            <p className="flex flex-col gap-2  items-center">
              <span className="border-slate-300 rounded text-white text-center w-full text-sm">
                state 응답 10초 소모
              </span>
              <Arrow />
              <span className="border-slate-300 rounded text-white text-center w-full text-sm">
                1초 뒤 바뀐 state 기반 응답 도착
              </span>
              <Arrow />
              <span className="border-slate-300 rounded text-white text-center w-full text-sm">
                이전 stale한 state 결과가 나옴
              </span>
            </p>
          </div>
        </div>
        <p className="text-white">비동기를 실행하는 방법?</p>
        <p>
          &rarr; 인수로 비동기 함수를 지정하는 게 불가능한 것일 뿐, useEffect 내부에서{' '}
          <span className="code-tag pink">비동기 함수를 선언해 실행</span>하거나{' '}
          <span className="code-tag pink">즉시 실행 비동기 함수</span>를 만들어 사용하면 된다
        </p>
      </article>
    </section>
  )
}
