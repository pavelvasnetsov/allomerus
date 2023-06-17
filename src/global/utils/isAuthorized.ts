export function isAuthorized(): boolean {
    return !!localStorage.getItem('access_token');
}