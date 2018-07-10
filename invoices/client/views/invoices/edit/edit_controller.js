this.InvoicesEditController = RouteController.extend({
	template: "InvoicesEdit",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("customer_list"),
			Meteor.subscribe("invoice_details", this.params.invoiceId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			customer_list: Customers.find({}, {sort:{name:1}}),
			invoice_details: Invoices.findOne({_id:this.params.invoiceId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});