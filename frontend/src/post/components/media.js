import Flickity from "react-flickity-component";
import "./media.scss";

export default function Carousel({ media }) {
  const flickityOptions = {};

  return (
    <Flickity className="carousel" options={flickityOptions}>
      {media.map((item, index) => (
        <div className="carousel-cell" key={index}>
          <img src={item} alt="" />
        </div>
      ))}
    </Flickity>
  );
}
