import React from 'react';
import wiki from 'wikijs';
import { Card, Image } from 'semantic-ui-react'

class Members extends React.Component{
  render(){
    return(
      <Card.Group itemsPerRow={3}>
        {this.props.members.map((member) => {
          return (
            <Card
              onClick={() => {console.log('click')}}
            >
              <Card.Content>
                <Image avatar={true} floated='right' size='large' src={member.image} />
                <Card.Header>
                  {member.name}
                </Card.Header>
                <Card.Meta>
                  {this.props.person ? 'Born ' + member.born + ' in ' + member.area: this.props.current ? member.begin ? member.begin + ' to Now' : '' : member.begin && member.end ? member.begin + ' to ' + member.end : ''}
                </Card.Meta>
                <Card.Description>
                  {member.instrument.join(', ')}
                </Card.Description>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    )
  }
}

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