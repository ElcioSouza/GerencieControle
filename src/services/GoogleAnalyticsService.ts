import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-0F59VKD9NS";

export const initGA = () => {
  if (typeof window !== "undefined") {
    ReactGA.initialize(GA_TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }
};
