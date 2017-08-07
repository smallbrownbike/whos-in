import React from 'react'
import { Card, Image, Transition } from 'semantic-ui-react'

export default class Members extends React.Component{
  constructor(props){
    super(props)
    this.state = {itemsPerRow: 3}
  }
  componentDidMount() {
    this.updateCard();
    window.addEventListener("resize", this.updateCard.bind(this));
  }
  updateCard(){
    if(window.innerWidth < 500) {
      this.setState({itemsPerRow: 1})
    } else if(window.innerWidth < 700) {
      this.setState({itemsPerRow: 2})
    } else if(window.innerWidth < 1000) {
      this.setState({itemsPerRow: 3})
    } else {
      this.setState({itemsPerRow: 4})
    }
  }
  render(){
    if(this.props.members.length === 0){
      return(
        <div>None</div>
      )
    } else {
      return(
        <Card.Group
         itemsPerRow={this.state.itemsPerRow}>
          {this.props.members.map((member, index) => {
            return (
              <Transition visible={this.props.visible || false} animation='scale' duration={500}>
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