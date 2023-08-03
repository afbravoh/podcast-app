import React, {useContext, useState} from 'react';
import {Search} from "@mui/icons-material";
import SearchContext from "../../context/SearchContext";

const Header = () => {

    const [search, setSearch] = useState('');
    const searchContext = useContext(SearchContext);

    if (!searchContext) {
        throw new Error("Header must be used within a SearchProvider");
    }

    const { performSearch } = searchContext;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        performSearch(search);
    };

    return (
        <>
            <header className="header">
                <div className="search-container">
                    <form action="" onSubmit={handleSubmit}>
                        <Search className="search-button" onClick={handleSubmit}/>
                        <input
                            type="text"
                            placeholder="Podcast"
                            name="search"
                            className="search-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoComplete="off"
                        />
                    </form>
                </div>
            </header>
        </>
    );
};

export default Header;