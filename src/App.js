import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
