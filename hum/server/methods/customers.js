Meteor.methods({
	"customersInsert": function(data) {
		if(!Customers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Customers.insert(data);
	},

	"customersUpdate": function(id, data) {
		var doc = Customers.findOne({ _id: id });
		if(!Customers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Customers.update({ _id: id }, { $set: data });
	},

	"customersRemove": function(id) {
		var doc = Customers.findOne({ _id: id });
		if(!Customers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Customers.remove({ _id: id });
	}
});
