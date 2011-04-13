require.def( "tidal/commands/open",
	function()
	{
		var self = {
			open: function( fileName ) {
				console.log( fileName );
				$.get( fileName,
					   "",
                       self.importFileContents );

			},
			importFileContents: function( text ) {
				console.log( "opened file" );
				$("#content").append( text );
			},
			importFailed: function( request )
			{
				console.log( "didnt open file" );
			}
        }

		return self;
    }
);