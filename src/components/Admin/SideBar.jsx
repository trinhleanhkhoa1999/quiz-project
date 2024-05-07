import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.scss";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
  FaReact,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <FaReact size="30px" color="#00bfff" />

            <span onClick={() => navigate("/")}> Admin page</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              //   suffix={<span className="badge red">New</span>}
            >
              Dashboard
              <Link to="/admins" />
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}>components</MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              //   suffix={<span className="badge yellow">3</span>}
              //   icon={<FaRegLaughWink />}
              icon={<FaGem />}
              title="Features"
            >
              <MenuItem>
                Quản lý Users <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý bài Quiz <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                {" "}
                Quản lý Câu hỏi <Link to="/admins/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              {/* <FaGithub /> */}
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; View source
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
