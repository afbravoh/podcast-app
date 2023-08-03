import React from 'react';
import {Search} from "@mui/icons-material";

interface IHeader {
    handleSubmit?: any;
    handleChange?: any;
    search: string;
}

const Header = (props: IHeader) => {
    return (
        <header className="header">
            <div className="search-container">
                <form action="" onSubmit={props.handleSubmit}>
                    <Search className="search-button"/>
                    <input
                        type="text"
                        placeholder="Podcast"
                        name="search"
                        className="search-input"
                        value={props.search}
                        onChange={props.handleChange}
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;