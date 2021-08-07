import React, { useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";
import { useInView } from "react-intersection-observer";

export default function MakeTradeData({ selectedMonth, selectedValues }) {
  const tradeTitles = ["Country Trade", "Air Trade", "Ocean Trade"];
  const { ref, inView } = useInView({
    threshold: 0,
  });

  function move(e) {
    let i = 0;
    if (i === 0) {
      i = 1;
      var elem = document.querySelectorAll(".trade__progress");

      const _elem = [...elem].find(
        (one) =>
          one.dataset.progress === e.target.childNodes[0].dataset.progress
      );

      const value = Math.floor(Math.random() * 100) + 1;

      _elem.childNodes[0].innerHTML = value;

      // const _total = value * 2;

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
        .querySelectorAll(".trade__progress-wrapper")
        .forEach((one) => one.click());
    }
  }, [inView, selectedMonth, selectedValues]);

  return (
    <div className="trade uk-width-5-6 uk-margin-auto" ref={ref}>
      <div className="trade__title uk-text-bold uk-text-medium uk-text-uppercase">
        Trade Indexes
      </div>

      {tradeTitles.map((v, i) => {
        return (
          <div
            className="trade__country-trade uk-flex trade__progress-container uk-position-relative"
            key={i}
          >
            <div className="trade__progress-title uk-position-absolute uk-text-small">
              {v}
            </div>

            <div
              className="uk-width-1-2 left trade__progress-wrapper"
              onClick={(e) => move(e)}
            >
              <div className="trade__progress left" data-progress={uuid_v4()}>
                <div className="trade__progress-data uk-position-absolute left"></div>
              </div>
            </div>

            <hr className="uk-divider-vertical uk-margin-remove"></hr>

            <div
              className="uk-width-1-2 right trade__progress-wrapper"
              onClick={(e) => move(e)}
            >
              <div className="trade__progress right" data-progress={uuid_v4()}>
                <div className="trade__progress-data uk-position-absolute right"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
