import { RefObject } from "react";

interface NativeAudioProps {
    src?: string
    reference?: RefObject<HTMLAudioElement>
}

export const NativeAudio = (props: NativeAudioProps) => {
    const { src, reference } = props

    return (
      <div>
        <audio src={src} ref={reference}/>
      </div>
    );
  };