Invoices.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

Invoices.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(!doc.totalAmount) doc.totalAmount = 0;
});

Invoices.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Invoices.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Invoices.before.remove(function(userId, doc) {
	
});

Invoices.after.insert(function(userId, doc) {
	
var sum = 0; Invoices.find({ customerId: doc.customerId }).map(function(item) { sum += item.totalAmount; }); Customers.update({ _id: doc.customerId }, { $set: { invoiced: sum }});
});

Invoices.after.update(function(userId, doc, fieldNames, modifier, options) {
	
var sum = 0; Invoices.find({ customerId: doc.customerId }).map(function(item) { sum += item.totalAmount; }); Customers.update({ _id: doc.customerId }, { $set: { invoiced: sum }});
});

Invoices.after.remove(function(userId, doc) {
	
var sum = 0; Invoices.find({ customerId: doc.customerId }).map(function(item) { sum += item.totalAmount; }); Customers.update({ _id: doc.customerId }, { $set: { invoiced: sum }});
});
