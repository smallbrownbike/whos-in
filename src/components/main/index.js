import React from 'react';
import Members from '../Members/index'
import { Loader } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {loading: true}
    this.generateContent = this.generateContent.bind(this)
  }
  
  generateContent(location){
    if(!this.state.loading){
      this.setState({loading: true, visible: false})
    }
    var group = decodeURIComponent(location)
    fetch('http://whosin.herokuapp.com/api/members', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({group: group})})
    .then(response => response.json())
    .then(json => {
      if(json.error){
        this.setState({current: null, past: null, error: json.error})
      } else if(json[0].person){
        this.setState({person: json, past: []})
      } else {
        this.setState({current: json[0], past: json[1]})
      }
      this.setState({loading: false})
      this.setState({visible: true})
    })
  }

  componentWillReceiveProps(nextProps){
    this.generateContent(nextProps.location.pathname.slice(3));
  }

  componentDidMount() {
    this.generateContent(window.location.pathname.slice(3));
  }
  render() {
    if(!this.state.loading){
      if(this.state.current || this.state.person){
        return (
            <div className='ui container'>
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
        <div className='ui container'>
          <div className='mtop'>
            <h2>Likely Current Members</h2>
              <Loader active inline='centered' />
            <h2>Likely Past Members</h2>
              <Loader active inline='centered' />
          </div>
        </div>
      )
    }
  }
}

export default Main;