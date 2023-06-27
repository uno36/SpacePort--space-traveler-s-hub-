import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements,
} from 'react-router-dom';

import Header from './components/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />} />,
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
