import React from "react";
import {
  DE,
  CN,
  US,
  UK,
  KR,
  JP,
  IN,
  DEOn,
  CNOn,
  USOn,
  UKOn,
  KROn,
  JPOn,
  INOn,
  Home,
  HomeOn,
  Compare,
  CompareOn,
  info,
  infoOn,
  Globe,
  GlobeOn,
} from "./utils/ImportImg";
export default function Navbar() {
  const NavLinks = [
    {
      img: Home,
      hoveredImg: HomeOn,
      alt: "Home",
      data: "Home",
    },
    {
      img: Compare,
      hoveredImg: CompareOn,
      alt: "Compare",
      data: "Compare",
    },
    {
      img: Globe,
      hoveredImg: GlobeOn,
      alt: "Globe",
      data: "Globe",
    },
    {
      img: CN,
      hoveredImg: CNOn,
      alt: "CN",
      data: "CN",
    },
    {
      img: DE,
      hoveredImg: DEOn,
      alt: "DE",
      data: "DE",
    },
    {
      img: IN,
      hoveredImg: INOn,
      alt: "IN",
      data: "IN",
    },
    {
      img: JP,
      hoveredImg: JPOn,
      alt: "JP",
      data: "JP",
    },
    {
      img: KR,
      hoveredImg: KROn,
      alt: "KR",
      data: "KR",
    },
    {
      img: UK,
      hoveredImg: UKOn,
      alt: "UK",
      data: "UK",
    },
    {
      img: US,
      hoveredImg: USOn,
      alt: "US",
      data: "US",
    },
    {
      img: info,
      hoveredImg: infoOn,
      alt: "Information",
      data: "Information",
    },
  ];

  return (
    <>
      <div className="navbar__mobile">
        <button className="navbar__mobile-button uk-flex uk-flex-center uk-flex-middle">
          &#9776;
        </button>
      </div>
      <nav id="left-bar" className="uk-navbar navbar">
        <ul className="uk-nav uk-nav-default uk-width-1-1 uk-flex uk-flex-column navbar__ul">
          <li>
            <a
              href="/#"
              className="uk-flex-center navbar__hamburger uk-flex uk-flex-center uk-flex-middle"
            >
              &#9776;
            </a>
          </li>
          {NavLinks.map((link, i) => {
            return (
              <li key={i}>
                <a
                  href="#Menu1"
                  className="uk-flex-center navbar__link"
                  data-uk-smooth-scroll
                  onMouseEnter={(e) => {
                    if (e.target.childNodes[0]) {
                      e.target.childNodes[0].src = link.hoveredImg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (e.target.childNodes[0]) {
                      e.target.childNodes[0].src = link.img;
                    }
                  }}
                >
                  <img
                    src={link.img}
                    alt={link.alt}
                    className="navbar__image"
                    data-flag={link.data}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
