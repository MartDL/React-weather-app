import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Login, Homepage } from './pages';
import { UserContext } from './context/user/UserProvider';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Route exact path="/">
        {user ? <Redirect to="/main" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/main" component={Homepage} />
    </Router>
  );
}

export default App;
