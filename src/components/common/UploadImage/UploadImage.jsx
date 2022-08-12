

import React from 'react';
import style from './UploadImage.module.css';
const UploadImage = (props) => {

    return (
        <div className={style.container}>
            <label className={style.customFileUpload}>
                <input type="file" className = {style.input__image}
                onChange={props.onMainPhotoSelected} />
                update image
            </label>
        </div>
    );
}

export default UploadImage;
