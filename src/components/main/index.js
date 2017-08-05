import React from 'react';
import wiki from 'wikijs';
import Members from '../Members/index'
import { Input, Loader, Transition } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {visible: false, loading: true, group: decodeURIComponent(window.location.pathname.slice(1))}
  }
  componentWillMount(){
    fetch('http://localhost:8181/api/members', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({group: this.state.group})})
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json.error){
        this.setState({error: json.error, loading: false})
      } else if(json[0].person){
        this.setState({person: json, past: [], loading: false})
      } else {
        this.setState({current: json[0], past: json[1], loading: false})
      }
      this.setState({visible: true})
    })
  }
  render() {
    if(!this.state.loading && this.state.current || !this.state.loading && this.state.person){
      return (
          <div className='ui container'>
            <div className='ui right aligned container'>
              <div className='search'>Who's in </div>
              <Input size={'huge'} transparent placeholder={this.state.group} />
              <div className='search'>?</div>
            </div>
            <div className='mtop'>
              <h2>Likely Current Members</h2>
                <Members visible={this.state.visible} members={this.state.person ? this.state.person : this.state.current} person={this.state.person ? true : false} current={true}/>
              <h2>Likely Past Members</h2>
                <Members visible={this.state.visible} members={this.state.past} current={false}/>
            </div>
          </div>
        
      );
    } else if(!this.state.loading && this.state.error){
      return (
        <div className='center'>
          <h1>{this.state.error}</h1>
        </div>
      )
    } else {
      return (
        <Loader active />
      )
    }
  }
}

export default Main;