import React from 'react'
import { Card, Image, Transition } from 'semantic-ui-react'

export default class Members extends React.Component{
  render(){
    if(this.props.members.length === 0){
      return(
        <div>None</div>
      )
    } else {
      return(
        <Card.Group itemsPerRow={3}>
          {this.props.members.map((member, index) => {
            return (
              <Transition visible={this.props.visible} animation='scale' duration={500}>
                <Card
                  onClick={()=>{window.open('http://www.wikiwand.com/en/' + member.name, '_blank')}}
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
              </Transition>
            )
          })}
          
        </Card.Group>
        
      )
    }
  }
}