export const getURLWithCorsEnabled = (url?: string) => {
    return url && `https://api.allorigins.win/raw?url=${url}`
}