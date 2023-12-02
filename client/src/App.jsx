import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  defaultTheme,
  dialogStyles,
  galleryContainerStyle,
  modalStyle,
} from "./styles";
import Api from "./api/siteUrl";
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
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [mediums, setMediums] = useState(defaultMediums);

  useEffect(() => {
    Api.get("/getAllImages").then((res) => {
      const decodedImages = res.data.images.sort(
        (i1, i2) => i2.position - i1.position
      );
      setImages(decodedImages);
      setFilteredImages(decodedImages);
      setIsFetching(false);
    });
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
    setIsFilterOpen(false);
  };

  return (
    <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
      <GalaxyBackground />
      <NavigationBar
        isFetching={isFetching}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        keyword={keyword}
        setKeyword={setKeyword}
        mediums={mediums}
      />
      <div id="gallery" style={galleryContainerStyle} className="pswp-gallery">
        <Gallery
          photos={filteredImages.map((image) => ({
            ...image,
            width: image.size.width,
            height: image.size.height,
          }))}
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
        {isFilterOpen && (
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
