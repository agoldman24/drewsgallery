import { useEffect, useState } from "react";
import { withStyles, Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  defaultTheme,
  dialogStyles,
  galleryContainerStyle,
  galleryContainerStyle1,
} from "./styles";
import Api from "./api/siteUrl";
import { defaultMediums } from "./data/types";
import Gallery from "react-photo-gallery";
import GalaxyBackground from "./components/GalaxyBackground";
import GalleryImage from "./components/GalleryImage";
import NavigationBar from "./components/NavigationBar";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
import "photoswipe/style.css";
import Mediums from "./components/Mediums";

const App = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isNetworkFailure, setIsNetworkFailure] = useState(false);
  const [mediums, setMediums] = useState(defaultMediums);
  const [isAboutPageDisplayed, setIsAboutPageDisplayed] = useState(false);

  useEffect(() => {
    fetchImageData();
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
    setFilteredImages(
      images.filter((image) =>
        Object.keys(mediums)
          .filter((m) => mediums[m])
          .includes(image.medium)
      )
    );
  }, [mediums]);

  const fetchImageData = () => {
    setIsNetworkFailure(false);
    setIsFetching(true);
    Api.get("/getAllImages")
      .then((res) => {
        const decodedImages = res.data.images.sort(
          (i1, i2) => i2.position - i1.position
        );
        setImages(decodedImages);
        setFilteredImages(
          decodedImages.filter((image) =>
            Object.keys(mediums)
              .filter((m) => mediums[m])
              .includes(image.medium)
          )
        );
        setIsFetching(false);
      })
      .catch(() => {
        setIsNetworkFailure(true);
        setIsFetching(false);
      });
  };

  return (
    <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
      <GalaxyBackground />
      <NavigationBar
        isFetching={isFetching}
        fetchImageData={fetchImageData}
        isNetworkFailure={isNetworkFailure}
        isAboutPageDisplayed={isAboutPageDisplayed}
        setIsAboutPageDisplayed={setIsAboutPageDisplayed}
      />
      {!isAboutPageDisplayed && (
        <Mediums mediums={mediums} setMediums={setMediums} />
      )}
      <div
        id="gallery"
        style={
          isAboutPageDisplayed ? galleryContainerStyle1 : galleryContainerStyle
        }
        className="pswp-gallery"
      >
        {isAboutPageDisplayed ? (
          <Grid
            container
            direction="column"
            style={{
              padding: "15px",
            }}
          >
            <Grid container direction="row">
              <Grid container direction="column" style={{ width: "130px" }}>
                <Grid item>
                  <img src={require("./data/andrew.jpeg")} width="130px"></img>
                </Grid>
                <Grid
                  item
                  style={{
                    paddingTop: "10px",
                    color: "#ffffff",
                    fontFamily: "Signika",
                    fontSize: "20px",
                  }}
                >
                  Phone:
                </Grid>
                <Grid
                  item
                  style={{
                    color: "#56d8fc",
                    fontFamily: "Signika",
                    fontSize: "20px",
                  }}
                >
                  703-945-5509
                </Grid>
                <Grid
                  item
                  style={{
                    paddingTop: "5px",
                    color: "#ffffff",
                    fontFamily: "Signika",
                    fontSize: "20px",
                  }}
                >
                  Email:
                </Grid>
                <Grid
                  item
                  style={{
                    color: "#56d8fc",
                    fontFamily: "Signika",
                    fontSize: "20px",
                  }}
                >
                  abg@vt.edu
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  color: defaultTheme.palette.primary.main,
                  paddingBottom: "15px",
                  width: "calc(100% - 130px)",
                  paddingLeft: "15px",
                  fontFamily: "Signika",
                }}
              >
                <div>
                  Andrew Goldman is an acrylic painter
                  based in Arlington, Virginia. He found his love for painting as
                  a child and continues to bring his visions to life on canvas
                  using bright colors and vibrant impressions of nature. Andrew is open to commissions for original artwork, murals, and logo designs. Fine art prints of his works can be purchased at{" "}
                  <b
                    className="clickable"
                    style={{ color: "#56d8fc" }}
                    onClick={() =>
                      window.open(
                        "https://pixels.com/profiles/andrew-goldman/shop"
                      )
                    }
                  >
                    https://pixels.com/profiles/andrew-goldman/shop
                  </b>
                </div>
              </Grid>
            </Grid>
          </Grid>
        ) : (
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
        )}
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(dialogStyles)(App);
