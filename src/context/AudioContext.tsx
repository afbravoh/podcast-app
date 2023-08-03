import React from 'react';

type AudioContextType = {
    audioSrc: string;
    setAudioSrc: React.Dispatch<React.SetStateAction<string>>;
};

const AudioContext = React.createContext<AudioContextType>(
    {
        audioSrc: '',
        setAudioSrc: () => {},
    }
);

export default AudioContext;