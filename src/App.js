import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append(
      'image',
      this.setState.selectedFile,
      this.state.selectedFile.name
    );
    axios
      .post('https://cloud-function', fd, {
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload Progress ' +
              Math.round(progressEvent.loaded / progressEvent.total) * 100 +
              '%'
          );
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className='input-group mb-3'>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='inputGroupFile02'
            onChange={this.fileSelectedHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <label
            className='custom-file-label'
            htmlFor='inputGroupFile02'
            aria-describedby='inputGroupFileAddon02'
            onClick={() => this.fileInput.click()}
          >
            Choose file
          </label>
        </div>
        <div className='input-group-append'>
          <span
            className='input-group-text'
            id='inputGroupFileAddon02'
            onClick={this.fileUploadHandler}
          >
            Upload
          </span>
        </div>
      </div>
    );
  }
}

export default App;
