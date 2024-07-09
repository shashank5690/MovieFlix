// services/movieService.ts
import data from "../../data.json"

export const fetchMovieSuggestions = async (searchTerm: string) => {
    try {
        // Filter movies based on Title containing the searchTerm (case insensitive)
        const filteredMovies = data.filter((movie) =>
            movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("sfjsfkjsjfskjf",filteredMovies)

        return filteredMovies;
    } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        throw error; 
    }
};