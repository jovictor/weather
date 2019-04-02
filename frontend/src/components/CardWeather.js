import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/*
https://image.freepik.com/fotos-gratis/ceu-limpo_1388-1007.jpg
https://www.dnoticias.pt/binrepository/768x432/0c0/0d0/none/11506/DPRB/image_content_1643234_20180731084042.jpg
http://www.ocnet.com.br/arquivo/cache/noticia/aa7b08c5b6d26140c1cbbccee9d61c8f-420x.jpg
*/

class weatherCard extends React.Component{
  constructor(props){
    super(props);

    this.styles = {
      card: {
        maxWidth: 200,
      },
      media: {
        height: 100,
      },
    };
  }

  handleClick = () => {

    fetch("https://walterweather.herokuapp.com/api/weather/save",{ 
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        city: this.props.cityName ? this.props.cityName : "Itajaí - SC",
        observation: this.props.weather
      })
    })
    alert("Saved Sucessfully!")
    window.location.reload();
  }
  
  render(){
    return (
      <Card className={this.styles.card} >
        <CardActionArea>
          <CardMedia
            className={this.styles.media}
            image="https://image.freepik.com/fotos-gratis/ceu-limpo_1388-1007.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.cityName ? this.props.cityName : "Itajaí - SC"}
            </Typography>
            <Typography component="p">
              {this.props.weather}    
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClick}>
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

weatherCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default weatherCard;