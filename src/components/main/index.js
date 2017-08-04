import React from 'react';
import wiki from 'wikijs';
import Members from '../Members/index'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {loading: true, group: decodeURIComponent(window.location.pathname.slice(1))}
  }
  componentWillMount(){
    fetch('http://localhost:8181/api/members', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({group: this.state.group})})
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json[0].person){
        this.setState({person: json, loading: false})
      } else {
        this.setState({current: json[0], past: json[1], loading: false})
      }
    })
  }
  render() {
    if(!this.state.loading && this.state.current){
      return (
        <div className='ui container'>
          <h1>Likely Current Members</h1>
            <Members members={this.state.current} current={true}/>
          <h1>Likely Past Members</h1>
            <Members members={this.state.past} current={false}/>
        </div>
      );
    } else if(!this.state.loading && this.state.person) {
      return (
        <div className='ui container'>
          <h1>Person</h1>
            <Members members={this.state.person} person={true}/>
        </div>
      )
    } else {
      return (
        <div className='center'>
          
        </div>
      )
    }
  }
}

export default Main;