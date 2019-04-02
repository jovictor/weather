const app = require('../src/app');
const port = normalizaPort(process.env.PORT || '3000');
const mongoose = require('mongoose');

var url = 'mongodb+srv://dev:dev123@cluster0-u1jmx.mongodb.net/test?retryWrites=true';
var db = mongoose.connection;


function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
if (port >= 0) {
        return port;
    }
return false;
}

// Connecting in  mongo
db.on('error',console.error);
db.once('open',function(){
    console.log('Conected in MongoDb')
})
mongoose.connect(url);

// Initialize server
app.listen(port, function () {
    console.log(`Servidor rodando normalmente na porta ${port}`)
    return port
})




