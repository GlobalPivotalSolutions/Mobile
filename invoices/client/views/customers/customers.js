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


var CustomersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("CustomerListPagedSearchString") || "",
		searchFields: Session.get("CustomerListPagedSearchFields") || ["name", "phone", "email", "note", "invoiced"],
		sortBy: Session.get("CustomerListPagedSortBy") || "",
		sortAscending: Session.get("CustomerListPagedSortAscending") || true
	};

	var exportFields = ["name", "phone", "email", "note", "invoiced"];

	Meteor.call("customerListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CustomersView.onCreated(function() {
	
});

Template.CustomersView.onDestroyed(function() {
	
});

Template.CustomersView.onRendered(function() {
	Session.set("CustomersViewStyle", "table");
	
});

Template.CustomersView.events({
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
				Session.set("CustomerListPagedSearchString", searchString);
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
					Session.set("CustomerListPagedSearchString", searchString);
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
					Session.set("CustomerListPagedSearchString", "");
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
		CustomersViewExport("csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CustomersViewExport("csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CustomersViewExport("tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CustomersViewExport("json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("CustomerListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("CustomerListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("CustomerListPagedPageNo") || 0;
		if(currentPage < this.customer_list_paged_page_count - 1) {
			Session.set("CustomerListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CustomersView.helpers({

	"insertButtonClass": function() {
		return Customers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.customer_list_paged || this.customer_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.customer_list_paged && this.customer_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.customer_list_paged && this.customer_list_paged.count() == 0 && Session.get("CustomerListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("CustomerListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("CustomerListPagedPageNo") || 0) < this.customer_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("CustomerListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CustomersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CustomersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CustomersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CustomersViewStyle") == "gallery";
	}

	
});


Template.CustomersViewTable.onCreated(function() {
	
});

Template.CustomersViewTable.onDestroyed(function() {
	
});

Template.CustomersViewTable.onRendered(function() {
	
});

Template.CustomersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("CustomerListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("CustomerListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("CustomerListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("CustomerListPagedSortAscending", !sortAscending);
		} else {
			Session.set("CustomerListPagedSortAscending", true);
		}
	}
});

Template.CustomersViewTable.helpers({
});


Template.CustomersViewTableItems.onCreated(function() {
	
});

Template.CustomersViewTableItems.onDestroyed(function() {
	
});

Template.CustomersViewTableItems.onRendered(function() {
	
});

Template.CustomersViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("customers.details", mergeObjects(Router.currentRouteParams(), {customerId: this._id}));
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

Template.CustomersViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Customers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Customers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
