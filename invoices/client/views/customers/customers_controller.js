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
		this.customerListPagedExtraParams = {
			searchText: Session.get("CustomerListPagedSearchString") || "",
			searchFields: Session.get("CustomerListPagedSearchFields") || ["name", "phone", "email", "note", "invoiced"],
			sortBy: Session.get("CustomerListPagedSortBy") || "",
			sortAscending: Session.get("CustomerListPagedSortAscending"),
			pageNo: Session.get("CustomerListPagedPageNo") || 0,
			pageSize: Session.get("CustomerListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("customer_list_paged", this.customerListPagedExtraParams),
			Meteor.subscribe("customer_list_paged_count", this.customerListPagedExtraParams)
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
			customer_list_paged: Customers.find(databaseUtils.extendFilter({}, this.customerListPagedExtraParams), databaseUtils.extendOptions({sort:{name:1}}, this.customerListPagedExtraParams)),
			customer_list_paged_count: Counts.get("customer_list_paged_count")
		};
		

		
		data.customer_list_paged_page_count = this.customerListPagedExtraParams && this.customerListPagedExtraParams.pageSize ? Math.ceil(data.customer_list_paged_count / this.customerListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.customerListPagedExtraParams.pageNo >= data.customer_list_paged_page_count) {
			Session.set("CustomerListPagedPageNo", data.customer_list_paged_page_count > 0 ? data.customer_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});