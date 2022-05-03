import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';


import "primereact/resources/themes/lara-dark-indigo/theme.css";  //theme
import "primereact/resources/primereact.css";                  //core css
import "primeicons/primeicons.css";

/** Generates a random string containing numbers and letters of n characters */
const generateRandomString = (n: number) => (Math.random().toString(36) + Array(n).join('0')).slice(2, n + 2);

// TODO: change for prod
const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, REACT_APP_REDIRECT_URL } = process.env

const queryString = require('query-string');


export const PublicPage: React.FC = () => {

    //This realistically shouldn't be needed, but I want to show a loading state change to the user before the redirect.
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onLoadingClick = () => {
        setLoading(true);
        const scope = 'user-top-read';
        const state = generateRandomString(16);

        const authURL = "https://accounts.spotify.com/authorize?" +
            queryString.stringify({
                response_type: 'code',
                client_id: REACT_APP_CLIENT_ID,
                scope: scope,
                redirect_uri: REACT_APP_REDIRECT_URL,
                state: state
            });

        console.log(authURL);
        window.location.replace(authURL);
    }


    return (
        <div className="text-center">
            <div className="card">
                <p>
                    CLick here to Login to the App with your Spotify Account
                </p>
                <Button className='p-button-success' label="Login in to Spotify" loading={loading} onClick={onLoadingClick} />
            </div>
        </div>
    );
};

export default PublicPage;