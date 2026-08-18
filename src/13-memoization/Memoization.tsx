import CodeBlock from '../components/CodeBlock'

const EXM1 = `
function sum(a, b) {
  return a + b
}
`

const EXM_2_1 = `
function useMath(number: number) {
  const [double, setDouble] = useState(0)
  const [triple, setTriple] = useState(0)

  useEffect(() => {
    setDouble(number * 2)
    setTriple(number * 3)
  }, [number])

  return { double, triple }
}

export default function App() {
  const [counter, setCounter] = useState(0)
  const value = useMath(10)

  useEffect(() => {
    console.log(value.double, value.triple)
  }, [value]) // 값이 실제로 변한 건 없는데 계속해서 console.log가 호출됨
  
  function handleClick() {
    setCounter((prev) => prev + 1)
  }

  return 
  <>
    <h1>{counter}</h1>
    <button onClick={handleClick}>+</button>
  </>
    })
}
`

const EXM_2_2 = `
function useMath(number: number) {
  const [double, setDouble] = useState(0)
  const [triple, setTriple] = useState(0)

  useEffect(() => {
    setDouble(number * 2)
    setTriple(number * 3)
  }, [number])

  return {() => {double, triple}, [double, triple] }
}

`
export default function Memoization() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <ReactMemoization />
      <ReactMemo />
      <UseMemoAndUseCallback />
    </div>
  )
}

export function ReactMemoization() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
        # 12. Memoization (메모이제이션)
      </h1>
      <article>
        <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">리액트의 메모이제이션?</h2>
        <p>
          리액트에서 제공하는 API 에서 <code className="code-tag">useMemo</code>,{' '}
          <code className="code-tag">useCallback</code>,{' '}
          <code className="code-tag">고차함수인 memo</code>는 리액트에서 발생하는 렌더링을
          최소한으로 줄이기 위한 것이다
          <span className="text-white">
            {` `}이 최적화 기법은 그럼 각각 어떤 상황에서 사용해야 할까?
          </span>
        </p>
      </article>
      <article>
        <h3 className="font-semibold text-md sm:text-lg text-white">1. 최적화는 비용이 든다</h3>
        <div className="flex gap-3">
          <div className="flex-1 text-center">
            <CodeBlock content={EXM1} />
            <span className="text-xs sm:text-sm text-slate-500/80">
              메모이제이션 시 비효율적인 함수
            </span>
          </div>
          <p className="flex-1">
            해당 코드를 메모이제이션 하게 된다면 결과를 매번 새로 계산하는 것과 저장해 두고
            메모리에서 꺼내오는 것 중 뭐가 효율적일까?
            <br />이 작업은 매번 수행하기에 부담되는 작업도 아니기에 메모리를 사용하는 것은 매우
            비효율적일 것이다
          </p>
        </div>
        <div className="border p-3 mt-5 rounded">
          <h4 className="font-bold text-taupe-50">Memozation의 트레이드 오프</h4>
          <p>
            메모이제이션을 하기 위해서는 값을 <span className="text-white">비교하고 렌더링</span>,{' '}
            <span className="text-white">재계산이 필요한지 확인하는 작업</span>이 필요하다
          </p>
          <p className="text-sm">
            * 섣부른 메모이제이션을 <code>premature Memorization</code>이라고 한다
          </p>
          <p className="bg-slate-700 p-2 mt-2">
            <span className="text-sm ">
              useMemo는 성능 최적화를 위해 사용할 수는 있지만 의미상으로 그것이 보장된다고 생각하지
              마라 가까운 미래에 리액트에서는 이전에 메모이제이션된 값들의 일부를 '잊어버리고' 다음
              렌더링 시에 그것들을 재계산하는 방향을 택할지도 모르겠다 예를 들면, 오프스크린
              컴포넌트의 메모리를 해제하는 등. useMemo를 사용하지 않고도 작동 가능하도록 코드를
              작성하고, 그것을 추가해 성능을 최적화해라
            </span>
          </p>
        </div>
      </article>
    </section>
  )
}

export function ReactMemo() {
  return (
    <article className="mt-4">
      <h3 className="font-bold text-md sm:text-lg text-white">2. memo의 Trade-off</h3>
      <p className="border-l-2 pl-2 italic my-2 text-ld font-semibold bg-amber-50/5">
        잘못된 memo 사용은 props에 대한 얕은 비교에 대한 비용이 든다
      </p>
      <p>
        <code className="font-bold">Memoization</code> :{' '}
        <span className="border-b">CPU와 메모리</span>를 사용해 이전 렌더링 결과를 저장 &rarr;{' '}
        리렌더링할 필요 없을 경우 이전 결과물을 사용하도록 함
        <br />
        <span className="px-2 rounded bg-emerald-400/20 text-emerald-100">
          해당 방식은 이미 리액트의 재조정 단계에서 진행하기에(이전 결과물 저장) memo를 위한 얕은
          비교만 요구됨
        </span>
      </p>
      <p className="my-2">
        <strong className="text-primary text-lg mt-4 border-b border-primary/50 mb-2 inline-block">
          memo를 사용하지 않았을 경우 발생하는 문제
        </strong>
        <ul className="list-decimal ml-5">
          <li>렌더링을 함</li>
          <li>컴포넌트 내부 복잡한 로직 실행함</li>
          <li>위 두 개가 자식 컴포넌트도 일어남</li>
          <li>리액트가 이전 트리랑 현재 트리 비교함</li>
        </ul>
      </p>
    </article>
  )
}

export function UseMemoAndUseCallback() {
  return (
    <article className="mt-4">
      <h3 className="font-bold text-md sm:text-lg text-white">3. useMemo와 useCallback</h3>
      <p className="flex flex-col gap-1 py-2">
        이 둘 중 어느 것이 더 비용적으로 저렴한가?
        <br />
        <div className="py-2">
          <span className=" bg-pink-600/20 px-2 py-1 rounded-md w-fit">
            의존성 배열을 비교하고 필요에 따라 값을 재계산하는 과정
          </span>{' '}
          vs{' '}
          <span className=" bg-blue-600/20 px-2 py-1 rounded-md w-fit">
            값과 함수를 매번 재생성하는 비용 한다
          </span>
          <br />
        </div>
      </p>
      <p>
        <span>리렌더링 발생 시 메모이제이션 같은 별도 조치가 없을 시</span>
        <span className="border-b ml-1">모든 객체는 재생성됨</span>
        <br />
        <span>
          객체가 재생성되기 때문에 참조가 달라지는데, 달라진 참조 값이 useEffect의 의존성 배열에서
          사용된다면? &rarr; 리렌더링을 유발한다
        </span>
      </p>
      <p className="text-primary font-semibold pt-5">• useMath 훅</p>
      <CodeBlock content={EXM_2_1} />
      <p className="text-sm ">
        해당 훅은 인수로 넘겨주는 값이 변하지 않는 이상 같은 값을 가져야 하는데{' '}
        <code className="code-tag pink mx-1">handleClick</code>으로 인해{' '}
        <code className="code-tag pink mx-1">console.log</code>가 출력된다
      </p>
      <p className="text-sm text-white">
        {`-> `}함수 컴포넌트 App이 호출되면서{' '}
        <span className="font-semibold">
          useMath가 계속 호출되기 때문에 값은 같지만 참조가 바뀌는 것
        </span>
        이다
      </p>
      <p className="text-primary font-semibold pt-5">• useMath 훅</p>
      <CodeBlock content={EXM_2_2} />
      <p className="text-sm ">
        <code className="code-tag pink mx-1">useMemo</code>로 감싼다면 변경되지 않는 한 같은
        결과물을 가질 수 있고, 그 덕에 사용하는 쪽에서도 참조의 투명성을 유지 가능하게 된다
        <br />
      </p>
    </article>
  )
}
