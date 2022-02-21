import { useState } from 'react';
import './App.css';
import LoggedInApp from './logged_in_app/LoggedInApp';
import Login from './login/Login';

function App() {

  const [auth, setAuth] = useState(false)

  return (
    <div className="App">
      {auth ? <LoggedInApp /> : <Login setAuth={setAuth}/>}
    </div>
  );
}

export default App;
