import React, { useRef } from 'react';

const ResizedImage: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const imgref = useRef();

  const imageOnload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;
    canvas.width = 200;
    canvas.height = 50;
    let scale_factor = Math.min(canvas.width / img.width, canvas.height / img.height);
    let newWidth = img.width * scale_factor;
    let newHeight = img.height * scale_factor;
    let x = canvas.width / 2 - newWidth / 2;
    let y = canvas.height / 2 - newHeight / 2;
    ctx.drawImage(img, x, y, newWidth, newHeight);
    const dataURI = canvas.toDataURL();
    img.src = dataURI;
  };

  return (
    <>
      <img src={imgUrl} onLoad={imageOnload} ref={imgref} />
    </>
  );
};

export default ResizedImage;
