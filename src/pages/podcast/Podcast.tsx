import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {parseString} from "xml2js"
import {Pause, PlayArrow, PlayArrowRounded, Search} from "@mui/icons-material";
import AudioContext from "../../context/AudioContext";
import {IDetails, IEpisode, IPodcast} from "../../interfaces/IPodcast";
import './Podcast.css';


const Podcast = () => {

    const { podcastId } = useParams();
    const { setEpisode, setEpisodes, episodes, episode } = useContext(AudioContext);
    const currentEpisode:IEpisode = episode;
    const [podcast, setPodcast] = useState<IPodcast>();
    const [details, setDetails] = useState<IDetails>()

    useEffect(() => {
        if (!podcastId) return
        const url = `https://itunes.apple.com/lookup?id=${podcastId}`;
        const url2 = `https://cors-anywhere.herokuapp.com/${url}`
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                const [podcast] = data.results;
                setPodcast(podcast);
            })
            .catch(error => console.error(error));

    }, [podcastId]);

    useEffect(() => {
        if (!podcast) return;
        if (podcast.feedUrl) {
            const url2 = `https://cors-anywhere.herokuapp.com/${podcast.feedUrl}`
            fetch(url2)
                .then(response => response.text())
                .then(data => {
                    parseString(data, (err: any, result: any) => {
                        const [details] = result?.['rss']?.['channel'];
                        setDetails(details)
                        setEpisodes(details.item);
                        if (details.item.length > 0){
                            const [firstEpisode] = details.item!;
                            setEpisode(firstEpisode)
                        }
                    })
                })
                .catch(reason => console.error(reason));
        }
    }, [podcast]);

    const handleClick = (e: any, episode: IEpisode) => {
        setEpisode(episode);
    }

    const onPlayPodcast = () => {
        if (episodes.length > 0 && details){
            const [firstEpisode] = details.item!;
            setEpisode(firstEpisode)
        }
    };

    return (
            <div>
                <section className="selector-container">
                    <section className="banner">
                        {podcast && <img src={podcast?.artworkUrl600} alt="Banner" className="banner-image"/>}
                    </section>
                    <div className="title-container">
                        <div className="icon-container">
                            <button className="circular-button-main">
                                <PlayArrowRounded onClick={onPlayPodcast}/>
                            </button>
                        </div>
                        <div className="title">
                            {podcast?.collectionName}
                        </div>
                        <select className="selector" placeholder="Sort By">
                            <option>Sort By</option>
                        </select>
                    </div>
                    <table className="table-container">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Topic</th>
                            <th>Released</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details && details?.item?.length > 0 && details?.item?.map((episode: IEpisode, index:number) => (
                            <tr key={index} onClick={(e:any) => handleClick(e,episode)}>
                                <td>
                                    {currentEpisode.title[0] === episode.title[0] ? <Pause/> :<PlayArrow/>}
                                </td>
                                <td>
                                    <div className="podcast-information">
                                        <img
                                            className="img-podcast"
                                            src={episode?.['itunes:image']?.[0]?.['$']?.['href']}
                                            alt='podcastImage'
                                            style={{height: '40px', width:'40px'}}
                                        />
                                        <div>
                                            <b> {episode?.title[0]}</b>
                                            <br/>
                                            <div className='description-text'>{episode?.['itunes:author']?.[0]}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="description-text"
                                        dangerouslySetInnerHTML={{__html: episode?.["itunes:summary"]?.[0] ?? '' }}
                                    />
                                </td>
                                <td>
                                    <div className="description-text">
                                        {new Date(episode?.['pubDate']?.[0]).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    <div className="description-text">{episode?.['itunes:duration']?.[0]}</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </div>
       );
};

export default Podcast;