export default function ReactRendering() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 11. React Rendering (리액트 렌더링)
        </h1>
        <ReactReanderingMeaning />
      </section>
    </div>
  )
}

export function ReactReanderingMeaning() {
  return (
    <article className="">
      <h2 className="font-bold text-xl sm:text-2xl text-primary pb-2">리액트 렌더링이란?</h2>
      <div className="mb-4 mt-2 bg-pink-500/10 border border-pink-500/25 px-3 py-2 rounded-md leading-relaxed text-sm sm:text-md">
        <p className="text-blue-50">
          <span className="text-pink-400">리액트의 렌더링</span>: 리액트 어플리케이션 트리 안의 모든
          컴포넌트들이 현재 갖고 있는 props, state의 값을 기반으로{' '}
          <span className="text-pink-300/80">어떻게 UI를 구성하고</span> 이를 바탕으로
          <span className="text-pink-300/80"> 어떤 DOM 결과를 브라우저에 제공할 것</span>인지
          계산하는 일련의 과정침
        </p>
      </div>
      <div className="border-l-3 pl-5 text-white py-2 my-7">
        <p>리액트의 렌더링이 일어나는 이유?</p>
      </div>
      <section className="flex gap-10">
        <div className="block border p-3 rounded  text-center h-fit w-1/2">
          <span className="font-bold text-primary">최초 렌더링</span>
          <p className="text-start">
            사용자가 처음 진입 시 브라우저에 정보를 제공하기 위해 최초 렌더링 수행
          </p>
        </div>
        <div className="block border p-3 rounded text-center w-1/2">
          <span className="font-bold text-primary">리렌더링</span>
          <p className="text-start">
            최초 렌더링 이후 발생하는 모든 렌더링
            <ul className="list-decimal ml-5 text-start text-sm mt-1">
              <li>클래스 컴포넌트: setState가 실행되는 경우</li>
              <li>클래스 컴포넌트: forceUpdate가 실행되는 경우</li>
              <li>함수 컴포넌트: 부모 컴포넌트의 렌더링</li>
              <li>함수 컴포넌트: useState()의 setter 실행</li>
              <li>함수 컴포넌트: useReducer()의 dispatch 실행</li>
              <li>컴포넌트의 key props 변경</li>
            </ul>
          </p>
        </div>
      </section>
    </article>
  )
}
