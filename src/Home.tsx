import { useParams, Navigate } from 'react-router-dom'
import TicTacToc from './01-tictactoe/TicTacToe'
import VirtualDOM from './02-virtual-dom/VirtualDOM'
import Function from './03-Function/Function'
import Class from './04-class/Class'
import ClassComponentApp from './05-components/ClassComponent'
import Closure from './06-closure/Closure'
import EventLoop from './07-event-loop/EventLoop'
import EventHandling from './08-event-handling/EventHandling'
import ReactForm from './09-react-form/ReactForm'
import LifeCycle from './10-life-cycle/LifeCycle'
import Ref from './11-Ref/Ref'
import ReactRendering from './12-react-rendering/ReactRendering'
import Memoization from './13-memoization/Memoization'
import StateManagement from './15-state-management/StateManagement'

import ReactUseState from './14-react-hooks/ReactUseState'
import ReactUseEffect from './14-react-hooks/ReactUseEffect'
import ReactUseMemo from './14-react-hooks/ReactUseMemo'
import ReactUseCallback from './14-react-hooks/ReactUseCallback'
import ReactUseRef from './14-react-hooks/ReactUseRef'
import ReactUseContext from './14-react-hooks/ReactUseContext'
import ReactUseReducer from './14-react-hooks/ReactUseReducer'
import ReactUseImperativeHandle from './14-react-hooks/ReactUseImperativeHandle'
import ReactUseLayoutEffect from './14-react-hooks/ReactUseLayoutEffect'
import ReactUseDebugValue from './14-react-hooks/ReactUseDebugValue'

export default function Home() {
  const { id, subId } = useParams()

  switch (id) {
    case 'tictactoe':
      return <TicTacToc />

    case 'virtual-dom':
      return <VirtualDOM />

    case 'function':
      return <Function />

    case 'class':
      return <Class />

    case 'components':
      return <ClassComponentApp />

    case 'closure':
      return <Closure />

    case 'event-loop':
      return <EventLoop />

    case 'event-handling':
      return <EventHandling />

    case 'react-form':
      return <ReactForm />

    case 'life-cycle':
      return <LifeCycle />

    case 'ref':
      return <Ref />

    case 'react-rendering':
      return <ReactRendering />

    case 'memoization':
      return <Memoization />

    case 'react-hooks':
      if (subId) {
        switch (subId) {
          case 'use-state':
            return <ReactUseState />
          case 'use-effect':
            return <ReactUseEffect />
          case 'use-memo':
            return <ReactUseMemo />
          case 'use-callback':
            return <ReactUseCallback />
          case 'use-ref':
            return <ReactUseRef />
          case 'use-context':
            return <ReactUseContext />
          case 'use-reducer':
            return <ReactUseReducer />
          case 'use-imperative-handle':
            return <ReactUseImperativeHandle />
          case 'use-layout-effect':
            return <ReactUseLayoutEffect />
          case 'use-debug-value':
            return <ReactUseDebugValue />
          default:
            return <Navigate to="/react-hooks/use-state" replace />
        }
      }
      return <Navigate to="/react-hooks/use-state" replace />

    case 'state-management':
      return <StateManagement />

    default:
      return <div className="text-white"></div>
  }
}
