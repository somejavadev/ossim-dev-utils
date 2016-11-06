var ossimDevApp = angular.module("ossimDev", ['ui.router', 'ngMessages']);

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
        name: null,
        description: null,
        vendor: null,
        product_type: null
    };
    var pluginsid = {
        sid: 1,
        category:null,
        subcategory:null,
        classification: null,
        name: null,
        priority: 2,
        reliability: 2
    };
    var categories = [];
    var subcategories = [];
    var classifications = [];
    var producttypes = [];
    var vendors = [];
    var newVendor = {
        show: false,
        name: ''
    };
    var resultPlugin = '';
    var resultPluginSid = '';

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
        var useCatId = 'all';
        if(!(_.isNull( pluginsid.category) || _.isNull( pluginsid.category.id))) {
            useCatId = pluginsid.category.id;
        }
        $http.get("../services/subcategory.php", {params: {'catid': useCatId}}).then(function success(response) {
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

    var addVendor = function () {
        var addingVendor = {};
        angular.copy(newVendor, addingVendor);
        var exists = false;
        angular.forEach(devController.vendors, function (val, key) {
            console.log(val);
            if (!( _.isUndefined(val) || _.isUndefined(val.vendor)) && !exists) {
                exists = val.vendor.trim().toLowerCase() === addingVendor.name.trim().toLocaleLowerCase();
            }
        });
        if (!exists) {
            devController.vendors.push({vendor: addingVendor.name});
            devController.plugin.vendor = addingVendor;
        }
        devController.newVendor.show = false;
    };

    var toggleVendorAdd = function () {
        devController.newVendor.show = !devController.newVendor.show;
    };

    var generateSQL = function () {


        if(devController.pluginForm.$valid) {

            var insertPlugin = "INSERT IGNORE INTO plugin (id, type, name, description, vendor, product_type) VALUES (" +
                plugin.id + ", " + plugin.type + ", '" + plugin.name + "', '" + plugin.description + "', '" + plugin.vendor.vendor + "', " + plugin.product_type.id + ");"
            console.log(insertPlugin);

            var insertPluginSid = "INSERT IGNORE INTO plugin_sid (plugin_id, sid, category_id, subcategory_id, class_id, name, priority, reliability) VALUES (" +
                plugin.id + ", " + pluginsid.sid + ", " + pluginsid.category.id + ", " + pluginsid.subcategory.id + ", " + pluginsid.classification.id + ", '" + pluginsid.name + "', " + pluginsid.priority + ", " + pluginsid.reliability + ");";
            console.log(insertPluginSid);

            devController.resultPlugin = insertPlugin;
            devController.resultPluginSid = insertPluginSid;

        }
    };

    devController.categories = categories;
    devController.subcategories = subcategories;
    devController.classifications = classifications;
    devController.producttypes = producttypes;
    devController.vendors = vendors;

    devController.plugin = plugin;
    devController.pluginsid = pluginsid;
    devController.newVendor = newVendor;
    devController.resultPlugin = resultPlugin;
    devController.resultPluginSid = resultPluginSid;

    devController.getCategories = getCategories;
    devController.getSubCategories = getSubCategories;
    devController.getClassifications = getClassifications;
    devController.getProductTypes = getProductTypes;
    devController.getVendors = getVendors;
    devController.addVendor = addVendor;
    devController.toggleVendorAdd = toggleVendorAdd;
    devController.generateSQL = generateSQL;

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