import React from 'react';
import {IEpisode} from "../interfaces/IPodcast";

type AudioContextType = {
    episode: IEpisode;
    setEpisode: React.Dispatch<React.SetStateAction<IEpisode>>;
    episodes: IEpisode[];
    setEpisodes: React.Dispatch<React.SetStateAction<IEpisode[]>>;
};

const AudioContext = React.createContext<AudioContextType>(
    {
        episode: {
            "itunes:author":[''],
            "itunes:image": [{"$": {href: ''}}],
            enclosure: [{"$":{ url: ''}}],
            title: [''],
            pubDate: [''],
            "itunes:duration": [''],
            "itunes:summary": ['']
        },
        setEpisode: () => {},
        episodes: [],
        setEpisodes: () => {}
    }
);

export default AudioContext;