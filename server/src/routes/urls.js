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

router.post("/",function(req,res,next){
	const Model = Url.forge();
	if(req.body.encoded){
		Model.checkHashUniqueness(req.body.encoded).then(function(){
			//unique is true
			createNewSet(req.body);
		}).catch(function(){
			//hash is already taken
			return res.status(400).json({message:"This short url is already in use"});
		});
	} else {
		checkFullUrl();
	}

	function checkFullUrl(){
		Model.where("full_url",req.body.full_url).fetch().then(function(models){
			if(!models){
				createNewSet(req.body);
			} else {
				if(models.length && models.length > 1){
					res.send({url:base+models[0].get("encoded")});
				} else {
					res.send({url:base+models.get("encoded")});
				}
			}
		}).catch(function(err){
			next(err);
		});		
	}

	function createNewSet(params){
		Url.forge(params).save().then(function(newModel){
			Model.getEncoded(newModel,function(encodedValue){
				res.send({url:base+encodedValue});
			});
		}).catch(function(err){
			next(err);
		});
	}
});

export default router;