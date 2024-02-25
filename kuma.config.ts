import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    primary: "#1F263D",
    accent: "#F7CAC9",
    accent2: "#6B8E23",
    backgroundColor: "#ECF1EF",
  },
  spacings: {
    sm: "0.5rem",
    md: "1rem",
  },
  breakpoints: {
    sm: "400px",
    md: "700px",
  },
  fonts: {
    heading: "Georgia, serif",
    body: "Lato, sans-serif",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },
  components: {
    Button: {
      defaultProps: {
        variant: "primary",
        borderRadius: "10px",
        p: "16px 32px",
        fontWeight: 600,
      },
      variants: {
        primary: {
          bg: "colors.accent",
          color: "colors.primary",
          border: "none",
          _hover: {
            opacity: 0.7,
          },
        },
        secondary: {
          bg: "colors.accent2",
          color: "colors.backgroundColor",
          border: "none",
          _hover: {
            opacity: 0.7,
          },
        },
        ghost: {
          bg: "none",
          border: "solid",
          borderWidth: "1px",
          borderColor: "colors.accent2",
        },
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
