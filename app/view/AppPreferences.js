Ext.define('AjatusWeatherApp.view.AppPreferences', {
	xtype: 'app-settings',
	extend: 'Ext.form.Panel',
    config: {
		title: 'Settings',
		iconCls: 'settings',
		items: [
				{
					xtype: 'titlebar',
					docked: 'top',
					title: 'Settings'
				},
				{
					xtype: 'fieldset',
					items: [
							{
								xtype: 'selectfield',
								label: 'Weather Forecast for',
								id: 'days',
								options:[
									{ text: '1 day',  value:'today' },
									{ text: '2 days',  value:'2' },
									{ text: '3 days',  value:'3' },
									{ text: '4 days',  value:'4' },
									{ text: '5 days',  value:'5' }
								]
									
							},
							{
								xtype: 'selectfield',
								label: 'Temperature Unit',
								id: 'tempunit',
								options:[
									{ text: 'Celsius',  value:'1'},
									{ text: 'Fahrenheit',  value:'2'},
									{ text: 'Both units', value: '3'}
								]
									
							}
							
									
					]
				},
				{
					xtype: 'button',
					text: 'Save Settings',
					id: 'saveConfigBtn'
				}
		]	
	}	
});