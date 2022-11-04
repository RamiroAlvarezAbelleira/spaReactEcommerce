import '../../assets/css/App.css';
import { ContentWrapper } from '../ContentWrapper';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Productos } from '../../pages/Productos';
import {Detalle} from '../../pages/Detalle';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';

function App() {
  return (
    <div className="App">
      <ContentWrapper>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route path='/productos' element={ <Productos /> } />
          <Route path='/ingresar' element={ <Login /> } />
          <Route path='/registro' element={ <Register /> } />
          <Route path='/detalle/:id' element={ <Detalle /> } />
        </Routes>
      </ContentWrapper>
    </div>
  );
}

export default App;
