import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { user, storeInfo } = useSelector((e) => e?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !storeInfo || storeInfo?.completeProgess < 3) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}
