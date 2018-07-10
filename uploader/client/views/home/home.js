Template.Home.onCreated(function() {
	
});

Template.Home.onDestroyed(function() {
	
});

Template.Home.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Home.events({
	
});

Template.Home.helpers({
	
});

Template.HomeGallery.events({
	"click .new-file": function(e, t) {
		Router.go("home.insert");
	},

	"click .delete-file": function(e, t) {
		e.preventDefault();
		var self = this;
		bootbox.dialog({
			message: "Delete item?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("galleryRemove", self._id);
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	}
});

Template.HomeGallery.helpers({
});
