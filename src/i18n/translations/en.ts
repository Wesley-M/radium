const assets = {
    stations: {
        handpicked: {
            title: "Featured",
            description: "Stations for you to enjoy",
        },
        relaxation: {
            title: "Relaxation",
            description: "Take a break and listen",
        },
        news: {
            title: "News",
            description: "To keep you well informed",
        },
        recently_played: {
            title: "Recently played",
            description: "Pick up where you left off",
        },
        library: {
            title: "Library",
            description: "Your favorite stations",
        }
    }
}

const controls = {
    showAll: "Show all",
};

const error = {
    unknown: "Unknown error",
    somethingWentWrong: "Something went wrong",
    pageNotFound: "Page not found",
    playlistNotFound: "Playlist \"{{ name }}\" was not found",
    noResultsForQuery: "No results were found for \"{{ query }}\"",
    impossibleToLoadStations: "It was impossible to load the stations",
};

const info = {
    tryOtherCombinationOfWords: "Maybe, try other combination of words :(",
}

const search = {
    placeholder: "What are you looking for?",
    all: "All",
    yourLibrary: "Your Library",
    recentlyPlayed: "Recently played",
    tags: {
        name: "Name",
        tag: "Tag",
        countryCode: "Country Code",
        language: "Language",
    }
};

const settings = {
    title: "Settings",
    theme: "Theme",
    mode: "Mode",
    corners: "Corners",
    colorScheme: "Color Scheme",
    language: "Language",
    modes: {
        light: "Light",
        dark: "Dark",
    },
    schemes: {
        default: "Default",
        solarized: "Solarized", 
        monokai: "Monokai",
    }
};

const sidebar = {
    home: "Home",
    yourLibrary: "Your Library",
    library: {
        empty: {
            title: "No stations in sight!",
            message: "Add stations by clicking the <0/> on your desired radio."
        }
    }
};

export default {
    translation: {
        assets,
        controls,
        error,
        info,
        search,
        settings,
        sidebar
    }
}