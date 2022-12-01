import { CSSProperties } from "react";

export const defaultTheme = {
  palette: {
    type: "dark",
    primary: {
      main: "#4bff8c",
    },
  },
  gradient1: "linear-gradient(to top right, #6f27f8, #4bff8c)",
  gradient2: "linear-gradient(to top right, #4bff8c, #ffffff)",
};

export const gradientTextStyle = (variety: number) =>
  ({
    background: variety == 1 ? defaultTheme.gradient1 : defaultTheme.gradient2,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as CSSProperties);

export const dialogStyles = () =>
  ({
    root: {
      position: "initial",
    },
    backdropRoot: {
      background: "none",
    },
  } as CSSProperties);

export const modalStyle = {
  zIndex: "1303",
} as CSSProperties;

export const galleryContainerStyle = {
  top: "45px",
  left: "0",
  width: "calc(100% - 10px)",
  height: "calc(100% - 55px)",
  position: "fixed",
  overflowY: "auto",
  overflowX: "hidden",
  padding: "5px",
} as CSSProperties;

export const closeButtonStyle = {
  position: "fixed",
  marginLeft: "130px",
  marginTop: "-30px",
} as CSSProperties;

export const closeIconStyle = {
  width: "32px",
  height: "32px",
} as CSSProperties;
