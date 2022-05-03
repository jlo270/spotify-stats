import React, { useEffect } from 'react';
import _ from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { getToken } from '../store/actions/auth.actions'

const getParamValues = (url: any) => {
    return url
        .slice(1)
        .split('&')
        .reduce((prev: { [x: string]: any; }, curr: { split: (arg0: string) => [any, any]; }) => {
            const [title, value] = curr.split('=');
            prev[title] = value;
            return prev;
        }, {});
};

const RedirectPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    useEffect(() => {

        try {
            if (_.isEmpty(location.hash)) {
                return navigate('/home');
            }

            const authCode = getParamValues(location.hash);
            // const dispatch(getToken(authCode));
            navigate('/home');
        }
        catch (err) {
            console.log(err);
            navigate('/');
        }
    }
    );

    return (null);
}

export default RedirectPage;
