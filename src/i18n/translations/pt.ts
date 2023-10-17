const assets = {
    stations: {
        handpicked: {
            title: "Destaques",
            description: "Estações selecionadas para você aproveitar",
        },
        relaxation: {
            title: "Relaxamento",
            description: "Simplesmente pare e escute",
        },
        news: {
            title: "Notícias",
            description: "Mantenha-se atualizado",
        },
        recently_played: {
            title: "Recentemente tocadas",
            description: "Continue de onde parou",
        },
        library: {
            title: "Biblioteca",
            description: "Suas estações favoritas",
        }
    }
}

const controls = {
    showAll: "Mostrar todas",
};

const error = {
    unknown: "Erro desconhecido",
    somethingWentWrong: "Algo deu errado",
    pageNotFound: "Página não encontrada",
    playlistNotFound: "Playlist \"{{ name }}\" não foi encontrada",
    noResultsForQuery: "Nenhum resultado para \"{{ query }}\" foi encontrado",
    impossibleToLoadStations: "Não foi possível carregar as estações",
};

const search = {
    placeholder: "O que deseja escutar?",
    all: "Todas",
    yourLibrary: "Sua biblioteca",
    recentlyPlayed: "Tocadas recentemente",
    tags: {
        name: "Nome",
        tag: "Tag",
        countryCode: "Código do País",
        language: "Idioma",
    }
};

const info = {
    tryOtherCombinationOfWords: "Talvez tente outra combinação de palavras :(",
}

const settings = {
    title: "Configurações",
    theme: "Tema",
    mode: "Modo",
    corners: "Cantos",
    colorScheme: "Esquema de cores",
    language: "Idioma",
    modes: {
        light: "Claro",
        dark: "Escuro",
    },
    schemes: {
        default: "Padrão",
        solarized: "Solarizado", 
        monokai: "Monokai",
    }
};

const sidebar = {
    home: "Início",
    yourLibrary: "Sua Biblioteca",
    library: {
        empty: {
            title: "Sua biblioteca está vazia",
            message: "Adicione estações clicando o <0/> na radio desejada."
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
        sidebar,
    }
}