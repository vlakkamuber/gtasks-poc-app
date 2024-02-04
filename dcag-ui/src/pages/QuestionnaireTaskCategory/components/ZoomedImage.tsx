import React,{useState} from 'react';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomableImage = ({imageUrl}) => {
  const [scale, setScale] = useState(1);
  const minScale = 1;
  const maxScale = 10;
  return (
      <TransformWrapper
        initialScale={minScale}
        minScale={minScale}
        maxScale={maxScale}
        onZoom={(ref) => {
          setScale(ref.state.scale);
        }}
        style={{width:'100%',height:'100%'}}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            {/* <div className="tools">
              <button disabled={scale >= maxScale} onClick={() => zoomIn()}>
                +
              </button>
              <button disabled={scale <= minScale} onClick={() => zoomOut()}>
                -
              </button>
            </div> */}
            <TransformComponent>
              <img src={imageUrl} alt="a kitten"  style={{width:'100%',height:'100%'}}/>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    );
};

export default ZoomableImage;
