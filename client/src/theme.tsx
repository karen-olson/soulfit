// import { createMuiTheme } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";


// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#e04ba7",
      light: "#f3aed8",
      dark: "#a80b6c",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ffffff",
      light: "#fdc55c",
      dark: "#d67d08",
    },
    text: {
      primary: "#fff",
      secondary: "#ffffff"
    },
    background: {
      paper: "#232429",
      default: "#fff",
    }
  },
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiLink: {
      defaultProps: {
        color: "primary.light"
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "primary"
      }
    }
  },
  // overrides: {
  //   MuiButton: {
  //     root: {

  //     }
  //   } 
  // }
  // typography: {
  //   fontFamily: "Comic Sans MS",
  //   body2: {
  //     fontFamily: "Times New Roman",
  //     fontSize: "1.1rem"
  //   }
  // },
  // shape: {
  //   borderRadius: 30
  // },
  // spacing: 8,
//   overrides: {
//     MuiFilledInput: {
//       root: {
//         backgroundColor: "green"
//       }
//     },
//     MuiInputLabel: {
//       root: {
//         backgroundColor: "yellow"
//       }
//     },
//     MuiTextField: {
//       root: {}
//     },
//     MuiButton: {
//       root: {
//         textTransform: "none",
//         padding: "20px"
//       },
//       fullWidth: {
//         maxWidth: "300px"
//       }
//     }
//   },
  // props: {
  //   MuiButton: {
  //     // disableRipple: true,
  //     variant: "contained",
  //     color: "primary"
  //   },
//     MuiCheckbox: {
//       disableRipple: true
//     },
//     MuiTextField: {
//       variant: "filled",
//       InputLabelProps: {
//         shrink: true
//       }
//     },
//     MuiPaper: {
//       elevation: 12
//     },
//     MuiCard: {
//       elevation: 12
//     }
//   }
});