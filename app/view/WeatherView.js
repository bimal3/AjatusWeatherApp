Ext.define('AjatusWeatherApp.view.WeatherView', {
	extend: 'Ext.tab.Panel',
	xtype: 'weather-view',
	requires: ['AjatusWeatherApp.view.LocationForm','AjatusWeatherApp.view.WeatherReport','AjatusWeatherApp.view.AppPreferences'],
    config: {
		tabBarPosition: 'bottom',
		items: [
				{
					xtype: 'location-form'
				},
				{
					xtype: 'weather-report'
				},
				{
					xtype: 'app-settings'
				}
		]
	}	
});