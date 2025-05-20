import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

const FileUploader = ({ setData }) => {
  const onDrop = (acceptedFiles) => {
    Papa.parse(acceptedFiles[0], {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="uploader">
      <input {...getInputProps()} />
      <p>Drag & drop or click to upload your expenses CSV</p>
    </div>
  );
};

export default FileUploader;
