Template.About.onCreated(function() {
	
});

Template.About.onDestroyed(function() {
	
});

Template.About.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.About.events({
	
});

Template.About.helpers({
	
});
