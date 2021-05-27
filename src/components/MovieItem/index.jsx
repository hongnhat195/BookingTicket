import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./style.css";
class MovieItem extends Component {
  render() {
    const { data } = this.props;
    // console.log("props is", this.props);
    const a = `./DetailFilm/${data.maPhim}`;
    return (
      <div className="col-lg-3 top">
        <div className="single-portfolio">
          <div className="single-portfolio-img">
            <img src={data.hinhAnh} alt="portfolio" />
            <a href={data.trailer} className="popup-youtube">
              <i className="fas fa-play-circle"></i>
            </a>
          </div>
          <div className="portfolio-content">
            <p>{data.tenPhim}</p>
            <div className="review">
              <div className="author-review">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <Link className="btn btn-success ml-5" to={a}>
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
