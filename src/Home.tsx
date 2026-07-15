import { useParams } from 'react-router-dom'
import TicTacToc from './01-tictactoe/TicTacToe'
import Function from './02-Function/Function'
import Class from './03-class/Class'
import ClassComponentApp from './04-components/ClassComponent'
import Closure from './05-closure/Closure'
import EventLoop from './06-event-loop/EventLoop'
import EventHandling from './07-event-handling/EventHandling'
import LifeCycle from './08-life-cycle/LifeCycle'
import Ref from './09-Ref/Ref'

export default function Home() {
  const { id } = useParams()

  switch (id) {
    case 'tictactoe':
      return <TicTacToc />

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

    default:
      return <div className="text-white"></div>
  }
}
