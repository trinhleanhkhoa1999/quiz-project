import { useSelector } from "react-redux";
import videoHompage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div className="homepage-container">
      <div>
        <video autoPlay muted loop>
          <source src={videoHompage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <div className="title-1">{t("homepage.title1")}</div>
          <div className="title-2">{t("homepage.title2")}</div>
          <div className="title-3">
            {isAuthenticated ? (
              <button onClick={() => navigate("/users")}>Doing Quiz Now</button>
            ) : (
              <button onClick={() => navigate("/login")}>
                {t("homepage.title3")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
