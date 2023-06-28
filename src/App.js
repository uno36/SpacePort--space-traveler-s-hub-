import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements,
} from 'react-router-dom';

import Header from './components/Header';
import Missions from './components/Missions';
import Rockets from './components/Rockets';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="/" element={<Rockets />} />
      <Route path="missions" element={<Missions />} />
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
