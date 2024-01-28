

 import React from "https://cdn.skypack.dev/react";
 import PropTypes from "https://cdn.skypack.dev/prop-types";

const movie = props => (
  <div className="movie">
    <figure>
      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.poster_path}`} />
      <figcaption>
        <h2 className="movie__title">{props.title}</h2>
      </figcaption>
    </figure>
  </div>
);

movie.propTypes = {
  id         : PropTypes.number.isRequired,
  title      : PropTypes.string.isRequired,
  poster_path: PropTypes.string
};

// export default Movie;



// components/Movies.js

// import React from "https://cdn.skypack.dev/react";
// import PropTypes from "https://cdn.skypack.dev/prop-types";

// import Movie from './Movie';

const movies = props => (
  <ul className="movies">
    {props.movies.map(movie => (
      <li key={movie.id}>
        <movie {...movie} />
      </li>
    ))}
  </ul>
);

movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

// export default Movie;



// components/Search.js
// import React from "https://cdn.skypack.dev/react";
// import PropTypes from "https://cdn.skypack.dev/prop-types";

const search = props => (
  <form className="search" onInput={event => props.onInput(event.target.value)}>
    <input type="search" value={props.query} placeholder={props.placeholder} />
  </form>
);

search.propTypes = {
  query      : PropTypes.string.isRequired,
  onInput    : PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

// export default Search;



// components/App.js
// import React from "https://cdn.skypack.dev/react";

// import Movies from './Movies';
// import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      movies: [],
      query: ''
    };
    
    this.onInput = this.onInput.bind(this);
  }
  
  onInput(query) {
    this.setState({
      query
    });
    
    this.searchMovie(query);
  }
  
  getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;
    
    fetch (url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results
        })
      });
  }
  
  searchmovie(query) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cfe422613b250f702980a3bbf9e90716`;
    
    fetch (url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results
        })
      });
  }
  
  componentDidMount() {
    this.getPopularMovies();
  }
  
  render() {
    const { movies, query } = this.state;
    const isSearched = query => item => !query || item.title.toLowerCase().includes(query.toLowerCase());
    
    return (
      <div className="app">
        <search query={query} onInput={this.onInput} placeholder="Search for Movie Title …" />
        <movies movies={movies.filter(isSearched(query))} />
      </div>
    );
  }
}
