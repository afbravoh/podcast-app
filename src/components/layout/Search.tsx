import React, { useState } from 'react';
import SearchContext from "../../context/SearchContext";
import {IPodcast} from "../../interfaces/IPodcast";

const SearchProvider = (props: any) => {

    const [podcasts, setPodcasts] = useState<IPodcast[]>([]);

    const performSearch = (search: string) => {
        const url = `https://itunes.apple.com/search?term=${search}&media=podcast&entity=podcast&limit=30`;
        if (search !== '') {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setPodcasts(data.results);
                })
                .catch(reason => console.error(reason));
        }
    };

    return (
        <SearchContext.Provider value={{ podcasts, performSearch }}>
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
