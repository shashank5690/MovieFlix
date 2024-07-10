import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
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
        <>
            {/* Desktop and Tablet SearchBar */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: '100%',
                    maxWidth: 420,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'relative',
                }}
            >
                <Paper
                    component="form"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        border: "solid brown 1px",
                        borderRadius: '50px'
                    }}
                >
                    <InputBase
                        placeholder="Search your Favorite movies..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        sx={{ flexGrow: 1, marginLeft: 2 }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        
                    </IconButton>
                </Paper>
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
                                <ListItemText 
                                    primary={movie.Title}
                                    sx={{ color: 'black' }} // Change font color to black
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>

             {/* Mobile SearchBar */}
             <Box
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="search"
                    sx={{ mr: 1 }}
                >
                    
                </IconButton>
                <InputBase
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        padding: '0 10px',
                    }}
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
                                <ListItemText 
                                    primary={movie.Title}
                                    sx={{ color: 'black' }} // Change font color to black
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </>
    );
};

export default SearchBar;