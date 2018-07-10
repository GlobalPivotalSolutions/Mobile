this.InvoicesController = RouteController.extend({
	template: "Invoices",
	

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
		this.invoiceListPagedExtraParams = {
			searchText: Session.get("InvoiceListPagedSearchString") || "",
			searchFields: Session.get("InvoiceListPagedSearchFields") || ["invoiceNumber", "date", "customerId", "customer.name", "totalAmount"],
			sortBy: Session.get("InvoiceListPagedSortBy") || "",
			sortAscending: Session.get("InvoiceListPagedSortAscending"),
			pageNo: Session.get("InvoiceListPagedPageNo") || 0,
			pageSize: Session.get("InvoiceListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("invoice_list_paged", this.invoiceListPagedExtraParams),
			Meteor.subscribe("invoice_list_paged_count", this.invoiceListPagedExtraParams)
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
			invoice_list_paged: Invoices.find(databaseUtils.extendFilter({}, this.invoiceListPagedExtraParams), databaseUtils.extendOptions({sort:{invoiceNumber:-1}}, this.invoiceListPagedExtraParams)),
			invoice_list_paged_count: Counts.get("invoice_list_paged_count")
		};
		

		
		data.invoice_list_paged_page_count = this.invoiceListPagedExtraParams && this.invoiceListPagedExtraParams.pageSize ? Math.ceil(data.invoice_list_paged_count / this.invoiceListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.invoiceListPagedExtraParams.pageNo >= data.invoice_list_paged_page_count) {
			Session.set("InvoiceListPagedPageNo", data.invoice_list_paged_page_count > 0 ? data.invoice_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});