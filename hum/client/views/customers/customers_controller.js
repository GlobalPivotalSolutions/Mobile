this.CustomersController = RouteController.extend({
	template: "Customers",
	

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
		this.customersPagedExtraParams = {
			searchText: Session.get("CustomersPagedSearchString") || "",
			searchFields: Session.get("CustomersPagedSearchFields") || ["name", "address", "e_mail"],
			sortBy: Session.get("CustomersPagedSortBy") || "",
			sortAscending: Session.get("CustomersPagedSortAscending"),
			pageNo: Session.get("CustomersPagedPageNo") || 0,
			pageSize: Session.get("CustomersPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("customers_paged", this.customersPagedExtraParams),
			Meteor.subscribe("customers_paged_count", this.customersPagedExtraParams)
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
			customers_paged: Customers.find(databaseUtils.extendFilter({}, this.customersPagedExtraParams), databaseUtils.extendOptions({}, this.customersPagedExtraParams)),
			customers_paged_count: Counts.get("customers_paged_count")
		};
		

		
		data.customers_paged_page_count = this.customersPagedExtraParams && this.customersPagedExtraParams.pageSize ? Math.ceil(data.customers_paged_count / this.customersPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.customersPagedExtraParams.pageNo >= data.customers_paged_page_count) {
			Session.set("CustomersPagedPageNo", data.customers_paged_page_count > 0 ? data.customers_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});