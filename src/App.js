import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Reader from './Reader/Reader';

const App = () => (
  <Switch>
    <Route path="/reader" component={Reader} />
    <Redirect to="/reader" />
  </Switch>
);

export default App;
