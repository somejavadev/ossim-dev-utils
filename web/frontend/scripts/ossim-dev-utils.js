var ossimDevApp = angular.module("ossimDev", ['ui.router']);

ossimDevApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dev');

    $stateProvider.state('dev', {
            url: '/dev',
            templateUrl: '../frontend/templates/sqlutils.html',
            controller: "devController",
            controllerAs: "devCtrl"
        }).state('about', {
        url: '/about',
        templateUrl: '../frontend/templates/about.html',
        controller: "aboutController",
        controllerAs: "aboutCtrl"
    });
});

ossimDevApp.controller("devController", function ($http) {

    var devController = this;

    var plugin = {
        id: 1,
        type: 1,
        name: '',
        description: '',
        vendor: '',
        product_type: ''
    };
    var pluginsid = {
        sid: 1,
        category: {id:'all'},
        subcategory:{},
        classification: {},
        name: '',
        priority: 2,
        reliability: 2
    };
    var categories = [];
    var subcategories = [];
    var classifications = [];
    var producttypes = [];
    var vendors = [];


    devController.text = "Dev";
    var getCategories = function () {
        $http.get("../services/category.php", {}).then(function success(response) {
            console.log(response);
            devController.categories = response.data;
        }, function error(response) {
            console.error(response);
        });
    };

    var getSubCategories = function () {
        $http.get("../services/subcategory.php", {params: {'catid':pluginsid.category.id}}).then(function success(response) {
            console.log(response);
            devController.subcategories = response.data;
        }, function error(response) {
            console.error(response);
        });
    };

    var getClassifications = function () {
        $http.get("../services/classification.php", {}).then(function success(response) {
            console.log(response);
            devController.classifications = response.data;
        }, function error(response) {
            console.error(response);
        });
    };

    var getProductTypes = function () {
        $http.get("../services/producttype.php", {}).then(function success(response) {
            console.log(response);
            devController.producttypes = response.data;
        }, function error(response) {
            console.error(response);
        });
    };

    var getVendors = function () {
        $http.get("../services/vendor.php", {}).then(function success(response) {
            console.log(response);
            devController.vendors = response.data;
        }, function error(response) {
            console.error(response);
        });
    };

    devController.categories = categories;
    devController.subcategories = subcategories;
    devController.classifications = classifications;
    devController.producttypes = producttypes;
    devController.vendors = vendors;

    devController.plugin = plugin;
    devController.pluginsid = pluginsid;

    devController.getCategories = getCategories;
    devController.getSubCategories = getSubCategories;
    devController.getClassifications = getClassifications;
    devController.getProductTypes = getProductTypes;
    devController.getVendors = getVendors;

    devController.getCategories();
    devController.getSubCategories();
    devController.getClassifications();
    devController.getProductTypes();
    devController.getVendors();


});

ossimDevApp.controller("aboutController", function ($http) {
    var devController = this;
    devController.text = "About";
});