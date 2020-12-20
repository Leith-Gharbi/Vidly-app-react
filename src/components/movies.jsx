import React, { Component, Fragment } from 'react';

import * as movieServices from '../services/fakeMovieService';
import MoviesTable from './moviesTables';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
  };
  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: movieServices.getMovies(), genres });
  }

  render() {
    const { length: count } = this.state.movies;

    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;
    // Filtring With selected Genre
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    // Sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // BINDING MOVIES
    const movies = paginate(sorted, currentPage, pageSize);
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
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              ></MoviesTable>
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
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

  handleDelete = (movie) => {
    // const { movies } = this.state;
    // const updatedMovies = movies.splice(movies.indexOf(movie), 1);
    // this.setState({
    //   movies
    // });

    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {

    this.setState({ sortColumn });
  
  };
}

export default Movies;
