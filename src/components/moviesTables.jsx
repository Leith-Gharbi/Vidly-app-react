import React, { Component } from 'react';
import Like from './common/like';

const MoviesTable = (props) => {
    const {movies , onDelete ,onLike,onSort}=props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={()=> onSort("title")} scope="col">Title</th>
          <th onClick={()=> onSort("genre.name")}  scope="col">Genre</th>
          <th onClick={()=> onSort("numberInStock")} scope="col">Stock</th>
          <th onClick={()=> onSort("dailyRentalRate")} scope="col">Rate</th>
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
                onClick={() => onLike(movie)}
              />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
