import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>

      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          {/* render noi dung trang web */}
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
