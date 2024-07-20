import React from 'react';
import { useField } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;
  const [field, meta, helpers] = useField(rest.name);
  const { setValue } = helpers;

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(file);
      const fileNameContainer = document.getElementById('fileNameContainer');
      fileNameContainer.textContent = file.name;
    }
  };

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}></span>
      <input
        className={fileInput}
        id="fileInput"
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default FieldFileInput;
