import React, { Fragment } from 'react';
import Reader from './Reader/Reader';
import MoviePage from './Movies/MoviePage/MoviePage';
import Dashboard from './Bank-Account/Dashboard/Dashboard';
import publications from '../publications.json';
import movies from '../movies.json';

const App = () => (
  <Fragment>
    <Reader items={publications} />
    <MoviePage items={movies} />;
    <Dashboard />
  </Fragment>
);

export default App;
