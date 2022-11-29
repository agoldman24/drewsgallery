export const defaultTheme = {
  palette: {
    type: "dark",
    background: {
      default: "#202020",
    },
    primary: {
      main: "#4bff8c",
      gradient1: "linear-gradient(to top right, #6f27f8, #4bff8c)",
      gradient2: "linear-gradient(to top right, #4bff8c, #ffffff)",
    },
  },
};

export const gradientTextStyle = (variety: number) => ({
  background:
    variety == 1
      ? defaultTheme.palette.primary.gradient1
      : defaultTheme.palette.primary.gradient2,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const galleryContainerStyle = {
  top: "45px",
  left: "0",
  width: "calc(100% - 10px)",
  height: "calc(100% - 55px)",
  position: "fixed",
  overflowY: "auto",
  padding: "5px",
};
