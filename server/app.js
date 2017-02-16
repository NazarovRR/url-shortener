import express from "express";
import urls from "./src/routes/urls";
import index from "./src/routes/index";
import bodyParser from 'body-parser';
import path from "path";
import ejs from "ejs";
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
// app.use(express.static(path.join(__dirname + '.../public')));
app.use(express.static(path.resolve("build/src/public")));
// app.set('views', './views');
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'html');
// app.use(express.static(path.resolve("build/src/public")));

app.use('/', index);
app.use('/api/v1', urls);
app.use(function(err,req,res,next){
	//trace the possible errors
	console.error(err);
    res.status(err.status >= 100 && err.status < 600 ? err.status : 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});
app.listen(process.env.PORT || 8081, function () {
  console.log('server started');
});