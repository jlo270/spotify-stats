
import * as React from 'react';
import { Link } from 'react-router-dom';

export const ExampleComponent: React.FC = () => (
    <div>
        <p>
            This is an example page.
        </p>
        <Link to='/'>Home</Link>
    </div>);