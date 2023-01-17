import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  defaultTheme,
  dialogStyles,
  galleryContainerStyle,
  modalStyle,
} from "./styles";
import { images } from "./data/images";
import { defaultMediums } from "./data/types";
import Gallery from "react-photo-gallery";
import { Modal, ModalGateway } from "react-images";
import GalaxyBackground from "./components/GalaxyBackground";
import GalleryImage from "./components/GalleryImage";
import NavigationBar from "./components/NavigationBar";
import Filters from "./components/Filters";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
import "photoswipe/style.css";

const App = () => {
  const [filteredImages, setFilteredImages] = useState(images);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [mediums, setMediums] = useState(defaultMediums);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: PhotoSwipe,
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  useEffect(() => {
    if (keyword.length) {
      setMediums(defaultMediums);
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

  const closeFilter = () => {
    setFilterIsOpen(false);
  };

  return (
    <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
      <GalaxyBackground />
      <NavigationBar
        filterIsOpen={filterIsOpen}
        setFilterIsOpen={setFilterIsOpen}
        keyword={keyword}
        setKeyword={setKeyword}
        mediums={mediums}
      />
      <div id="gallery" style={galleryContainerStyle} className="pswp-gallery">
        <Gallery
          photos={filteredImages}
          renderImage={(image) => {
            return (
              <GalleryImage
                image={image}
                size={filteredImages[image.index].size}
                key={image.photo.src}
              />
            );
          }}
          margin={5}
        />
      </div>

      <ModalGateway>
        {filterIsOpen && (
          <Modal
            onClose={closeFilter}
            style={modalStyle}
            closeOnBackdropClick={false}
          >
            <Filters
              mediums={mediums}
              setMediums={setMediums}
              closeFilter={closeFilter}
            />
          </Modal>
        )}
      </ModalGateway>
    </MuiThemeProvider>
  );
};

export default withStyles(dialogStyles)(App);
