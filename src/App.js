import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { __await } from 'tslib';

class App extends Component {

  state = {
    isLoading : true,
    groups : []
  }

  /**
   * 컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순으로 진행
   * state의 값을 세팅하기 위한 함수
   */
  async componentDidMount() {
    const response = await fetch('/api/groups');
    const body = await response.json();
    this.setState({groups:body, isLoading : false});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
