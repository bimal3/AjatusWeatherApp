Ext.define('AjatusWeatherApp.store.AppSettings',{
         extend: 'Ext.data.Store',
         config: {
		    model: 'AjatusWeatherApp.model.AppSettings',
			storeId: 'AppSettings',
			fields: ['id','days','tempunit'],
			autoLoad: true,
			proxy:{
					type:'localstorage',
					id:'app-settings'
			}
			
		 }		 
});