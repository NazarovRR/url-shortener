import Bookshelf from "../db/database";
import Hashids from "hashids";
//hashids args:
//first arg - salt
//second arg - offset
//third arg - collection of symbols to use
const hashids = new Hashids("umbrella", 3, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Url = Bookshelf.Model.extend({
	tableName: 'urls',
	constructor: function() {
		Bookshelf.Model.apply(this, arguments);
		this.on('created', function(model, attrs, options) {
			//after saving the model, we get an id and call for encode function
			this.setHashFromId(model,model.get("id"));
		});
	},
	setHashFromId:function(model, id){
		//auto hash is created depending on ids
		const self = this;
		if(!model.has("encoded")){
			if(!Array.isArray(id)){
				//hashids lib gets an array of numbers to hash
				id=[id];
			}
			self.generateNewHash(id).then(function(newHash){
				//if hash is not taken, it goes to a model to update with new information
				model.save({encoded:newHash},{method: "update"});
			}).catch(function(){
				//if hash is taken by custom token, provided by user, hash is created by updating the array of dublicate id, which create entirely new hash.
				//repeat this till hash is unique, rare case actually
				id.push(id[0]);
				self.setHashFromId(model,id);
			});
		}
	},
	checkHashUniqueness:function(hash){
		return new Promise(function(resolve, reject){
			Url.forge().where({encoded:hash}).fetch().then(function(model){
				if(model){
					//model with such hash found, not unique, return a model
					reject(model);
				} else {
					//no hash found, new hash is unique
					resolve();
				}
			});
		});
	},
	generateNewHash:function(id){
		const self = this;
		return new Promise(function(resolve, reject){
			const hash = hashids.encode(id);
			self.checkHashUniqueness(hash).then(function(){
				resolve(hash);
			}).catch(function(){
				reject();
			});
		});
	},
	getEncoded: function(model,cb){
		const self = this;
		//in rare cases, i guess only for direct testing, there is a wait function to get encoded, after it's done
		if(model.has("encoded")){
			cb(model.get("encoded"));
		} else {
			setTimeout(function(){
				self.getEncoded(model,cb);
			},40);
		}
	}
});

export default Url;