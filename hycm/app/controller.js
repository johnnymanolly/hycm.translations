myApp.controller('mainCtrl', function($scope, $location, $timeout, httpClient, headerItemsJson, menuItemsJson) {
    var vm = this;
    vm.user = JSON.parse(localStorage.user);
    vm.headerItems = headerItemsJson;
    vm.menuItems = menuItemsJson;
    vm.onHeaderItemClick = function(){
        $scope.$broadcast('updateGridData', {});
    }
})

myApp.controller('translationCtrl', function($scope, $location, $timeout, httpClient) {
    var vm = this;
    vm.user = JSON.parse(localStorage.user);

    vm.onFilterFormatData = function(data){
        var filter = [];
        var obj = {
            page: "All",
        };
        filter.push(obj);
        for(var i = 0; i < data.documents.length; i++){
            obj = {
                page: data.documents[i].page,
                type: data.documents[i].type,
            };
            filter.push(obj);
        }
        return filter
    }

    vm.onGridFormatData = function(data){
        //   getData();
        return data;
    }

    vm.onTranslationfilterSet = function(obj, scope){
        vm.gridParams = {};
        if(obj.originalObject.page != "All"){
            vm.gridParams["queryFilter"] = obj.originalObject.page;
            vm.gridParams["filterColumnName"] = "page";
        }else{
            vm.gridParams["queryFilter"] = null;
        }
        $scope.$broadcast('updateGridData', {params: vm.gridParams});
    }
    vm.onStatusFilterSet = function(obj, scope){
        vm.gridParams = {};
        if(obj.originalObject.value != "All"){
            vm.gridParams["queryFilter"] = obj.originalObject.value;
            if(obj.originalObject.value == "Done" || obj.originalObject.value == "Not Done"){
                vm.gridParams["filterColumnName"] = "translationStatus";
            }else if(obj.originalObject.value == "Yes" || obj.originalObject.value == "No") {
                vm.gridParams["filterColumnName"] = "implemented";
            }
        }else{
            vm.gridParams["queryFilter"] = null;
        }
        $scope.$broadcast('updateGridData', {params: vm.gridParams});
    }
    var groups = vm.user.groups;
    if(typeof groups == "string"){
        groups = [groups]
    }
    vm.isTranslator = false;
    if(_.contains(groups, "translator") || _.contains(groups, "HYCMUser") || _.contains(groups, "admin")){
        vm.isTranslator = true;
    }

    vm.isAdmin = false;
    if(_.contains(groups, "admin")){
        vm.isAdmin = true;
    }

    vm.enableAddAllowed = false;
    if(_.contains(groups, "admin") || _.contains(groups, "HYCMUser")){
        vm.enableAddAllowed = true;
    }

    if(_.contains(groups, 'admin') || _.contains(groups, 'HYCMUser')|| groups == null){
        vm.listCols = [
            {headerName: "Page", field: "page"},
            {headerName: "Type", field: "type"},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it"},
            {headerName: "Arabic", field: "ar"},
            {headerName: "Russian", field: "ru"},
            {headerName: "Spanish", field: "es"},
            {headerName: "Chinese", field: "ch"},
            {headerName: "Polish", field: "pl"},
            {headerName: "French", field: "fr"},
            {headerName: "Czech", field: "cs"},
            {headerName: "Swedish", field: "sv"},
            {headerName: "Farsi", field: "fa"},
            {headerName: "German", field: "gr"},
            {headerName: "Edited By", field: "user"},
            {headerName: "Status", field: "translationStatus", editable : false, cellRenderer: function (params) {
                    return vm.markAsCellRenderer(params);
                }},
            {headerName: "Implemented", field: "implemented", editable : false, cellRenderer: function (params) {
                    return vm.implementedCellRenderer(params);
                }},
            {headerName: "Notes", field: "comments"}
        ]
    }else if(_.contains(groups, 'translator')){
        vm.listCols = [
            {headerName: "Page", field: "page"},
            {headerName: "Type", field: "type"},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it"},
            {headerName: "Arabic", field: "ar"},
            {headerName: "Russian", field: "ru"},
            {headerName: "Spanish", field: "es"},
            {headerName: "Chinese", field: "ch"},
            {headerName: "Polish", field: "pl"},
            {headerName: "French", field: "fr"},
            {headerName: "Czech", field: "cs"},
            {headerName: "Swedish", field: "sv"},
            {headerName: "Farsi", field: "fa"},
            {headerName: "German", field: "gr"},
            {headerName: "Edited By", field: "user"},
            {headerName: "Notes", field: "comments"}
        ]
    }else if(_.contains(groups, 'it')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it"},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'ar')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar"},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "Edited By", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'ru')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru"},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'es')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es"},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'ch')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch"},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'pl')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl"},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'fr')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr"},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'cs')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs"},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'sv')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv"},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'fa')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa"},
            {headerName: "German", field: "gr",  hide:true},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }else if(_.contains(groups, 'gr')){
        vm.listCols = [
            {headerName: "Page", field: "page", hide:true},
            {headerName: "Type", field: "type", hide:true},
            {headerName: "English", field: "en"},
            {headerName: "Italian", field: "it",  hide:true},
            {headerName: "Arabic", field: "ar",  hide:true},
            {headerName: "Russian", field: "ru",  hide:true},
            {headerName: "Spanish", field: "es",  hide:true},
            {headerName: "Chinese", field: "ch",  hide:true},
            {headerName: "Polish", field: "pl",  hide:true},
            {headerName: "French", field: "fr",  hide:true},
            {headerName: "Czech", field: "cs",  hide:true},
            {headerName: "Swedish", field: "sv",  hide:true},
            {headerName: "Farsi", field: "fa",  hide:true},
            {headerName: "German", field: "gr"},
            {headerName: "User", field: "user"},
            {headerName: "Comments", field: "comments"}
        ]

    }

    vm.implementedCellRenderer =  function(params){
        if(params.value && params.value == "Yes"){
            return '<span class="done">Yes</span>'
        }else if(params.value && params.value == "false"){
            return '<button class="not-done">No</button>'
        }else{
            return '<button class="not-done">No</button>'
        }
    }
    vm.markAsCellRenderer =  function(params){
        if(params.value && params.value == "Done"){
            return '<span class="done">Done</span>'
        }else if(params.value && params.value == "false"){
            return '<button class="not-done">Not done</button>'
        }else{
            return '<button class="not-done">Not done</button>'
        }
    }

    vm.defaultCellRenderer = function(params){
        if(params.value){
            var eDiv = document.createElement('div');
            eDiv.textContent = params.value;
            return '<span class="ag-cell-inner" tooltip-placement="auto" uib-tooltip="'+ params.value +'">'+params.value+'</span>'
        }else{
            return ''
        }
    }

    vm.statusFilter = [
        {
            key: "All",
            value: "All",
        },
        {
            key: "Done",
            value: "Done",
        },
        {
            key: "Not Done",
            value: "Not Done",
        },
        {
            key: "Implemented",
            value: "Yes",
        },
        {
            key: "Not Implemented",
            value: "No",
        }
    ]

    vm.manageItemsSelectionChanged = function(scope){
        if(scope.api.getFocusedCell().column.colDef.headerName == "Status"){
            var selectedRow = scope.api.getSelectedNodes()[0];
            var params = {};
            var status = (selectedRow.data.translationStatus == "Done") ? "Not Done" : "Done";
            var rows = selectedRow.data;
            rows["translationStatus"] = status;
            rows["user"] = vm.user.login;
            params["rows"] = rows;
            params["action"] = "edit";
            delete params["creationDate"];
            scope.api.showLoadingOverlay();
            httpClient
                .post('hycm/api/getTranslations', params).then(
                function(data, response){
                    console.log("success");
                    scope.api.refreshInfiniteCache();
                    scope.api.hideOverlay();
                },
                function(err) {
                    console.log(err);
                    scope.api.hideOverlay();
                });
        }else if(scope.api.getFocusedCell().column.colDef.headerName == "Implemented"){
            var selectedRow = scope.api.getSelectedNodes()[0];
            var params = {};
            var status = (selectedRow.data.implemented == "Yes") ? "No" : "Yes";
            var rows = selectedRow.data;
            rows["implemented"] = status;
            rows["user"] = vm.user.login;
            params["rows"] = rows;
            params["action"] = "edit";
            delete params["creationDate"];
            scope.api.showLoadingOverlay();
            httpClient
                .post('hycm/api/getTranslations', params).then(
                function(data, response){
                    console.log("success");
                    scope.api.refreshInfiniteCache();
                    scope.api.hideOverlay();
                },
                function(err) {
                    console.log(err);
                    scope.api.hideOverlay();
                });
        }
    }

});

myApp.controller('filtersCtrl', function($scope, $location, $timeout, httpClient, headerItemsJson, menuItemsJson) {
    var vm = this;
    //    vm.user = {login: atob($.cookie('device_token').replace("==","")).split(":")[1]};
    //  vm.user = {login: JSON.parse($.cookie('user')).login}
    vm.filterCols = [
        {headerName: "Page", field: "page"},
        {headerName: "Type", field: "type"}
    ]
})

