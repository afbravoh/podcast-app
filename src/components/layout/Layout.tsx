import React, {useState} from "react";
import AudioContext from "../../context/AudioContext";
import AudioBar from "../audiobar/AudioBar";
import {IEpisode} from "../../interfaces/IPodcast";

const Layout = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {

    const [episode, setEpisode] = useState<IEpisode>({
        "itunes:author":[''],
        "itunes:image": [{"$": {href: ''}}],
        enclosure: [{"$":{ url: ''}}],
        title: [''],
        pubDate: [''],
        "itunes:duration": [''],
        "itunes:summary": ['']
    });

    const [episodes, setEpisodes] = useState<IEpisode[]>([])

    return (
        <AudioContext.Provider value={{ episode, setEpisode, episodes, setEpisodes }}>
            {props.children}
            <AudioBar episode={episode} episodes={episodes}/>
        </AudioContext.Provider>
    );

};

export default Layout;