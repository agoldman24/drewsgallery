import { useEffect, useState } from "react";
import { Dialog, withStyles } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { defaultTheme } from "./styles";
import "./index.css";
import { images } from "./images/images";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ZoomImage from "./components/ZoomImage";
import GalleryImage from "./components/GalleryImage";
import NavigationBar from "./components/NavigationBar";

const styles = () => ({
  root: {
    position: "initial",
  },
  backdropRoot: {
    background: "none",
  },
});

const App = ({ classes }) => {
  const [filteredImages, setFilteredImages] = useState(images);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword.length) {
      setFilteredImages(
        images.filter(
          (image) =>
            image.keywords.filter((k) => k.includes(keyword)).length > 0
        )
      );
    } else {
      setFilteredImages(images);
    }
  }, [keyword]);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  console.log("keyword:", keyword);
  return (
    <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
      <div id="stars0" />
      <div id="stars1" />
      <div id="stars2" />
      <section>
        <span className="shootingStar" />
        <span className="shootingStar" />
        <span className="shootingStar" />
        <span className="shootingStar" />
      </section>
      <img
        src="https://github.com/spite/CSS3DClouds/blob/master/smoke.png?raw=true"
        style={{ opacity: 0.2, width: "300%" }}
        className="cloud"
      />
      <NavigationBar
        viewerIsOpen={viewerIsOpen}
        keyword={keyword}
        setKeyword={(v) => setKeyword(v)}
      />
      <Dialog
        open={true}
        classes={{
          root: classes.root,
        }}
        BackdropProps={{
          classes: {
            root: classes.backdropRoot,
          },
        }}
      >
        <div
          style={{
            top: "45px",
            left: "0",
            width: "calc(100% - 10px)",
            height: "calc(100% - 55px)",
            position: "fixed",
            overflowY: "auto",
            padding: "5px",
          }}
        >
          <Gallery
            photos={filteredImages}
            renderImage={(image) => (
              <GalleryImage
                image={image}
                key={image.photo.src}
                openLightbox={openLightbox}
              />
            )}
            margin={5}
          />
          <ModalGateway>
            {viewerIsOpen && (
              <Modal onClose={closeLightbox} style={{ zIndex: "1303" }}>
                <Carousel
                  currentIndex={currentImage}
                  views={filteredImages.map((x) => ({ ...x, source: x.src }))}
                  components={{
                    View: (props) => <ZoomImage {...props} />,
                  }}
                  showNavigationOnTouchDevice={true}
                />
              </Modal>
            )}
          </ModalGateway>
        </div>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(App);
