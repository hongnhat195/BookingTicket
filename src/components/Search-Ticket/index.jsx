import React, { Component } from "react";
import "./style.css";
class Search_Ticket extends Component {
  render() {
    return (
      <div className="search-ticket container">
        <div className="flexbox">
          <div className="search">
            <h1>Search this site</h1>
            <h3>Click on search icon, then type your keyword.</h3>
            <div>
              <input type="text" placeholder="Search . . ." required />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search_Ticket;
