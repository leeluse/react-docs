import { useParams } from 'react-router-dom';
import TicTacToc from './01-tictactoe/TicTacToe';
import ThinkingReact from './02-Thinking-in-react/ThinkingReact';
import ClassComponent from './03-components/ClassComponent';
import Props from './04-props/Props';
import LifeCycle from './05-Life-cycle/LifeCycle';


export default function Home() {
 const { id } = useParams();

  switch (id) {
    case "1":
      return <TicTacToc />;

    case "2":
      return <ThinkingReact />;

    case "3":
      return <ClassComponent />;

    case "4":
      return <Props />;

    case "5":
      return <LifeCycle />;

    default:
      return <div className='text-white'></div>
  }
}
