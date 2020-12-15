import React, { Component, Fragment } from 'react';

import * as movieServices from '../services/fakeMovieService';

import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import { property } from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };
  componentDidMount() {
    const genres=[{name :'All Genres'},...getGenres()]
    this.setState({ movies: movieServices.getMovies(), genres });
  }

  render() {
    const { length: count } = this.state.movies;

    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              ></ListGroup>
            </div>
            <div className="col">
              <p>Showing {filtered.length} movies in the database.</p>
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
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <th scope="row">{movie.title}</th>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          liked={movie.liked}
                          onClick={() => this.handelLike(movie)}
                        />
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
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handelPageChange}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre , currentPage:1});
  };
  handelPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handelLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

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
