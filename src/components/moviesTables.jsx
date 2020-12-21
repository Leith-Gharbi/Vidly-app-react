import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import Like from './common/like';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'Like',
      content: movie => (<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />) 
    },
    {
      key: 'delete',
      content: movie =>(
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody data={movies}></TableBody>
      
      </table>
    );
  }
}

export default MoviesTable;
