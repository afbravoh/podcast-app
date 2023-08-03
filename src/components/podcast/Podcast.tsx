import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {parseString} from "xml2js"
import {PlayArrow} from "@mui/icons-material";
import AudioContext from "../../context/AudioContext";
import './Podcast.css';

const Podcast = () => {

    const { podcastId } = useParams();
    const { audioSrc, setAudioSrc } = useContext(AudioContext);
    const [podcast, setPodcast] = useState<any>();
    const [details, setDetails] = useState<any>()

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
                        const [details] = result['rss']['channel'];
                        setDetails(details)
                    })

                })
                .catch(reason => console.error(reason));
        }
    }, [podcast]);


    // ahora puedes usar audioSrc y setAudioSrc en este componente
    // por ejemplo, podrías tener una función que cambie la pista de audio cuando se haga clic en un botón
    const handleClick = (e: any, enclosure: any) => {
        const [enclosureData] = enclosure;
        const source = enclosureData["$"]["url"];
        console.log("source:" , source);
        setAudioSrc(source);
    }

    return (
            <div>
                <div className="banner">
                    {podcast && <img src={podcast?.artworkUrl600} alt="Banner" className="banner-image"/>}
                </div>
                <h1 className="title">
                    {podcast?.collectionName}
                </h1>
                <section className="selector-container">
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
                        {details?.item?.length > 0 && details?.item?.map((item: any, index:number) => (
                            <tr key={index} onClick={(e:any) => handleClick(e,item.enclosure)}>
                                <td>
                                    <PlayArrow/>
                                </td>
                                <td>
                                    <div className="podcast-information">
                                        <img
                                            className="img-podcast"
                                            src={item?.['itunes:image']?.[0]?.['$']?.['href']}
                                            alt='podcastImage'
                                            style={{height: '40px', width:'40px'}}
                                        />
                                        <div>
                                            <b> {item?.title[0]}</b>
                                            <br/>
                                            <div className='description-text'>{item?.['itunes:author']?.[0]}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="description-text" dangerouslySetInnerHTML={{__html: item?.["itunes:summary"]?.[0] ?? '' }}/>
                                </td>
                                <td>
                                    <div className="description-text">{item?.['pubDate']?.[0]} </div>
                                </td>
                                <td>
                                    <div className="description-text">{item?.['itunes:duration']?.[0]}</div>
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