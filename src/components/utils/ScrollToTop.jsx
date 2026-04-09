import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar la ruta, sube el scroll hasta arriba al instante.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
