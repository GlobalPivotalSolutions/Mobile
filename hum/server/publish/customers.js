Meteor.publish("customers", function() {
	return Customers.find({}, {});
});

Meteor.publish("customers_empty", function() {
	return Customers.find({_id:null}, {});
});

Meteor.publish("customers_selected", function(customerId) {
	return Customers.find({_id:customerId}, {});
});

Meteor.publish("customers_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Customers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("customers_paged_count", function(extraOptions) {
	Counts.publish(this, "customers_paged_count", Customers.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"customersPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Customers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

