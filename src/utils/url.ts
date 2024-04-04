export function safe_url(url : string) {
    if (url.endsWith('/')) {
        return url.slice(0, -1)
    }
    else {
        return url
    }
}