import Main from './components/Main';
import MovieDetail from './components/MovieDetail';
import Signin from './components/Signin';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/moviedetail' element={<MovieDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
