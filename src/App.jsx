import React from 'react';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from "./store"
import SearchNav from './Modules/SearchNav';
import MovieAbout from './Modules/MovieAbout';
import Favourites from './Modules/Favourites';

const App = () => {
  return (
        <Provider store={store}>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SearchNav />} />
          <Route path='/about' element={<MovieAbout />} />
          <Route path='/fav' element={<Favourites />} />
        </Routes>
      </Router>
      
    </div>
    </Provider>
  );
};

export default App;