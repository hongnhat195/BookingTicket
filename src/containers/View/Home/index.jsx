import React, { Component } from "react";

import MovieList from "../../../components/MovieList";
import { connect } from "react-redux";
import {
  fetchMovieList,
  fetGetTheaterCourse,
} from "../../../Redux/Actions/course";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

class Home extends Component {
  render() {
    AOS.init({
      duration: 300,
      once: false,
    });
    return (
      <div
        className="home"
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="container"
          style={{
            paddingTop: "150px",
          }}
        >
          <div data-aos="flip-up" className="tittle">
            Booking Movie Ticket Online
            <p>
              Safe, secure, reliable ticketing. Your ticket to live
              entertainment!
            </p>
          </div>
        </div>

        {/* <Search_Ticket /> */}

        <div // style={{ marginTop: "552px"  }}
        >
          <MovieList />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.dispatch(fetchMovieList());
    this.props.dispatch(fetGetTheaterCourse());
  }
}

export default connect()(Home);
