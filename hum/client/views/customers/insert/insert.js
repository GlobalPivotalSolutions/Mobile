var pageSession = new ReactiveDict();

Template.CustomersInsert.onCreated(function() {
	
});

Template.CustomersInsert.onDestroyed(function() {
	
});

Template.CustomersInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CustomersInsert.events({
	
});

Template.CustomersInsert.helpers({
	
});

Template.CustomersInsertForm.onCreated(function() {
	
});

Template.CustomersInsertForm.onDestroyed(function() {
	
});

Template.CustomersInsertForm.onRendered(function() {
	

	pageSession.set("customersInsertFormInfoMessage", "");
	pageSession.set("customersInsertFormErrorMessage", "");

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

Template.CustomersInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customersInsertFormInfoMessage", "");
		pageSession.set("customersInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var customersInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(customersInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customersInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("customers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customersInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("customersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.CustomersInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customersInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customersInsertFormErrorMessage");
	}
	
});
