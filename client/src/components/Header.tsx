import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {

  const auth = useAuth()

  console.log(auth?.isLoggedIn,'jdklklf');
  

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
        {
          auth?.isLoggedIn?
          (<>
          <NavigationLink bg="#cf639b" to="/chat" text="Go To Chat" textColor="black" />
          <NavigationLink bg="#51538f" to="/" text="logout" textColor="white" onClick={auth.logout} />
          </>)
          :
          (<>
          <NavigationLink bg="#cf639b" to="/login" text="login" textColor="black" />
          <NavigationLink bg="#51538f" to="/signup" text="signup" textColor="white"/>
          </>)
        }
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
