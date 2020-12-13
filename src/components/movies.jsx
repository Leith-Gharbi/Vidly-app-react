import React, { Component, Fragment } from 'react';

import * as movieServices from '../services/fakeMovieService';

import Like from './common/like';

class Movies extends Component {
  state = {
    movies: movieServices.getMovies(),
  };

  render() {
    return (
      <div>
        {this.state.movies.length === 0 ? (
          <p>There are no movies in the database</p>
        ) : (
          this.renderMovies()
        )}
      </div>
    );
  }

  renderMovies = () => {
    return (
      <Fragment>
        <p>Showing {this.state.movies.length} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={()=>this.handelLike(movie)} />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleClick(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  };

  handelLike = movie => {
    const movies=[... this.state.movies];
    const index =movies.indexOf(movie);
    movies[index]={ ...movies[index]};
    movies[index].liked=!movies[index].liked;
    this.setState({ movies });
  } ;

  handleClick = (movie) => {
    // const { movies } = this.state;
    // const updatedMovies = movies.splice(movies.indexOf(movie), 1);
    // this.setState({
    //   movies
    // });

    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
}

export default Movies;
