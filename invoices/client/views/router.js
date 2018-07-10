Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"customers",
	"customers.insert",
	"customers.details",
	"customers.edit",
	"invoices",
	"invoices.insert",
	"invoices.details",
	"invoices.details.items",
	"invoices.details.insert",
	"invoices.details.edit",
	"invoices.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// add unique class to body element for each route
	if(Router.current()) {
		var currentRouteName = Router.current().route.getName();
		var prevRouteName = Session.get("currentRouteName");
		if(prevRouteName && prevRouteName != currentRouteName) {
			$("body").removeClass("page-" + toKebabCase(prevRouteName));
		}
		Session.set("currentRouteName", currentRouteName);
		$("body").addClass("page-" + toKebabCase(currentRouteName));
	}

	// loading indicator here
	if(!this.ready()) {
		this.render("loading");
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}

});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/customers", {name: "customers", title: "", controller: "CustomersController"});
	this.route("/customers/insert", {name: "customers.insert", title: "", controller: "CustomersInsertController"});
	this.route("/customers/details/:customerId", {name: "customers.details", title: "", controller: "CustomersDetailsController"});
	this.route("/customers/edit/:customerId", {name: "customers.edit", title: "", controller: "CustomersEditController"});
	this.route("/invoices", {name: "invoices", title: "", controller: "InvoicesController"});
	this.route("/invoices/insert", {name: "invoices.insert", title: "", controller: "InvoicesInsertController"});
	this.route("/invoices/details/:invoiceId", {name: "invoices.details", title: "", controller: "InvoicesDetailsController"});
	this.route("/invoices/details/:invoiceId/items", {name: "invoices.details.items", title: "", controller: "InvoicesDetailsItemsController"});
	this.route("/invoices/details/:invoiceId/insert", {name: "invoices.details.insert", title: "", controller: "InvoicesDetailsInsertController"});
	this.route("/invoices/details/:invoiceId/edit/:itemId", {name: "invoices.details.edit", title: "", controller: "InvoicesDetailsEditController"});
	this.route("/invoices/edit/:invoiceId", {name: "invoices.edit", title: "", controller: "InvoicesEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
});
