import CodeBlock from "../components/CodeBlock";
import { Composition, Focus, KeyBoard, OnCopy, OnTouch, UI, Wheel } from "./EventType";

export default function EventHandling() {
  return (
    <section className="flex flex-col m-5 gap-15 py-25">
      <h1 className='text-3xl sm:text-4xl md:text-[45px] font-bold text-white'># Event Handling</h1>
       <article>
        <h3 className='text-xl sm:text-2xl font-bold text-primary py-2.5 '>이벤트(event)란?</h3>
        <div className='border-l-2 border-base-border pl-6 py-2'>
          <p className="whitespace-pre text-sm sm:text-base">
            {`사용자가 웹 브라우저에 DOM 요소들과 상호 작용을 하는 것을 이벤트(event)라고 한다\n마우스 커서를 올렸을 때는 onmouseover 이벤트를 실행하고, 클릭했을 때는 onclick 이벤트를 실행한다`}
          </p>
        </div>
      </article>
       <article>
          <p className='font-semibold text-base sm:text-lg text-white pb-3'>• HTML의 DOM 요소에 이벤트 설정하기</p>
        <section className='w-fit flex gap-5'>
          <CodeBlock content={"<!DOCTYPE html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document</title>\n</head>\n<body>\n  <button onclick=\"alert('hello')\">Click me</button>\n</body>\n</html>"} 
        />
        <div>
          <button className="p-2 border border-purple-500/30 rounded-sm bg-purple-500/30 point-cursor hover:bg-purple-500/40 transition duration-150"
          onClick={() => alert("hello")}>Click me</button>
          <div className="bg-white w-120 rounded-sm p-5 my-4 border-2 border-black/20">
            <div className="flex justify-between">
            <h3 className=" text-black text-md font-semibold">null.document.com 내용:</h3>
            <button className="font-black">X</button>
            </div>
            <p className="mt-10 text-sm text-black">hello</p>
            <div className="text-end mt-10">
              <span className=" px-5 py-1 text-sm text-black rounded-sm border border-blue-900 ">확인</span>
            </div>
          </div>
        </div>
        </section>
        <p>여기서 Click me 버튼을 누르게 되면 alert 함수를 사용하여 메시지 박스를 띄우게 된다</p>
        <p>이처럼 HTML에서는 이벤트를 실행하면 "" 사이에 있는 자바스크립트를 실행하도록 코드를 작성한다</p>
      </article>
     <ReactEventSystem />
     <ReactEventType />
    </section>
  );
}


export function ReactEventSystem() {
  return (
      <article className="flex gap-10">  
      <section className="w-180">

        <h3 className='font-semibold text-base sm:text-lg text-white pb-3'>• 리액트의 이벤트 시스템</h3>
        <p>리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일해서 사용법이 비슷함</p>
        <CodeBlock content={
    `const Say = () => {
      const [message, setMessage] = useState('');
      const onClickEnter = () => setMessage('안녕하세요!');
      const onClickLeave = () => setMessage('안녕히 가세요.');

      const [color, setColor] = useState('black');
      return (
          <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
          </div>
      )
    }
      `} 
        />
      </section>
        <div className="border border-slate-300 p-3 rounded-sm w-1/3 h-fit mt-20">
          <h3 className="font-bold text-purple-400/80">이벤트 사용 시 주의사항</h3>
            <ol className="text-sm">
              <li className="mt-2 ">
                <span className="font-medium text-white">1. 이벤트 이름은 카멜 표기법으로 작성한다</span>
                <p className="text-xs ">- HTML: onclick</p>
                <p className="text-xs ">- React: onClick</p>
              </li>
              <li className="mt-2">
                <span className="font-medium text-white">2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다</span>
                <p className="text-xs">{`- HTML: 큰따옴표 내에서 코드 실행`}</p>
                <p className="text-xs">{`- React: 함수 형태의 객체를 전달`}</p>
              </li>
              <li className="mt-2">
                <span className="font-medium text-white">3. DOM 요소에만 이벤트를 설정할 수 있다</span>
                <p className="text-xs">{`<div><button>등은 이벤트 설정 가능하나 직접 만든 컴포넌트는 불가능`}</p>
              </li>
            </ol>
        </div>
      </article>
  )
}

export function ReactEventType() {

  return (
  <div className="flex flex-col gap-5">
    <h2 className="font-bold text-xl sm:text-2xl text-primary" >리액트의 이벤트 종류</h2>
    <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• Clipboard Event</h3>
      <OnCopy />
    </div>
    <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• Touch Event</h3>
      <OnTouch />
    </div>
      <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• Composition Event</h3>
      <Composition />
    </div>
    <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• UI Event</h3>
      <UI />
    </div>
    <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• Wheel Event</h3>
      <Wheel />
    </div>
     <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• Keyboard Event</h3>
      <KeyBoard />
    </div>
    <div className="flex flex-col gap-4">
      <h3 className='font-bold text-sm sm:text-base text-white pt-6 sm:pt-10'>• Focus Event</h3>
      <Focus />
    </div>
  </div>
  )
}



