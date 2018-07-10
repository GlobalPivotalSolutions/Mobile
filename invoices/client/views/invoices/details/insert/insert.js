var pageSession = new ReactiveDict();

Template.InvoicesDetailsInsert.onCreated(function() {
	
});

Template.InvoicesDetailsInsert.onDestroyed(function() {
	
});

Template.InvoicesDetailsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InvoicesDetailsInsert.events({
	
});

Template.InvoicesDetailsInsert.helpers({
	
});

Template.InvoicesDetailsInsertInsertForm.onCreated(function() {
	
});

Template.InvoicesDetailsInsertInsertForm.onDestroyed(function() {
	
});

Template.InvoicesDetailsInsertInsertForm.onRendered(function() {
	

	pageSession.set("invoicesDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("invoicesDetailsInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.InvoicesDetailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("invoicesDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("invoicesDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var invoicesDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(invoicesDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("invoicesDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("invoices.details", mergeObjects(Router.currentRouteParams(), {invoiceId: self.params.invoiceId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("invoicesDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.invoiceId = self.params.invoiceId;

				Meteor.call("invoiceItemsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("invoices.details", mergeObjects(Router.currentRouteParams(), {invoiceId: this.params.invoiceId}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.InvoicesDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("invoicesDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("invoicesDetailsInsertInsertFormErrorMessage");
	}
	
});
