Template.Customers.onCreated(function() {
	
});

Template.Customers.onDestroyed(function() {
	
});

Template.Customers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Customers.events({
	
});

Template.Customers.helpers({
	
});


var CustomersListExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("CustomersPagedSearchString") || "",
		searchFields: Session.get("CustomersPagedSearchFields") || ["name", "address", "e_mail"],
		sortBy: Session.get("CustomersPagedSortBy") || "",
		sortAscending: Session.get("CustomersPagedSortAscending") || true
	};

	var exportFields = [];

	Meteor.call("customersPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CustomersList.onCreated(function() {
	
});

Template.CustomersList.onDestroyed(function() {
	
});

Template.CustomersList.onRendered(function() {
	Session.set("CustomersListStyle", "table");
	
});

Template.CustomersList.events({
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
				Session.set("CustomersPagedSearchString", searchString);
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
					Session.set("CustomersPagedSearchString", searchString);
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
					Session.set("CustomersPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("customers.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CustomersListExport("csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CustomersListExport("csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CustomersListExport("tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CustomersListExport("json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("CustomersPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("CustomersPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("CustomersPagedPageNo") || 0;
		if(currentPage < this.customers_paged_page_count - 1) {
			Session.set("CustomersPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CustomersList.helpers({

	

	"isEmpty": function() {
		return !this.customers_paged || this.customers_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.customers_paged && this.customers_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.customers_paged && this.customers_paged.count() == 0 && Session.get("CustomersPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("CustomersPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("CustomersPagedPageNo") || 0) < this.customers_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("CustomersPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CustomersListStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CustomersListStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CustomersListStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CustomersListStyle") == "gallery";
	}

	
});


Template.CustomersListTable.onCreated(function() {
	
});

Template.CustomersListTable.onDestroyed(function() {
	
});

Template.CustomersListTable.onRendered(function() {
	
});

Template.CustomersListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("CustomersPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("CustomersPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("CustomersPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("CustomersPagedSortAscending", !sortAscending);
		} else {
			Session.set("CustomersPagedSortAscending", true);
		}
	}
});

Template.CustomersListTable.helpers({
});


Template.CustomersListTableItems.onCreated(function() {
	
});

Template.CustomersListTableItems.onDestroyed(function() {
	
});

Template.CustomersListTableItems.onRendered(function() {
	
});

Template.CustomersListTableItems.events({
	

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

		Meteor.call("customersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("customersRemove", me._id, function(err, res) {
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
		Router.go("customers.edit", mergeObjects(Router.currentRouteParams(), {customerId: this._id}));
		return false;
	}
});

Template.CustomersListTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }
	

	
});
