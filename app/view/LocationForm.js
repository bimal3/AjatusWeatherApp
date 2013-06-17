Ext.define('AjatusWeatherApp.view.LocationForm', {
	xtype: 'location-form',
	extend: 'Ext.form.Panel',
    config: {
		title: 'Location',
		iconCls: 'home',
		items:[
			{
				xtype: 'titlebar',
				title: 'Set Location',
				id: 'form-title'
			},
			{
				xtype: 'fieldset',	
				items: [
					{
						xtype: 'textfield',
						name: 'city',
						placeHolder: 'Enter your city',
						label: 'City',
						id: 'city'
					}
				]	
		
			},
			{
				xtype: 'button',
				text: 'Get Weather Report',
				id: 'weatherReportBtn'
			}]
		
	}	
});