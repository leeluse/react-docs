import CodeBlock from '../components/CodeBlock'
import {
  Animation,
  Composition,
  Focus,
  Form,
  Image,
  KeyBoard,
  Media,
  Mouse,
  OnCopy,
  OnTouch,
  Selection,
  Transition,
  UI,
  Wheel,
} from './EventType'

export default function EventHandling() {
  return (
    <section className="flex flex-col gap-10 py-6 text-base-text">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6"># Event Handling</h1>
      
      <article className="flex flex-col gap-2">
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">이벤트(event)란?</h3>
        <div className="border-l-4 border-primary pl-4 py-1.5 bg-primary-bg/10 rounded-r-lg">
          <p className="leading-relaxed text-sm sm:text-base">
            사용자가 웹 브라우저에 DOM 요소들과 상호 작용을 하는 것을 이벤트(event)라고 합니다.\n
            마우스 커서를 올렸을 때는 onmouseover 이벤트를 실행하고, 클릭했을 때는 onclick 이벤트를 실행합니다.
          </p>
        </div>
      </article>

      <article className="flex flex-col gap-3">
        <p className="font-semibold text-base sm:text-lg text-base-heading mt-2">
          • HTML의 DOM 요소에 이벤트 설정하기
        </p>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <CodeBlock
              content={
                '<!DOCTYPE html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <button onclick="alert(\'hello\')">Click me</button>\n</body>\n</html>'
              }
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div>
              <button
                className="p-2 px-4 border border-purple-500/30 rounded-lg bg-purple-500/10 text-primary hover:bg-purple-500/20 transition cursor-pointer font-semibold text-sm"
                onClick={() => alert('hello')}
              >
                Click me
              </button>
            </div>
            <div className="w-full max-w-md rounded-lg p-5 border border-base-border/50 bg-black/5 dark:bg-white/5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base-heading text-sm sm:text-base font-bold">null.document.com 내용:</h3>
                <button className="font-black text-slate-500 hover:text-base-heading cursor-pointer">X</button>
              </div>
              <p className="text-xs sm:text-sm text-base-text">hello</p>
              <div className="text-end">
                <span className="px-4 py-1.5 text-xs sm:text-sm text-primary font-semibold rounded-md border border-primary bg-primary-bg/50 cursor-pointer hover:bg-primary-bg transition">
                  확인
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="leading-relaxed mt-2 text-sm sm:text-base">
          여기서 Click me 버튼을 누르게 되면 alert 함수를 사용하여 메시지 박스를 띄우게 됩니다.\n
          이처럼 HTML에서는 이벤트를 실행하면 "" 사이에 있는 자바스크립트를 실행하도록 코드를 작성합니다.
        </p>
      </article>
      
      <ReactEventSystem />
      <ReactEventType />
    </section>
  )
}

export function ReactEventSystem() {
  return (
    <article className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <h3 className="font-semibold text-base sm:text-lg text-base-heading mt-2">
          • 리액트의 이벤트 시스템
        </h3>
        <p className="leading-relaxed text-sm sm:text-base">
          리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일해서 사용법이 매우 비슷합니다.
        </p>
        <CodeBlock
          content={`const Say = () => {\n  const [message, setMessage] = useState(\'\');\n  const onClickEnter = () => setMessage(\'안녕하세요!\');\n  const onClickLeave = () => setMessage(\'안녕히 가세요.\');\n\n  return (\n      <div>\n        <button onClick={onClickEnter}>입장</button>\n        <button onClick={onClickLeave}>퇴장</button>\n      </div>\n  )\n}`}
        />
      </div>
      <div className="border border-base-border/50 bg-black/5 dark:bg-white/5 p-5 rounded-lg w-full lg:w-80 h-fit lg:mt-12 flex flex-col gap-3 shrink-0">
        <h3 className="font-bold text-primary text-base">이벤트 사용 시 주의사항</h3>
        <ol className="text-xs sm:text-sm flex flex-col gap-4">
          <li className="flex flex-col gap-0.5">
            <span className="font-semibold text-base-heading">
              1. 이벤트 이름은 카멜 표기법으로 작성한다
            </span>
            <p className="text-slate-500 pl-3">- HTML: onclick</p>
            <p className="text-slate-500 pl-3">- React: onClick</p>
          </li>
          <li className="flex flex-col gap-0.5">
            <span className="font-semibold text-base-heading">
              2. 실행할 코드가 아닌 함수 형태의 값을 전달한다
            </span>
            <p className="text-slate-500 pl-3">- HTML: 큰따옴표 내에서 문자열로 코드 실행</p>
            <p className="text-slate-500 pl-3">- React: 중괄호 내에 함수 레퍼런스 객체를 전달</p>
          </li>
          <li className="flex flex-col gap-0.5">
            <span className="font-semibold text-base-heading">3. DOM 요소에만 이벤트를 설정할 수 있다</span>
            <p className="text-slate-500 pl-3">- div, button 등 표준 태그만 직접 바인딩 가능하며, 사용자 정의 컴포넌트에는 직접 바인딩 불가</p>
          </li>
        </ol>
      </div>
    </article>
  )
}

export function ReactEventType() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">리액트의 이벤트 종류</h2>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Clipboard Event</h3>
        <OnCopy />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Touch Event</h3>
        <OnTouch />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Composition Event</h3>
        <Composition />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• UI Event</h3>
        <UI />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Wheel Event</h3>
        <Wheel />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Keyboard Event</h3>
        <KeyBoard />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Focus Event</h3>
        <Focus />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Media Event</h3>
        <Media />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Form Event</h3>
        <Form />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Image Event</h3>
        <Image />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Mouse Event</h3>
        <Mouse />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Animation Event</h3>
        <Animation />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Selection Event</h3>
        <OnCopy /> {/* Original had <Selection /> but import had Selection, wait - code had Selection, let\'s check the import list, it has Selection */}
        <Selection />
      </div>
      <div className="flex flex-col gap-4 border-t border-base-border/30 pt-4">
        <h3 className="font-bold text-base sm:text-lg text-base-heading">• Transition Event</h3>
        <Transition />
      </div>
    </div>
  )
}