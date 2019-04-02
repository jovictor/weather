var fetch = require('node-fetch');
var Weather = require('../models/weatherModel');


exports.get =  async (req, res) => {
    let url  = 'https://api.darksky.net/forecast/9eb31f3c966b0932c87bff5d885aacf4/'
    let long = req.query.long;
    let lat  = req.query.lat;
    
    let response = await fetch(url + lat + ',' + long + '?lang=pt&units=si')
    let responseJson = await response.json();

    if(res.statusCode != 200){
        res.status(404).send({"message": "Error to API"});
        
    }
    else{
        res.status(200).send(responseJson);
        
    }
}


exports.post = (req, res) => {
    let weather = new Weather(req.body);

    weather.save((err) => {
        if(err){
          res.status(404).send('Fail to include weather');
        }
        else {
            res.status(200).send(weather);
        }
    });
}

exports.delete = (req,res) => {
    let idWeather = req.params.id;

    Weather.findOneAndRemove({ id: idWeather },(err,todo) => {
        if(err){ 
            res.status(404).send(res) 
        }else{
           res.status(200).send({ message: "Sucessfully deleted", id: idWeather }) 
        }
    })

}

exports.list = (req,res) => {
    let citySearch = req.query.city;
    let dateSearch  = req.query.date;
    var query;
   

    if(citySearch)
        query = Weather.find({  city: citySearch })
        
    if(dateSearch)
        query = Weather.find({ date: dateSearch })

    if(!citySearch && !dateSearch)
        query = Weather.find()
    
    query.exec((err, docs) =>{  
        if(err){
            res.status(400).send({message: "Error to load list"})
        }else{
            res.status(200).send(docs)
        }
    })
}
