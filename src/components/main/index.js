import React from 'react';
import Members from '../Members/index'
import { Loader } from 'semantic-ui-react'
import AutosizeInput from 'react-input-autosize'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {input: '', visible: false, loading: true, group: decodeURIComponent(window.location.pathname.slice(1))}
  }
  componentDidMount(){
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
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      window.location.pathname = encodeURIComponent(e.target.value);
    }
  }
  render() {
    if(!this.state.loading){
      if(this.state.current || this.state.person){
        return (
            <div className='ui container'>
              <div className='ui right aligned container'>
                <div className='search'>
                <div className='inline'>Who's in </div>         
                <AutosizeInput
                  placeholder={this.state.group}
                  value={this.state.input}
                  onChange={(e) => {
                    this.setState({input: e.target.value})
                  }}
                  onKeyPress={(e) => {
                    if(e.key === 'Enter'){
                      window.location.pathname = encodeURIComponent(e.target.value);
                    }
                  }}
                />
                <div className='inline'>?</div>
                </div>
              </div>
              <div className='mtop'>
                <h2>Likely Current Members</h2>
                  <Members visible={this.state.visible} members={this.state.person ? this.state.person : this.state.current} person={this.state.person ? true : false} current={true}/>
                <h2>Likely Past Members</h2>
                  <Members visible={this.state.visible} members={this.state.past} current={false}/>
              </div>
            </div>
          
        );
      } else if(this.state.error){
        return (
          <div className='center'>
            <h1>{this.state.error}</h1>
          </div>
        )
      }
    } else {
      return (
        <Loader active />
      )
    }
  }
}

export default Main;