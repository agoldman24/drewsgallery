import {
  Button,
  Dialog,
  Grid,
  LinearProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { defaultTheme, gradientTextStyle, centeredTextStyle } from "../styles";

const inputRoot = {
  fontSize: "16px",
  fontFamily: "Signika",
  border: "2px solid white",
  borderRadius: "50px",
  width: "200px",
  opacity: "1",
  transitionProperty: "width, opacity",
  transitionDuration: "0.5s",
};

const styles = () => ({
  inputRoot: inputRoot,
  focusedInputRoot: {
    ...inputRoot,
    border: "2px solid " + defaultTheme.palette.primary.main,
  },
  hiddenInputRoot: {
    ...inputRoot,
    width: "0",
    opacity: "0",
  },
  inputInput: {
    padding: "3px 10px",
  },
  backdropRoot: {
    display: "none",
  },
  paper: {
    margin: "0",
    width: "100%",
    maxWidth: "none",
    borderRadius: "0",
    background: "none",
    boxShadow: "none",
  },
});

const NavigationBar = ({
  isFetching,
  fetchImageData,
  isNetworkFailure,
  isAboutPageDisplayed,
  setIsAboutPageDisplayed,
  classes,
}: {
  isFetching: boolean;
  fetchImageData: () => void;
  isNetworkFailure: boolean;
  isAboutPageDisplayed: boolean;
  setIsAboutPageDisplayed: Function;
  classes: any;
}) => {
  return (
    <Dialog
      open={true}
      style={{
        height: "fit-content",
        zIndex: "1301",
      }}
      classes={{
        paper: classes.paper,
      }}
      BackdropProps={{
        classes: {
          root: classes.backdropRoot,
        },
      }}
    >
      <Dialog
        open={true}
        style={{
          height: "fit-content",
          marginTop: "35px",
          zIndex: "1302",
        }}
        classes={{
          paper: classes.paper,
        }}
        BackdropProps={{
          classes: {
            root: classes.backdropRoot,
          },
        }}
      >
        {isNetworkFailure ? (
          <div
            className="clickable"
            onClick={fetchImageData}
            style={{
              width: "100%",
              textAlign: "center",
              color: "#ffffff",
              background: "#c40019",
            }}
          >
            <div
              style={{
                display: "inline-block",
                height: "100%",
                padding: "13px 5px",
              }}
            >
              Connection failed. Click to retry
            </div>
            <Refresh style={{ verticalAlign: "middle" }} />
          </div>
        ) : (
          <Grid container direction="column">
            <Grid
              container
              direction="row"
              style={{
                position: "fixed",
                padding: "0 10px",
                width: "100%",
                height: "45px",
                borderBottom: "1px solid " + defaultTheme.palette.primary.main,
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                }}
              >
                <Button
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    color: "#2c0063",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    fontWeight: "bold",
                    background: defaultTheme.gradient0,
                    borderRadius: "0",
                    padding: "8px 0 4px 0",
                  }}
                  onClick={() =>
                    window.open(
                      "https://pixels.com/profiles/andrew-goldman/shop"
                    )
                  }
                >
                  Click here to shop wall art
                </Button>
              </Grid>
              <Grid
                item
                style={{
                  padding: "3px 6px",
                  position: "fixed",
                }}
                className="clickable"
                onClick={() => setIsAboutPageDisplayed(false)}
              >
                <Typography
                  variant="h4"
                  style={{
                    float: "left",
                    fontWeight: "bold",
                    fontFamily: "Shadows Into Light",
                    ...gradientTextStyle(1),
                  }}
                >
                  Drew's
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    float: "left",
                    paddingLeft: "5px",
                    fontFamily: "Open Sans Condensed",
                    ...gradientTextStyle(2),
                  }}
                >
                  Gallery
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    position: "fixed",
                    right: "10px",
                    marginTop: "5px",
                    fontWeight: "bold",
                    fontFamily: "Signika",
                    fontSize: "16px",
                    ...gradientTextStyle(2),
                  }}
                  onClick={() => setIsAboutPageDisplayed(!isAboutPageDisplayed)}
                >
                  {isAboutPageDisplayed ? "Home" : "About"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        {isFetching && (
          <div>
            <LinearProgress
              style={{ position: "fixed", top: "80px", width: "100%" }}
            />
            <div style={centeredTextStyle}>Retrieving images...</div>
          </div>
        )}
      </Dialog>
    </Dialog>
  );
};

export default withStyles(styles)(NavigationBar);
