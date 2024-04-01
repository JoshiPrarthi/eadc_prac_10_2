var express = require('express');
var PORT;
var Cloudant = require('@cloudant/cloudant');

if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-182sso54wjwbhfsn4vutlvd52tohwxm5tr5neu0vzjf8:ef898583465dfc2b6ae676f89dbe74ca@fda58982-1434-460f-8929-dfc3615c3c07-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-182sso54wjwbhfsn4vutlvd52tohwxm5tr5neu0vzjf8";
var password = "ef898583465dfc2b6ae676f89dbe74ca";
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/task.html");
});


app.get('/list_of_databases', function (req, res) {
  
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); 

  // Lists all the databases.
  cloudant.db.list().then((body) => {
res.send(body);
  }).catch((err) => { res.send(err); });
});
});

app.post('/submit', function (req, res) {
var id,name,address,phone,age,database_name;
        database_name="prarthi_prac10";
        id= req.body.id,
        name= req.body.name;
        address= req.body.address;
        phone= req.body.phone;
        age= req.body.age;
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database_name).insert({ "name": name, "address": address, "phone": phone, "age": age }, id , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});
});   
   

app.listen(PORT);