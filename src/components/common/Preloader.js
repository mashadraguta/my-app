import React from 'react';
import preloader from '../images/preloader.svg'; 


const Preloader = (props) => {
    return (
        <div>
            {props.isFetching ? <img src={preloader} /> : null}
        </div>
    );
}

export default Preloader;
