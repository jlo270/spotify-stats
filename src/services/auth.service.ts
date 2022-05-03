import axios, { AxiosResponse } from 'axios';
const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
    REACT_APP_CLIENT_SECRET,
} = process.env;


const AuthService = {
    getToken(code: string, state: string): Promise<AxiosResponse<{ access_token: string, token_type: string, scope: string, expires_in: number, refresh_token: string }>> {
        const grant_type = 'authorization_code';
        const config = {
            headers: {
                'Authorization': 'Basic ' + (new Buffer(REACT_APP_CLIENT_ID + ':' + REACT_APP_CLIENT_SECRET).toString('base64')),
                'Conent-Type': 'application/x-www-form-urlencoded'
            }
        };

        return axios.post(REACT_APP_AUTHORIZE_URL!, { params: { code, REACT_APP_REDIRECT_URL, grant_type, }, config })
    },


};

export default AuthService;