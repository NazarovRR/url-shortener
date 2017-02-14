import Url from "../models/url";
import express from "express";
import path from "path";
const router = express.Router();
const base = process.env.NODE_ENV === "production"? "insertaddresshere" : "localhost:3000/";
router.get("/",function (req,res,next) {
	res.sendFile(path.join(path.resolve("build/src/public"), '/views/index.html'));
});
router.get("/:encoded",function(req,res,next){
	Url.forge().where("encoded",req.params.encoded).fetch().then(function(model){
		if(model){
			res.redirect(model.get("full_url"));
		} else {
			res.redirect(base);
		}
	}).catch(function(){
		next();
	});
});
router.post("/",function(req,res,next){
	if(!req.body || !req.body.full_url){
		return res.status(400).send("Invalid post query");
	}
	Url.forge().where("full_url",req.body.full_url).fetch().then(function(model){
		if(!model){
			Url.forge({full_url:req.body.full_url}).save().then(function(newModel){
				res.send({url:base+newModel.get("encoded")});
			}).catch(function(){
				next();
			});
		} else {
			res.send({url:base+model.get("encoded")});
		}
	}).catch(function(){
		next();
	});
});

export default router;