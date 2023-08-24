export type PlayerControls = {
    play: () => void,
    pause: () => void,
    toggle: () => void,
    isPlaying: () => boolean,
    toggleMode: () => void,
    changeVolume: (vol: number) => void,
    getVolume: () => number,
    skipPrevious: () => void,
    canSkipPrevious: () => boolean,
    skipNext: () => void,
    canSkipNext: () => boolean,
    onAudioLoad: () => void,
    onPlay: () => void,
    onPause: () => void,
    isLoadingAudio: () => boolean,
    resetAudio: () => void
}

export type PlayerMode = "full" | "preview"