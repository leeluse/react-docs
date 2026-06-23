
export default function LifeCycle() {
  return (
    <div>
      <section className="flex flex-col m-5 gap-10 py-25">
        <h1 className='text-[45px] font-bold text-white'># Life Cycle</h1>
        <p className="whitespace-pre-line">
        <p className='font-semibold text-lg text-white pb-3'>• 컴포넌트의 Life Cycle 메서드</p>
          {`모든 리액트 컴포넌트는 라이프 사이클(수명 주기)가 존재한다 ->`}
          <span className="text-purple-400/50">{` 컴포넌트의 수명: 페이지에서 렌더링되기 전인 준비과정 -> 페이지에서 사라짐`}</span>
          <br></br>
          <span >{`리액트로 프로젝트를 진행하면서 필연적으로 진행해야 하는 작업들이 있는데, 이를 테면 아래와 같은 작업들을 할 때 컴포넌트의 라이프사이클 메서드를 사용한다`}</span>
          <div className="flex  gap-3 py-4">
            <span className='text-white bg-purple-500/20 p-2 mx-1  rounded-md w-fit'>컴포넌트를 처음으로 렌더링 시 필요한 작업</span>
            <span className='text-white bg-purple-500/20 p-2  mx-1 rounded-md w-fit'>컴포넌트를 업데이트 전후 필요한 작업 </span>
            <span className='text-white bg-purple-500/20 p-2  mx-1 rounded-md w-fit'>불필요한 업데이트를 방지하는 작업 </span>
            
          </div>
        </p>
      </section>
      <article>

      </article>
    </div>
  )
}
