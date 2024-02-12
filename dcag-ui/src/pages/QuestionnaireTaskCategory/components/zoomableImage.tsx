import React, { useEffect, useRef } from 'react';

const CanvasImage = ({ imageUrl, canvasWidth, canvasHeight }) => {
  const canvasContainerRef = useRef();

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const newWidth = canvasContainer.offsetWidth;
      const newHeight = newWidth / aspectRatio;

      image.style.width = newWidth + 'px';
      image.style.height = newHeight + 'px';

      if (newHeight < canvasContainer.offsetHeight) {
        const offset = (canvasContainer.offsetHeight - newHeight) / 2;
        image.style.marginTop = offset + 'px';
      }

      canvasContainer.appendChild(image);
    };
  }, [imageUrl]);

  return (
    <div
      ref={canvasContainerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: canvasWidth + 'px',
        height: canvasHeight + 'px',
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        margin: '0 auto'
      }}
    />
  );
};

export default CanvasImage;
