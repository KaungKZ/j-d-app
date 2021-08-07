import React, { useState, useRef } from "react";
import Header from "./Header";
import DataContent from ".//DataContent";

import {
  CNMap,
  DEMap,
  INMap,
  JPMap,
  KRMap,
  UKMap,
  USMap,
  CNMapOn,
  DEMapOn,
  INMapOn,
  JPMapOn,
  KRMapOn,
  UKMapOn,
  USMapOn,
  DEOn,
  CNOn,
  USOn,
  UKOn,
  KROn,
  JPOn,
  INOn,
} from "../components/utils/ImportImg";

export const mapData = [
  {
    img: UKMap,
    hoveredImg: UKMapOn,
    alt: "United Kingdom",
    className: "UK",
    width: "115px",
    countryIcon: UKOn,
  },
  {
    img: DEMap,
    hoveredImg: DEMapOn,
    alt: "Germany",
    className: "DE",
    width: "92px",
    countryIcon: DEOn,
  },
  {
    img: CNMap,
    hoveredImg: CNMapOn,
    alt: "China",
    className: "CN",
    width: "310px",
    countryIcon: CNOn,
  },
  {
    img: KRMap,
    hoveredImg: KRMapOn,
    alt: "Korea",
    className: "KR",
    width: "53px",
    countryIcon: KROn,
  },
  {
    img: JPMap,
    hoveredImg: JPMapOn,
    alt: "Japan",
    className: "JP",
    width: "119px",
    countryIcon: JPOn,
  },
  {
    img: USMap,
    hoveredImg: USMapOn,
    alt: "United States",
    className: "US",
    width: "293px",
    countryIcon: USOn,
  },
  {
    img: INMap,
    hoveredImg: INMapOn,
    alt: "India",
    className: "IN",
    width: "154px",
    countryIcon: INOn,
  },
];

export const dateOptions = [
  "Sep 2019 - Nov 2019",
  "Jul 2019 - Sep 2019",
  "Apr 2019 - Jun 2019",
  "Jan 2019 - Mar 2019",
  "Oct 2018 - Dec 2018",
  "Jul 2018 - Sep 2018",
  "Apr 2018 - Jun 2018",
  "Jan 2018 - Mar 2018",
];

export default function BodyContent() {
  const [showDataContent, setShowDataContent] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    countries: [],
    date: dateOptions[0],
  });
  const [isHeaderInView, setIsHeaderInView] = useState(null);
  const dataRef = useRef();
  const compareRef = useRef();

  // function handleOnCompareClick() {
  //   setSelectedValues(innerSelectedValues);

  //   setShowDataContent(true);
  //   setTimeout(() => {
  //     if (dataRef.current) {
  //       dataRef.current.scrollIntoView({
  //         block: "end",
  //         behavior: "smooth",
  //         inline: "nearest",
  //       });
  //     }
  //   }, 100);
  // }

  return (
    <section className="content">
      <Header
        setShowDataContent={setShowDataContent}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        setIsHeaderInView={setIsHeaderInView}
        dataRef={dataRef}
        compareRef={compareRef}
      />
      {showDataContent && (
        <DataContent
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          isHeaderInView={isHeaderInView}
          dataRef={dataRef}
          compareRef={compareRef}
        />
      )}
    </section>
  );
}
