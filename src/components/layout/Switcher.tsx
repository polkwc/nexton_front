import { Routes, Route } from 'react-router-dom';
import Main from './Main';

export default function  Switcher() {
    return (
      <div>
        <Routes>
          <Route path='/' Component={Main} />
        </Routes>
      </div>
    );
  }
  