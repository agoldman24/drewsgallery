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
