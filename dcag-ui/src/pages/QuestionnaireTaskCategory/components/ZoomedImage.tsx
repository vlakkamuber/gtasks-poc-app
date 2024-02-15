import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useAnalytics from '../../../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../../../constants/constant';
import { debounce } from '../../../utils/mapTeluguDigitsToNumeric';
import useDebounce from '../../../hooks/useDebounce';
import FullScreenIcon from './FullScreenIcon';
import CanvasImage from './zoomableImage';

const ZoomableImage = ({ imageUrl, taskId, location, taskType, isFullscreen, setIsFullscreen }) => {
  const [scale, setScale] = useState(1);
  const { t } = useTranslation();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });
  const toggleFullscreen = () => {
    logEvent({
      actions: isFullscreen ? 'click_close_full_screen' : 'click_open_full_screen',
      properties: taskId
    });
    setIsFullscreen(!isFullscreen);
  };

  const minScale = 1;
  const maxScale = 10;
  const logZoom = useDebounce(logEvent, 500);
  // if (isFullscreen) {
  //   return (
  //     <div className="fullscreen-container">
  //       <div className="fullscreen-image">
  //         <img src={imageUrl} alt="a kitten" />
  //         <Button onClick={toggleFullscreen} shape={SHAPE.pill} kind={KIND.secondary}>
  //           {t(`dcag.tasks.closeBtn.label`)}
  //         </Button>
  //         {/* <button  className="close-button">

  //         </button> */}
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <TransformWrapper
      initialScale={minScale}
      minScale={minScale}
      maxScale={maxScale}
      onZoom={(ref) => {
        const actions = ref.state.scale > scale ? 'zoomin' : 'zoomout';
        logZoom({ actions, properties: taskId });
        setScale(ref.state.scale);
      }}
      style={{ width: '100%', height: '100%' }}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="task-type-overlay">
            <p style={{ margin: '6px', fontWeight: '600' }}>
              {' '}
              {(location === 'HYDERABAD' || location === 'CHENNAI') &&
              (taskType === 'IMAGE_LABELLING' || taskType === 'MENU_PHOTO_REVIEW')
                ? t(`dcag.tasks.${taskType}.CHENNAI_HYD.title`)
                : t(`dcag.tasks.${taskType}.title`)}
            </p>
          </div>
          <div className="image-icon-overlay">
            <div onClick={toggleFullscreen}>
              <FullScreenIcon />
            </div>
            <div className="zoom-icon-container">
              <img src="assets/zoom-in.png" />
            </div>
          </div>
          <TransformComponent>
            <img src={imageUrl} alt="task image" style={{ width: '100%', height: isFullscreen ? "70vh" : '30vh' }} />
            {/* <CanvasImage
              imageUrl={imageUrl}
              canvasWidth={300}
              canvasHeight={400}
              style={{ width: '100%', height: '100%' }}
            /> */}
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default ZoomableImage;
