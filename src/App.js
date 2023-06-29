import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements,
} from 'react-router-dom';

import Header from './components/Header';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Profile from './components/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="/" element={<Rockets />} />
      <Route path="missions" element={<Missions />} />
      ,
      <Route path="profile" element={<Profile />} />
      ,
    </Route>,
  ),
);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
