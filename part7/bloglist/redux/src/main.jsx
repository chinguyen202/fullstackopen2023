import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import store from './store';
import './index.css';
import User from './components/User';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/users/:id', element: <User /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
