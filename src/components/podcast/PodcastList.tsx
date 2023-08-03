import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {PlayArrow} from '@mui/icons-material';
import Header from "../header/Header";
import {IPodcast} from "../../interfaces/IPodcast";
import './PodcastList.css';
import SearchContext from "../../context/SearchContext";

const PodcastList = () => {

    const navigate = useNavigate();
    //const [podcasts, setPodcasts] = useState<IPodcast[]>([]);

    const { podcasts } = useContext(SearchContext);
    const [search, setSearch] = useState<string>('Musica');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(search);
    }

    /*useEffect(() => {
        // const originalUrl = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
        const url = `https://itunes.apple.com/search?term=${search}&media=podcast&entity=podcast&limit=30`;
        if (search !== '') {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setPodcasts(data.results);
                })
                .catch(reason => console.error(reason));
        }
    }, [search]);*/


    return (
        <div>
            <section className="selector-container">
                <table className="table-container">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Released</th>
                    </tr>
                    </thead>
                    <tbody>
                    {podcasts.length > 0 && podcasts.map((podcast, index) => (
                        <tr key={index} onClick={() => navigate(`/podcast/${podcast.collectionId}`)}>
                            <td>
                                <PlayArrow/>
                            </td>
                            <td>
                                <div className="podcast-information">
                                    <img
                                        className="img-podcast"
                                        src={podcast?.artworkUrl30}
                                        alt='podcastImage'
                                    />
                                    <div>
                                        <b>{podcast?.collectionName}</b>
                                        <br/>
                                        <div className="description-text">{podcast?.artistName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="description-text">
                                    {podcast?.collectionCensoredName}
                                </div>
                            </td>
                            <td>
                                <div className="description-text">
                                    {new Date(podcast?.releaseDate).toLocaleDateString()}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default PodcastList;
