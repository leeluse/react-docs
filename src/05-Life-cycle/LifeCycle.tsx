
export default function LifeCycle() {
  return (
    <div>
      <section className="flex flex-col m-5 gap-10 py-25">
        <h1 className='text-[45px] font-bold text-white'># Life Cycle</h1>
        <article>
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
          <p className="text-red-400/60">
            중요!  라이프 사이클 메서드는 클래스형 컴포넌트에서만 사용 가능하다
          </p>
        </p>
        </article>
        <article className="">
        <p className='font-semibold text-lg text-white pb-3'>• Life Cycle 메서드의 이해</p>
        <span>라이프 사이클 메서드 종류: 총 9가지</span>
        <div className="flex gap-3 m-4 items-center">
          <span className="px-5 py-0.5 rounded-2xl bg-pink-400/40 text-white">Will 접두사 메서드</span>
          <span className="text-pink-300">어떤 작업을 작동하기 전에 실행되는 메서드</span>
        </div>
        <div className="flex gap-3 m-4 items-center">
          <span className="px-5 py-0.5 rounded-2xl bg-blue-400/40 text-white">Did 접두사 메서드</span>
          <span className="text-blue-300">어떤 작업을 작동한 후에 실행되는 메서드</span>
        </div>
        <span className="pr-2">라이프 사이클 메서드 카테고리: 총 3가지</span>
            <span className='text-white bg-slate-800 p-2 mx-1  rounded-md w-fit'>마운트</span>
            <span className='text-white bg-slate-800 p-2  mx-1 rounded-md w-fit'>언마운트 </span>
            <span className='text-white bg-slate-800 p-2  mx-1 rounded-md w-fit'>업데이트 </span>
      </article>
      <div className="py-3">
        <LifeCycleGraph />
        <Mount />
        <Update />
        <Unmount />
      </div>
      </section>
    </div>
  )
}


export function LifeCycleGraph() {
  const arr = [
    {
      title: '마운트',
      desc: '페이지에 컴포넌트가 나타남'
    },
    {
      title: '업데이트',
      desc: '페이지에서 컴포넌트가 사라짐'
    },
    {
      title: '언마운트',
      desc: '컴포넌트 정보를 업데이트'
    }
  ];
  return (
    <div className="flex max-w-1/3 justify-between items-center mx-auto relative pt-50">
      {arr.map(({title, desc}, index) =>
      <div key={title} className={`${index === 1 ? 'absolute top-0 left-[31.5%]' : ''} flex flex-col items-center gap-2 justify-center`}>
       {index === 1 && (
        <>
          <span className="text-md font-semibold text-purple-300">리렌더링</span>
          <span className="text-slate-400 text-sm">컴포넌트 정보를 업데이트</span>
        </>
        )}
        <div className={`w-30 h-15 bg-blue-400/40 rounded flex items-center justify-center relative z-10`}>
        {index === 0 && (
          <>
          <hr className="w-25 h-1 text-purple-400/30 absolute -top-13 rotate-90 " />
          <hr className="w-16 h-1 text-purple-400/30 absolute -top-25 left-15.5 " />
          </>
        )}
        {index === 2 && (
          <>
          <hr className="w-25 h-1 text-purple-400/30 absolute -top-13 rotate-90 " />
          <hr className="w-16 h-1 text-purple-400/30 absolute -top-25 right-14.5 " />
          </>
        )}
          <span className="text-white font-semibold text-lg">{title}</span>
        </div>
          <p className="text-white text-sm">{desc}</p>
      </div>
      )}
    </div>
  ) 
}

function Mount() {
  return (
    <div className="flex-1 py-10">
        <h3 className='text-2xl font-bold text-primary py-2.5 '>1. 마운트</h3>
        <p>마운트(mount)는 DOM이 생성되고 웹 브라우저 상에 나타나는 것을 의미</p>
        <div className="flex flex-col py-3">
          <p className="text-pink-400/70 font-semibold text-xl">• 마운트 시 호출되는 메서드</p>
          <div className="my-5">
          <MountMethod title="컴포넌트 만들기" desc="" isArrow={true} />
          <MountMethod title="constructor" desc="컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드입니다" isArrow={true} />
          <MountMethod title="getDerivedStateFromProps" desc=" props에 있는 값을 state에 넣을 때 사용하는 메서드입니다" isArrow={true} />
          <MountMethod title="render" desc="우리가 준비한 UI를 렌더링하는 메서드입니다" isArrow={true} />
          <MountMethod title="componentDidMount" desc=" 컴포넌트가 웹 브라우저 상에 나타난 후 호출하는 메서드입니다" isArrow={false} />
          </div>
        </div>
    </div>
  )
}

function Update() {
  return (
    <div className="flex-1 py-10">
        <h3 className='text-2xl font-bold text-primary py-2.5 '>2. 업데이트</h3>
        <p className="pr-2">컴포넌트는 총 네 가지 경우에 업데이트를 진행</p>
        <div className="flex gap-2 my-5 w-fit bg-black/20 p-4 rounded-md flex-col">
            <span className=''>1. props가 바뀔 때</span>
            <span className=' '>2. state가 바뀔 때</span>
            <span className=' '>3. 부모 컴포넌트가 리렌더링될 때</span>
            <span className=' '>4. this.forceUpdate로 강제로 렌더링을 트리거할 때</span>
        </div>
        <div className="flex flex-col py-3">
          <p className="text-blue-400/70 font-semibold text-xl">• 업데이트 시 호출되는 메서드</p>
          <div className="my-5">
          <UpdateMethod title="업데이트를 발생시키는 요인" desc="" isArrow={true} isFirst={true} />
          <UpdateMethod title="getDerivedStateFromProps" desc="마운트 과정에서도 호출되며 업데이트가 시작하기 전에도 호출되는데, props의 변화에 따라 state의 값에도 변화를 주고 싶을 때 사용한다" isArrow={true} />
          <UpdateMethod title="shouldComponentUpdate" desc={`컴포넌트가 리렌더링을 해야할지 말아야 할지 결정하는 메서드 \n이 메서드는 true 혹은 false를 반환하애 하며, true를 반환하면 다음 라이프사이클 메서드를 게속 실행하고, false를 반환하면 작업을 중지\ntrue: 리렌더링 O / false: 리렌더링 X \n만약 특정 함수에서 this.forceUpdate 함수를 호출한다면 이 과정을 생략하고 바로 render 함수 호출`} isArrow={true} />
          <UpdateMethod title="render" desc="컴포넌트를 리렌더링" isArrow={true} />
          <UpdateMethod title="getSnapshotBeforeUpdate" desc="컴포넌트 변화를 DOM에 반영하기 직전에 호출하는 메서드" isArrow={true} />
          <UpdateMethod title="componentDidUpdate" desc="컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드" isArrow={false} />
          </div>
        </div>
    </div>
  )
}

function Unmount() {
  return (
         <div className="flex-1 py-10">
        <h3 className='text-2xl font-bold text-primary py-2.5 '>3. 언마운트</h3>
        <p className="pr-2">마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것</p>
        <div className="flex flex-col py-3">
          <p className="text-yellow-400/70 font-semibold text-xl">• 언마운트 시 호출되는 메서드</p>
          <div className="my-5">
          <UnmountMethod title="언마운트하기" desc="" isArrow={true}/>
          <UnmountMethod title="componentWillUnmount" desc="컴포넌트가 웹 브라우저 상에서 제거되기 직전에 호출되는 메서드" isArrow={false} />
          </div>
        </div>
    </div>
  )
}

const Arrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-pink-400/60 my-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export function MountMethod({title, desc, isArrow}: {title: string, desc: string, isArrow: boolean}) {
  return(
    <div className="flex-1 flex flex-col items-start justify-center px-3 py-1 gap-1">
      <div className='w-full flex items-center gap-3 '>
        <span className="min-w-50 px-3 py-2 rounded border border-amber-50/30 text-center text-sm  bg-pink-500/10">{title}</span>
        <span className="size-full px-7 text-white/80 text-sm ">{desc}</span>
      </div>
      <div className="min-w-50 flex items-center justify-center">
      {isArrow && <Arrow />}
      </div>
    </div>
  )
}



export function UnmountMethod({title, desc, isArrow}: {title: string, desc: string, isArrow: boolean}) {
  return(
    <div className="flex-1 flex flex-col items-start justify-center px-3 py-1 gap-1">
      <div className='w-full flex items-center gap-3 '>
        <span className="min-w-50 px-3 py-2 rounded border border-amber-50/30 text-center text-sm  bg-yellow-500/10">{title}</span>
        <span className="size-full px-7 text-white/80 text-sm ">{desc}</span>
      </div>
      <div className="min-w-50 flex items-center justify-center">
      {isArrow && <Arrow />}
      </div>
    </div>
  )
}
export function UpdateMethod({title, desc, isArrow, isFirst}: {title: string, desc: string, isArrow: boolean, isFirst?: boolean}) {
  return(
    <div className="flex-1 flex flex-col items-start justify-center px-3 py-1 gap-1">
      <div className='w-full flex items-center gap-3 '>
        {isFirst ? 
        (
          <div className="w-[350px] px-3 py-2 rounded border border-amber-50/30 text-center text-sm bg-blue-500/10 flex flex-col items-center justify-center">
             <div className="font-semibold">{title}</div>
             <ul className="flex divide-x border rounded-sm mt-2 divide-amber-50/30 text-[11px] w-full justify-center">
                <li className="p-1 text-center flex-1">props 변경</li>
                <li className="p-1 text-center flex-1">state 변경</li>
                <li className="p-1 text-center flex-1">부모 컴포넌트 렌더링</li>
             </ul>
          </div>
        ) : (
          <div className="w-[350px] px-3 py-2 rounded border border-amber-50/30 text-center text-sm bg-blue-500/10 flex items-center justify-center ">
            {title}
          </div>
        )
       }
        <span className="flex-1 px-7 text-white/80 text-sm whitespace-pre">{desc}</span>
      </div>
      <div className="w-[350px] flex items-center justify-center">
        {isArrow && <Arrow />}
      </div>
    </div>
  )
}



