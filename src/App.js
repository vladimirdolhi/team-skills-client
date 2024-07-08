import logo from "./logo.svg";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";
import lightTheme_2 from "./theme/LightTheme_2";
import { Routers } from "./component/Routers/Routers";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt, jwt, dispatch]);
  return (
    <ThemeProvider theme={lightTheme_2}>
      <div className="App">
        <Routers />
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}

export default App;
