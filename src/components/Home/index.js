import React from 'react'
import { Loader, Card } from 'semantic-ui-react'

export default class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {itemsPerRow: 3, loading: true}
  }
  componentDidMount(){
    this.updateCard();
    window.addEventListener("resize", this.updateCard.bind(this));
    fetch('http://whosin.herokuapp.com/api/top', {method: 'POST'})
    .then(response => response.json())
    .then(json => {
      this.setState({top: json.top, loading: false})
    })
  }
  updateCard(){
    if(window.innerWidth < 700) {
      this.setState({itemsPerRow: 2})
    } else if(window.innerWidth < 1000) {
      this.setState({itemsPerRow: 3})
    } else {
      this.setState({itemsPerRow: 4})
    }
  }
  render(){
    if(!this.state.loading){
      return(
        <div className='ui container'>
          <div className='mtop'>
            <h2>Top Searches Today</h2>
            <Card.Group itemsPerRow={this.state.itemsPerRow}>
              {this.state.top.map((group, index) => {
                return(
                  <Card
                  key={index}
                  onClick={() => {this.props.history.push('/b/' + encodeURIComponent(group.group));}}
                  >
                    <Card.Content>
                      <div style={{fontSize: '1.5em'}}>{group.group}</div>
                    </Card.Content>
                  </Card>
                )
              })}
            </Card.Group>
          </div>
        </div>
      )
    } else {
      return(
        <Loader active />
      )
    }
  }
}