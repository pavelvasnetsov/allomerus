export function toQueryString(query: object): string {
    return Object.entries(query).map(([queryName, queryValue]: [string, number | string | string[]]): string => {
        if (queryValue instanceof Array) {
            return queryValue.map((value) => `${queryName}=${value}`).join('&');
        } else {
            return `${queryName}=${queryValue}`
        }
    }).join('&');
}