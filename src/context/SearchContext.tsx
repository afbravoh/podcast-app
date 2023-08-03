import React from 'react';
import {IPodcast} from "../interfaces/IPodcast";

type SearchContextType = {
    podcasts: IPodcast[];
    performSearch: (search: string) => void
};

const SearchContext = React.createContext<SearchContextType>({
    podcasts: [],
    performSearch: (search: string) => {},
});

export default SearchContext;
