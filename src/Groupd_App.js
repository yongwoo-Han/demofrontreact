import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
    this.setState({ groups:body, isLoading : false});
  }

  render() {
    const {groups, isLoading} = this.state;

    if(isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG List</h2>
            {groups.map(group => 
              <div key={group.id}>
                {group.name}
              </div>  
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
