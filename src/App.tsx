import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, RouteProps } from 'react-router-dom';
import { useAppSelector } from './store';
import PublicPage from './components/publicPage/PublicPage';
import { Home } from './components/Home';
import PrimeReact from 'primereact/api';
import "primereact/resources/themes/lara-dark-indigo/theme.css";  //theme
import "primereact/resources/primereact.css";                  //core css
import "primeicons/primeicons.css";                                //icons


PrimeReact.ripple = true;

type ProtectedRouteProps = RouteProps & {
  authenticated: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  authenticated,
  children,
}: ProtectedRouteProps): React.ReactElement => {
  if (!authenticated) {
    return <Navigate to='/' replace />;
  }

  return children;
};

const App: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute authenticated={auth.authenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

