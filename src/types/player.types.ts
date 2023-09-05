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
    isLoading: () => boolean,
}

export type PlayerMode = "full" | "preview"