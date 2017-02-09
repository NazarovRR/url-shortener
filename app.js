import express from "express";
import urls from "./src/routes/urls";
import bodyParser from 'body-parser';
import path from "path";
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
app.use(express.static(path.resolve("src/public")));

app.use('/', urls);
app.use('/',function(err,req,res){
	//trace the possible errors
	console.error(err);
	res.status(500).render('error', { error: err })
});
app.listen(3000, function () {
  console.log('server started');
});