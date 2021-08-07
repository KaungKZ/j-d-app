import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DHL from "../assets/DHL.png";
import { mapData } from "./BodyContent";
import { Share } from "./utils/ImportImg";
import { useInView } from "react-intersection-observer";
import { dateOptions } from "./BodyContent";

export default function Header({
  setShowDataContent,
  selectedValues,
  setSelectedValues,
  setIsHeaderInView,
  dataRef,
  compareRef,
}) {
  const [compareBtnDisabled, setcompareBtnDisabled] = useState(true);
  const [showDeselectWarning, setShowDeselectWarning] = useState(false);
  const [innerSelectedValues, setInnerSelectedValues] = useState({
    ...selectedValues,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (innerSelectedValues.countries.length === 2) {
      setcompareBtnDisabled(false);
    } else {
      setcompareBtnDisabled(true);
    }
  }, [innerSelectedValues.countries]);

  useEffect(() => {
    if (inView) {
      setIsHeaderInView(true);
    } else {
      setIsHeaderInView(false);
    }
  }, [inView, setIsHeaderInView]);

  useEffect(() => {
    setInnerSelectedValues({ ...selectedValues });
  }, [selectedValues]);

  function handleOnClickCountry(e, map) {
    const isExist = innerSelectedValues.countries.includes(
      e.currentTarget.dataset.map
    );

    if (innerSelectedValues.countries.length >= 2 && !isExist) {
      setShowDeselectWarning(true);
      setTimeout(() => {
        setShowDeselectWarning(false);
      }, 2000);
      return;
    }

    if (isExist) {
      e.target.src = map.img;
      setInnerSelectedValues({
        ...innerSelectedValues,
        countries: innerSelectedValues.countries.filter(
          (c) => c !== e.currentTarget.dataset.map
        ),
      });
    } else {
      e.target.src = map.hoveredImg;
      setInnerSelectedValues({
        ...innerSelectedValues,
        countries: [
          ...innerSelectedValues.countries,
          e.currentTarget.dataset.map,
        ],
      });
    }
  }

  // console.log(innerSelectedValues.countries);

  function handleOnCompareClick() {
    setSelectedValues(innerSelectedValues);

    setShowDataContent(true);
    setTimeout(() => {
      if (dataRef.current) {
        dataRef.current.scrollIntoView({
          block: "end",
          behavior: "smooth",
          inline: "nearest",
        });
      }
    }, 100);
  }

  function handleOnChangeDate(e) {
    setInnerSelectedValues({
      ...innerSelectedValues,
      date: e.target.value,
    });
  }

  return (
    <div className="header" ref={ref}>
      <div className="header__sticky-wrapper">
        <div className="header__sticky uk-flex uk-flex-between uk-flex-middle uk-width-5-6 uk-margin-auto uk-height-1-1">
          <div className="header__left uk-flex uk-flex-bottom">
            <a href="/#" className="header__link-logo uk-margin-small-right">
              <img src={DHL} alt="logo" />
            </a>
            <div className="header__text uk-text-bold">
              Global Trade Barometer
            </div>
          </div>

          <div className="header__share">
            <a href="/#">
              <img src={Share} alt="share" />
            </a>
          </div>
        </div>
      </div>

      <div className="header__content">
        <div className="placeholder-wrapper uk-width-1-1">
          <div className="placeholder uk-width-3-4 uk-margin-auto">
            <h4 className="placeholder__main-text">GLOBAL TRADE</h4>
            <h2 className="placeholder__main-text uk-text-bold">
              COUNTRY COMPARATOR
            </h2>
            <h4 className="placeholder__sub-text">
              Select between 2 countries and the reporting period to compare
              trade indexes.
            </h4>
          </div>
        </div>
        <div className="map uk-margin-large-top uk-width-1-1 uk-position-relative">
          <div className="map__container uk-margin-auto uk-position-relative">
            {mapData.map((map, i) => {
              return (
                <div
                  className={`uk-position-absolute map__${map.className} map__country`}
                  onClick={(e) => handleOnClickCountry(e, map)}
                  key={i}
                  data-map={`${map.alt}-${map.className}`}
                  uk-tooltip={`title: ${map.alt}; pos: top`}
                >
                  <img
                    src={
                      selectedValues.countries.find(
                        (c) => c === `${map.alt}-${map.className}`
                      )
                        ? map.hoveredImg
                        : map.img
                    }
                    alt={map.alt}
                    width={map.width}
                  />
                  <img
                    src={map.countryIcon}
                    alt="country-flag"
                    className={`uk-position-absolute map__flag-${map.className} map__flag`}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="compare uk-card uk-margin-auto uk-flex uk-flex-center uk-position-relative"
            ref={compareRef}
          >
            <div className="compare__container uk-flex uk-flex-middle uk-padding-small uk-position-z-index">
              <div className="compare__text">Reporting Period</div>
              <div className="compare__dropdown">
                <FormControl variant="outlined" style={{ minWidth: 300 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={dateOptions[0]}
                    className="compare__select"
                    onChange={handleOnChangeDate}
                  >
                    {dateOptions.map((d, i) => {
                      return (
                        <MenuItem
                          value={d}
                          data-value={d.replace(/\s/gi, "-").toLowerCase()}
                          key={i}
                        >
                          {d}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="compare__submit">
                <button
                  className={`uk-button ${
                    compareBtnDisabled ? "disabled" : "active"
                  }`}
                  type="button"
                  disabled={compareBtnDisabled}
                  onClick={handleOnCompareClick}
                >
                  Compare Data
                </button>
              </div>
            </div>
            <div
              className={`map__error uk-position-absolute uk-position-top-center uk-display-inline ${
                showDeselectWarning ? "active" : ""
              }`}
            >
              <span className="map__error-text">
                Deselect one country before selecting another
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
