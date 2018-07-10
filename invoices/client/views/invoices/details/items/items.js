Template.InvoicesDetailsItems.onCreated(function() {
	
});

Template.InvoicesDetailsItems.onDestroyed(function() {
	
});

Template.InvoicesDetailsItems.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InvoicesDetailsItems.events({
	
});

Template.InvoicesDetailsItems.helpers({
	
});


var InvoicesDetailsItemsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InvoiceItemsPagedSearchString") || "",
		searchFields: Session.get("InvoiceItemsPagedSearchFields") || ["description", "quantity", "price", "amount"],
		sortBy: Session.get("InvoiceItemsPagedSortBy") || "",
		sortAscending: Session.get("InvoiceItemsPagedSortAscending") || true
	};

	var exportFields = ["description", "quantity", "price", "amount"];

	Meteor.call("invoiceItemsPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.InvoicesDetailsItemsView.onCreated(function() {
	
});

Template.InvoicesDetailsItemsView.onDestroyed(function() {
	
});

Template.InvoicesDetailsItemsView.onRendered(function() {
	Session.set("InvoicesDetailsItemsViewStyle", "table");
	
});

Template.InvoicesDetailsItemsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("InvoiceItemsPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("InvoiceItemsPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("InvoiceItemsPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("invoices.details.insert", mergeObjects(Router.currentRouteParams(), {invoiceId: this.params.invoiceId}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		InvoicesDetailsItemsViewExport("csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		InvoicesDetailsItemsViewExport("csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		InvoicesDetailsItemsViewExport("tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		InvoicesDetailsItemsViewExport("json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InvoiceItemsPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InvoiceItemsPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InvoiceItemsPagedPageNo") || 0;
		if(currentPage < this.invoice_items_paged_page_count - 1) {
			Session.set("InvoiceItemsPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.InvoicesDetailsItemsView.helpers({

	"insertButtonClass": function() {
		return InvoiceItems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.invoice_items_paged || this.invoice_items_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.invoice_items_paged && this.invoice_items_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.invoice_items_paged && this.invoice_items_paged.count() == 0 && Session.get("InvoiceItemsPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InvoiceItemsPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InvoiceItemsPagedPageNo") || 0) < this.invoice_items_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InvoiceItemsPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("InvoicesDetailsItemsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("InvoicesDetailsItemsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("InvoicesDetailsItemsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("InvoicesDetailsItemsViewStyle") == "gallery";
	}

	
});


Template.InvoicesDetailsItemsViewTable.onCreated(function() {
	
});

Template.InvoicesDetailsItemsViewTable.onDestroyed(function() {
	
});

Template.InvoicesDetailsItemsViewTable.onRendered(function() {
	
});

Template.InvoicesDetailsItemsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InvoiceItemsPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InvoiceItemsPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InvoiceItemsPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InvoiceItemsPagedSortAscending", !sortAscending);
		} else {
			Session.set("InvoiceItemsPagedSortAscending", true);
		}
	}
});

Template.InvoicesDetailsItemsViewTable.helpers({
});


Template.InvoicesDetailsItemsViewTableItems.onCreated(function() {
	
});

Template.InvoicesDetailsItemsViewTableItems.onDestroyed(function() {
	
});

Template.InvoicesDetailsItemsViewTableItems.onRendered(function() {
	
});

Template.InvoicesDetailsItemsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("invoiceItemsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("invoiceItemsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("invoices.details.edit", mergeObjects(Router.currentRouteParams(), {invoiceId: UI._parentData(1).params.invoiceId, itemId: this._id}));
		return false;
	}
});

Template.InvoicesDetailsItemsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return InvoiceItems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InvoiceItems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
