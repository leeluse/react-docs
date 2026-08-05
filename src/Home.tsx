import { useParams, Navigate } from 'react-router-dom'
import TicTacToc from './01-tictactoe/TicTacToe'
import VirtualDOM from './02-virtual-dom/VirtualDOM'
import Function from './03-Function/Function'
import Class from './04-class/Class'
import ClassComponentApp from './05-components/ClassComponent'
import Closure from './06-closure/Closure'
import EventLoop from './07-event-loop/EventLoop'
import EventHandling from './08-event-handling/EventHandling'
import LifeCycle from './09-life-cycle/LifeCycle'
import Ref from './10-Ref/Ref'
import ReactRendering from './11-react-rendering/ReactRendering'
import Memoization from './12-memoization/Memoization'
import StateManagement from './14-state-management/StateManagement'

import ReactUseState from './13-react-hooks/ReactUseState'
import ReactUseEffect from './13-react-hooks/ReactUseEffect'
import ReactUseMemo from './13-react-hooks/ReactUseMemo'
import ReactUseCallback from './13-react-hooks/ReactUseCallback'
import ReactUseRef from './13-react-hooks/ReactUseRef'
import ReactUseContext from './13-react-hooks/ReactUseContext'

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
