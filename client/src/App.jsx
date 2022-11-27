import { Fragment, useState } from "react";
import { Dialog, withStyles } from "@material-ui/core";
import "./index.css";
import { images } from "./images/images";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ZoomImage from "./ZoomImage";
import GalleryImage from "./GalleryImage";

const styles = () => ({
  root: {
    position: "initial",
  },
  backdropRoot: {
    background: "none",
  },
});

const App = ({ classes }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <Fragment>
      <div id="stars0"></div>
      <div id="stars1"></div>
      <div id="stars2"></div>
      <section>
        <span className="shootingStar"></span>
        <span className="shootingStar"></span>
        <span className="shootingStar"></span>
        <span className="shootingStar"></span>
      </section>
      <img
        src="https://github.com/spite/CSS3DClouds/blob/master/smoke.png?raw=true"
        style={{ opacity: 0.2, width: "300%" }}
        className="cloud"
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
            top: "0",
            left: "0",
            width: "calc(100% - 10px)",
            height: "calc(100% - 10px)",
            position: "fixed",
            overflowY: "auto",
            padding: "5px",
          }}
        >
          <Gallery
            photos={images}
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
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={images.map((x) => ({ ...x, source: x.src }))}
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
    </Fragment>
  );
};

export default withStyles(styles)(App);
