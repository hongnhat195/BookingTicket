import React, { Component } from "react";

class TheaterDetail extends Component {
  render() {
    console.log("prosp", this.props);
    return (
      <div className="col-12 m-3">
        <button
          onClick={() => {
            this.props.onSetState(this.props.data.maCumRap);
          }}
          className="btn btn-success"
        >
          {this.props.data.tenCumRap}
        </button>
      </div>
    );
  }
}

export default TheaterDetail;
