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
            title: "Global News",
            description: "To keep you well informed",
        },
        recently_played: {
            title: "Recently Played",
            description: "Pick up where you left off",
        },
        library: {
            title: "Library",
            description: "Your favorite stations",
        },
        introducing: {
            title: "Introducing {{ name }}",
            description: "Dive into {{ name }} stations",
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
    collectionNotFound: "Collection \"{{ name }}\" was not found",
    noResultsForQuery: "No results were found for \"{{ query }}\"",
    impossibleToLoadStations: "It was impossible to load the stations",
    streamUnavailable: "Sorry, the stream {{name}} is unavailable right now.",
    failedWhileFetchingStations: "There was something wrong while fetching stations. Please, try again later."
};

const grid = {
    editorsChoice: "Editor's choice",
    automatic: "Automatic",
}

const hero = {
    title: "Where your taste sets the tone.",
    subtitle: "Discover thousands of open radio streams"
}

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
        grid,
        hero,
        info,
        search,
        settings,
        sidebar
    }
}