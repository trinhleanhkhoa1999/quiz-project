import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../../services/apiServices.js";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userACtion.js";
import Language from "./Language.jsx";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = async () => {
    let res = await postLogout(account.email, account.refresh_token);
    console.log("check res: ", res);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      navigate("/");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="light">
      <Container>
        {/* <Navbar.Brand href="#">Quiz Project</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          Quiz Project
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  {t("header.login")}
                </button>
                <button className="btn-signup" onClick={() => handleRegister()}>
                  {t("header.signup")}
                </button>
              </>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
