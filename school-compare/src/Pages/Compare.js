import React from "react";
import { useContext } from "react";
import CompareContext from "../Contexts/CompareContext";
import SchoolsList2 from "../Components/SchoolsList2";
import "../PagesCSS/Compare.css";
import { Link } from "react-router-dom";
import ErrorCompare from "./ErrorCompare";

function Compare() {
  const compareCtx = useContext(CompareContext);
  // gives us the current context

  let content;

  if (compareCtx.totalSchools === 0) {
    content = (
      <div className="comp-empty">
        <h2 className="comp-empty-heading">No schools to compare yet!</h2>
        <p className="comp-empty-text">
          Want to know which school suits you better ?
          <br></br>
          Compare schools here now!
        </p>
        <Link to="/schools">
          <button className="fav-button">Start exploring</button>
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="compare-school">
        <SchoolsList2 schools={compareCtx.school} />
      </div>
    );
  }
  
  return (
    <section>
      <div className="comp-header">
        <h1 className="comp-title">
          Schools to Compare ({compareCtx.totalSchools})
        </h1>
      </div>
      {content}
    </section>
  );
}

export default Compare;
