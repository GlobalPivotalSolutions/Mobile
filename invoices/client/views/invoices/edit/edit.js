var pageSession = new ReactiveDict();

Template.InvoicesEdit.onCreated(function() {
	
});

Template.InvoicesEdit.onDestroyed(function() {
	
});

Template.InvoicesEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InvoicesEdit.events({
	
});

Template.InvoicesEdit.helpers({
	
});

Template.InvoicesEditEditForm.onCreated(function() {
	
});

Template.InvoicesEditEditForm.onDestroyed(function() {
	
});

Template.InvoicesEditEditForm.onRendered(function() {
	

	pageSession.set("invoicesEditEditFormInfoMessage", "");
	pageSession.set("invoicesEditEditFormErrorMessage", "");

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

Template.InvoicesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("invoicesEditEditFormInfoMessage", "");
		pageSession.set("invoicesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var invoicesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(invoicesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("invoicesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("invoices", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("invoicesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("invoicesUpdate", t.data.invoice_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.InvoicesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("invoicesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("invoicesEditEditFormErrorMessage");
	}
	
});
