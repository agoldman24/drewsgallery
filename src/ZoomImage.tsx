import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ZoomImage({ data }: { data: { src: string } }) {
  return (
    <div
      style={{
        lineHeight: 0,
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TransformWrapper>
        <React.Fragment>
          <div style={{ cursor: "zoom-in" }}>
            <TransformComponent>
              <img
                src={data.src}
                style={{
                  height: "auto",
                  maxHeight: "100vh",
                  maxWidth: "100%",
                }}
              />
            </TransformComponent>
          </div>
        </React.Fragment>
      </TransformWrapper>
    </div>
  );
}
