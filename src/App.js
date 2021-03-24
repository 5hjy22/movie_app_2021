import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    //axio.get()이 완료되기까지 시간이 조금 걸리기 때문에 함수 비동기 선언
    //state에서 data로 사용하기 위해 axios에서 넘어온 data를 잡아서 받음
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false }); //this.setState({movies: movies, isLoding: false})
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state; //JS 해체할당 state Object에서 isLoading value를 가져옴
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loadder__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
