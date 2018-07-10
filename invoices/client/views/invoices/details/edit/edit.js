var pageSession = new ReactiveDict();

Template.InvoicesDetailsEdit.onCreated(function() {
	
});

Template.InvoicesDetailsEdit.onDestroyed(function() {
	
});

Template.InvoicesDetailsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InvoicesDetailsEdit.events({
	
});

Template.InvoicesDetailsEdit.helpers({
	
});

Template.InvoicesDetailsEditEditForm.onCreated(function() {
	
});

Template.InvoicesDetailsEditEditForm.onDestroyed(function() {
	
});

Template.InvoicesDetailsEditEditForm.onRendered(function() {
	

	pageSession.set("invoicesDetailsEditEditFormInfoMessage", "");
	pageSession.set("invoicesDetailsEditEditFormErrorMessage", "");

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

Template.InvoicesDetailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("invoicesDetailsEditEditFormInfoMessage", "");
		pageSession.set("invoicesDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var invoicesDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(invoicesDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("invoicesDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("invoices.details", mergeObjects(Router.currentRouteParams(), {invoiceId: self.params.invoiceId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("invoicesDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("invoiceItemsUpdate", t.data.invoice_item._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.InvoicesDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("invoicesDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("invoicesDetailsEditEditFormErrorMessage");
	}
	
});
