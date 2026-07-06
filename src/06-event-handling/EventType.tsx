import { useState, useRef, useEffect } from 'react'

export function OnCopy() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const ClipboardEvents = [
    { label: 'onCopy', value: '사용자가 텍스트나 요소를 복사할 때 발생' },
    { label: 'onCut', value: '사용자가 텍스트를 잘라낼 때 발생' },
    { label: 'onPaste', value: '사용자가 클립보드 내용을 붙여넣을 때 발생' },
  ]
  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={ClipboardEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <div className="flex flex-col justify-between">
          <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span
                className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
              >
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
  )
}

export function UI() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const UIEvents = [{ label: 'onScroll', value: '스크롤이 발생했을 때 발생' }]
  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={UIEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
            <span
              className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent}
            </span>
          </div>
          <textarea
            readOnly
            className="resize-none h-20 border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200 scrollbar-none"
            value={
              '해당 textarea를 스크롤을 움직이면 onScroll event가 발생합니다. 일반적으로는 스크롤 이벤트는 스크롤의 결과값을 onScroll로 확인하지만, 스크롤을 움직일 때 onScroll이 발생한다고 이해하시면 됩니다'
            }
            onScroll={() => setCurrentEvent('onScroll event')}
          />
        </label>
      </section>
    </main>
  )
}

export function Focus() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const [text, setText] = useState('👀 FOCUS ME ✨')
  const UIEvents = [
    { label: 'onFocus', value: '요소가 포커스를 받을 때 발생' },
    { label: 'onBlur', value: '요소가 포커스를 잃을 때 발생' },
  ]
  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={UIEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
            <span
              className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent}
            </span>
          </div>
          <input
            readOnly
            className="border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200"
            value={text}
            onFocus={() => {
              setText('😎 Thx, Go Away 🫵')
              setCurrentEvent('onFocus event')
            }}
            onBlur={() => {
              setText('👀 FOCUS ME ✨')
              setCurrentEvent('onBlur event')
            }}
          />
        </label>
      </section>
    </main>
  )
}

export function Media() {
  const MediaEvents1 = [
    // 1. 로딩 / 준비 상태
    { label: 'onLoadStart', value: '미디어 로딩을 시작했을 때 발생' },
    { label: 'onLoadedMetadata', value: '길이, 크기 같은 메타데이터가 로드되었을 때 발생' },
    { label: 'onLoadedData', value: '현재 재생할 프레임 데이터가 로드되었을 때 발생' },
    { label: 'onCanPlay', value: '재생을 시작할 수 있을 만큼 데이터가 준비되었을 때 발생' },
    {
      label: 'onCanPlayThrough',
      value: '끝까지 끊김 없이 재생할 수 있을 정도로 데이터가 준비되었을 때 발생',
    },

    // 2. 재생 상태
    { label: 'onPlay', value: '재생 상태가 되었을 때 발생' },
    { label: 'onPlaying', value: '실제로 재생이 시작되거나 다시 시작되었을 때 발생' },
    { label: 'onPause', value: '재생이 일시정지되었을 때 발생' },
    { label: 'onEnded', value: '재생이 끝났을 때 발생' },

    // 3. 시간 / 탐색
    { label: 'onTimeUpdate', value: '현재 재생 시간이 변경될 때 발생' },
    { label: 'onDurationChange', value: '미디어의 전체 길이가 변경되었을 때 발생' },
  ]

  const MediaEvent2 = [
    { label: 'onSeeking', value: '재생 위치 이동을 시작했을 때 발생' },
    { label: 'onSeeked', value: '재생 위치 이동이 완료되었을 때 발생' },

    // 4. 볼륨 / 속도
    { label: 'onVolumeChange', value: '볼륨이 변경되었을 때 발생' },
    { label: 'onRateChange', value: '재생 속도가 변경되었을 때 발생' },

    // 5. 로딩 문제 / 중단
    { label: 'onWaiting', value: '데이터가 부족해서 재생이 잠시 멈췄을 때 발생' },
    { label: 'onStalled', value: '브라우저가 데이터를 기다리지만 받아오지 못할 때 발생' },
    { label: 'onSuspend', value: '브라우저가 미디어 로딩을 중단했을 때 발생' },
    { label: 'onAbort', value: '오류가 아닌 이유로 미디어 로딩이 중단되었을 때 발생' },
    { label: 'onEmptied', value: '미디어 데이터가 비워졌을 때 발생' },

    // 6. 특수 / 에러
    { label: 'onEncrypted', value: '암호화된 미디어를 만났을 때 발생' },
    { label: 'onError', value: '미디어 로드 또는 재생 중 오류가 발생했을 때 발생' },
  ]

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <table className="border-collapse border border-slate-100/30 text-xs sm:text-sm w-full md:w-[400px] h-fit text-slate-300">
        <tbody className="">
          {MediaEvents1.map((item) => (
            <tr key={item.label}>
              <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                {item.label}
              </td>
              <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="border-collapse border border-slate-100/30 text-xs sm:text-sm w-full md:w-[400px] h-fit text-slate-300">
        <tbody className="">
          {MediaEvent2.map((item) => (
            <tr key={item.label}>
              <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                {item.label}
              </td>
              <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export function Form() {
  const [currentEvent, setCurrentEvent] = useState<string[]>([])
  const [text, setText] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const FormEvents = [
    { label: 'onChange', value: '입력값이 변경되었을 때 발생' },
    { label: 'onInput', value: '사용자가 값을 입력할 때 발생' },
    { label: 'onBeforeInput', value: '값이 입력되기 직전에 발생' },
    { label: 'onSubmit', value: '폼이 제출될 때 발생' },
    { label: 'onReset', value: '폼이 초기화될 때 발생' },
    { label: 'onInvalid', value: '폼 검증에 실패했을 때 발생' },
  ]

  const addLog = (message: string) => {
    setCurrentEvent((prev) => [...prev, message])
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentEvent])

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={FormEvents} />

      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col justify-between w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">이벤트 LOG</span>

              <button
                type="button"
                onClick={() => setCurrentEvent([])}
                className="rounded border border-white/30 cursor-pointer hover:bg-white/5 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 text-slate-300"
              >
                로그 초기화
              </button>
            </div>

            <section
              ref={scrollRef}
              className="text-[11px] sm:text-xs bg-black/30 p-2 mt-2 rounded-md h-30 overflow-auto scrollbar-none"
            >
              {currentEvent.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </section>
          </div>
        </div>

        <form
          className="flex gap-3 w-full"
          onSubmit={(e) => {
            e.preventDefault()

            addLog(`🚀 [onSubmit] 폼 제출 완료 / 제출값: "${text}"`)
          }}
          onReset={() => {
            setText('')

            addLog('🔄 [onReset] 폼 초기화')
          }}
        >
          <input
            required
            className="border p-2 rounded-sm text-xs sm:text-sm w-full outline-none border-slate-300/30 bg-black/10 text-slate-200 placeholder:text-slate-500"
            type="text"
            placeholder="값을 입력하고 제출해 보세요 (필수 입력)"
            value={text}
            onBeforeInput={(e) => {
              const nativeEvent = e.nativeEvent as InputEvent
              const inputData = nativeEvent.data ?? ''
              const beforeValue = e.currentTarget.value

              addLog(
                `🟠 [onBeforeInput] 입력 예정 글자: "${inputData}" / 입력 전 값: "${beforeValue}"`,
              )
            }}
            onInput={(e) => {
              const value = e.currentTarget.value

              addLog(`🟢 [onInput] 현재 입력값: "${value}"`)
            }}
            onChange={(e) => {
              const value = e.currentTarget.value

              setText(value)

              addLog(`🔵 [onChange] 최종 변경값: "${value}"`)
            }}
            onInvalid={() => {
              addLog('❌ [onInvalid] 검증 실패! 값을 입력해야 합니다.')
            }}
          />

          <button type="submit" className="border rounded-sm text-sm px-3 min-w-fit">
            제출
          </button>

          <button type="reset" className="border rounded-sm text-sm px-3 min-w-fit">
            리셋
          </button>
        </form>
      </section>
    </main>
  )
}

export function Mouse() {
  // const [currentEvent, seTCurrentEvent] = useState("None");
  const [currMouseEvt, setCurrMouseEvt] = useState('None')
  const [currDragEvt, setCurrDragEvt] = useState('None')

  const MouseEvents = [
    { label: 'onClick', value: '요소를 클릭했을 때 발생' },
    { label: 'onDoubleClick', value: '요소를 더블 클릭했을 때 발생' },
    { label: 'onContextMenu', value: '마우스 오른쪽 버튼을 눌렀을 때 발생' },
    { label: 'onMouseDown', value: '마우스 버튼을 누르는 순간 발생' },
    { label: 'onMouseUp', value: '마우스 버튼을 떼는 순간 발생' },
    { label: 'onMouseEnter', value: '마우스가 요소 안으로 들어왔을 때 발생' },
    { label: 'onMouseLeave', value: '마우스가 요소 밖으로 나갔을 때 발생' },
    { label: 'onMouseMove', value: '마우스가 요소 위에서 움직일 때 발생' },
  ]

  const DragEvents = [
    { label: 'onDragStart', value: '드래그가 시작될 때 발생' },
    { label: 'onDrag', value: '드래그 중일 때 계속 발생' },
    { label: 'onDragEnd', value: '드래그가 끝났을 때 발생' },
    { label: 'onDragEnter', value: '드래그한 요소가 드롭 영역에 들어왔을 때 발생' },
    { label: 'onDragOver', value: '드래그한 요소가 드롭 영역 위에 있을 때 발생' },
    { label: 'onDragLeave', value: '드래그한 요소가 드롭 영역을 벗어났을 때 발생' },
    { label: 'onDrop', value: '드래그한 요소를 드롭했을 때 발생' },
  ]

  return (
    <main className="flex flex-col gap-5 md:gap-10 w-full">
      <section className="flex flex-col sm:flex-row gap-0 sm:gap-10">
        <table className="border-collapse border-slate-100/30 text-xs sm:text-sm w-full md:w-100 h-fit text-slate-300">
          <caption className="py-2 text-pink-400 font-bold text-left"># 마우스 이벤트</caption>

          <tbody>
            {MouseEvents.map((item) => (
              <tr key={item.label}>
                <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                  {item.label}
                </td>
                <td className="border border-slate-200/30 px-3 py-2 text-slate-400">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border p-4 w-full md:w-140 rounded-sm h-fit border-gray-500/30 mt-10 flex flex-col text-sm gap-4 bg-black/10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트</span>

              <span
                className={`${
                  currMouseEvt === 'None'
                    ? 'border border-slate-500/30 text-slate-400'
                    : 'bg-pink-400/70 text-white'
                } text-xs sm:text-sm rounded-full px-2 py-0.5`}
              >
                {currMouseEvt}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCurrMouseEvt('None')}
              className="rounded border border-white/20 px-2 py-0.5 text-xs text-slate-400 hover:bg-white/5"
            >
              초기화
            </button>
          </div>

          <div className="rounded-md bg-black/30 border border-white/10 p-3 text-xs sm:text-sm text-slate-300 min-h-11 flex items-center">
            {currMouseEvt === 'None' && '아직 발생한 마우스 이벤트가 없어요.'}
            {currMouseEvt === 'onClick' && '클릭 이벤트가 발생했어요.'}
            {currMouseEvt === 'onDoubleClick' && '더블 클릭 이벤트가 발생했어요.'}
            {currMouseEvt === 'onContextMenu' && '우클릭 메뉴 이벤트가 발생했어요.'}
            {currMouseEvt === 'onMouseDown' && '마우스 버튼을 누르고 있어요.'}
            {currMouseEvt === 'onMouseUp' && '마우스 버튼을 뗐어요.'}
            {currMouseEvt === 'onMouseEnter' && '마우스가 영역 안으로 들어왔어요.'}
            {currMouseEvt === 'onMouseLeave' && '마우스가 영역 밖으로 나갔어요.'}
            {currMouseEvt === 'onMouseMove' && '마우스가 영역 안에서 움직이고 있어요.'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              className="border border-slate-300/30 rounded py-2 px-3 hover:bg-white/5 transition-colors"
              onClick={() => {
                setCurrMouseEvt('onClick')
              }}
            >
              클릭해 보세요
            </button>

            <button
              type="button"
              className="border border-slate-300/30 rounded py-2 px-3 hover:bg-white/5 transition-colors"
              onDoubleClick={() => {
                setCurrMouseEvt('onDoubleClick')
              }}
            >
              두 번 클릭해 보세요
            </button>

            <button
              type="button"
              className="border border-slate-300/30 rounded py-2 px-3 hover:bg-white/5 transition-colors"
              onContextMenu={(e) => {
                e.preventDefault()
                setCurrMouseEvt('onContextMenu')
              }}
            >
              우클릭해 보세요
            </button>

            <button
              type="button"
              className="border border-slate-300/30 rounded py-2 px-3 hover:bg-white/5 transition-colors"
              onMouseDown={() => {
                setCurrMouseEvt('onMouseDown')
              }}
              onMouseUp={() => {
                setCurrMouseEvt('onMouseUp')
              }}
            >
              {currMouseEvt === 'onMouseDown' ? '이제 누른 걸 떼 보세요' : '꾹 길게 눌러 보세요'}
            </button>
          </div>

          <div
            className="border border-dashed border-purple-300/40 rounded-md p-6 text-center text-sm bg-purple-400/5 hover:bg-purple-400/10 transition-colors"
            onMouseMove={() => {
              setCurrMouseEvt('onMouseMove')
            }}
            onMouseEnter={() => {
              setCurrMouseEvt('onMouseEnter')
            }}
            onMouseLeave={() => {
              setCurrMouseEvt('onMouseLeave')
            }}
          >
            <p className="text-slate-300 font-medium">마우스를 이 영역 위에서 움직여 보세요</p>
            <p className="text-xs text-slate-500 mt-1">enter / move / leave 이벤트 확인용 영역</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col sm:flex-row gap-0 sm:gap-10 ">
        <table className="border-collapse  border-slate-100/30 text-xs sm:text-sm w-full md:w-100 h-fit text-slate-300">
          <p className="py-2 text-pink-400 font-bold"># 드래그 이벤트</p>
          <tbody className="">
            {DragEvents.map((item) => (
              <tr key={item.label}>
                <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                  {item.label}
                </td>
                <td className="border border-slate-200/30 px-3 py-2 text-slate-400">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border p-4 w-full md:w-140 rounded-sm h-fit border-gray-500/30 mt-10 flex flex-col text-sm gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트</span>

            <span
              className={`${
                currDragEvt === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'
              } text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currDragEvt}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              draggable
              className="border border-white/20 p-5 rounded-md bg-black/20 hover:bg-white/5 text-center cursor-grab active:cursor-grabbing"
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', 'drag-box')
                setCurrDragEvt('onDragStart')
              }}
              onDrag={() => {
                setCurrDragEvt('onDrag')
              }}
              onDragEnd={() => {
                setCurrDragEvt('onDragEnd')
              }}
            >
              이 박스를 드래그해 보세요
            </div>

            <div
              className="border border-dashed border-purple-300/50 rounded-md p-5 text-center bg-purple-400/5 hover:bg-purple-400/10"
              onDragEnter={() => {
                setCurrDragEvt('onDragEnter')
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setCurrDragEvt('onDragOver')
              }}
              onDragLeave={() => {
                setCurrDragEvt('onDragLeave')
              }}
              onDrop={(e) => {
                e.preventDefault()
                setCurrDragEvt('onDrop')
              }}
            >
              여기에 드롭해 보세요
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            왼쪽 박스를 잡고 오른쪽 영역 위로 가져간 뒤 놓으면 Drag 이벤트 흐름을 볼 수 있습니다.
          </p>
        </div>
      </section>
    </main>
  )
}

export function Animation() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const [logs, setLogs] = useState<string[]>([])
  // CSS animation을 “처음부터 다시 실행”시키려면 보통 브라우저가 그 요소를 새 애니메이션 대상으로 인식하게 만들어야 함
  // 그렇기 때문에 현재 key를 초기화하게 함으로서 DOM을 재생성하도록 유도
  const [animKey, setAnimKey] = useState(0)

  const animationEvents = [
    { label: 'onAnimationStart', value: 'CSS 애니메이션이 시작될 때 발생' },
    { label: 'onAnimationIteration', value: 'CSS 애니메이션이 반복될 때 발생' },
    { label: 'onAnimationEnd', value: 'CSS 애니메이션이 끝났을 때 발생' },
  ]
  const addLog = (eventName: string, msg: string) => {
    setCurrentEvent(eventName)
    setLogs((prev) => [...prev, msg])
  }
  const replayAnimation = () => {
    setCurrentEvent('None')
    setLogs([])
    setAnimKey((prev) => prev + 1)
  }

  return (
    <main className="flex flex-col sm:flex-row gap-0 sm:gap-10 w-full">
      <style>
        {`
          @keyframes  eventPulse {
              0% {
              transform: scale(1) translateY(0);
              opacity: 0.7;
            }

            50% {
              transform: scale(1.08) translateY(-8px);
              opacity: 1;
            }

            100% {
              transform: scale(1) translateY(0);
              opacity: 0.7;
            }
          }
        `}
      </style>

      <table className="border-collapse border-slate-100/30 text-xs sm:text-sm w-full md:w-100 h-fit text-slate-300">
        <caption className="py-2 text-pink-400 font-bold text-left"># 애니메이션 이벤트</caption>
        <tbody>
          {animationEvents.map((item) => (
            <tr key={item.label}>
              <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                {item.label}
              </td>
              <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="border p-4 w-full md:w-140 rounded-sm h-fit border-gray-500/30 mt-10 flex flex-col text-sm gap-4 bg-black/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트</span>
            <span
              className={`${
                currentEvent === 'None'
                  ? 'border border-slate-500/30 text-slate-400'
                  : 'bg-pink-400/70 text-white'
              } text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent}
            </span>
          </div>
          <button
            type="button"
            onClick={replayAnimation}
            className="rounded border border-white/20 px-2 py-0.5 text-xs text-slate-400 hover:bg-white/5"
          >
            다시 실행
          </button>
        </div>
        <div className="rounded-md bg-black/30 border border-white/10 p-3 text-xs sm:text-sm text-slate-300 min-h-11 flex items-center">
          {currentEvent === 'None' && '아직 애니메이션 이벤트가 발생하지 않았어요.'}
          {currentEvent === 'onAnimationStart' && '애니메이션이 시작됐어요.'}
          {currentEvent === 'onAnimationIteration' && '애니메이션이 한 번 반복됐어요.'}
          {currentEvent === 'onAnimationEnd' && '애니메이션이 끝났어요.'}
        </div>
        <div className="flex justify-center py-6">
          <div
            onAnimationStart={(e) => {
              const animationName = e.animationName

              addLog('onAnimationStart', `[onAnimationStart] 애니메이션 시작: ${animationName}`)
            }}
            onAnimationIteration={(e) => {
              const animationName = e.animationName

              addLog(
                'onAnimationIteration',
                `[onAnimationIteration] 애니메이션 반복: ${animationName}`,
              )
            }}
            onAnimationEnd={(e) => {
              const animationName = e.animationName

              addLog('onAnimationEnd', `[onAnimationEnd] 애니메이션 종료: ${animationName}`)
            }}
            style={{
              animation: 'eventPulse 900ms ease-in-out 3',
            }}
            className="size-28 rounded-2xl bg-purple-400/20 border border-purple-400/50 text-purple-300/80 text-lg font-bold flex items-center justify-center"
            key={animKey}
          >
            MOVE
          </div>
        </div>
        <section className="text-[11px] sm:text-xs bg-black/30 p-2 rounded-md h-28 overflow-auto scrollbar-none">
          {logs.length === 0 ? (
            <p className="text-slate-500">
              다시 실행 버튼을 누르거나 컴포넌트가 렌더링되면 로그가 찍혀요.
            </p>
          ) : (
            logs.map((log, index) => <div key={index}>{log}</div>)
          )}
        </section>
      </section>
    </main>
  )
}

type SelectionEventName = 'None' | 'onSelect'

export function Selection() {
  const [currentEvent, setCurrentEvent] = useState<SelectionEventName>('None')

  const [selectedText, setSelectedText] = useState('')
  const [selectionRange, setSelectionRange] = useState('None')

  const SelectionEvents = [
    {
      label: 'onSelect',
      value: '사용자가 input 또는 textarea의 텍스트를 선택했을 때 발생',
    },
  ]

  const sampleText =
    '이 문장을 마우스로 드래그해서 일부만 선택해 보세요. 선택된 텍스트와 선택 범위가 아래에 표시됩니다.'

  return (
    <main className="flex flex-col sm:flex-row gap-0 sm:gap-10 w-full">
      <table className="border-collapse border-slate-100/30 text-xs sm:text-sm w-full md:w-100 h-fit text-slate-300">
        <caption className="py-2 text-pink-400 font-bold text-left"># 선택 이벤트</caption>

        <tbody>
          {SelectionEvents.map((item) => (
            <tr key={item.label}>
              <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                {item.label}
              </td>
              <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="border p-4 w-full md:w-140 rounded-sm h-fit border-gray-500/30 mt-10 flex flex-col text-sm gap-4 bg-black/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트</span>

            <span
              className={`${
                currentEvent === 'None'
                  ? 'border border-slate-500/30 text-slate-400'
                  : 'bg-pink-400/70 text-white'
              } text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentEvent('None')
              setSelectedText('')
              setSelectionRange('None')
            }}
            className="rounded border border-white/20 px-2 py-0.5 text-xs text-slate-400 hover:bg-white/5"
          >
            초기화
          </button>
        </div>

        <textarea
          defaultValue={sampleText}
          className="w-full min-h-28 resize-none rounded-md border border-slate-300/30 bg-black/20 p-3 text-xs sm:text-sm text-slate-200 outline-none placeholder:text-slate-500"
          onSelect={(e) => {
            const target = e.currentTarget
            const start = target.selectionStart
            const end = target.selectionEnd
            const value = target.value
            const selected = value.slice(start, end)

            setCurrentEvent('onSelect')
            setSelectedText(selected || '선택된 텍스트 없음')
            setSelectionRange(`${start} ~ ${end}`)
          }}
        />

        <div className="rounded-md bg-black/30 border border-white/10 p-3 text-xs sm:text-sm text-slate-300 flex flex-col gap-2">
          <div>
            <span className="text-purple-300 font-semibold">선택 범위: </span>
            <span className="text-slate-400">{selectionRange}</span>
          </div>

          <div>
            <span className="text-purple-300 font-semibold">선택한 텍스트: </span>
            <span className="text-slate-400">{selectedText || '아직 선택한 텍스트가 없어요.'}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          textarea 안의 문장을 드래그해서 선택하면 onSelect가 발생합니다. 클릭만 하면 선택 범위가
          없어서 빈 값이 나올 수 있어요.
        </p>
      </section>
    </main>
  )
}

type TransitionEventName = 'None' | 'onTransitionEnd'

export function Transition() {
  const [currentEvent, setCurrentEvent] = useState<TransitionEventName>('None')

  const [isMoved, setIsMoved] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const TransitionEvents = [
    {
      label: 'onTransitionEnd',
      value: 'CSS transition이 끝났을 때 발생',
    },
  ]

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  return (
    <main className="flex flex-col sm:flex-row gap-0 sm:gap-10 w-full">
      <table className="border-collapse border-slate-100/30 text-xs sm:text-sm w-full md:w-100 h-fit text-slate-300">
        <caption className="py-2 text-pink-400 font-bold text-left"># 트랜지션 이벤트</caption>

        <tbody>
          {TransitionEvents.map((item) => (
            <tr key={item.label}>
              <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
                {item.label}
              </td>
              <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="border p-4 w-full md:w-140 rounded-sm h-fit border-gray-500/30 mt-10 flex flex-col text-sm gap-4 bg-black/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트</span>

            <span
              className={`${
                currentEvent === 'None'
                  ? 'border border-slate-500/30 text-slate-400'
                  : 'bg-pink-400/70 text-white'
              } text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentEvent('None')
              setLogs([])
              setIsMoved(false)
            }}
            className="rounded border border-white/20 px-2 py-0.5 text-xs text-slate-400 hover:bg-white/5"
          >
            초기화
          </button>
        </div>

        <div className="rounded-md bg-black/30 border border-white/10 p-3 text-xs sm:text-sm text-slate-300 min-h-11 flex items-center">
          {currentEvent === 'None' && '아직 트랜지션 이벤트가 발생하지 않았어요.'}
          {currentEvent === 'onTransitionEnd' && '트랜지션이 끝났어요.'}
        </div>

        <div className="overflow-hidden rounded-md border border-white/10 bg-black/20 p-5">
          <div
            className={`w-24 h-24 rounded-2xl border border-purple-300/50 bg-purple-400/20 flex items-center justify-center text-purple-100 font-bold shadow-lg shadow-purple-500/10 transition-transform duration-700 ease-in-out ${
              isMoved ? 'translate-x-40 scale-110' : 'translate-x-0 scale-100'
            }`}
            onTransitionEnd={(e) => {
              const propertyName = e.propertyName
              const elapsedTime = e.elapsedTime.toFixed(2)

              setCurrentEvent('onTransitionEnd')

              addLog(`✅ [onTransitionEnd] ${propertyName} transition 종료 / ${elapsedTime}s`)
            }}
          >
            BOX
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentEvent('None')
            setIsMoved((prev) => !prev)
          }}
          className="border border-slate-300/30 rounded py-2 px-3 hover:bg-white/5 transition-colors"
        >
          박스 움직이기
        </button>

        <section className="text-[11px] sm:text-xs bg-black/30 p-2 rounded-md h-28 overflow-auto scrollbar-none">
          {logs.length === 0 ? (
            <p className="text-slate-500">
              박스 움직이기 버튼을 누르면 transition이 실행되고, 끝나는 순간 로그가 찍혀요.
            </p>
          ) : (
            logs.map((log, index) => <div key={index}>{log}</div>)
          )}
        </section>
      </section>
    </main>
  )
}

export function Wheel() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const UIEvents = [
    { label: 'onWheel', value: '마우스 휠 또는 터치패드 스크롤 동작이 발생했을 때 발생' },
  ]
  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={UIEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
            <span
              className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
            >
              {currentEvent}
            </span>
          </div>
          <textarea
            readOnly
            value={
              '마우스 휠을 위아래로 스크롤해보세요. onWheel은 휠 동작 감지 / onScroll은 스크롤 결과 감지라는 차이점이 있습니다.'
            }
            className="resize-none h-15 border p-2 rounded-sm text-xs sm:text-sm w-full sm:w-[280px] outline-none border-slate-300/30 bg-black/10 text-slate-200 scrollbar-none"
            onWheel={() => setCurrentEvent('onWheel event')}
          />
        </label>
      </section>
    </main>
  )
}

export function KeyBoard() {
  const [currentEvent, setCurrentEvent] = useState<string[]>(['None'])

  const KeyboardEvents = [
    { label: 'onKeyDown', value: '키를 눌렀을 때 발생' },
    { label: 'onKeyUp', value: '키를 뗐을 때 발생' },
    {
      label: 'onKeyPress',
      value: '문자를 입력할 수 있는 키를 눌렀을 때 발생',
    },
  ]

  function addEvent(eventName: string) {
    setCurrentEvent((prev) => [...prev, eventName].slice(-30))
  }

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={KeyboardEvents} />

      <section className="flex flex-col gap-3 justify-between border p-4 w-full md:w-[560px] rounded-sm h-fit border-gray-500/30">
        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트</span>

            <span
              className={`${
                currentEvent[currentEvent.length - 1] === 'None'
                  ? 'border border-slate-500/30'
                  : 'bg-pink-400/70'
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
              if (e.repeat) return
              addEvent('onKeyDown')
            }}
            onKeyUp={(e) => {
              if (e.repeat) return
              addEvent('onKeyUp')
            }}
          />
        </label>

        <section className="text-white/80 text-sm sm:text-base font-medium bg-pink-400/30 p-2 mt-2 rounded-md min-h-10 overflow-auto scrollbar-none">
          {currentEvent.map((item, index) => (
            <span key={index} className="inline-block mr-1">
              {item === 'onKeyDown' ? '👇' : item === 'onKeyUp' && '🖐️'}
            </span>
          ))}
        </section>
      </section>
    </main>
  )
}

export function Composition() {
  const [currentEvent, setCurrentEvent] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const CompositionEvents = [
    { label: 'onCompositionStart', value: '글자 조합이 시작될 때 발생' },
    { label: 'onCompositionUpdate', value: '글자 조합이 바뀌는 중에 발생' },
    { label: 'onCompositionEnd', value: '글자 조합이 완료될 때 발생' },
  ]
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
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
              <div key={index}>{item}</div>
            ))}
          </section>
        </div>
        <label className="flex items-center justify-between">
          <input
            type="text"
            className="border p-2 rounded-sm text-xs sm:text-sm w-full outline-none border-slate-300/30 bg-black/10 text-slate-200"
            placeholder={'아무 텍스트나 입력을 시작해 보세요'}
            onCompositionStart={() =>
              setCurrentEvent((prev) => [...prev, '🟢 [Composition Start] 글자 입력 시작'])
            }
            onCompositionEnd={() =>
              setCurrentEvent((prev) => [...prev, '🔴 [Composition End] 글자 입력 종료'])
            }
            onCompositionUpdate={() =>
              setCurrentEvent((prev) => [...prev, '🟡 [Composition Update] 글자 입력 중...'])
            }
          />
        </label>
      </section>
    </main>
  )
}

export function Image() {
  const [currentEvent, setCurrentEvent] = useState('None')
  const [imageSrc, setImageSrc] = useState('https://picsum.phtos/365/365')
  const ImageEvents = [
    { label: 'onLoad', value: '이미지 로딩이 완료되었을 때 발생' },
    { label: 'onError', value: '이미지 로딩에 실패했을 때 발생' },
  ]
  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={ImageEvents} />
      <section className="flex flex-col gap-3 justify-between border p-4 h-fit w-full md:w-[560px] rounded-sm border-gray-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
          <span
            className={`${currentEvent === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
          >
            {currentEvent}
          </span>
        </div>
        <div className="w-full overflow-hidden">
          <img
            className="w-full max-h-100 object-cover"
            onLoad={() => setCurrentEvent('onLoad')}
            onError={() => setCurrentEvent('onError')}
            src={imageSrc}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setImageSrc(`https://picsum.photos/365/365?random=${Date.now()}`)
            }}
            className="rounded border py-1 border-white/30 cursor-pointer hover:bg-white/5 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 text-slate-300"
          >
            🖼️ 정상 이미지 LOAD
          </button>
          <button
            onClick={() => {
              setImageSrc(`./images/wrong`)
            }}
            className="rounded border border-white/30 cursor-pointer hover:bg-white/5 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 text-slate-300"
          >
            💥 깨진 이미지 LOAD
          </button>
        </div>
      </section>
    </main>
  )
}

export function OnTouch() {
  const OnTouchInfo = [
    { label: 'touches', value: '현재 화면 위에 닿아 있는 모든 손가락' },
    { label: 'targetTouches', value: '현재 이벤트 대상 요소 위에 닿아 있는 손가락' },
    { label: 'changedTouches', value: '이번 이벤트에서 상태가 바뀐 손가락' },
  ]

  const [touchState, setTouchState] = useState('None')
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const handleTouchStart = () => {
    setTouchState('onTouchStart event')
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    setTouchState('onTouchMove event')
    if (touch) {
      const rect = e.currentTarget.getBoundingClientRect()
      setCoords({
        x: Math.round(touch.clientX - rect.left),
        y: Math.round(touch.clientY - rect.top),
      })
    }
  }

  const handleTouchEnd = () => {
    setTouchState('onTouchEnd event')
  }

  return (
    <main className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
      <Table data={OnTouchInfo} />
      <section className="flex flex-col gap-3 justify-between border p-4 h-fit w-full md:w-[560px] rounded-sm border-gray-500/30">
        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-purple-400 font-semibold">발생 이벤트 </span>
              <span
                className={`${touchState === 'None' ? 'border border-slate-500/30' : 'bg-pink-400/70'} text-white/80 text-xs sm:text-sm rounded-full px-2 py-0.5`}
              >
                {touchState}
              </span>
            </div>
            {touchState !== 'None' && (
              <button
                onClick={() => {
                  setTouchState('None')
                  setCoords({ x: 0, y: 0 })
                }}
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
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                여기를 터치하고
                <br />
                드래그 해보세요
              </span>
              <span className="text-[9px] sm:text-[10px] text-purple-400 font-mono mt-1">
                X: {coords.x}, Y: {coords.y}
              </span>
            </div>

            {/* Status Info */}
            <div className="flex flex-col gap-1.5 flex-1 w-full">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                실시간 터치 좌표:
              </span>
              <div className="bg-slate-950/60 border border-slate-800 rounded p-2.5 font-mono text-[11px] sm:text-xs text-slate-300 flex justify-between">
                <span>
                  X: <strong className="text-purple-300">{coords.x}px</strong>
                </span>
                <span>
                  Y: <strong className="text-purple-300">{coords.y}px</strong>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic mt-1">
                * 모바일 기기 혹은 브라우저 개발자 도구의 'Device Mode'를 켜서 테스트해 보세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function Table({ data }: { data: { label: string; value: string }[] }) {
  return (
    <table className="border-collapse border border-slate-100/30 text-xs sm:text-sm w-full md:w-[400px] h-fit text-slate-300">
      <tbody>
        {data.map((item) => (
          <tr key={item.label}>
            <td className="border border-slate-200/30 px-3 py-2 font-mono text-purple-300/80 font-semibold">
              {item.label}
            </td>
            <td className="border border-slate-200/30 px-3 py-2 text-slate-400">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
