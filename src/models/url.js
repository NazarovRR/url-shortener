import Bookshelf from "../db/database";
import Hashids from "hashids";
const Url = Bookshelf.Model.extend({
	tableName: 'urls',
	constructor: function() {
		Bookshelf.Model.apply(this, arguments);
		this.on('saved', function(model, attrs, options) {
			//after saving the model, we get an id and call for encode function
			this.encode(model);
		});
	},
	encode:function(model){
		//look if encoded exist, if not, create one
		if(!model.has("encoded") && model.has("full_url")){
			//hashids args:
			//first arg - salt
			//second arg - offset
			//third arg - collection of symbols to use
			const hashids = new Hashids("umbrella", 4, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
			const id = hashids.encode(model.get("id"));
			model.save({encoded:id});
		}
	}
});

export default Url;