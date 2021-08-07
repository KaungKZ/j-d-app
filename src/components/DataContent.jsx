import React, { useState, useEffect } from "react";
import leftLine from "../assets/left-line-date.png";
import middleLine from "../assets/middle-line-date.png";
import rightLine from "../assets/right-line-date.png";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { mapData } from "./BodyContent";
import MakeTradeData from "./MakeTradeData";
import MakeSectorData from "./MakeSectorData";
import { useInView } from "react-intersection-observer";
import Change from "../assets/change-mobile.png";

const lines = [leftLine, middleLine, rightLine];

export default function DataContent({
  selectedValues,
  setSelectedValues,
  isHeaderInView,
  dataRef,
  compareRef,
}) {
  const [monthsDiff, setMonthsDiff] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(2);
  const [firstCountry, setFirstCountry] = useState({});
  const [secondCountry, setSecondCountry] = useState({});
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [isSmallSize, setIsSmallSize] = useState(window.innerWidth <= 1024);
  const [monthButtonDisabled, setMonthButtonDisabled] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    const [start, end] = selectedValues.date.split("-");

    var dateStart = moment(new Date(start));
    var dateEnd = moment(new Date(end));

    const interim = dateStart.clone();
    let timeValues = [];
    while (dateEnd > interim || interim.format("M") === dateEnd.format("M")) {
      timeValues.push(interim.format("YYYY-MMMM"));
      interim.add(1, "month");
    }

    setMonthsDiff(timeValues);

    setFirstCountry(
      mapData.find(
        (d) => d.className === selectedValues.countries[0].split("-")[1]
      )
    );
    setSecondCountry(
      mapData.find(
        (d) => d.className === selectedValues.countries[1].split("-")[1]
      )
    );
  }, [selectedValues]);

  function handleScreenResize() {
    if (window.innerWidth <= 1024) {
      setIsSmallSize(true);
    } else {
      setIsSmallSize(false);
    }
  }

  function handleOnClickMonth(e, i) {
    setMonthButtonDisabled(true);

    setTimeout(() => {
      setMonthButtonDisabled(false);
    }, 1000);
    setSelectedMonth(i);
    if (dataRef.current) {
      dataRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
        inline: "nearest",
      });
    }
  }

  function handleClickAdjustMobile() {
    if (compareRef.current) {
      compareRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
        inline: "nearest",
      });
    }
  }

  // console.log(selectedValues);

  return (
    <div className="data">
      <div className="comparator-observer" ref={ref}></div>
      {!isSmallSize ? (
        <div className="data__month-indicator uk-flex uk-position-relative uk-flex-center">
          {monthsDiff.map((m, i) => {
            return (
              <div
                className="data__month data__first-month uk-position-relative"
                key={i}
              >
                <span
                  className={`uk-position-absolute data__line data__line-${
                    i + 1
                  }`}
                >
                  <img src={lines[i]} alt="" />
                </span>
                <button
                  className={`uk-button data__button data__button-${
                    i + 1
                  } uk-position-z-index ${
                    i === selectedMonth ? "active" : ""
                  } ${monthButtonDisabled ? "disabled" : ""}`}
                  onClick={(e) => handleOnClickMonth(e, i)}
                >
                  {m.split("-")[1]}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="data__month-indicator-mobile uk-margin-medium-top">
          <h3 className="uk-text-bold">
            {monthsDiff[selectedMonth] ? monthsDiff[selectedMonth] : ""}
          </h3>
        </div>
      )}

      <div className="data__detail uk-margin-large-top uk-flex uk-width-3-4 uk-margin-auto">
        <div className="data__detail-left uk-width-1-4 uk-flex uk-flex-column uk-flex-between">
          <div className="data__detail-country-container">
            <div className="data__detail-map uk-position-relative">
              <img src={firstCountry.img} alt={firstCountry.alt} />
              <img
                src={firstCountry.countryIcon}
                alt={firstCountry.alt}
                className="uk-position-absolute uk-position-center"
              />
            </div>
            <div className="data__detail-country uk-text-bold uk-margin-medium-top">
              {selectedValues.countries[0].split("-")[0]}
            </div>
          </div>

          <div className="data__detail-button-container">
            <button className="uk-button data__detail-button data__detail-left-button">
              View Report
            </button>
          </div>
        </div>
        <div className="data__detail-middle-mobile uk-flex uk-flex-center">
          <h4 className="uk-text-bold">Vs</h4>
        </div>
        <div className="data__detail-middle uk-width-1-2" ref={dataRef}>
          <MakeTradeData
            selectedMonth={selectedMonth}
            inView={inView}
            selectedValues={selectedValues}
          />
          <MakeSectorData
            selectedMonth={selectedMonth}
            inView={inView}
            selectedValues={selectedValues}
          />
        </div>
        <div className="data__detail-right uk-width-1-4 uk-flex uk-flex-column uk-flex-between">
          <div className="data__detail-country-container">
            <div className="data__detail-map uk-position-relative">
              <img src={secondCountry.img} alt={secondCountry.alt} />
              <img
                src={secondCountry.countryIcon}
                alt={secondCountry.alt}
                className="uk-position-absolute uk-position-center"
              />
            </div>
            <div className="data__detail-country uk-text-bold uk-margin-medium-top">
              {selectedValues.countries[1].split("-")[0]}
            </div>
          </div>
          <div className="data__detail-button-container">
            <button className="uk-button data__detail-button data__detail-right-button">
              View Report
            </button>
          </div>
        </div>
      </div>
      <div className="data__button-container-mobile uk-width-3-4 uk-flex uk-flex-between uk-flex-column">
        <button className="uk-button data__button-mobile uk-text-bold">
          View {firstCountry.alt} Report
        </button>

        <button className="uk-button data__button-mobile uk-text-bold">
          View {secondCountry.alt} Report
        </button>
      </div>
      {!isSmallSize
        ? !inView &&
          !isHeaderInView && (
            <div className="comparator uk-width-1-1">
              <div className="comparator__container uk-width-5-6 uk-margin-auto-left uk-flex uk-flex-between uk-flex-middle">
                <div className="comparator__title uk-text-bold">
                  Country Comparator
                </div>
                <div className="comparator__first-country">
                  <FormControl variant="outlined" style={{ minWidth: 300 }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={
                        mapData.filter((d) => d.alt === firstCountry.alt)[0]
                          ?.alt ?? ""
                      }
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      className="compare__select"
                      onChange={(e) => {
                        let arr = [...selectedValues.countries];

                        var index = arr.indexOf(
                          `${firstCountry.alt}-${firstCountry.className}`
                        );

                        if (index !== -1) {
                          arr[index] = e.currentTarget.dataset.map;
                        }

                        setSelectedValues({
                          ...selectedValues,
                          countries: arr,
                        });
                      }}
                    >
                      {mapData.map((m) => {
                        return (
                          <MenuItem
                            value={m.alt}
                            data-map={`${m.alt}-${m.className}`}
                            key={m.className}
                            disabled={m.alt === secondCountry.alt}
                          >
                            <span>
                              <img
                                src={m.countryIcon}
                                alt=""
                                style={{ width: "32px", height: "32px" }}
                                className="uk-margin-small-right"
                              />
                            </span>
                            {m.alt}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="comparator__vs">
                  <div className="comparator__vs-title">Vs</div>
                </div>
                <div className="comparator__second-country">
                  <FormControl variant="outlined" style={{ minWidth: 300 }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={
                        mapData.filter((d) => d.alt === secondCountry.alt)[0]
                          ?.alt ?? ""
                      }
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      className="compare__select"
                      onChange={(e) => {
                        let arr = [...selectedValues.countries];

                        var index = arr.indexOf(
                          `${secondCountry.alt}-${secondCountry.className}`
                        );

                        if (index !== -1) {
                          arr[index] = e.currentTarget.dataset.map;
                        }

                        setSelectedValues({
                          ...selectedValues,
                          countries: arr,
                        });
                      }}
                    >
                      {mapData.map((m) => {
                        return (
                          <MenuItem
                            value={m.alt}
                            data-map={`${m.alt}-${m.className}`}
                            key={m.className}
                            disabled={m.alt === firstCountry.alt}
                          >
                            <span>
                              <img
                                src={m.countryIcon}
                                alt=""
                                style={{ width: "32px", height: "32px" }}
                                className="uk-margin-small-right"
                              />
                            </span>
                            {m.alt}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="comparator__date">
                  <FormControl variant="outlined" style={{ minWidth: 300 }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={
                        monthsDiff[selectedMonth]
                          ? monthsDiff[selectedMonth]
                          : ""
                      }
                      className="compare__select"
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      onChange={(e) => {
                        setSelectedMonth(
                          parseInt(e.currentTarget.dataset.date)
                        );
                      }}
                    >
                      {monthsDiff.map((m, i) => {
                        return (
                          <MenuItem value={m} data-date={i} key={i}>
                            {m}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          )
        : !inView &&
          !isHeaderInView && (
            <div className="comparator__mobile uk-position-fixed uk-width-1-1">
              <div className="comparator__mobile-top uk-flex uk-flex-between uk-flex-middle ">
                <div className="uk-width-4-5 uk-margin-auto uk-flex uk-flex-between comparator__country">
                  <div className="comparator__mobile-top uk-flex uk-flex-middle">
                    <div className="comparator__mobile-country uk-flex uk-flex-middle">
                      <img
                        src={firstCountry.countryIcon}
                        alt={firstCountry.alt}
                      />
                      <span className="uk-text-bold">{firstCountry.alt}</span>
                    </div>
                    <span className="uk-text-small">Vs</span>
                    <div className="comparator__mobile-country uk-flex uk-flex-middle">
                      <span className="uk-text-bold">{secondCountry.alt}</span>
                      <img
                        src={secondCountry.countryIcon}
                        alt={secondCountry.alt}
                      />
                    </div>
                  </div>
                  <div
                    className="comparator__mobile-top-adjust uk-flex uk-flex-middle uk-flex uk-flex-middle"
                    onClick={handleClickAdjustMobile}
                  >
                    <img src={Change} alt="" />
                    Change
                  </div>
                </div>
              </div>
              <div className="comparator__mobile-bottom">
                <div className="uk-flex">
                  {monthsDiff.map((m, i) => {
                    return (
                      <button
                        className={`uk-button uk-flex-1 uk-text-bold comprator__mobile-button-month ${
                          i === selectedMonth ? "active" : ""
                        } ${monthButtonDisabled ? "disabled" : ""}`}
                        onClick={(e) => handleOnClickMonth(e, i)}
                        key={i}
                      >
                        {m.split("-")[1]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
