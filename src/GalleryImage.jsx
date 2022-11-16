import { useState } from "react";

export default function GalleryImage({ image, openLightbox }) {
  const [isLoading, setIsLoading] = useState(true);
  const { photo, index, margin } = image;
  const { height, width } = photo;
  return (
    <div style={{ height, width, margin, cursor: "pointer" }}>
      <img
        {...photo}
        style={{
          borderRadius: "10px",
          opacity: isLoading ? 0 : 1,
        }}
        onLoad={() => setIsLoading(false)}
        onClick={() => openLightbox(index)}
      />
      {isLoading && (
        <div
          style={{
            position: "relative",
            width: "100%",
            marginTop: -height / 1.7,
            textAlign: "center",
          }}
        >
          <img
            src={require("./spinner.gif")}
            style={{
              width: "50px",
            }}
          />
        </div>
      )}
    </div>
  );
}
