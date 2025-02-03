import React from "react";

type RotatingImageProps = {
  imageSrc: string; // Путь к изображению
};

const RotatingImage: React.FC<RotatingImageProps> = ({ imageSrc, }) => (
  <div
    className=" animate-spin-slow"
  >
    <img src={imageSrc} alt="Rotating" className="w-[80px] h-[80px]" />
  </div>
);

export default RotatingImage;
