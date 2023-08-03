import React, {useContext, useState} from 'react';
import {ArrowBackIos, Search} from "@mui/icons-material";
import SearchContext from "../../context/SearchContext";
import "./Header.css"

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
                    <button className="back-icon">
                        <ArrowBackIos className="style-icon" onClick={() => window.history.go(-1)}/>
                    </button>
                    <form action="" onSubmit={handleSubmit}>
                        <button className="search-icon">
                            <Search className="style-icon" onClick={handleSubmit}/>
                        </button>
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