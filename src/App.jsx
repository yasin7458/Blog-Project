import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [isadd, setIsAdd] = useState(true);
  const [Update, setUpdate] = useState(null);

  //=================
  //   READ LOGIC
  //=================

  useEffect(() => {
    fetch("http://localhost:3000/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);


  const handleSubmit = () => {

    const movieData = {
      title, director, releaseYear, genre, rating
    };

    if (isadd) {

      // =======================
      //      CREATE LOGIC
      // =======================

      fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movieData)
      })

    } else {

      // =======================
      //      UPDATE LOGIC
      // =======================

      fetch(`http://localhost:3000/movies/${Update}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movieData)
      })

    }
  };

  //===================
  //   Update BUTTON
  //===================
  const handleEdit = (movie) => {
    setIsAdd(false);
    setUpdate(movie.id);
    setTitle(movie.title);
    setDirector(movie.director);
    setReleaseYear(movie.releaseYear);
    setGenre(movie.genre);
    setRating(movie.rating);
  };

  //=====================
  //    DELETE
  //=====================

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      setMovies(movies.filter((movie) => movie.id !== id));
    });
  };

  return (
    <>
      <div className="text-center my-5">
        <h2>{isadd ? "Add New Movie" : "Edit Movie"}</h2>

        <form onSubmit={handleSubmit}>

          <input type="text" placeholder="Movie Name" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />

          <input type="text" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} />
          <br />

          <input type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
          <br />

          <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <br />

          <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
          <br />

          <button type="submit">{isadd ? "Add" : "Edit"}</button>

        </form>
      </div>

      <div className="movie-page py-5">

        <div className="container">

          <div className="text-center mb-5">
            <h1 className="main-title">
              Movies Collection
            </h1>

            <p className="main-subtitle">
              Discover your favorite movies
            </p>
          </div>

          <div className="row g-4">

            {movies.map((element, index) => (

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index} >

                <div className="movie-card h-100 p-4">

                  <div className="d-flex justify-content-between align-items-start mb-4">

                    <div>
                      <span className="genre"> {element.genre} </span>
                      <h4 className="movie-title mt-3 mb-0"> {element.title} </h4>
                    </div>
                    <div className="rating">⭐ {element.rating} </div>
                  </div>

                  <div className="movie-details">

                    <div className="detail-row">
                      <span>Director</span>
                      <strong> {element.director} </strong>
                    </div>

                    <div className="detail-row">
                      <span>Release Year</span>
                      <strong> {element.releaseYear} </strong>
                    </div>

                    <div className="detail-row last">
                      <span>Movie ID</span>
                      <small> {index + 1} </small>
                    </div>

                    <div className="btn-section d-flex justify-content-between mt-3">
                      <button className="btn1" onClick={() => handleDelete(element.id)}>Delete </button>
                      <button className="btn1 edit" onClick={() => handleEdit(element)}> Edit </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;