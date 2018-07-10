Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.freeRoutes = [
	"home",
	"customers",
	"customers.insert",
	"customers.edit",
	"about"
];

Router.defaultFreeRoute = "home";

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
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {
	
	this.route("/", {name: "home", title: "", controller: "HomeController"});
	this.route("/customers", {name: "customers", title: "Customers", controller: "CustomersController"});
	this.route("/customers/insert", {name: "customers.insert", title: "Customers", controller: "CustomersInsertController"});
	this.route("/customers/edit/:customerId", {name: "customers.edit", title: "Customers", controller: "CustomersEditController"});
	this.route("/about", {name: "about", title: "About", controller: "AboutController"});
});
