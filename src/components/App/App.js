import '../../assets/css/App.css';
import { ContentWrapper } from '../ContentWrapper';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';

function App() {
  return (
    <div className="App">
      <ContentWrapper>
        <Routes>
          <Route path='/' element={ <Home /> } />
        </Routes>
      </ContentWrapper>
    </div>
  );
}

export default App;
