import { useParams } from 'react-router-dom'
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
import ReactHooks from './13-react-hooks/ReactHooks'
import StateManagement from './14-state-management/StateManagement'

export default function Home() {
  const { id } = useParams()

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
      return <ReactHooks />

    case 'state-management':
      return <StateManagement />

    default:
      return <div className="text-white"></div>
  }
}
