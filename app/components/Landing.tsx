import React from "react";
import img1 from "../../public/assets/landing/l_01.jpg";
import img2 from "../../public/assets/landing/l_02.jpg";
import img3 from "../../public/assets/landing/l_03.jpg";
import img4 from "../../public/assets/landing/l_04.jpg";
import img5 from "../../public/assets/landing/l_05.jpg";
import Image from "next/image";
import Search from "./navbar/Search";

function Landing() {
  return (
    <div className="homepage">
      <div className="homepage__content">
        <div className="homepage__left">
          <div className="homepage__left__content">
            <h1 className="homepage__title">
              Plongez dans un paradis tropical.
            </h1>
            <p className="homepage__description">
              Des trésors géologiques du Piton de la Fournaise aux récifs
              coralliens préservés, la Réunion regorge de merveilles à explorer.
            </p>
            <div className="homepage__cta">
              <button className="homepage__cta__book">
                <span>Réserver</span>
              </button>
              <button className="homepage__cta__discover">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path id="Vector" d="M0 0V20L15.7143 10L0 0Z" fill="white" />
                </svg>
                <span>Découvrir nos activités</span>
              </button>
            </div>
          </div>
        </div>
        <div className="homepage__right">
          <div className="homepage__right__grid">
            <div className="homepage__right__grid__top">
              {[img1, img2].map((img, index) => {
                return (
                  <div
                    className={`homepage__image homepage__image--${index}`}
                    key={index}
                  >
                    <Image
                      src={img}
                      alt={`Image ${index}`}
                      height={400}
                      width={400}
                    />
                  </div>
                );
              })}
            </div>
            {[img3, img4, img5].map((img, index) => {
              return (
                <div
                  className={`homepage__image homepage__image--${index + 2}`}
                  key={index}
                >
                  <Image
                    src={img}
                    alt={`Image ${index}`}
                    height={200}
                    width={200}
                  />
                </div>
              );
            })}
            {/* 
            <div className="homepage__right__grid__bottom">
              {[img3, img4, img5].map((img, index) => {
                return (
                  //   <picture className="homepage__image" key={index}>
                  <Image
                    className="homepage__image homepage__image--bottom"
                    key={index}
                    src={img}
                    alt={`Image ${index}`}
                    height={200}
                    width={200}
                  />
                  //   </picture>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
}

export default Landing;
