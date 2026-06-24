import CodeBlock from "../components/CodeBlock";
import Example from "./Example";

export default function LifeCycle() {
  return (
    <div>
      <section className="flex flex-col m-5 gap-10 py-25">
        <h1 className='text-[45px] font-bold text-white'># Life Cycle</h1>
        <article>
        <div className="whitespace-pre-line">
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
        </div>
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
        <p className='font-semibold text-lg text-white'>• 컴포넌트의 Life Cycle 메서드 살펴보기</p>
        <RenderMethod />
        <ConstructorMethod />
        <GetDerivedStateFromPropsMethod />
        <ComponentDidMount />
        <ShouldComponentUpdate />
        <GetSnapshotBeforeUpdate />
        <ComponentDidUpdate />
        <ComponentWillUnmount />
        <ComponentDidCatch />
      </section>
        <h2 className="text-xl font-bold text-white mb-4">Life Cycle 실습</h2>
        <p className="pb-5">개발자 도구에서 console을 확인할 경우 라이프 사이클의 순서를 확인할 수 있습니다</p>
      <section className="flex  justify-center gap-10">
        <Example />
        <div className="w-150">
        <p className=" text-white-300/70 font-semibold">• 최초 Mount Log</p>
<p className="whitespace-pre bg-black/30  p-4 text-sm pb-18 m-3 rounded-md">{`🟢 [Mount Phase] constructor - 컴포넌트 인스턴스
생성 및 초기화 완료
🔍 [Mount & Update Phase] getDerivedStateFromProps - Props 데이터를 State
와 동기화 시도
{nextProps: {…}, prevState: {…}}
➡️ props 색상(#000000)과 state 색상(null)이 다르므로 state를 동기화합니다.
🎨 [Render] render - 컴포넌트 모양(HTML 구조) 결정 및 가상 DOM 렌더링
✨ [Mount Phase] componentDidMount - 컴포넌트 첫 렌더링 후 DOM 마운트 완료" `}</p>
        </div>
      </section>
    </div>
  )
}


export function RenderMethod() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white ">Render() 함수</span>
      <div className="w-120">
      <CodeBlock content="render() {...}" />
      </div>
      <span className="whitespace-pre ">{`컴포넌트의 모양새를 정의하기 때문에 가장 중요한 메서드이며 라이프 사이클 메서드 중 유일한 필수 메서드\n메서드 내부에서 this.state, this.props에 접근 가능하며 리액트 요소를 반환함\n ㄴ 요소는 <div/> 같은 태그, 따로 만든 컴포넌트 등이 해당된다`}</span>
      <div className="flex items-center">
      <span className="whitespace-pre text-red-500/60">{`⚠️ 메서드 내부에서 이벤트 설정이 아닌 곳에서 setState를 사용하면 안 되며, 브라우저 DOM에 접근해서도 안 됨`}</span>
      <span className="whitespace-pre text-white ">{` -> `}</span>
      <span className="whitespace-pre ">{`해당 작업은 `}</span>
      <span className="whitespace-pre text-white ">{`componentDidMount`}</span>
      <span className="whitespace-pre ">{`에서 처리되어야 한다`}</span>
      </div>
    </div>
  )
}

export function ConstructorMethod() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white">constructor 메서드</span>
      <div className="w-120">
      <CodeBlock content="constructor(props) {...}" />
      </div>
      <span className="whitespace-pre ">{`컴포넌트의 생성자 메서드로, 컴포넌트를 만들 때 처음 실행되며 이 메서드는 초기 state를 정할 수 있음`}</span>
    </div>
  )
}

export function GetDerivedStateFromPropsMethod() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white">getDerivedStateFromProps 메서드</span>
      <div className="w-120">
      <CodeBlock content="static getDerivedStateFromprops(nextProps, prevState) {
        if(nextProps.value !== prevProps.value) {
          return { value: nextProps.value }
        }
      return null; 
    }
      " />
      </div>
      <span className="whitespace-pre ">{`v16.3에서 새로 만든 라이프사이클 메서드로, props로 받아 온 값을 state에 동기화시키는 용도로 사용함\n컴포넌트가 마운트될 때와 업데이트될 때 호출됨`}</span>
    </div>
  )
}

export function ComponentDidMount() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white">componentDidMount 메서드</span>
      <div className="w-120">
      <CodeBlock content="componentDidMount() {...}" />
      </div>
      <span className="whitespace-pre ">{`컴포넌트가 만들어지고 첫 렌더링을 마친 뒤 실행됨\nJS 라이브러리나 프레임워크 함수 호출, 이벤트 등록, setTimeOut / setInterval / 네트워크 요청과 같은 비동기 작업을 처리하게 함`}</span>
    </div>
  )
}

export function ShouldComponentUpdate() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white">shouldComponentUpdate 메서드</span>
      <div className="w-120">
      <CodeBlock content="shouldComponentUpdate() {...}" />
    </div>
    <div>
      <div className="flex items-center">
      <span className="whitespace-pre ">props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드</span>
      <span className="whitespace-pre text-white ">{` -> `}</span>
      <span className="whitespace-pre ">{`메서드는 반드시 `}</span>
      <span className="whitespace-pre font-medium text-blue-300 ">{`true `}</span>
      <span className="whitespace-pre ">{`/ `}</span>
      <span className="whitespace-pre font-medium text-red-300 ">{`false`}</span>
      <span className="whitespace-pre ">{`로 반환`}</span>
      </div>
      <div className="flex items-center">
      <span className="whitespace-pre ">{`컴포넌트 생성 시 이 메서드를 따로 생성하지 않으면 기본적으로 `}</span>
      <span className="whitespace-pre font-medium text-blue-300 ">{`true`}</span>
      <span className="whitespace-pre ">{`를 반환`}</span>
      <span className="whitespace-pre text-white ">{` -> `}</span>
      <span className="whitespace-pre ">{`성능 최적화에 사용됨`}</span>
      </div>
       <div className="flex flex-col border-l-2 pl-5 mt-2 border-l-white/70">
      <span className="whitespace-pre ">{`현재 props/state 접근: this.props, this.state`}</span>
      <span className="whitespace-pre ">{`새로 설정할 props/state 접근: nextProps, nextState`}</span>
      </div>
    </div>
    </div>
  )
}

export function GetSnapshotBeforeUpdate() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white">getSnapshotBeforeUpdate 메서드</span>
      <div className="w-120">
      <CodeBlock content="getSnapshotBeforeUpdate(
    if(prevState.array !== this.state.array) {
      const { scrollTop, scrollheight } = this.list
      return { scrollTop, scrollHeight };
    }
  )" />
    </div>
    <div>
      <div className="flex flex-col">
      <span className="whitespace-pre ">리액트 v16.3 이후 만들어졌으며, render의 결과물이 브라우저에 반영되기 전에 호출되는 메서드</span>
      <div className="flex">
      <span className="whitespace-pre ">반환 값을 </span>
      <span className="whitespace-pre text-white">componentDidUpdate</span>
      <span className="whitespace-pre ">세 번째 파라미터인 snapshot 값으로 전달 받을 수 있음</span>
      </div>
      <div className="flex items-center">
      <span className="whitespace-pre ">주로 업데이트 직전 값을 참고할 일이 있을 때 사용 </span>
      <span className="whitespace-pre text-red-300/40">{`(ex: 스크롤바 위치 유지)`}</span>
      </div>
      </div>
    </div>
    </div>
  )
}

function ComponentDidUpdate() {
  return (
      <div className="flex flex-col justify-center gap-3">
      <span className="text-white">componentDidUpdate 메서드</span>
      <div className="w-120">
      <CodeBlock content="componentDidUpdate(prevProps, prevState, snapshot) {...}" />
    </div>
    <div>
      <div className="flex flex-col">
      <span className="whitespace-pre ">리렌더링을 완료한 뒤 실행하는 메서드로, 업데이트가 끝난 직후이기 때문에 DOM 관련 처리를 해도 무방함</span>
      <span className="whitespace-pre ">여기선 prevProps, prevState를 사용해 컴포넌트의 이전 데이터에 접근할 수 있음</span>
      <div className="flex items-center">
      <span className="whitespace-pre text-white">getSnapshotBeforeUpdate</span>
      <span className="whitespace-pre ">{`에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있다`}</span>
      </div>
      </div>
    </div>
    </div>
  )
}

function ComponentWillUnmount() {
  return (
    <div className="flex flex-col justify-center gap-3">
      <span className="text-white">componentWillUnmount 메서드</span>
      <div className="w-120">
      <CodeBlock content="componentWillUnmount() {...}" />
    </div>
    <div>
      <div className="flex flex-col">
      <span className="whitespace-pre ">컴포넌트를 DOM에서 제거할 때 실행하는 메소드</span>
      </div>
      <span className="whitespace-pre text-white">componentDidMount</span>
      <span className="whitespace-pre ">에서 등록한 이벤트나 타이머, 직접 생성한 DOM이 있을 경우 여기서 제거 작업을 해야 함</span>
    </div>
    </div>
  )
}

function ComponentDidCatch() {
  return (
    <div>
      <span className="text-white">componentDidCatch 메서드</span>
      <div className="w-120">
      <CodeBlock content="componentDidCatch(error, info) {
      this.setState({
        error: true
      });
      console.log({ error, info })
  }" />
    </div>
    <div>
      <div className="flex flex-col">
      <span className="whitespace-pre">리액트 v16에서 도입되었으며 컴포넌트 렌더링 도중 에러 발생 시 어플리케이션의 중단 없이 오류 UI를 보여 주도록 가능</span>
      <span className="whitespace-pre">error는 파라미터에 어떤 에러가 발생헀는지 알려 주며, info 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 제공</span>
      <span className="whitespace-pre text-red-500/60">{`⚠️ 자신의 에러가 아닌 this.props.children 컴포넌트의 에러만 잡을 수 있음`}</span>
      </div>
    </div>
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
          <span className="text-slate-400">컴포넌트 정보를 업데이트</span>
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
        <div className="flex my-5 w-fit bg-black/20 p-4 rounded-md flex-col text-sm text-white/80">
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
          <UpdateMethod title="shouldComponentUpdate" desc={`컴포넌트가 리렌더링을 해야 할 지 말아야 할 지 결정하며 true 시 계속 실행, false 시 작업을 중지 (true: 리렌더링 O / false: 리렌더링 X) \n특정 함수에서 forceUpdate 함수를 호출한다면 이 과정을 생략하고 바로 render 함수 호출`} isArrow={true} />
          <UpdateMethod title="true 반환 시 render 호출, false 반환 시 여기서 작업 취소" desc="" isArrow={true} isAction={true} />
          <UpdateMethod title="render" desc="컴포넌트를 리렌더링하는 메서드입니다" isArrow={true} />
          <UpdateMethod title="getSnapshotBeforeUpdate" desc="컴포넌트 변화를 DOM에 반영하기 직전에 호출하는 메서드입니다" isArrow={true} />
          <UpdateMethod title="웹 브라우저상의 실제 DOM 변화" desc="" isArrow={true} isAction={true} />
          <UpdateMethod title="componentDidUpdate" desc="컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드입니다" isArrow={false} />
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
          <UnmountMethod title="componentWillUnmount" desc="컴포넌트가 웹 브라우저 상에서 제거되기 직전에 호출되는 메서드입니다" isArrow={false} />
          </div>
        </div>
    </div>
  )
}

const Arrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400/60 my-0.5">
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
export function UpdateMethod({title, desc, isArrow, isFirst, isAction}: {title: string, desc: string, isArrow: boolean, isFirst?: boolean, isAction?: boolean}) {
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
          <div className={`${!isAction && 'border bg-blue-500/10 border-amber-50/30'} w-[350px] px-3 py-2 rounded   text-center text-sm  flex items-center justify-center `}>
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



