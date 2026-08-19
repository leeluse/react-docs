import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { LuArrowLeftRight } from 'react-icons/lu'

const RENDERING_EXM = `
#text {
  background-color: red;
  color: white;
}
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    <h1 id="text">hello world</h1>
    <button id="btn">click</button>
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>
`

const REACT_FIBER_EXM = `
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0
  this.ref = null
  this.refCleanup = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.dependencies = null

  this.mode = mode

  this.fleags = NoFlags
  this.subtreeFlags = NoFlags
  this.deletions = null

  this.lanes = NoLanes
  this.childLanes = NoLanes

  this.alternate = null
}
`

const REACT_FIBER_EXM2 = `
var createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, prindingProps, key, mode);
}

// 생략...

 fucntion createFiberFromElement(element, mode, lanes) {
  var owner = null
  {
    owner = element._owner
  }

  var type = element.type
  var key = element.key
  var pendingProps = element.props
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) 

  {
    fiber._debugSourse = element._source
    fiber._debugOwner = element._owner
  }
  return fiber
}


function createFiberFromFragmnet(elements, mode, lanes, key) {
  var fiber = createFiber(Fragment, elements, key, mode);
  fiber.lanes = lanes
  return fiber
}
`

const REACT_FIBER_TAGS = `
// ReactWorkTags.js (리액트 파이버 태그가 가질 수 있는 값 예제)
export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // 어떤 컴포넌트인지 알 수 없는 상태
export const HostRoot = 3; // 최상단 루트 노드 (ReactDOM.render가 호출되는 곳)
export const HostPortal = 4; // 포털 (ReactDOM.createPortal)
export const HostComponent = 5; // 일반 HTML 엘리먼트 (div, span 등)
export const HostText = 6; // 텍스트 노드
export const Fragment = 7; // 리액트 프래그먼트 (<React.Fragment>)
export const ContextProvider = 9; // Context Provider
export const ContextConsumer = 10; // Context Consumer
export const ForwardRef = 11; // React.forwardRef
export const SuspenseComponent = 13; // Suspense
export const MemoComponent = 14; // React.memo
export const SimpleMemoComponent = 15;
// ... 등 총 28가지의 태그 종류가 정의되어 있습니다.
`

const REACT_FIBER_RELATION = `
// 1. JSX 구조
<div id="parent">
  <h1 id="child1">Hello</h1>
  <p id="child2">World</p>
</div>

// 2. 파이버 객체 간의 관계 연결 구조 (child, sibling, return)
const parentFiber = {
  tag: 5, // HostComponent (div)
  child: child1Fiber, // 첫 번째 자식만 가리킵니다.
  sibling: null,
  return: null
}

const child1Fiber = {
  tag: 5, // HostComponent (h1)
  child: null,
  sibling: child2Fiber, // 형제 노드(p)를 가리킵니다.
  return: parentFiber // 부모(div)를 가리킵니다.
}

const child2Fiber = {
  tag: 5, // HostComponent (p)
  child: null,
  sibling: null, // 다음 형제가 없으므로 null입니다.
  return: parentFiber // 부모(div)를 가리킵니다.
}
`

const REACT_FIBER_WORK_ORDER = `
// 1. 트리 구조 예시
       A (Root)
      /
     B (child) ——— C (sibling)

// 2. DFS 순회 순서 (beginWork -> completeWork)
1. A 시작: beginWork(A) 호출
2. B로 이동 (A의 child): beginWork(B) 호출
3. B 완료 (자식 없음): completeWork(B) 호출
4. C로 이동 (B의 sibling): beginWork(C) 호출
5. C 완료 (자식 없음): completeWork(C) 호출
6. A로 복귀 (C의 return): completeWork(A) 호출

최종 순회 경로: A(시작) -> B -> C -> A(완료)
`
export default function VirtualDOM() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 02. Virtual DOM (가상 돔)
        </h1>
        <DomAndRendering />
        <VirtualDOMBackground />
        <ReactFiber />
      </section>
    </div>
  )
}

export function VirtualDOMBackground() {
  return (
    <article className="py-4">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">가상 DOM</h2>
      <p className="font-semibold text-base sm:text-lg text-base-heading my-2">• 가상 DOM의 등장</p>
      <p>
        어플리케이션이 커지면서 사용자 인터랙션을 통해 다양한 정보를 노출하게끔 함 &rarr; 렌더링
        완료 이후에도 사용자의 인터랙션으로 웹페이지가 변경되는 상황도 고려한{' '}
        <span className="text-white">
          싱글 페이지 어플리케이션(Single Page Application)이 보편화되었음
        </span>
      </p>
      <div className="mb-4 mt-2 bg-blue-500/10 border border-blue-500/25 px-3 py-2 rounded-md leading-relaxed text-blue-600 dark:text-blue-400 text-sm sm:text-md">
        <p>일반 페이지: HTML을 새로 받아서 다시 렌더링 과정을 거침</p>
        <p>싱글 페이지 어플리케이션: 자바스크립트가 HTML을 동적으로 변경해 렌더링을 진행</p>
      </div>
      <div className="border-l-2 pl-4">
        <h4 className="font-bold text-white">SPA의 Trade-off</h4>
        <p>
          페이지 깜빡임 없이 자연스러운 웹 탐색 가능{' '}
          <LuArrowLeftRight className="inline-block text-white mx-1" /> DOM 관리 비용 증가
        </p>
        <p>
          사용자 인터랙션에 따른 DOM 변경보다 결과적으로 만들어지는 DOM을 제공하길 원함에 따라{' '}
          <span className="code-tag">가상 DOM</span>이 탄생
        </p>
      </div>
    </article>
  )
}

export function ReactFiber() {
  return (
    <article>
      <h2 className="font-bold text-xl sm:text-2xl text-primary">리액트 파이버</h2>
      <p className="font-semibold text-base sm:text-lg text-base-heading my-2">
        • 리액트 파이버란?
      </p>
      <p>리액트에서 관리하는 평범한 자바스크립트 객체 / 파이버는 파이버 재조정자가 관리</p>
      <p className="text-primary">
        &rarr; 가상 DOM과 실제 DOM을 비교해 변경사항을 수집하고, 둘 차이를 갖고서 렌더링 요청을 한다
      </p>
      <p className="text-sm">
        재조정(reconciliation): 가상 DOM과 실제 DOM을 비교하는 작업(알고리즘)
      </p>
      <div className="border border-base-border/50 bg-black/5 rounded dark:bg-white/5 p-4 rounde  my-2 flex flex-col gap-1.5">
        <h3 className="font-bold text-pink-400 text-sm sm:text-base">
          재조정(reconciliation) 알고리즘
        </h3>
        <ul className="text-xs text-white/90 sm:text-sm  flex flex-col gap-1 list-disc list-inside">
          <li>작업을 작은 단위로 분할하고 쪼갠 다음 우선 순위 매기기</li>
          <li>작업을 일시 중지한 후 다시 나중에 시작 가능</li>
          <li>이전 작업을 재사용하거나 필요하지 않은 경우 폐기 가능</li>
          <div className="flex py-3 items-center justify-center gap-4">
            <span className="rounded p-2">• • • </span>
            <span className="border rounded p-2 bg-sky-400/10 border-sky-400 text-sky-400">
              finishedWork()
            </span>
          </div>
          <p className="text-center text-xs text-slate-400">
            리액트는 파이버라는 작업 단위를 하나씩 처리하고{' '}
            <span className="code-tag pink mx-1">finishedWork()</span>이라는 작업으로 마무리함
          </p>
        </ul>
      </div>
      <div className="py-3">
        <p className="text-base sm:text-lg font-semibold text-white">• 파이버 객체</p>
        <CodeBlock content={REACT_FIBER_EXM} />
        <p>
          파이버는 리액트 요소와 유사해 보이나, 렌더링될 때마다 새롭게 생성되는 리액트 요소와 달리
          파이버는 가급적 재사용된다
        </p>
      </div>
      <div className="py-3">
        <p className="text-base sm:text-lg font-semibold text-white">• 파이버를 생성하는 함수</p>
        <CodeBlock content={REACT_FIBER_EXM2} />
        <p>
          파이버는 리액트 요소와 유사해 보이나, 렌더링될 때마다 새롭게 생성되는 리액트 요소와 달리
          파이버는 가급적 재사용된다
        </p>
      </div>
      <div className="py-3">
        <p className="text-base sm:text-lg font-semibold text-white">
          • 파이버의 tag가 가질 수 있는 값
        </p>
        <p className="leading-relaxed my-2 text-sm sm:text-base">
          파이버 객체의 <span className="code-tag">tag</span> 필드는 해당 파이버가 어떤 종류의 작업
          단위(컴포넌트 종류 또는 HTML 요소 등)를 나타내는지 결정하는 0부터 25 이상의 숫자형
          상수(WorkTag) 값이다
        </p>
        <CodeBlock content={REACT_FIBER_TAGS} />
      </div>
      <div className="py-3">
        <p className="text-base sm:text-lg font-semibold text-white">
          • 파이버 노드 간의 관계 (child, sibling, return)
        </p>
        <p className="leading-relaxed my-2 text-sm sm:text-base">
          리액트 파이버는 여러 자식을 가질 때 기존의 트리 구조처럼 배열로 자식을 가지고 있지 않고,
          첫 번째 자식만 <code>child</code>로 가리킨다. 그리고 나머지 자식들은{' '}
          <code className="text-sky-400">sibling</code>
          (형제) 필드를 통해 단방향 연결 리스트(Singly Linked List) 형식으로 쭉 연결하고, 부모는{' '}
          <code className="text-red-400">return</code>을 통해 돌아갈 수 있는 구조를 취합니다.
        </p>
        <CodeBlock content={REACT_FIBER_RELATION} />
      </div>
      <div className="py-3">
        <p className="text-base sm:text-lg font-semibold text-white">
          • 파이버의 작업 순서 (DFS 순회)
        </p>
        <p className="leading-relaxed my-2 text-sm sm:text-base">
          리액트 파이버는 <strong>깊이 우선 탐색(DFS, Depth-First Search)</strong> 방식으로 노드를
          순회하며 작업을 수행하며 이 과정은 크게 <code className="text-pink-400">beginWork()</code>
          와 <code className="text-emerald-400">completeWork()</code>의 두 단계로 나뉜다
        </p>
        <div className="text-xs sm:text-sm text-slate-300 flex flex-col gap-2 bg-black/10 border border-slate-700/50 p-4 rounded mb-2">
          <p>
            <span className="font-semibold text-pink-400">• beginWork()</span>: 트리 아래로
            내려가면서 각 파이버 노드의 생성 및 변경 관련 작업을 처리합니다 (컴포넌트 호출,
            props/state 반영 등)
          </p>
          <p>
            <span className="font-semibold text-emerald-400">• completeWork()</span>: 더 이상 자식이
            없는 단말 노드에 도달하면 실제 DOM 노드를 생성하거나 속성을 설정하며, 이후 형제 노드로
            이동하거나 부모 노드로 복귀
          </p>
        </div>
        <CodeBlock content={REACT_FIBER_WORK_ORDER} />
      </div>
      <div>
        <p className="font-semibold text-base sm:text-lg text-base-heading my-2">
          • 리액트 파이버 트리
        </p>
        <p>
          리액트 요소 내부에는 파이버 트리가 두 개 존재
          <span className="code-tag mx-2">current</span>
          <span className="code-tag">workInProgress</span>
        </p>
        <p className="leading-relaxed my-2 text-sm sm:text-base">
          파이버 작업이 끝난 뒤 리액트는 포인터만 변경해 workInProgress 트리를 현재 트리로 바꾼다{' '}
          &rarr; 이를 <span className="text-pink-500">더블 버퍼링</span>이라고 함
        </p>
      </div>
      <FiberTreeVisualizer />
    </article>
  )
}

export function FiberTreeVisualizer() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes = [
    {
      id: 'root',
      label: 'div',
      cx1: 200,
      cy1: 40,
      cx2: 600,
      cy2: 40,
      description: 'Root Fiber: App의 최상단 div 엘리먼트',
    },
    {
      id: 'left',
      label: 'h1',
      cx1: 100,
      cy1: 120,
      cx2: 500,
      cy2: 120,
      description: 'Left Child Fiber: 제목을 표시하는 h1 엘리먼트',
    },
    {
      id: 'right',
      label: 'div',
      cx1: 300,
      cy1: 120,
      cx2: 700,
      cy2: 120,
      description: 'Right Child Fiber: 내용물들을 묶어주는 div 엘리먼트',
    },
    {
      id: 'g1',
      label: 'p',
      cx1: 240,
      cy1: 220,
      cx2: 640,
      cy2: 220,
      description: 'Grandchild 1 Fiber: 설명을 적는 p 엘리먼트',
    },
    {
      id: 'g2',
      label: 'span',
      cx1: 360,
      cy1: 220,
      cx2: 760,
      cy2: 220,
      description: 'Grandchild 2 Fiber: 강조용 span 엘리먼트 (사용자 입력으로 변경/업데이트됨)',
      isUpdated: true,
    },
  ]

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="overflow-x-auto w-full border border-base-border/30 rounded-xl bg-slate-950/70 p-4">
        <div className="min-w-200 relative">
          {/* Header labels */}
          <div className="flex flex-col sm:flex-row justify-between px-10 gap-2 mb-4 font-bold text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Current Tree (화면에 그려진 상태)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Updated Node (변경 사항이 발생한 노드)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              WorkInProgress Tree (준비 중인 상태)
            </span>
          </div>

          <svg width="100%" height="280" viewBox="0 0 800 280" className="select-none">
            <defs>
              <linearGradient id="current-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="wip-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="wip-updated-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Alternate connections (Dashed lines between trees) */}
            {nodes.map((n) => {
              const isHovered = hoveredNode === n.id
              return (
                <g key={`alt-${n.id}`}>
                  <line
                    x1={n.cx1}
                    y1={n.cy1}
                    x2={n.cx2}
                    y2={n.cy2}
                    stroke={isHovered ? '#ec4899' : '#475569'}
                    strokeWidth={isHovered ? 2.5 : 1}
                    strokeDasharray={isHovered ? 'none' : '4, 4'}
                    className="transition-all duration-200"
                  />
                  {isHovered && (
                    <text
                      x={(n.cx1 + n.cx2) / 2}
                      y={n.cy1 - 6}
                      fill="#ec4899"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      alternate
                    </text>
                  )}
                </g>
              )
            })}

            {/* 2. Tree 1 (Current) lines */}
            <g stroke="#475569" strokeWidth="2">
              <line x1="200" y1="40" x2="100" y2="120" />
              <line x1="200" y1="40" x2="300" y2="120" />
              <line x1="300" y1="120" x2="240" y2="220" />
              <line x1="300" y1="120" x2="360" y2="220" />
            </g>

            {/* 3. Tree 2 (WorkInProgress) lines */}
            <g stroke="#475569" strokeWidth="2">
              <line x1="600" y1="40" x2="500" y2="120" />
              <line x1="600" y1="40" x2="700" y2="120" />
              <line x1="700" y1="120" x2="640" y2="220" />
              <line x1="700" y1="120" x2="760" y2="220" />
            </g>

            {/* 4. Tree 1 (Current) Nodes */}
            {nodes.map((n) => {
              const isHovered = hoveredNode === n.id
              return (
                <g
                  key={`curr-${n.id}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(n.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={n.cx1}
                    cy={n.cy1}
                    r="20"
                    fill="url(#current-grad)"
                    stroke={isHovered ? '#ffffff' : '#059669'}
                    strokeWidth={isHovered ? 3 : 1.5}
                    filter={isHovered ? 'url(#glow)' : ''}
                    className="transition-all duration-200"
                  />
                  <text
                    x={n.cx1}
                    y={n.cy1 + 5}
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {n.label}
                  </text>
                </g>
              )
            })}

            {/* 5. Tree 2 (WorkInProgress) Nodes */}
            {nodes.map((n) => {
              const isHovered = hoveredNode === n.id
              const fillUrl = n.isUpdated ? 'url(#wip-updated-grad)' : 'url(#wip-grad)'
              const strokeColor = n.isUpdated
                ? isHovered
                  ? '#ffffff'
                  : '#d97706'
                : isHovered
                  ? '#ffffff'
                  : '#0284c7'
              return (
                <g
                  key={`wip-${n.id}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(n.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={n.cx2}
                    cy={n.cy2}
                    r="20"
                    fill={fillUrl}
                    stroke={strokeColor}
                    strokeWidth={isHovered ? 3 : 1.5}
                    filter={isHovered ? 'url(#glow)' : ''}
                    className="transition-all duration-200"
                  />
                  <text
                    x={n.cx2}
                    y={n.cy2 + 5}
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {n.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>{' '}
    </div>
  )
}

export function DomAndRendering() {
  return (
    <article className="flex flex-col gap-3 ">
      <h2 className="font-bold text-xl sm:text-2xl text-primary">DOM과 브라우저 렌더링 과정</h2>
      <p className="font-semibold text-base sm:text-lg text-base-heading mt-2">• DOM의 기본 정의</p>
      <p className="leading-relaxed text-sm sm:text-base">
        <span className="text-primary">Dom(Document Object Model)</span>은 웹페이지에 대한
        인터페이스로 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보를 담고 있다
      </p>
      <section className="border p-3 rounded border-white/50">
        <h3 className="font-bold text-white text-base sm:text-lg border-b border-white/30 pb-1">
          브라우저 렌더링 과정
        </h3>
        <ul className="rounded border-slate-300/20 list-decimal ml-5 pt-3 space-y-3">
          <li>
            브라우저가 사용자가 요청한 주소를 방문해{' '}
            <span className="border-b font-medium">HTML 파일을 다운로드</span>
            <span className="ml-4 text-slate-400">
              • 해당 과정에서 CSS 파일을 만나면 해당{' '}
              <span className="border-b">CSS 파일도 다운로드</span>
            </span>
          </li>
          <li>
            <p className="text-sm sm:text-base">
              <span className="text-slate-300 font-medium">브라우저의 렌더링 엔진</span>은
              <span className="text-red-200"> HTML을 파싱해 DOM 노드로 구성된 트리(DOM)</span>
              <span> / </span>
              <span className="text-blue-200"> CSS를 파싱해 CSSOM 트리</span>를 만든다
            </p>
          </li>
          <li>
            브라우저는 만든 DOM 노드를 순회하는데, 모든 노드를 방문하지 않고 사용자 눈에 보이는
            노드만 방문한다 (Render Tree 생성)
            <p className="flex flex-col text-sm ml-4 text-slate-500">
              <span>
                • display: none과 같이 사용자 화면에 보이지 않는 요소는 방문해 작업하지 않는다
              </span>
              <span>• 이는 트리를 분석하는 과정을 조금이라도 빠르게 하기 위해서다</span>
            </p>
          </li>
          <li>
            눈에 보이는 노드를 대상으로 해당 노드에 대한 CSSOM 정보를 찾고 스타일을 결합한다
            <p className="flex flex-col text-sm ml-4 text-slate-500">
              <span>
                • 레이아웃(Layout/Reflow): 각 노드가 화면의 어느 좌표에 위치할지 계산하는 과정
              </span>
              <span>
                • 페인팅(Paint): 레이아웃 단계를 거친 노드에 실제 색상 및 픽셀을 그리는 과정
              </span>
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-4 flex flex-col gap-4">
        <h3 className="font-bold text-lg text-base-heading">💻 예제 코드 및 라이브 렌더링 실행</h3>
        <CodeBlock content={RENDERING_EXM} />
        <div className="space-y-2 text-sm sm:text-base bg-base-bg/60 p-4 rounded-lg border border-base-border/50">
          <p>
            1. HTML 다운로드 및 분석 -&gt; <span className="code-tag blue">DOM Tree</span> 생성
          </p>
          <p>
            2. <span className="code-tag purple">&lt;link&gt;</span> 태그 발견 후{' '}
            <span className="code-tag">style.css</span> 다운로드 -&gt;{' '}
            <span className="code-tag blue">CSSOM Tree</span> 생성
          </p>
          <p>
            3. DOM과 CSSOM을 결합하여 화면에 그려질 요소를 추린{' '}
            <span className="code-tag yellow">Render Tree</span> 생성
          </p>
          <p>
            4. <span className="code-tag pink">#text</span> 요소의 위치와 크기(width, height,
            좌표)를 계산하는 <span className="code-tag yellow">Layout (Reflow)</span> 진행
          </p>
          <p>
            5. 결합된 스타일(<span className="code-tag pink">background-color: red</span>,{' '}
            <span className="code-tag">color: white</span>)을 바탕으로 화면 픽셀을 그리는{' '}
            <span className="code-tag yellow">Paint</span> 수행
          </p>
          <p>
            6. <span className="code-tag purple">&lt;script&gt;</span> 태그가 실행되며 버튼{' '}
            <span className="code-tag blue">#btn</span>에 이벤트가 바인딩됨
          </p>
        </div>
      </section>
    </article>
  )
}
