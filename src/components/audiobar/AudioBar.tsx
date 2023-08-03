import React, {useContext, useState} from "react";
import {IEpisode} from "../../interfaces/IPodcast";
import {
    PauseCircleFilled,
    PlayArrowRounded,
    Replay,
    Shuffle,
    SkipNext,
    SkipPrevious,
    VolumeUp
} from "@mui/icons-material";
import AudioContext from "../../context/AudioContext";
import {toHoursAndMinutes} from "../../util/util";
import "./AudioBar.css"
import "../../pages/podcast/PodcastList.css"

interface IAudioBar {
    episode: IEpisode;
    episodes: any[];
}
const AudioBar = (props: IAudioBar) => {

    const {episodes, episode} = props;
    const { setEpisode } = useContext(AudioContext);

    const [settings, setSettings] = useState<any>({
        playing: false,
        currentTime: 0,
        duration: 0,
        volume: 1,
        currentTrack: 0,
    });

    const audioRef = React.createRef<HTMLAudioElement>();

    const handlePlay = () => {
        if (audioRef.current)
        audioRef.current.play();
        setSettings({ ...settings, playing: true })
    }

    const handlePause = () => {
        if (audioRef.current)
        audioRef.current.pause();
        setSettings({ ...settings, playing: false });
    }

    const handleTimeUpdate = () => {
        if (audioRef.current)
        setSettings({...settings, currentTime: audioRef.current.currentTime, duration: audioRef.current.duration})
    }

    const handleVolumeChange = (e: any) => {
        setSettings({ ...settings, volume: e.target.value });
        if (audioRef.current)
            audioRef.current.volume = e.target.value;
    }

   const handleSeek = (e: any) => {
       if (audioRef.current)
           audioRef.current.currentTime = e.target.value;
    }

    const handleNextTrack = () => {
        if (settings.currentTrack < episodes?.length - 1) {
            setSettings({ ...settings, currentTrack: settings.currentTrack + 1 });
            setEpisode(episodes[settings.currentTrack + 1]);
        }
    }

    const handlePrevTrack = () => {
        if (settings.currentTrack > 0) {
            setSettings({ currentTrack: settings.currentTrack - 1 });
            setEpisode(episodes[settings.currentTrack - 1]);
        }
    }

    const handleReplayEpisode = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            audioRef.current.play()
        }
    };

    const handleRandomEpisode = () => {
        const random: IEpisode = episodes[Math.floor(Math.random()* episodes.length)];
        setEpisode(random);
    };

    const getSrc = (): string => {
        if (!episode?.enclosure) return ""
        const [enclosureData] = episode?.enclosure;
        return  enclosureData?.["$"]?.["url"];
    }

    return (
        <div className="audio-bar">
            <audio
                controls
                src={getSrc()}
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleNextTrack}
                style={{display: 'none'}}
                autoPlay
            >
                Tu navegador no soporta el elemento de audio.
            </audio>
            <div className="podcast-container">
                <img
                    className="img-podcast"
                    src={episode?.['itunes:image']?.[0]?.['$']?.['href']}
                    alt='podcastImage'
                    style={{height: '110px', width:'110px'}}
                />
                <b className="detail-episode"> {episode?.title[0]}</b>
            </div>
            <div className="button-container">
                <button className="circular-secondary-button" onClick={handleRandomEpisode}><Shuffle/></button>
                <button className="circular-secondary-button" onClick={handlePrevTrack}><SkipPrevious/></button>
                <button className="circular-button" onClick={settings.playing ? handlePause : handlePlay}>
                    {settings.playing ? <PauseCircleFilled/>: <PlayArrowRounded/>}
                </button>
                <button className="circular-secondary-button" onClick={handleNextTrack}><SkipNext/></button>
                <button className="circular-secondary-button" onClick={handleReplayEpisode}><Replay/></button>
            </div>
            <div className="bar-container">
                {settings.duration > 0 && <div className="name-episode">{toHoursAndMinutes(settings.duration)}</div>}
                <input className="range-episode" type="range" min={0} max={settings.duration} step={0.01} value={settings.currentTime} onChange={handleSeek}/>
                {settings.currentTime > 0 && <div className="name-episode">{toHoursAndMinutes(settings.currentTime)}</div>}
                <VolumeUp className="svg-color"/>
                <input className="range-volume" type="range" min={0} max={1} step={0.01} value={settings.volume} onChange={handleVolumeChange}/>
            </div>
        </div>
    );
};

export default AudioBar;