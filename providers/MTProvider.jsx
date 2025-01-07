"use client";

import { ThemeProvider } from "@material-tailwind/react";
import theme, {
  button,
  iconButton,
  input,
  select,
} from "@material-tailwind/react/theme";

const MTProvider = ({ children }) => {
  const customTheme = {
    ...theme,
    button: {
      ...button,
      defaultProps: {
        ...button.defaultProps,
        color: "blue",
        variant: "gradient",
      },
    },
    iconButton: {
      ...iconButton,
      defaultProps: {
        ...iconButton.defaultProps,
        color: "blue",
        variant: "gradient",
      },
    },
    input: {
      ...input,
      defaultProps: {
        ...input.defaultProps,
        color: "blue",
      },
    },
    select: {
      ...select,
      defaultProps: {
        ...select.defaultProps,
        color: "blue",
      },
    },
  };
  return <ThemeProvider value={customTheme}>{children}</ThemeProvider>;
};

export default MTProvider;
