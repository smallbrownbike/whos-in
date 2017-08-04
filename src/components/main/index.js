import React from 'react';
import wiki from 'wikijs';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {loading: true, group: decodeURIComponent(window.location.pathname.slice(1))}
  }
  componentWillMount(){
    wiki().page(this.state.group)
    .then(page => page.info('currentMembers'))
    .then(info => {
      if(info){
        this.setState({current: info})
      }
      this.setState({loading: false})
    })
  }
  render() {
    if(!this.state.loading && this.state.current){
      return (
        <div>
          {this.state.current.map((member, index) => {
            return(
              <li key={index}>
                {member}
              </li>
            )
          })}
        </div>
      );
    } else if(!this.state.loading && !this.state.current) {
      return (
        <div>Couldn't find any active band members in <span className='red'>{this.state.group}</span></div>
      )
    } else {
      return (
        <div>Loading....</div>
      )
    }
  }
}

export default App;