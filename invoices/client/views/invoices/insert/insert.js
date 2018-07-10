var pageSession = new ReactiveDict();

Template.InvoicesInsert.onCreated(function() {
	
});

Template.InvoicesInsert.onDestroyed(function() {
	
});

Template.InvoicesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InvoicesInsert.events({
	
});

Template.InvoicesInsert.helpers({
	
});

Template.InvoicesInsertInsertForm.onCreated(function() {
	
});

Template.InvoicesInsertInsertForm.onDestroyed(function() {
	
});

Template.InvoicesInsertInsertForm.onRendered(function() {
	

	pageSession.set("invoicesInsertInsertFormInfoMessage", "");
	pageSession.set("invoicesInsertInsertFormErrorMessage", "");

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

Template.InvoicesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("invoicesInsertInsertFormInfoMessage", "");
		pageSession.set("invoicesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var invoicesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(invoicesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("invoicesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("invoices.details", mergeObjects(Router.currentRouteParams(), {invoiceId: result}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("invoicesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("invoicesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("invoices", mergeObjects(Router.currentRouteParams(), {}));
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

Template.InvoicesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("invoicesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("invoicesInsertInsertFormErrorMessage");
	}
	
});
