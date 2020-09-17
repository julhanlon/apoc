import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import Loading from "../components/Loading"

export default ({ component: Component, ...rest }) => {
  const { userData, isAuthLoading } = useUserContext();
  if (isAuthLoading) return  <div style = {{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loading/></div>;
  return (
    <Route
      {...rest}
      render={(props) =>
        !userData.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/search" }} />
        )
      }
    />
  );
};
