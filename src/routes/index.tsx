import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from 'react-router-dom';
import ShoppingList from '../components/pages/ShoppingList/ShoppingList';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <>
          <Outlet />
          {/* navigating immediately to shopping-list route as we have only one page */}
          <Navigate to='shopping-list' replace={true} />
        </>
      }
    >
      <Route path='shopping-list' element={<ShoppingList />} />
    </Route>,
  ),
);
