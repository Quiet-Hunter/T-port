import React, { Component } from 'react';

class FavoritesButton extends Component {
  render() {
    return (
        <div className="header-buttons__button--favorites">
            <i className="material-icons">star_border</i>
        </div>
    );
  }
}

export default FavoritesButton;