export function toQueryString(query: object): string {
    if (!Object.keys(query).length) return '';

    return `?${Object.entries(query).map(([queryName, queryValue]: [string, number | string | string[]]): string => {
        if (queryValue instanceof Array) {
            return queryValue.map((value) => `${queryName}=${value}`).join('&');
        } else {
            return `${queryName}=${queryValue}`
        }
    }).join('&')}`;
}