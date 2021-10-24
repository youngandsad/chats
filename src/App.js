
import './App.css';
import Main from './routes/Main.js'
import About from './routes/About.js'
import Chats from './routes/Chats.js'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { store } from './redux/store'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
 
import AuthButton from './components/AuthButton';

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  
  
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Auth0Provider clientId={clientId} domain={domain} redirectUri={window.location.origin}>
      <div className="App">
        <div>
          <AuthButton />
        </div>
        <nav className="NavigationMenu">
          <Link to="/">Главная</Link>
          <Link to="/about">о компании</Link>
          <Link to="/chats">Чаты</Link>
        </nav>
        <Switch>
            <Route path ="/about">
                  <Main/>
            </Route> 
            <Route path ="/chats/:chatId?">
                  <Chats/>
            </Route> 
            <Route path ="/">
                  <About/>
            </Route>
        </Switch>    
      </div>
      </Auth0Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
