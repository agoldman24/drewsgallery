import { Fragment, useState, useCallback } from "react";
import "./index.css";
import { photos } from "./photos/photos";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

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
      <div
        style={{
          position: "fixed",
          top: "0",
          height: "100%",
          width: "calc(100% - 20px)",
          padding: 10,
        }}
      >
        <Gallery photos={photos} margin={10} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                  source: x.src,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </Fragment>
  );
};

export default App;