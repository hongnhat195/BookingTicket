import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchMovieDetail,
  fetGetTheaterCourse,
} from "../../../Redux/Actions/course";

import "./style.css";
import { fetchGetFilmShow } from "../BookingInformation/Api/actions";

import BookingFilm from "../../../components/BookingFilm";

class DetailFilm extends Component {
  fetLichChieu = () => {};
  render() {
    const data = this.props.movieDetail.maPhim;
    console.log("data", data);
    return (
      <div>
        <div className="detailFilm ">
          <div className="transformers-area">
            <div className="container">
              <div className="transformers-box">
                <div className="row flexbox-center">
                  <div className="col-lg-5 text-lg-left text-center">
                    <div className="transformers-content">
                      <img src={this.props.movieDetail.hinhAnh} alt="about" />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="transformers-content">
                      <h2>{this.props.movieDetail.tenPhim}</h2>
                      <p>3D | Animation | Action | Sci-Fi</p>
                      <ul>
                        <li>
                          <div className="transformers-left">Movie:</div>
                          <div className="transformers-right">
                            <a href="#">{this.props.movieDetail.tenPhim}</a>
                          </div>
                        </li>
                        <li>
                          <div className="transformers-left">Writer:</div>
                          <div className="transformers-right">
                            Stephen McFeely, Christopher Markus
                          </div>
                        </li>
                        <li>
                          <div className="transformers-left">Director:</div>
                          <div className="transformers-right">Joe Johnston</div>
                        </li>
                        <li>
                          <div className="transformers-left">Time:</div>
                          <div className="transformers-right">120 minutes</div>
                        </li>
                        <li>
                          <div className="transformers-left">Release:</div>
                          <div className="transformers-right">
                            {this.props.movieDetail.ngayKhoiChieu}
                          </div>
                        </li>
                        <li>
                          <div className="transformers-left">Language:</div>
                          <div className="transformers-right">
                            English, Vietnamese
                          </div>
                        </li>

                        <li>
                          <div className="transformers-left">Share:</div>
                          <div className="transformers-right">
                            <a href="#">
                              <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                              <i className="fa fa-envelope"></i>
                            </a>
                            <a href="#">
                              <i className="fab fa-youtube"></i>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <BookingFilm value={data} />

                {/* <Link
                  to={`/BookingInformation/${this.props.movieDetail.maPhim}`}
                  className="theme-btn btn-danger btn-lg"
                >
                  <i className="fa fa-ticket-alt"></i> BUY TICKET
                </Link> */}
              </div>
            </div>
          </div>
          <section className="details-area">
            <div className="container container-fluid">
              <div className="row">
                <div className="col-lg-9">
                  <div className="details-content">
                    <div className="details-overview">
                      <h2>Overview</h2>
                      <p>{this.props.movieDetail.moTa}</p>
                    </div>
                    <div className="details-reply">
                      <h2>Leave a Reply</h2>
                      <form action="#">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="select-container">
                              <input type="text" placeholder="Name" />
                              <i className="fa fa-user"></i>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="select-container">
                              <input type="text" placeholder="Email" />
                              <i className="fa fa-envelope"></i>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="select-container">
                              <input type="text" placeholder="Phone" />
                              <i className="fa fa-phone"></i>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="textarea-container">
                              <textarea
                                placeholder="Type Here Message"
                                defaultValue={""}
                              />
                              <button>
                                <i className="icofont icofont-send-mail" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="details-comment">
                      <a className="theme-btn theme-btn2 btn col-3" href="#">
                        Post Comment
                      </a>
                      <p className="col-9 pl-5">
                        Review film or rating its for your comment
                      </p>
                    </div>
                    <div className="details-thumb">
                      <div className="details-thumb-prev">
                        <div className="thumb-icon">
                          <i className="fa fa-angle-left"></i>
                        </div>
                        <div className="thumb-text">
                          <h4>Previous Post</h4>
                          <p>Standard Post With Gallery</p>
                        </div>
                      </div>
                      <div className="details-thumb-next">
                        <div className="thumb-text">
                          <h4>Next Post</h4>
                          <p>Standard Post With Preview Image</p>
                        </div>
                        <div className="thumb-icon">
                          <i className="fa fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.params.id);
    this.props.dispatch(fetchMovieDetail(id));
    this.props.dispatch(fetchGetFilmShow(id));
    this.props.dispatch(fetGetTheaterCourse());
  }
}
const mapStateToProps = (state) => {
  return {
    movieDetail: state.reducer1.movieDetail,
  };
};
export default connect(mapStateToProps)(DetailFilm);
