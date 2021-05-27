import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import "./style.css";
import MovieItem from "../MovieItem";
import { connect } from "react-redux";

class MovieList extends Component {
  renderMovieList = () => {
    const { movieList } = this.props;
    return movieList.map((item, index) => {
      return <MovieItem data={item} key={index} />;
    });
  };
  render() {
    return (
      <div
        className="movieList"
        style={{
          background: "#001232",
        }}
      >
        <section className="portfolio-area pt-60">
          <div className="container">
            <div
              className="row flexbox-center"
              style={{
                paddingTop: "100px",
              }}
            >
              <div className="col-lg-6 text-center text-lg-left">
                <div className="section-title">
                  <h1>
                    <i className="fas fa-film"></i> Spotlight This Month
                  </h1>
                </div>
              </div>
              <div className="col-lg-6 text-center text-lg-right">
                <div className="portfolio-menu">
                  <ul>
                    <li data-filter="*" className="active">
                      Latest
                    </li>
                    <li data-filter=".soon">Comming Soon</li>
                    <li data-filter=".top">Top Rated</li>
                    <li data-filter=".released">Recently Released</li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">{this.renderMovieList()}</div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    movieList: state.reducer1.movieList,
  };
};

export default connect(mapStateToProps)(MovieList);
