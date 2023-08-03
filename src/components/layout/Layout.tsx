import React, {useState} from "react";
import AudioContext from "../../context/AudioContext";
import AudioBar from "../audiobar/AudioBar";

const Layout = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {

    const [audioSrc, setAudioSrc] = useState<string>('');

    return (
        <AudioContext.Provider value={{ audioSrc, setAudioSrc }}>
            {props.children}
            <AudioBar src={audioSrc} />
        </AudioContext.Provider>
    );

};

export default Layout;