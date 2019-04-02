import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ExpansionWeather extends React.Component{
  constructor(props){
    super();
    this.state = {
      id: props.code,
      expanded: null,
    }
  }


  HandleDeleteClick = () => {
    fetch('https://walterweather.herokuapp.com/api/weather/delete/' + this.state.id, {method: 'DELETE'})
    .then(response => {
      if(response.ok)
        alert("Deleted Sucessfully!")
        window.location.reload();
        return response.json()
    })
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render(){
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.props.city}</Typography>
            <Typography className={classes.secondaryHeading}>{this.props.dateSaved}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {this.props.observation}
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary" onClick={this.HandleDeleteClick}>
            Delete
          </Button>
        </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

ExpansionWeather.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionWeather);