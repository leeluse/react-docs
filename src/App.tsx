import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import TicTacToc from './01-tictactoe/TicTacToe';
import ThinkingReact from './02-Thinking-in-react/ThinkingReact';
import ClassComponent from './03-components/ClassComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="1" element={<TicTacToc />} />
          <Route path="2" element={<ThinkingReact />} />
          <Route path="3" element={<ClassComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
