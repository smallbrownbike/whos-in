import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Members extends React.Component{
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