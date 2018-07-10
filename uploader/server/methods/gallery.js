Meteor.methods({
	"galleryInsert": function(data) {
		if(!Gallery.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Gallery.insert(data);
	},

	"galleryUpdate": function(id, data) {
		var doc = Gallery.findOne({ _id: id });
		if(!Gallery.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Gallery.update({ _id: id }, { $set: data });
	},

	"galleryRemove": function(id) {
		var doc = Gallery.findOne({ _id: id });
		if(!Gallery.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Gallery.remove({ _id: id });
	}
});
