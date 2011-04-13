require.def
(	
	"tidal",
	["tidal/events"],
	function( events )
	{
		console.log( events );
		events.registerEvents();
		
		return {};
    }
);