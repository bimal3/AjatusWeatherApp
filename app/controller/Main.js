Ext.define('AjatusWeatherApp.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.proxy.JsonP'],
    config: {
        refs: {
				mainView: 'weather-view',
				reportView: 'weather-report',
				locationView: 'location-form',
				locationBtn: 'location-form #weatherReportBtn',
				appSettingsView: 'app-settings',
				saveSettingsBtn: 'app-settings #saveConfigBtn'
        },
        control: {
				locationBtn: {
					tap: "getWeatherReportByCity"
				},
				saveSettingsBtn: {
					tap: "updateSettings"
				}	
        }
    },
	getWeatherReport: function(query){
		
			
		var me = this,
		settings = Ext.getStore('AppSettings'),
		days = null,
		tempUnit = null,
		data = null;
		
		if(query.type == 'geolocation'){
			query.location = 'Local';
		}
		else
		{
			query.location = query.value;
		}
		
		
		if(settings.getAllCount() == 1){
			data = settings.getAt(0).data;
			days = data.days;
			tempUnit = data.tempunit;
			
		}
		else{
			 days=5;
			 tempUnit=1;	
		}
		
		Ext.data.JsonP.request({
			url: 'http://free.worldweatheronline.com/feed/weather.ashx',
			callbackkey: 'callback',
			params:{
				key:'23f6a0ab24185952101705',
				q: query.value,
                format: 'json',
				num_of_days: days		
			},callback: function( success, result){
					
						
						var weather = result.data.weather;
						panel = me.getReportView();
						switch(tempUnit){
							case "1": default:
								tpl = new Ext.XTemplate([
									'<div class="demo-weather">',
										'<tpl for=".">',
											'<div class="day">',
												'<div class="wicon">',
													'<tpl for="weatherIconUrl">',
														'<img src="{value}">',
													'</tpl>',
												'</div>',	
												'<div class="temp"><p>{date:date("F j, Y")}</p><span class="temp_max">Max Temp: {tempMaxC}&deg;C </span><span class="temp_low">Min Temp: {tempMinC}&deg;C</span></div>',
											'</div>',
										'</tpl>',
									'</div>'	
								]);
							break;
							
							case "2":
								tpl = new Ext.XTemplate([
									'<div class="demo-weather">',
										'<tpl for=".">',
											'<div class="day">',
												'<div class="wicon">',
													'<tpl for="weatherIconUrl">',
														'<img src="{value}">',
													'</tpl>',
												'</div>',	
												'<div class="temp"><p>{date:date("F j, Y")}</p><span class="temp_max">Max Temp: {tempMaxF}&deg;F </span><span class="temp_low">Min Temp: {tempMinF}&deg;F</span></div>',
											'</div>',
										'</tpl>',
									'</div>'	
								]);
							break;
							
							case "3":
								tpl = new Ext.XTemplate([
									'<div class="demo-weather">',
										'<tpl for=".">',
											'<div class="day">',
												'<div class="wicon">',
													'<tpl for="weatherIconUrl">',
														'<img src="{value}">',
													'</tpl>',
												'</div>',	
												'<div class="temp"><p>{date:date("F j, Y")}</p><span class="temp_max">Max Temp: {tempMaxF}&deg;F </span><span class="temp_low">Min Temp: {tempMinF}&deg;F</span><br><span class="temp_max">Max Temp: {tempMaxC}&deg;C </span><span class="temp_low">Min Temp: {tempMinC}&deg;C</span></div>',
											'</div>',
										'</tpl>',
									'</div>'	
								]);
							break;	
						}
						
						if(weather){
							Ext.getCmp('weather-report').setTitle( query.location+' Weather Report');
							panel.updateHtml(tpl.applyTemplate(weather));
						}
						else{
							Ext.Msg.show({	
											title: 'Status',
											message:'Error encountered while retreiving data.<br>Please check your internet connectivity / enter a valid city'
										});
						}
					
					}
		});	
	},
	getWeatherReportByCity: function(){
	
		var me = this;
		var city = Ext.getCmp('city').getValue();
		var mainView = me.getMainView();
		var mask = Ext.Viewport;
		
		if(city=='' || typeof city == 'number'){
			Ext.Msg.alert("Please enter a valid city..");
		}
		else{
			mainView.setMasked(true);
			query = { value: city, type: 'city'};	
			me.getWeatherReport(query);
			mainView.setActiveItem(1);
			mainView.setMasked(false);
			
		}
	},
	updateSettings: function(){
			var me = this;
			var forecastDays = Ext.getCmp('days').getValue();
			var tempUnit = Ext.getCmp('tempunit').getValue();
			var curSetting = Ext.create('AjatusWeatherApp.store.AppSettings'); 
			curSetting.getProxy().clear();
			curSetting.setData({
									id: '1',
									days: forecastDays,
									tempunit: tempUnit
																
								});
											
			curSetting.sync();
			Ext.Msg.alert('App settings has been updated.');
			this.updateReport(me,me.getMainView());
	},
	updateReport: function(me,mainView){
				
		        var geo = Ext.create('Ext.util.Geolocation', {
										autoUpdate: false,
										listeners: {
											locationupdate: function(geo) {
												var query = { value: geo.getLatitude()+"+"+geo.getLongitude(), type: 'geolocation' };
												me.getWeatherReport(query);
												mainView.setActiveItem(1);
												mainView.setMasked(false);
											},
											locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
												if(bTimeout){
													Ext.Msg.alert('Timeout occurred.');
												} else {
													Ext.Msg.alert('Error occurred.');
												}
												mainView.setMasked(false);
											}
										}
									});
				geo.updateLocation();	
	}, 
  
    launch: function(app) {
		var me=this;
		var mainView = me.getMainView();
		
		mainView.setMasked({ xtype: 'loadmask', message: 'Loading weather report..'}); 	
        this.updateReport(me,mainView);		

    }
});
