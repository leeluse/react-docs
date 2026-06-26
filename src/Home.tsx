import { useParams } from 'react-router-dom'
import TicTacToc from './01-tictactoe/TicTacToe'
import ClassComponentApp from './02-components/ClassComponent'
import Props from './03-props/Props'
import LifeCycle from './05-life-cycle/LifeCycle'
import EventHandling from './04-event-handling/EventHandling'

export default function Home() {
  const { id } = useParams()

  switch (id) {
    case '1':
      return <TicTacToc />

    case '2':
      return <ClassComponentApp />

    case '3':
      return <Props />

    case '4':
      return <EventHandling />

    case '5':
      return <LifeCycle />

    default:
      return <div className="text-white"></div>
  }
}
