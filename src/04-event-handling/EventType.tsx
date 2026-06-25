import { useState, useRef, useEffect } from "react"

export function OnCopy() {
  const [currentEvent, setCurrentEvent] = useState('None')
    const ClipboardEvents = [
    { label: "onCopy", value: "사용자가 텍스트나 요소를 복사할 때 발생" },
    { label: "onCut", value: "사용자가 텍스트를 잘라낼 때 발생" },
    { label: "onPaste", value: "사용자가 클립보드 내용을 붙여넣을 때 발생" },
    ];
  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={ClipboardEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <div className="flex flex-col justify-between">
          <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}>
                {currentEvent}
              </span>
            </div>
            <input 
              type="text" 
              className="border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200"
              defaultValue={'Copy / Cut / Paste를 진행해 보세요'}
              onCopy={() => setCurrentEvent('onCopy event')}
              onCut={() => setCurrentEvent('onCut event')}
              onPaste={() => setCurrentEvent('onPaste event')}
            />
          </label>
        </div>
      </section>
    </main>
  );
}

export function UI() {
  const [currentEvent, setCurrentEvent] = useState('None')
    const UIEvents = [
    { label: "onScroll", value: "스크롤이 발생했을 때 발생" },
    ]; 
    return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={UIEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
         <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}>
                {currentEvent}
              </span>
            </div>
            <textarea 
              className="resize-none h-20 border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200 scrollbar-none"
              value={'해당 textarea를 스크롤을 움직이면 onScroll event가 발생합니다. 일반적으로는 스크롤 이벤트는 스크롤의 결과값을 onScroll로 확인하지만, 스크롤을 움직일 때 onScroll이 발생한다고 이해하시면 됩니다'}
              onScroll={() => setCurrentEvent('onScroll event')}
            />
          </label>
      </section>
    </main>
    )
}

export function Focus() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const [text, setText] = useState("👀 FOCUS ME ✨")
    const UIEvents = [
    { label: "onFocus", value: "요소가 포커스를 받을 때 발생" },
    { label: "onBlur", value: "요소가 포커스를 잃을 때 발생" },
    ]; 
    return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={UIEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
         <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}>
                {currentEvent}
              </span>
            </div>
            <input 
              className="border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200"
              value={text}
              onFocus={() => {
                setText("😎 Thx, Go Away 🫵")
                setCurrentEvent('onFocus event')
              }}
              onBlur={() => {
                setText("👀 FOCUS ME ✨")
                setCurrentEvent('onBlur event')
              }}
            />
          </label>
      </section>
    </main>
    )
}

export function Wheel() {
  const [currentEvent, setCurrentEvent] = useState('None')
    const UIEvents = [
        { label: "onWheel", value: "마우스 휠 또는 터치패드 스크롤 동작이 발생했을 때 발생" },
    ]; 
    return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={UIEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
         <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}>
                {currentEvent}
              </span>
            </div>
            <textarea 
                value={'마우스 휠을 위아래로 스크롤해보세요. onWheel은 휠 동작 감지 / onScroll은 스크롤 결과 감지라는 차이점이 있습니다.'}
              className="resize-none h-15 border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200 scrollbar-none"
              onWheel={() => setCurrentEvent('onWheel event')}
            />
          </label>
      </section>
    </main>
    )
}

export function KeyBoard() {
  const [currentEvent, setCurrentEvent] = useState<string[]>(["None"]);

  const KeyboardEvents = [
    { label: "onKeyDown", value: "키를 눌렀을 때 발생" },
    { label: "onKeyUp", value: "키를 뗐을 때 발생" },
    {
      label: "onKeyPress",
      value: "문자를 입력할 수 있는 키를 눌렀을 때 발생",
    },
  ];

  function addEvent(eventName: string) {
    setCurrentEvent((prev) => [...prev, eventName].slice(-30));
  }

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={KeyboardEvents} />

      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">
              발생 이벤트
            </span>

            <span
              className={`${
                currentEvent[currentEvent.length - 1] === "None"
                  ? "border border-slate-500/30"
                  : "bg-pink-400/70"
              } text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent[currentEvent.length - 1]}
            </span>
          </div>

          <input
            type="text"
            placeholder="해당 인풋에서 키보드를 길게 눌렀다 떼 보세요"
            className="border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200 placeholder:text-slate-500"
            onKeyDown={(e) => {
              if (e.repeat) return;
              addEvent("onKeyDown");
            }}
            onKeyUp={(e) => {
                if (e.repeat) return;
                addEvent("onKeyUp")
            }}
          />
        </label>

        <section className="text-white/80 text-sm sm:text-base font-medium bg-pink-400/30 p-2 mt-2 rounded-md min-h-10 overflow-auto scrollbar-none">
          {currentEvent.map((item, index) => (
            <span key={index} className="inline-block mr-1">
              {item === "onKeyDown"
                ? "👇"
                : item === "onKeyUp"
                && "🖐️"}
            </span>
          ))}
        </section>
      </section>
    </main>
  );
}


export function Composition() {
  const [currentEvent, setCurrentEvent] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
    const CompositionEvents = [
    { label: "onCompositionStart", value: "글자 조합이 시작될 때 발생" },
    { label: "onCompositionUpdate", value: "글자 조합이 바뀌는 중에 발생" },
    { label: "onCompositionEnd", value: "글자 조합이 완료될 때 발생" },
    ];
    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentEvent])

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={CompositionEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 h-fit w-full md:w-[560px] rounded-sm border-gray-500/30">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">이벤트 LOG</span>
            <button 
              onClick={() => setCurrentEvent([])}
              className="rounded border border-white/30 cursor-pointer hover:bg-white/5 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 text-slate-300"
            >
              초기화
            </button>
          </div>
          <section 
            ref={scrollRef}
            className="text-[11px] sm:text-xs bg-black/30 p-2 mt-2 rounded-md h-30 overflow-auto scrollbar-none"
          >
            {currentEvent.map((item, index) => (
              <div key={index} >
                {item}
              </div>
            ))}
          </section>
        </div>
        <label className="flex items-center justify-between">
          <input 
            type="text" 
            className="border p-2 rounded-sm text-xs sm:text-sm w-full outline-none border-slate-300/30 bg-black/10 text-slate-200"
            placeholder={'아무 텍스트나 입력을 시작해 보세요'}
            onCompositionStart={() => setCurrentEvent((prev) => [...prev, '🟢 [Composition Start] 글자 입력 시작'])}
            onCompositionEnd={() => setCurrentEvent((prev) => [...prev, '🔴 [Composition End] 글자 입력 종료'])}
            onCompositionUpdate={() => setCurrentEvent((prev) => [...prev, '🟡 [Composition Update] 글자 입력 중...'])}
          />
        </label>
      </section>
    </main>
  );
}


export function OnTouch() {
  const OnTouchInfo = [
    { label: "touches", value: "현재 화면 위에 닿아 있는 모든 손가락" },
    { label: "targetTouches", value: "현재 이벤트 대상 요소 위에 닿아 있는 손가락" },
    { label: "changedTouches", value: "이번 이벤트에서 상태가 바뀐 손가락" },
  ];
  
  const [touchState, setTouchState] = useState('None');
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleTouchStart = () => {
    setTouchState('onTouchStart event');
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setTouchState('onTouchMove event');
    if (touch) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({
        x: Math.round(touch.clientX - rect.left),
        y: Math.round(touch.clientY - rect.top),
      });
    }
  };

  const handleTouchEnd = () => {
    setTouchState('onTouchEnd event');
  };

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={OnTouchInfo} />
      <section className="flex flex-col gap-3 justify-between border p-4 h-fit w-full md:w-[560px] rounded-sm border-gray-500/30">
        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span className={`${touchState === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}>
                {touchState}
              </span>
            </div>
            {touchState !== 'None' && (
              <button 
                onClick={() => { setTouchState('None'); setCoords({ x: 0, y: 0 }); }}
                className="rounded border border-white/30 cursor-pointer hover:bg-white/5 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 text-slate-300"
              >
                초기화
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Touch Pad Area */}
            <div 
              className="w-full sm:w-40 h-28 bg-slate-950 border border-slate-700 hover:border-purple-500 rounded flex flex-col items-center justify-center text-center p-2 cursor-pointer select-none active:scale-[0.98] transition-transform duration-100"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">여기를 터치하고<br />드래그 해보세요</span>
              <span className="text-[9px] sm:text-[10px] text-purple-400 font-mono mt-1">X: {coords.x}, Y: {coords.y}</span>
            </div>

            {/* Status Info */}
            <div className="flex flex-col gap-1.5 flex-1 w-full">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400">실시간 터치 좌표:</span>
              <div className="bg-slate-950/60 border border-slate-800 rounded p-2.5 font-mono text-[11px] sm:text-xs text-slate-300 flex justify-between">
                <span>X: <strong className="text-purple-300">{coords.x}px</strong></span>
                <span>Y: <strong className="text-purple-300">{coords.y}px</strong></span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic mt-1">
                * 모바일 기기 혹은 브라우저 개발자 도구의 'Device Mode'를 켜서 테스트해 보세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Table({data}: {data: {label: string, value: string}[]}) {
  return (
    <table className="border-collapse border border-slate-100/30 text-xs sm:text-sm w-full md:w-[400px] h-fit text-slate-300">
      <tbody>
        {data.map((item) => (
          <tr key={item.label}>
            <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">{item.label}</td>
            <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}