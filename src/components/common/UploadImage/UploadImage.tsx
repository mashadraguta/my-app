

import React, { ChangeEventHandler } from 'react';
import style from './UploadImage.module.css';


type PropsType = {
    onMainPhotoSelected: ChangeEventHandler<HTMLInputElement>
}


const UploadImage: React.FC<PropsType> = (props) => {

    return (
        <div className={style.container}>
            <label className={style.customFileUpload}>
                <input type="file" className={style.input__image}
                    onChange={props.onMainPhotoSelected} />
                update image
            </label>
        </div>
    );
}

export default UploadImage;
