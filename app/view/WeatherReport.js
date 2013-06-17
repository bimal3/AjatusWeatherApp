Ext.define('AjatusWeatherApp.view.WeatherReport', {
	xtype: 'weather-report',
	extend: 'Ext.Panel',
    config: {
		title: 'Report',
		iconCls: 'list',
		items: [
				{
					xtype: 'titlebar',
					docked: 'top',
					title: 'Weather Report',
					id: 'weather-report'
						
				}
				
		]	
	}	
});