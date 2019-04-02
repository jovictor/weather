import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CloudIcon from '@material-ui/icons/Cloud';
import HistoryIcon from '@material-ui/icons/History';
import WeatherBar from "./WeatherBar"

import CardWheater from './CardWeather'
import ExpansionWeather from './ExpansionWeather'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class NavTabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      citiesList: [],
      currentCityContent:"",
      refreshed: false,
      barName: "Walter Weather"
    }
  }

  handleChange = (event, value) => { 
    this.setState({ value });
  };

  handleRefresh = (name) => {
    this.setState({ barName: name});
  };

  handleFetchAPIList(){
    fetch('https://walterweather.herokuapp.com/api/weather/list')
    .then(response => {
      if(response.ok)
        return response.json()
    })
    .then(data => {
      this.setState({citiesList: data})
    })
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
              <LinkTab label="Today" href="today" icon={<CloudIcon />}/>
              <LinkTab label="History" href="history" icon={<HistoryIcon />}/>
            </Tabs>
          </AppBar>
          
          {this.state.value == 0 && <TabContainer><CardWheater cityName={this.props.cityName} weather={this.props.currentCityContent}/></TabContainer>} 
          {this.props.citiesList.map((item, i) => {
            if(this.state.value === 1)
              return <TabContainer key={i}><ExpansionWeather city={item.city} dateSaved={item.dateSaved} observation={item.observation} code={item.id}/></TabContainer>
          })}
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);