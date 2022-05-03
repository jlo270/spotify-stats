import * as React from 'react';

interface PageNotFoundProps {
    location: { pathname: 'string' };
}

export const PageNotFound: React.FC<PageNotFoundProps> = ({ location }) => (
    <p>
        PAGE NOT FOUND - the path, {location.pathname}, did not match
        any routes.
    </p>
);