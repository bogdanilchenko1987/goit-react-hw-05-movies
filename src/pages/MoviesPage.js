import { SearchList } from 'components/SearchList/SearchList';
import { fetchMoviesByQuery } from 'components/api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();

  const movieName = params.get('query') ?? '';

  const handleSubmit = e => {
    e.preventDefault();
    const movieName = e.target.input.value;
    params.set('query', movieName.toLocaleLowerCase());
    setParams(params);
  };

  const resetInput = e => {
    e.target.input.value = '';
  };

  useEffect(() => {
    if (movieName === '') {
      return;
    }
    async function getMovies() {
      try {
        setIsLoading(true);
        const response = await fetchMoviesByQuery(movieName);
        setMovie(response.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [movieName]);

  return (
    <div>
      <SearchList
        isLoading={isLoading}
        movie={movie}
        submit={e => {
          handleSubmit(e);
          resetInput(e);
        }}
      />
    </div>
  );
}

// return (
//   <div>
//     {movie.length ? (
//       <SearchList
//         isLoading={isLoading}
//         movie={movie}
//         submit={e => {
//           handleSubmit(e);
//           resetInput(e);
//         }}
//       />
//     ) : (
//       <p>No movies found</p>
//     )}
//   </div>
// );
