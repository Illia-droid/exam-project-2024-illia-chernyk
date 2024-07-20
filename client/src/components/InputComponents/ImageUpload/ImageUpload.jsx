import React, { useState } from 'react';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import CONSTANTS from '../../../constants';

const ImageUpload = (props) => {
  const {
    data: { avatar },
  } = useSelector((state) => state.userStore);
  const [field, , helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        helpers.setValue(file); // Set the value of the field in Formik
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      <img
        src={
          preview ||
          (avatar === 'anon.png'
            ? CONSTANTS.ANONYM_IMAGE_PATH
            : `${CONSTANTS.publicURL}${avatar}`)
        }
        className={classNames({ [imgStyle]: !!field.value })}
        alt={avatar}
      />
    </div>
  );
};

export default ImageUpload;
