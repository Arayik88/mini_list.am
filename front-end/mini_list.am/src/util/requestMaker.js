export function deleteAuthToken() {
    localStorage.removeItem('jwt_token');
    window.location.reload();
}

export function getAuthToken() {
    return localStorage.getItem('jwt_token');
}
const baseUrl = 'http://localhost:8080';
function getHeaders() {
    const auth = getAuthToken();
    if (!auth) {
        return {
            'Content-Type': 'application/json',
        };
    }
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer_${auth}`,
    };
}
async function request(url, headers = {}, method, body = {}) {
    const options = {
        method,
        headers: {
            ...getHeaders(),
            ...headers,
        },
        body,
    };
    const response = await fetch(baseUrl + url, options);
    if (response.status !== 200) {
        throw new Error(`Response.Status: ${response.status}`);
    }
    return response;
}
export const makeGet = async (url, headers, body) => request(url, headers, 'GET', body);
export const makePost = async (url, headers, body) => request(url, headers, 'POST', body);