import React from "react";
import img1 from "../assets/img1.webp"
import img2 from "../assets/img2.webp"
import img3 from "../assets/img3.webp"
import img4 from "../assets/img4.webp"
import img5 from "../assets/img5.webp"
import img6 from "../assets/img6.webp"

const GalleryComp = () => {
  return (
    <div className="container">
      <h2 className="text-center">Gallery</h2>
      <div className="row align-items-center">
        <div className="col-lg-4 my-3">
          <img src={img1} className="gallery_image" alt="" />
        </div>
        <div className="col-lg-4 my-3">
          <img src={img2} className="gallery_image" alt="" />
        </div>
        <div className="col-lg-4 my-3">
          <img src={img3} className="gallery_image" alt="" />
        </div>
        <div className="col-lg-4 my-3">
          <img src={img4} className="gallery_image" alt="" />
        </div>
        <div className="col-lg-4 my-3">
          <img src={img5} className="gallery_image" alt="" />
        </div>
        <div className="col-lg-4 my-3">
          <img src={img6} className="gallery_image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default GalleryComp;
