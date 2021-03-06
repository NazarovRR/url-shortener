import Url from "../models/url";
import express from "express";
import path from "path";
const router = express.Router();
let base;
if(process.env.FORWARD){
	base = process.env.FORWARD;
} else if(process.env.BASE_URL) {
	base = process.env.BASE_URL;
} else {
	base = "localhost:8081/";
}
router.get("/",function (req,res,next) {
	res.sendFile(path.join(path.resolve("build/src/public"), '/views/index.html'));
});
router.get("/:encoded",function(req,res,next){
	Url.forge().checkHashUniqueness(req.params.encoded).then(function(){
		//hash is unique, model not found
		res.redirect(404, base);
	}).catch(function(model){
		//found a model with such hash
		res.redirect(301, model.get("full_url"));
	});
});

export default router;