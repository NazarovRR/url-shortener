import express from "express";
import urls from "./src/routes/urls";
import index from "./src/routes/index";
import bodyParser from 'body-parser';
import path from "path";
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
app.use(express.static(path.resolve("build/src/public")));

app.use('/', index);
app.use('/api/v1', urls);
app.use(function(err,req,res,next){
	//trace the possible errors
	console.error(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(3000, function () {
  console.log('server started');
});