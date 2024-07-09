import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InputBase from '@mui/material/InputBase';
import useSearchBar from '../utils/customHooks/useSearchBar'; 

const SearchBar = () => {
    const {
        searchTerm,
        suggestions,
        selectedItemIndex,
        openSuggestions,
        suggestionListRef,
        handleSearchInputChange,
        handleSuggestionClick,
        handleKeyDown,
    } = useSearchBar(); 

    return (
        <Paper
            component="form"
            sx={{
                width: '100%',
                maxWidth: 420,
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'relative',
                border:"solid brown 1px",
                borderRadius:'50px'
            }}
        >
            <InputBase
                placeholder="Search your Favorite movies..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                fullWidth
                sx={{ flexGrow: 1, marginLeft: 2 }}
            />
            {openSuggestions && suggestions?.length > 0 && (
                <List
                    ref={suggestionListRef}
                    sx={{
                        position: 'absolute',
                        zIndex: 1,
                        width: '100%',
                        marginTop: 2,
                        backgroundColor: 'white',
                    }}
                >
                    {suggestions.map((movie, index) => (
                        <ListItem
                            button
                            key={movie.imdbID}
                            selected={index === selectedItemIndex}
                            onClick={() => handleSuggestionClick(movie.imdbID)}
                        >
                            <ListItemText primary={movie.Title} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default SearchBar;

