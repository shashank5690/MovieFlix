// services/movieService.ts
import data from "../../data.json"

export const fetchMovieSuggestions = async (searchTerm: string) => {
    try {
        const filteredMovies = data.filter((movie) =>
            movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        

        return filteredMovies;
    } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        throw error; 
    }
};