import CodeBlock from '../components/CodeBlock'
import { USECONTEXT_EXM1, USECONTEXT_EXM2 } from './exm'

export default function ReactUseContext() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <section id="use-context">
          <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">useContext</h2>
          <div className="flex gap-3 items-center">
            <span className="px-2 py-1 bg-pink-400/50 rounded text-white mr-1 h-fit">Context</span>{' '}
            <p className="py-2">
              리액트는 부모-자식 컴포넌트로 이뤄진 트리 구조를 가졌기에 데이터를 props로 넘겨 줘야
              함
              <br />
              &rarr; <span className="text-white">Props Drilling</span> 발생으로 이를 해결하기 위해
              나온 개념이 콘텍스트(Context)
            </p>
          </div>
          <div className="w-fit">
            <CodeBlock content={USECONTEXT_EXM1} />
          </div>
          <p>
            <code className="text-white">useContext</code>는 상위 컴포넌트에서 만들어진{' '}
            <code className="text-white">Context</code>를 함수 컴포넌트에서 사용할 수 있도록
            만들어진 훅으로 <code className="code-tag pink">{`<Context.Provider/>`}</code>에서
            제공한 값 사용이 가능하며, 여러 개의 Provider가 있을 경우 가장 가까운 Provider의 값을
            가져옴
          </p>
          <div className="w-fit py-4">
            <CodeBlock content={USECONTEXT_EXM2} />
            <p>
              위처럼 다수의 <code className="text-white">Provider</code>와{' '}
              <code className="text-white">useContext</code>를 사용할 때는 별도의 함수로 감싸서
              사용하는 것이 좋다
            </p>
          </div>
        </section>
      </section>
      <UseContextRules />
    </div>
  )
}

function UseContextRules() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-xl sm:text-2xl text-primary mt-8 mb-2">
        useContext 사용 시 주의사항
      </h2>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <p className="font-semibold text-base sm:text-lg text-base-heading">
          • useContext를 사용하는 컴포넌트를 최대한 작게 / 재사용되지 않을 정도로 해라
        </p>
        <p className="leading-relaxed">
          useContext를 사용할 경우, Provider에 의존성을 지니게 되기 때문에 컴포넌트를 재활용하기
          어렵다
        </p>
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <p className="font-semibold text-base sm:text-lg text-base-heading">
          • useContext는 상태 관리 API가 아니다
        </p>
        <p className="leading-relaxed">
          엄밀히 따지면 콘텍스트는{' '}
          <span className="text-pink-300 font-semibold">상태를 주입해 주는 API</span>이다 &rarr;
          props를 상위에서 하위로 전달해 주는 역할
        </p>
        <div className=" bg-primary-bg border border-primary-border px-3 py-2 rounded-lg flex flex-col">
          <span className="font-bold text-base-heading text-base">상태 관리 API의 조건</span>
          <ul className="list-decimal ml-5 py-2">
            <li>
              <span className="text-white">어떠한 상태</span>를 기반으로{' '}
              <span className="text-white">다른 상태</span>를 만들어 낼 수 있어야 한다
            </li>
            <li>
              필요에 따라 이러한 <span className="text-white">상태 변화를 최적화</span>할 수 있어야
              한다
            </li>
          </ul>
        </div>
      </article>

      <article className="text-sm sm:text-base flex flex-col gap-2">
        <p className="font-semibold text-base sm:text-lg text-base-heading">
          • 렌더링을 최적화하지 않는다
        </p>
        <p className="leading-relaxed">
          <code className="text-white">ParnetComonent</code>에서{' '}
          <code className="bg-sky-300/20 text-sky-300">Provider</code>로 값을 내려 주고 이를{' '}
          <code className="bg-red-300/20 text-red-300">useContext</code>로{' '}
          <code className="text-white">GrandChild</code>에서 사용한다고 할 경우, 값 변경 시
          <code className="text-white">GrandChild</code>와{' '}
          <code className="text-white">PrantComponent</code>만 렌더링 될 것 같지만, 사실은 컴포넌트
          트리 전체가 리렌더링된다
        </p>
        <p className="text-primary">
          이는 부모 컴포넌트가 렌더링되면 하위 컴포넌트가 모두 리렌더링되기 때문이다
        </p>
      </article>
    </div>
  )
}
