import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomableImage = ({imageUrl}) => {
  const [scale, setScale] = useState(1);
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  const minScale = 1;
  const maxScale = 10;
  if (isFullscreen) {
    return (
      <div className="fullscreen-container">
        <div className="fullscreen-image">
          <img src={imageUrl} alt="a kitten" />
          <button onClick={toggleFullscreen} className="close-button">
            {t(`dcag.tasks.closeBtn.label`)}
          </button>
        </div>
      </div>
    );
  }
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
            <button onClick={toggleFullscreen} className="fullscreen-button">
            {t('dcag.tasks.text.fullscreen')}
                </button>
          </React.Fragment>
        )}
      </TransformWrapper>
    );
};

export default ZoomableImage;
