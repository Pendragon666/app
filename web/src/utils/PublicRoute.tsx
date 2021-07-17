import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp }: any = decode(refreshToken);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const PublicRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !checkAuth() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
