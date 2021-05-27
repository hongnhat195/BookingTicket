import React, { Component } from "react";
import "./style.css";
class BookingSeat extends Component {
  render() {
    return (
      <div className="booking-seat col-6">
        <div className="movie-container">
          <label>Pick a Movie</label>
          <select id="movie">
            <option value={8}>True Romance - $8</option>
            <option value={8}>American History X - $8</option>
            <option value={8}>A Beautiful Mind - $8</option>
            <option value={10}>Joker - $10</option>
          </select>
        </div>
        <ul className="showcase">
          <li>
            <div className="seat" />
            <small>Available</small>
          </li>
          <li>
            <div className="seat selected" />
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied" />
            <small>Occupied</small>
          </li>
        </ul>
        <div className="container">
          <div className="screen" />
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat occupied" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat occupied" />
            <div className="seat occupied" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat occupied" />
            <div className="seat occupied" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat occupied" />
            <div className="seat occupied" />
            <div className="seat" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat occupied" />
            <div className="seat occupied" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
          </div>
          <div className="row">
            <div className="seat" />
            <div className="seat occupied" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
            <div className="seat" />
          </div>
        </div>
      </div>
    );
  }
}

export default BookingSeat;
