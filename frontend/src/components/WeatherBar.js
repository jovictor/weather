import React from 'react';
import PropTypes, { exact } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WeatherNavigate from "./WeatherNavigate"

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


class WeatherBar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchText: "",
      lat: "",
      long: "",
      cityName: "",
      currentCityContent: "",
      citiesList: []
    }
  }
 

  handleChange = (event) => {
    this.setState({searchText: event.target.value})
  }


  handleFetchAPI = (latitude, longitude) => {
    fetch('https://walterweather.herokuapp.com/api/weather?lat=' + latitude + '&long=' + longitude)
    .then(response => {
      if(response.ok)
        return response.json()
    })
    .then(dataResponse => {
      //console.log(dataResponse.daily.summary)
      this.setState({currentCityContent: dataResponse.daily.summary})
    })
  }

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


  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetch("http://www.mapquestapi.com/geocoding/v1/address?key=RegHRab3j60kdfN7atw7o8B9DmAfEITp&location=" + this.state.searchText)
      .then(response => {
        if(response.ok)
          return response.json()
      })
      .then(dataResponse => {
        let latitude = dataResponse.results[0].locations[0].latLng.lat
        let longitude = dataResponse.results[0].locations[0].latLng.lng
        let city = dataResponse.results[0].locations[0].adminArea5
        let countryState = dataResponse.results[0].locations[0].adminArea3

        this.setState({lat: latitude})
        this.setState({long: longitude})
        this.setState({cityName: city + " - " + countryState})
        
        if(countryState){
          this.handleFetchAPI(latitude, longitude)
        }else{
          alert("City invalid!")
          this.setState({cityName: "Itajaí - SC"})
        }
      }) 
    }
  }


  componentDidMount(){
    let latitude = this.state.lat;
    let longitude = this.state.long;
    
    if(latitude.length == 0 || longitude.length == 0){
      latitude = "-26.911788"
      longitude = "-48.666985"
    }

    this.handleFetchAPI(latitude, longitude)
    this.handleFetchAPIList()
  }

  render(){
  const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              {this.props.name}
            </Typography>
            <div className={classes.grow} />
            {this.props.search === true &&
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="City, State"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleChange}
                onKeyPress={this._handleKeyPress}
              />
            </div>
            }
          </Toolbar>
        </AppBar>
        <WeatherNavigate citiesList={this.state.citiesList} currentCityContent={this.state.currentCityContent} cityName={this.state.cityName} />
      </div>
    );
  }
}


WeatherBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeatherBar);