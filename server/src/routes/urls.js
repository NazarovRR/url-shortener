import Url from "../models/url";
import express from "express";
import path from "path";
const router = express.Router();
const base = process.env.NODE_ENV === "production"? "http://lowcost-env.kwyuhfwi9s.us-west-2.elasticbeanstalk.com/" : "localhost:3000/";

router.post("/",function(req,res,next){
	const Model = Url.forge();
	if(req.body.encoded){
		Model.checkHashUniqueness(req.body.encoded).then(function(){
			//unique is true
			checkFullUrl();
		}).catch(function(){
			//hash is already taken
			return res.status(400).json({message:"This short url is already in use"});
		});
	} else {
		checkFullUrl();
	}

	function checkFullUrl(){
		Model.where("full_url",req.body.full_url).fetch().then(function(model){
			if(!model){
				Url.forge(req.body).save().then(function(newModel){
					Model.getEncoded(newModel,function(encodedValue){
						res.send({url:base+encodedValue});
					});
				}).catch(function(err){
					next(err);
				});
			} else {
				res.send({url:base+model.get("encoded")});
			}
		}).catch(function(err){
			next(err);
		});		
	}
});

export default router;