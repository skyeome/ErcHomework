import { styled } from "@mui/material";

export const WeeklyRecordFixed = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: "4rem",
  left: "0",
  right: "0",
  height: "5.625rem",

  "& .inner": {
    position: "relative",
    zIndex: 1,

    maxWidth: "30rem",
    height: "100%",

    margin: "0 auto",
    padding: "1rem 1.5rem 0",

    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.lightBg.dark
        : theme.palette.lightBg.main,
  },

  "& .weeks-title": {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 .875rem 0 0.125rem",
  },

  "& .week-bg": {
    position: "absolute",
    top: "2.5rem",
    left: "1.5rem",
    zIndex: -1,

    display: "flex",
    justifyContent: "space-between",

    width: "calc(100% - 3rem)",
    height: "2rem",

    borderRadius: "1rem",

    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.lightGray.dark
        : theme.palette.lightGray.main,
  },

  "& .weeks-check": {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.25rem",
  },
}));

export const WeeklyCheckItem = styled("div")(({ theme }) => ({
  position: "relative",
  width: "2rem",

  "&::before": {
    content: '" "',
    position: "absolute",

    backgroundColor: theme.palette.background.paper,
  },
}));

export const WeeklyCheckBgItem = styled("div")<{ ischecked: string }>(
  ({ theme, ischecked }) => ({
    position: "relative",

    width: "2rem",
    height: "2rem",

    "&::before": {
      content: "' '",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",

      width: ischecked === "true" ? "1.875rem" : ".625rem",
      height: ischecked === "true" ? "1.875rem" : ".625rem",

      backgroundColor: theme.palette.background.paper,
      borderRadius: "100%",
    },
  })
);
