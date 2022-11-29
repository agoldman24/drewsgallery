import { useEffect, useState } from "react";
import { Dialog, withStyles } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { defaultTheme, galleryContainerStyle } from "./styles";
import { images } from "./data/images";
import { Medium } from "./data/types";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import GalaxyBackground from "./components/GalaxyBackground";
import ZoomImage from "./components/ZoomImage";
import GalleryImage from "./components/GalleryImage";
import NavigationBar from "./components/NavigationBar";
import FilterModal from "./components/FilterContent";

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
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [mediums, setMediums] = useState({
    [Medium.COLORED_PENCIL]: true,
    [Medium.ACRYLIC_PAINT]: true,
    [Medium.WATER_COLOR]: true,
    [Medium.INK]: true,
    [Medium.CHARCOAL]: true,
    [Medium.OIL_PASTEL]: true,
  });

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

  useEffect(() => {
    setFilteredImages(
      images.filter((image) =>
        Object.keys(mediums)
          .filter((m) => mediums[m])
          .includes(image.medium)
      )
    );
  }, [mediums]);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const closeFilter = () => {
    setFilterIsOpen(false);
  };

  return (
    <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
      <GalaxyBackground />
      <NavigationBar
        viewerIsOpen={viewerIsOpen}
        filterIsOpen={filterIsOpen}
        setFilterIsOpen={setFilterIsOpen}
        keyword={keyword}
        setKeyword={setKeyword}
        mediums={mediums}
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
        <div style={galleryContainerStyle}>
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
            {viewerIsOpen ? (
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
            ) : filterIsOpen ? (
              <Modal onClose={closeFilter} style={{ zIndex: "1303" }}>
                <FilterModal
                  mediums={mediums}
                  setMediums={setMediums}
                  closeFilter={closeFilter}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(App);
