import React from 'react';
import AutosizeInput from 'react-input-autosize';
import {withRouter} from "react-router-dom";

export default class Search extends React.Component{
  constructor(props){
    super(props)
    this.state = {input: ''}
  }
  render(){
    return(
      <div className='ui right aligned container'>
        <div className='search'>
        <div className='inline'>Who's in </div>         
        <AutosizeInput
          placeholder={this.props.group || 'search...'}
          value={this.state.input}
          onChange={(e) => {
            this.setState({input: e.target.value})
          }}
          onKeyPress={(e) => {
            if(e.key === 'Enter'){
              this.setState({input: ''})
              this.props.history.push('/b/' + encodeURIComponent(e.target.value));
            }
          }}
        />
        <div className='inline'>?</div>
        </div>
      </div>
    )
  }
}