import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {PlayArrow} from '@mui/icons-material';
import SearchContext from "../../context/SearchContext";
import './PodcastList.css';


const PodcastList = () => {

    const navigate = useNavigate();
    const { podcasts } = useContext(SearchContext);

    return (
            <section className="selector-container">
                {podcasts.length === 0 &&
                    <div className="message-container">
                        <h2 className="message-search">Type to search a podcast and click on the search Icon</h2>
                    </div>
                }
                {podcasts.length > 0 &&
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
                </table>}
            </section>
    );
}

export default PodcastList;
