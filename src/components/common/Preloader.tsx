import React from 'react';
//const preloader = require('../images/preloader.svg');

type Props = {
    isFetching: boolean

}

const Preloader: React.FC<Props> = (props) => {
    return (

        <div>
            {props.isFetching ? 'loading' : null}
        </div>

    );
}

export default Preloader;
