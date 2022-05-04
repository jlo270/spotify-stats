import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  RouteProps,
} from "react-router-dom";
import { useAppSelector } from "./store";
import PublicPage from "./components/publicPage/PublicPage";
import { Home } from "./components/Home";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type ProtectedRouteProps = RouteProps & {
  authenticated: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  authenticated,
  children,
}: ProtectedRouteProps): React.ReactElement => {
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
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
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
