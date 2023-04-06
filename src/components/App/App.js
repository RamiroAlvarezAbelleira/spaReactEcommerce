import '../../assets/css/App.css';
import { ContentWrapper } from '../ContentWrapper';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Productos } from '../../pages/Productos';
import { Detalle } from '../../pages/Detalle';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Profile } from '../../pages/Profile';
import { ProfileEdit } from '../../pages/ProfileEdit';
import { ProductCreate } from '../../pages/ProductCreate';
import { ProductEdit } from '../../pages/ProductEdit';
import LoggedAuth from '../LoggedAuth/LoggedAuth';
import NotLoggedAuth from '../NotLoggedAuth/NotLoggedAuth';
import { AdminAuth } from '../AdminAuth';

function App() {
  return (
    <div className="App">
      <ContentWrapper>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route path='/productos' element={ <Productos /> } />
          <Route element={ <NotLoggedAuth /> }> 
            <Route path='/ingresar' element={ <Login /> } />
            <Route path='/registro' element={ <Register /> } />
          </Route>
          <Route element={ <LoggedAuth /> }>
            <Route path='/perfil' element={ <Profile /> } />
            <Route path='/perfil/edit' element={ <ProfileEdit /> } />
          </Route>
          <Route element={ <AdminAuth /> }>
            <Route path='/productos/crear' element={ <ProductCreate /> } />
            <Route path='/productos/editar/:id' element={ <ProductEdit /> } />
            <Route path='/productos/detalle/:id' element={ <Detalle /> } />
          </Route>
        </Routes>
      </ContentWrapper>
    </div>
  );
}

export default App;
