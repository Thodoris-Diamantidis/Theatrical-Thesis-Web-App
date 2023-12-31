import { Theme, createStyles } from "@material-ui/core/styles";

const navbarStyle = (theme: Theme) =>
  createStyles({
    navbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    search: {
      backgroundColor: theme.palette.background.default,
      width: "70%",
      display: "flex",
      maxWidth: 580,
      margin: "auto",
    },
    searchInput: {
      "&:focus": {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
      paddingLeft: 10,
      paddingRight: 10,
      border: `1px solid ${theme.palette.primary.light}`,
    },
    searchRoot: {
      width: "100%",
    },
    searchIcon: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: 0,
      padding: 0,
    },
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    loginButton: {
      textTransform: "none",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark, // Border on focus
      },
    },
    profileButton: {
      textTransform: "none",
    },
    logoutButton: {
      textTransform: "none",
    },
    popOverModal: {
      padding: "5px",
    },
  });

export default navbarStyle;
