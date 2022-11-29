import { useEffect, useState } from "react";
import {
  Dialog,
  Grid,
  Typography,
  InputBase,
  IconButton,
  withStyles,
} from "@material-ui/core";
import { Search, Close, FilterListRounded } from "@material-ui/icons";
import { defaultTheme, gradientTextStyle } from "../styles";

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
  },
});

const NavigationBar = ({
  viewerIsOpen,
  filterIsOpen,
  setFilterIsOpen,
  keyword,
  setKeyword,
  mediums,
  classes,
}: {
  viewerIsOpen: boolean;
  filterIsOpen: boolean;
  setFilterIsOpen: (isOpen: boolean) => void;
  keyword: string;
  setKeyword: (val: string) => void;
  mediums: { [key: string]: boolean };
  classes: any;
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (!isSearchVisible) {
      setIsSearchFocused(false);
    }
  }, [isSearchVisible]);

  return (
    <Dialog
      open={true}
      style={{
        height: "fit-content",
        zIndex: viewerIsOpen || filterIsOpen ? "0" : "1301",
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
          zIndex: viewerIsOpen || filterIsOpen ? "0" : "1302",
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
              padding: "3px 6px",
              position: "fixed",
              zIndex: isSearchVisible ? "0" : "1",
              opacity: isSearchVisible ? "0" : "1",
              transitionProperty: "opacity",
              transitionDuration: "0.5s",
            }}
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
          <Grid item style={{ margin: "auto 0 auto auto" }}>
            <InputBase
              id="searchInput"
              placeholder="Search..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
              classes={{
                root: !isSearchVisible
                  ? classes.hiddenInputRoot
                  : isSearchFocused
                  ? classes.focusedInputRoot
                  : classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              style={{ width: "fit-content" }}
              onClick={() => {
                if (isSearchVisible) {
                  document.getElementById("searchInput")?.blur();
                  setTimeout(() => setKeyword(""), 500);
                  setIsSearchVisible(false);
                } else {
                  document.getElementById("searchInput")?.focus();
                  setIsSearchVisible(true);
                  setIsSearchFocused(true);
                }
              }}
            >
              {isSearchVisible ? <Close /> : <Search />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              color={
                Object.values(mediums).includes(false) ? "primary" : "default"
              }
              onClick={() => {
                setIsSearchVisible(false);
                setKeyword("");
                setFilterIsOpen(true);
              }}
            >
              <FilterListRounded />
            </IconButton>
          </Grid>
        </Grid>
      </Dialog>
    </Dialog>
  );
};

export default withStyles(styles)(NavigationBar);
