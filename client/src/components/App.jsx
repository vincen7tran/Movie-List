import React from 'react';
import MovieCard from './MovieCard.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';
import movieSearch from '../moviedb/moviedb';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filtered: [],
      toWatch: [],
      watched: []
    };
  }

  onWatchToggle = (watchedList) => {
    if (watchedList) {
      this.setState({ filtered: this.state.watched });
    }
    else {
      this.setState({ filtered: this.state.toWatch })
    };
    
  }

  onCardWatchToggle = (watchState, movie) => {
    const title = movie.title.toLowerCase()
    if (watchState) {
      const removed = this.state.toWatch.filter(current => current !== title);
      this.setState({ watched: [...this.state.watched, title], toWatch: removed });
    } else {
      const removed = this.state.watched.filter(current => current !== title);
      this.setState({ watched: removed, toWatch: [...this.state.toWatch, title] });
    }
  }

  onAdd = (query) => {
    movieSearch(query, movie => {
      console.log(movie);
      this.setState({ filtered: [...this.state.filtered, movie.title.toLowerCase()],
                      movies: [...this.state.movies, movie],
                      toWatch: [...this.state.toWatch, movie.title.toLowerCase()]
                    });
    });
  } 

  onSearch = (query) => {
    const filtered = [];
    query = query.toLowerCase();
    this.state.movies.forEach(movie => {
      const title = movie.title.toLowerCase()
      if (title.includes(query)) filtered.push(title);
    })
    this.setState({ filtered })
  }

  render() {
    const movies = this.state.movies.map(movie => {
      if (this.state.filtered.includes(movie.title.toLowerCase())) 
        return <MovieCard key={movie.title} movie={movie} onCardWatchToggle={this.onCardWatchToggle} 
                          watched={this.state.watched.includes(movie.title.toLowerCase())} />;
    });
    return (
      <div>
        <div>
          <button onClick={() =>this.onWatchToggle(true)} className="watched watch-button">Watched</button>
          <button onClick={() => this.onWatchToggle(false)} className="to-watch watch-button">To Watch</button>
        </div>
        <br></br>
        <AddMovieBar onAdd={this.onAdd} />
        <SearchBar onSearch={this.onSearch} />
        <div className="container">
          {!this.state.filtered.length && <p>No Movies Found!</p>}
          {movies}
        </div>
      </div>
    );
  }
}

export default App;