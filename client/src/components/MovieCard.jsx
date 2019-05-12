import React from 'react';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { watched: this.props.watched };
  }

  handleWatchToggle = () => {
    this.setState({ watched: !this.state.watched }, () => {
      this.props.onCardWatchToggle(this.state.watched, this.props.movie);
    });
  }

  render() {

    return (
      <div className="card">
        <h1>{this.props.movie.title}</h1>
        {!this.state.watched && <button onClick={this.handleWatchToggle} className="movie-watch button">To Watch</button>}
        {this.state.watched && <button onClick={this.handleWatchToggle} className="movie-watch button">Watched</button>}
      </div>
    );
  }
}

export default MovieCard;