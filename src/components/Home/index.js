import React from 'react'
import { Loader, Card } from 'semantic-ui-react'

export default class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {loading: true}
  }
  componentDidMount(){
    fetch('http://localhost:8181/api/top', {method: 'POST'})
    .then(response => response.json())
    .then(json => {
      this.setState({top: json.top, loading: false})
    })
  }
  render(){
    if(!this.state.loading){
      return(
        <div className='ui container'>
          <div className='mtop'>
            <h2>Top Searches Today</h2>
            <Card.Group itemsPerRow={3}>
              {this.state.top.map((group) => {
                return(
                  <Card
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