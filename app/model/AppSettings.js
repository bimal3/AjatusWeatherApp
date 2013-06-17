Ext.define('AjatusWeatherApp.model.AppSettings',{
      extend: 'Ext.data.Model',
      config: {
			idProperty: 'id',	
	        fields: ['id','days','tempunit']
	  }     	  
});