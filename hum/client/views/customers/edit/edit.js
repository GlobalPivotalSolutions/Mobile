var pageSession = new ReactiveDict();

Template.CustomersEdit.onCreated(function() {
	
});

Template.CustomersEdit.onDestroyed(function() {
	
});

Template.CustomersEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CustomersEdit.events({
	
});

Template.CustomersEdit.helpers({
	
});

Template.CustomersEditForm.onCreated(function() {
	
});

Template.CustomersEditForm.onDestroyed(function() {
	
});

Template.CustomersEditForm.onRendered(function() {
	

	pageSession.set("customersEditFormInfoMessage", "");
	pageSession.set("customersEditFormErrorMessage", "");

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

Template.CustomersEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customersEditFormInfoMessage", "");
		pageSession.set("customersEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var customersEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(customersEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customersEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("customers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customersEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("customersUpdate", t.data.customers_selected._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("customers", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CustomersEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customersEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customersEditFormErrorMessage");
	}
	
});
