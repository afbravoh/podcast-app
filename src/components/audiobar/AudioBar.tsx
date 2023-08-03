import React from "react";
interface IAudioBar {
    src: string
}
const AudioBar = (props: IAudioBar) => {
    return (
        <div className="audio-bar">
            <audio controls src={props.src}>
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};

export default AudioBar;