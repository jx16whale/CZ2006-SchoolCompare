import React from "react";

import JCCutOff from "../../../JSON/JC_cut_off.json"; /* CutOffPoints */
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Dropdown from "../../../Components/Dropdown";
import CompareButton from "../../../Components/CompareButton";
import SideDrawer from "../../../Components/SideDrawer";
import CutOffCard from "../../../Components/CutOffCard";
import data from "../../../JSON/combined_data.json"; // COMBINED DATASET OF EVERYTHING WE NEED

import "../../../ComponentsCSS/PaginationButtons.css";
import "../../../ComponentsCSS/SchoolsCard.css";
import "../../../ComponentsCSS/SchoolSearchBar.css";

function TertiaryCutOff() {
  const [pageNumber, setPageNumber] = useState(0);
  const schoolsPerPage = 20;
  const noOfSchoolsVisited = pageNumber * schoolsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  /* extract the data we want */
  let schools = [];

  if (data !== undefined) {
    // filter to get primary school data
    let index = 0; // to ensure the school appear in numeric order, using i will skip some numbers
    for (var i = 0; i < data.length; i++) {
      if (
        /* Total 18 entries*/
        data[i].mainlevel_code.toLowerCase() ===
          "JUNIOR COLLEGE".toLowerCase() ||
        (data[i].school_name
          .toLowerCase()
          .includes("INSTITUTION".toLowerCase()) &&
          !data[i].school_name
            .toLowerCase()
            .includes("JUNIOR".toLowerCase())) ||
        (data[i].mainlevel_code.toLowerCase() ===
          "MIXED LEVELS".toLowerCase() &&
          (data[i].school_name
            .toLowerCase()
            .includes("TEMASEK".toLowerCase()) ||
            data[i].school_name
              .toLowerCase()
              .includes("NATIONAL".toLowerCase()) ||
            data[i].school_name
              .toLowerCase()
              .includes("JUNIOR COLLEGE".toLowerCase()) ||
            data[i].school_name
              .toLowerCase()
              .includes("DUNMAN".toLowerCase()) ||
            data[i].school_name.toLowerCase().includes("RIVER".toLowerCase()) ||
            data[i].school_name
              .toLowerCase()
              .includes("INDEPENDENT".toLowerCase())))
      ) {
        schools[index++] = data[i];
      }
    }
  }

  const displaySchools = schools
    .filter((value) => {
      if (searchTerm === "") return value;
      else if (
        value.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.arts.includes(searchTerm) || // Numbers
        value.science.includes(searchTerm) // Numbers
      ) {
        return value;
      }
    })
    .slice(noOfSchoolsVisited, noOfSchoolsVisited + schoolsPerPage)
    .map((school) => (
      <div key={school._id}>
        <CutOffCard data={school} level={"Tertiary"} />
      </div>
    ));

  const pageCount = Math.ceil(JCCutOff.length / schoolsPerPage);

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <SideDrawer level="Tertiary" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown currentPage={"Tertiary"} />
        <input
          className="search-bar"
          type="text"
          placeholder="Type to Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "70%",
          margin: "auto",
          marginBottom: "1rem",
        }}
      >
        <div className="school-level-title">Tertiary Schools </div>
        <CompareButton />
      </div>

      {displaySchools}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={8}
        renderOnZeroPageCount={null}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButtons"}
        nextLinkClassName={"nextButtons"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}

export default TertiaryCutOff;