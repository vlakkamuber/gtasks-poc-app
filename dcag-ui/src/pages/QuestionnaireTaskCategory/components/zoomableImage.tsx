import React, { useEffect, useRef } from 'react';

const CanvasImage = ({ imageUrl, canvasWidth, canvasHeight }) => {
  const canvasContainerRef = useRef();

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const containerAspectRatio = canvasWidth / canvasHeight;

      if (aspectRatio > containerAspectRatio) {
        // Image is wider, scale based on width
        const scaleFactor = canvasWidth / image.width;
        image.style.width = '100%';
        image.style.height = 'auto';
        canvasContainer.style.overflow = 'visible'; // Allow overflow to display entire image
        canvasContainer.style.height = 'auto';
        canvasContainer.style.width = 'auto';
      } else {
        // Image is taller, scale based on height
        const scaleFactor = canvasHeight / image.height;
        image.style.width = 'auto';
        image.style.height = '30vh';
        canvasContainer.style.overflow = 'visible'; // Allow overflow to display entire image
        canvasContainer.style.width = 'auto';
        canvasContainer.style.height = 'auto';
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
        margin: '0 auto',
      }}
    />
  );
};

export default CanvasImage;
