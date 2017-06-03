export const toggleLogIn = () => {
    return {
        type: 'TOGGLE_LOGIN',
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(response) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: response.token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

//Call the API to get a token

export function logInUser(creds) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: creds
    };

    return dispatch => {
        dispatch(requestLogin(creds));

        return fetch('/api/login', config)
            .then(response =>
                response.json())
            .then(json => {
                if (json.success === true) {
                    localStorage.setItem('naim_token', json.token);
                    dispatch(receiveLogin(json));
                } else {
                    dispatch(loginError('error connecting'));
                    return Promise.reject(json);
                }
            }).catch(error => console.log(error));
    }
}
