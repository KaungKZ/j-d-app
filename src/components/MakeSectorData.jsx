import React, { useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";
import { useInView } from "react-intersection-observer";

export default function MakeSectorData({ selectedMonth, selectedValues }) {
  const sectorTitles = [
    "Basic Raw Materials",
    "Capital Equip. & Machinery",
    "Chemicals & Products",
    "Consumer Fashion Goods",
    "High Technology",
    "Industrial Raw Materials",
    "Land Vehicles & Parts",
    "Machinery Parts",
    "Personal & Household Goods",
    "Temp. or Climate Control",
  ];

  const { ref, inView } = useInView({
    threshold: 0,
  });
  function move(e) {
    let i = 0;
    if (i === 0) {
      i = 1;
      var elem = document.querySelectorAll(".sector__progress");

      const _elem = [...elem].find(
        (one) =>
          one.dataset.progress === e.target.childNodes[0].dataset.progress
      );

      const value = Math.floor(Math.random() * 100) + 1;

      _elem.childNodes[0].innerHTML = value;

      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= value) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          _elem.style.width = width + "%";
        }
      }
    }
  }

  useEffect(() => {
    if (inView && (selectedMonth || selectedMonth === 0) && selectedValues) {
      document
        .querySelectorAll(".sector__progress-wrapper")
        .forEach((one) => one.click());
    }
  }, [inView, selectedMonth, selectedValues]);

  return (
    <div className="sector uk-width-5-6 uk-margin-auto" ref={ref}>
      <div className="sector__title uk-text-bold uk-text-medium uk-text-uppercase">
        Sector Developments
      </div>

      {sectorTitles.map((v, i) => {
        return (
          <div
            className="sector__country-trade uk-flex sector__progress-container uk-position-relative"
            key={i}
          >
            <div className="sector__progress-title uk-position-absolute uk-text-small">
              {v}
            </div>

            <div
              className="uk-width-1-2 left sector__progress-wrapper"
              onClick={(e) => move(e)}
            >
              <div className="sector__progress left" data-progress={uuid_v4()}>
                <div className="sector__progress-data uk-position-absolute left"></div>
              </div>
            </div>

            <hr className="uk-divider-vertical uk-margin-remove"></hr>

            <div
              className="uk-width-1-2 right sector__progress-wrapper"
              onClick={(e) => move(e)}
            >
              <div className="sector__progress right" data-progress={uuid_v4()}>
                <div className="sector__progress-data uk-position-absolute right"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
