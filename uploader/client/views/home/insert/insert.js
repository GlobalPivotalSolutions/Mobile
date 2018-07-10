var pageSession = new ReactiveDict();

Template.HomeInsert.onCreated(function() {
	
});

Template.HomeInsert.onDestroyed(function() {
	
});

Template.HomeInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomeInsert.events({
	
});

Template.HomeInsert.helpers({
	
});

Template.HomeInsertForm.onCreated(function() {
	
});

Template.HomeInsertForm.onDestroyed(function() {
	
});

Template.HomeInsertForm.onRendered(function() {
	

	pageSession.set("homeInsertFormInfoMessage", "");
	pageSession.set("homeInsertFormErrorMessage", "");

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

Template.HomeInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("homeInsertFormInfoMessage", "");
		pageSession.set("homeInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var homeInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(homeInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("homeInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("home", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("homeInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("galleryInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("home", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}, 

	"change #field-file-id": function(e, t) {
	e.preventDefault();
	var fileInput = $(e.currentTarget);
	var dataField = fileInput.attr("data-field");
	var hiddenInput = fileInput.closest("form").find("input[name='" + dataField + "']");

	FS.Utility.eachFile(e, function(file) {
		Files.insert(file, function (err, fileObj) {
			if(err) {
				console.log(err);
			} else {
				hiddenInput.val(fileObj._id);
			}
		});
	});
}

});

Template.HomeInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("homeInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("homeInsertFormErrorMessage");
	}
	
});
