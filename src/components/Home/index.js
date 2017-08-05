import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {loading: true}
  }
  componentDidMount(){
    
  }
  render(){
    if(!this.state.loading){
      return(
        <div className='ui container'>
          <div className='mtop'>
            <h2>Top Searches</h2>
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