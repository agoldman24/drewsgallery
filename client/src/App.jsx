import { Fragment, useState } from "react";
import "./index.css";
import { images } from "./images/images";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ZoomImage from "./ZoomImage";
import GalleryImage from "./GalleryImage";

const App = () => {
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
      <div
        style={{
          position: "fixed",
          top: "0",
          height: "calc(100% - 20px)",
          width: "calc(100% - 20px)",
          padding: 10,
          overflow: "auto",
        }}
      >
        <Gallery
          photos={images}
          margin={5}
          renderImage={(image) => (
            <GalleryImage
              image={image}
              key={image.photo.src}
              openLightbox={openLightbox}
            />
          )}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={images.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                  source: x.src,
                }))}
                components={{
                  View: (props) => <ZoomImage {...props} />,
                }}
                showNavigationOnTouchDevice={true}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </Fragment>
  );
};

export default App;