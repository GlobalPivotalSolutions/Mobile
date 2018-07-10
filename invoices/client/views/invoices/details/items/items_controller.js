this.InvoicesDetailsItemsController = RouteController.extend({
	template: "InvoicesDetails",
	

	yieldTemplates: {
		'InvoicesDetailsItems': { to: 'InvoicesDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("InvoicesDetails"); this.render("loading", { to: "InvoicesDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.invoiceItemsPagedExtraParams = {
			searchText: Session.get("InvoiceItemsPagedSearchString") || "",
			searchFields: Session.get("InvoiceItemsPagedSearchFields") || ["description", "quantity", "price", "amount"],
			sortBy: Session.get("InvoiceItemsPagedSortBy") || "",
			sortAscending: Session.get("InvoiceItemsPagedSortAscending"),
			pageNo: Session.get("InvoiceItemsPagedPageNo") || 0,
			pageSize: Session.get("InvoiceItemsPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("invoice_items_paged", this.params.invoiceId, this.invoiceItemsPagedExtraParams),
			Meteor.subscribe("invoice_items_paged_count", this.params.invoiceId, this.invoiceItemsPagedExtraParams),
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
			invoice_items_paged: InvoiceItems.find(databaseUtils.extendFilter({invoiceId:this.params.invoiceId}, this.invoiceItemsPagedExtraParams), databaseUtils.extendOptions({}, this.invoiceItemsPagedExtraParams)),
			invoice_items_paged_count: Counts.get("invoice_items_paged_count"),
			invoice_details: Invoices.findOne({_id:this.params.invoiceId}, {})
		};
		

		
		data.invoice_items_paged_page_count = this.invoiceItemsPagedExtraParams && this.invoiceItemsPagedExtraParams.pageSize ? Math.ceil(data.invoice_items_paged_count / this.invoiceItemsPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.invoiceItemsPagedExtraParams.pageNo >= data.invoice_items_paged_page_count) {
			Session.set("InvoiceItemsPagedPageNo", data.invoice_items_paged_page_count > 0 ? data.invoice_items_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});