import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetGetTheaterDetail,
  fetGetTheater,
} from "../../../Redux/Actions/course";
class TheaterList extends Component {
  state = {
    a: false,
  };
  getTheaterDetail = () => {
    this.props.dispatch(fetGetTheaterDetail(this.props.data.maHeThongRap));
    this.props.dispatch(fetGetTheater(this.props.data.maHeThongRap));
  };

  render() {
    const item = this.props;

    return (
      <div className="ml-4">
        <button
          onClick={this.getTheaterDetail}
          className="btn btn-primary mb-3"
        >
          {item.data.tenHeThongRap}
        </button>
        {/* <div className="col-9">{this.showTheaterDetail()}</div> */}
      </div>
    );
  }
  componentDidMount() {}
}
const mapStateToProps = (state) => {
  return {
    infoTheaterDetail: state.reducer1.infoTheaterDetail,
    infoTheater: state.reducer1.infoTheater,
  };
};

export default connect(mapStateToProps)(TheaterList);
