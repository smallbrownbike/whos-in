import React from 'react';
import wiki from 'wikijs';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

const style = {
  width: 600,
  height: 600
}

class Main extends React.Component {
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
        <div className='center'>
          
            <GridList>
              {this.state.current.map((member, index) => {
                return(
                  <GridTile
                    key={index}
                    title={member}
                  >
                    <img src={'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg'} />
                  </GridTile>
                )
              })}
            </GridList>
          
          
        </div>
      );
    } else if(!this.state.loading && !this.state.current) {
      return (
        <div className='center'>Couldn't find any active band members in <span className='red'>{this.state.group}</span></div>
      )
    } else {
      return (
        <div className='center'>
          <CircularProgress color={'black'} size={80} thickness={5} />
        </div>
      )
    }
  }
}

export default Main;