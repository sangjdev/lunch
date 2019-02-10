import React, { Component } from 'react';
import axios from '../../lib/request';
import defaultImage from '../../lib/defaultImage';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import hash from 'hash.js';

class upload extends Component {
  state = {
    isAuthenticated: false,
    name: '',
    file: '',
    url: defaultImage,
    pw: ''
  };

  handleSubmit = async e => {
    e.preventDefault();

    if (!this.state.name || !this.state.file) {
      alert('필드를 넣어주세요.');
      return;
    }

    let formData = new FormData();
    let file = this.state.file;
    formData.append('file', file);
    formData.append('name', this.state.name);

    try {
      await axios.post('/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('저장 완료');
      this.setState({
        isAuthenticated: true,
        name: '',
        file: null,
        url: defaultImage,
        pw: ''
      });
      this.inputFile.value = '';
    } catch (e) {
      alert('500 서버 오류');
    }
  };
  onChange = e => {
    const file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = e => {
      this.setState({
        url: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      this.setState({
        url: reader.result
      });
    } else {
      this.setState({
        url: ''
      });
    }

    this.setState({
      file: file
    });
  };
  onCertification = () => {
    const hpw = hash
      .sha256()
      .update(this.state.pw)
      .digest('hex');
    if (hpw === '79830ce5b6d9c51eea67ac4027dc78d07c08b95d625d41e63d92df892618d841') {
      this.setState({
        isAuthenticated: true
      });
    }
  };
  handleChange = pw => event => {
    this.setState({ [pw]: event.target.value });
  };

  render() {
    return this.state.isAuthenticated === true ? (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>업로드 이미지 선택</h1>
          <div className="formContainer">
            <div className="inputBox">
              <label htmlFor="image">음식 이름 : </label>&nbsp;
              <input
                type="text"
                className="input"
                placeholder="필수입력값입니다."
                value={this.state.name}
                onChange={e => {
                  this.setState({
                    name: e.target.value
                  });
                }}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="image">파일 선택 : </label>&nbsp;
              <input
                type="file"
                className="input"
                ref={ref => {
                  this.inputFile = ref;
                }}
                accept=".jpg, .jpeg, .png"
                onChange={this.onChange}
              />
            </div>
            <img src={this.state.url} alt="미리보기" />
            <div className="inputBox">
              <input type="submit" value="저장 하기" />
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div>
        <Dialog open={true} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">LUNCH</DialogTitle>
          <DialogContent>
            <DialogContentText>
              음식 사진 업로드를 위한 비밀번호를 입력해주세요.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="password"
              type="password"
              onChange={this.handleChange('pw')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCertification} color="primary">
              confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default upload;
