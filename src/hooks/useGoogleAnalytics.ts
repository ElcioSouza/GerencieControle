"use client"; // Importante!

import { useEffect } from "react";
import ReactGA from "react-ga4";

export function useGoogleAnalytics() { // Certifique-se de que está exportando corretamente
  useEffect(() => {
    ReactGA.initialize("G-0F59VKD9NS");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
}
