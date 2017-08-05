import React from 'react';
import AutosizeInput from 'react-input-autosize';
import {withRouter} from "react-router-dom";

export default class Search extends React.Component{
  constructor(props){
    super(props)
    this.state = {input: '', group: decodeURIComponent(window.location.pathname.slice(3))}
  }
  render(){
    return(
      <div className='ui right aligned container'>
        <div className='search'>
        <div className='inline'>Who's in </div>         
        <AutosizeInput
          placeholder={this.state.group || 'Search...'}
          value={this.state.input}
          onChange={(e) => {
            this.setState({input: e.target.value})
          }}
          onKeyPress={(e) => {
            if(e.key === 'Enter'){
              this.setState({input: '', group: e.target.value})
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