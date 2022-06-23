import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SingleBook from './SingleBook';

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:text" element={<SingleBook />} />
    </Routes>
  );
};
export default Main;
