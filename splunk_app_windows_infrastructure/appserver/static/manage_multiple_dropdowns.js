require([
	'jquery',
	'underscore',
	'splunkjs/mvc',
	'splunkjs/mvc/tokenutils',
	'splunkjs/mvc/simplexml/ready!'
	], function ($, _, mvc, tokenutils) {
	var defaultTokenModel = mvc.Components.get("default");
	var submitTokenModel = mvc.Components.get("submitted");
	var hostNameSearch = mvc.Components.getInstance("host_search_id");
	defaultTokenModel.unset("form.multidropdown_host");
	var hostCondition = "";

	defaultTokenModel.on("change:form.multidropdown_forest", function() {
		emptyRemainingToken(defaultTokenModel, "forest");
	});
	defaultTokenModel.on("change:form.multidropdown_site", function() {
		emptyRemainingToken(defaultTokenModel, "site");
	});
	defaultTokenModel.on("change:form.multidropdown_domaindnsname", function() {
		emptyRemainingToken(defaultTokenModel, "domain");
	});
	defaultTokenModel.on("change:form.multidropdown_host", function() {
		fillRemainingToken(defaultTokenModel, submitTokenModel, defaultTokenModel.get("form.multidropdown_host"));
	});
  
	hostNameSearch.on('search:done', function (properties) {
		var searchData = hostNameSearch.data("results");
		searchData.on("data", function () {
			var rows = searchData.data().rows;
			var hostList = rows.map(function(value,index) { return value[0]; });
			hostCondition = generateHostCondition(hostList);
		});
	});

	function generateHostCondition(rows){
		var hostConditionLocal = "(";
		for (i=0; i < rows.length; i++){
			hostConditionLocal += "host=\"" +rows[i]+ "\"";
			if(i != rows.length - 1){
				hostConditionLocal += " OR "
			}
		}
		hostConditionLocal += ")";
	
		return hostConditionLocal;
	}
	
	function emptyRemainingToken(defaultTokenModel, filter){
		switch (filter)
			{
				case "forest": defaultTokenModel.unset("form.multidropdown_site");
				break;
            
				case "site": defaultTokenModel.unset("form.multidropdown_domaindnsname");
				break;
            
				default:  defaultTokenModel.unset("form.multidropdown_host");
			}

	}
	function fillRemainingToken(defaultTokenModel, submitTokenModel, selectedItem){
		if(selectedItem != null){
			if(selectedItem.indexOf("*")>-1){
				submitTokenModel.set("multidropdown_host_token", hostCondition);
				defaultTokenModel.set("multidropdown_host_token", hostCondition);
			}
			else{
				if(selectedItem.length == 0){
					submitTokenModel.unset("multidropdown_host_token");
					defaultTokenModel.unset("multidropdown_host_token");
				}
				else{
					submitTokenModel.set("multidropdown_host_token", generateHostCondition(selectedItem));
					defaultTokenModel.set("multidropdown_host_token", generateHostCondition(selectedItem));
				}
			}
		}
		else{
			submitTokenModel.unset("multidropdown_host_token");
			defaultTokenModel.unset("multidropdown_host_token");
		}
	}
});
