import React from 'react';
const preloader = require('../images/preloader.svg');

export type Props = {
    isFetching?: boolean

}

const Preloader: React.FC<Props> = (props) => {
    return (

        <div>
            {props.isFetching ? <img src={preloader} /> : null}
        </div>

    );
}

export default Preloader;
