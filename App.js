import React from "https://cdn.skypack.dev/react";

 import movies from './movies';
  import search from './search';

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
    
    this.searchmovie(query);
  }
  
  getPopularmovies() {
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
        <movies movies={movies.filter(issearched(query))} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));