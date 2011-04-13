function insertCharacter( e )
{
	if( !e ) e = window.event;
	if( e.keyCode == 0 ) var key = e.charCode;
	else var key = e.keyCode;
	
	cancelEvent( e );

	var bindingName = keys[key];
	if( bindingName ) return keyBindings[bindingName]( key );
	else return keyBindings["insertLetter"]( key );
}

var isCursorVisible = false;

function renderCursor()
{
	var cursor = positionCursor();
	if( !cursor ) return;
	
	if( isCursorVisible )
	{
		cursor.style.display = "none";
		isCursorVisible = false;
	}
	else
	{
		cursor.style.display = "block";
		isCursorVisible = true;
	}
}

function position( obj )
{
	if( obj.offsetParent )
	{
		var pos = position( obj.offsetParent );
	}
	else
	{
		return { x:  obj.offsetLeft, y: obj.offsetTop };
	}
	pos.x = obj.offsetLeft;
	pos.y = obj.offsetTop;
	return pos; 
}

function removeChars ( text, start, count )
{
	if( start < 0 || start + count > data.length ) return;
	data[cursorLine] = text.substr( 0, start ) + text.substr( start+count, text.length );
	cursorColumn--;
	updateCurrentLine();
	positionCursor();
}

function insertChars( text, start, chars )
{
	data[cursorLine] = text.substr( 0, start ) + String.fromCharCode( chars ) + text.substr( start, text.length );
	cursorColumn++;
	updateCurrentLine();
	positionCursor();
}

function insertNewLine( lineNumber )
{
	data.splice( cursorLine+1, 0, "" );
	data[cursorLine+1] = data[cursorLine].substring( cursorColumn ); // new line
	data[cursorLine] = data[cursorLine].substr( 0, cursorColumn ); // original line
	cursorColumn = 0;
	cursorLine++;
	render( data );
	positionCursor();
}

function removeLine( lineNumber )
{
	if( lineNumber == 0 ) return;
	cursorLine--;
	cursorColumn = data[cursorLine].length;
	data[cursorLine] = data[cursorLine] + data[cursorLine+1];
	data.splice( cursorLine+1, 1 );
	render( data );
	positionCursor();
}


var data = new Array();

function render( text )
{
	var template = document.getElementById( "line_template" );
	var body = document.getElementById( "content" );
	
	if( !template || !body ) return;
	
	for( var i = body.childNodes.length; i > 0 ; i-- )
	{
		body.removeChild( body.childNodes[i-1] );
	}
	
	for( var i = 0; i < text.length; i++ )
	{
		var newLine = template.cloneNode( true );
		newLine.id = "line" + i;
		newLine.firstChild.appendChild( document.createTextNode( i ));
		newLine.childNodes[1].appendChild( document.createTextNode( text[i] ));
		body.appendChild( newLine );
	}
}

function updateCurrentLine(){ updateOneLine( cursorLine, data[cursorLine] ); }
function updateOneLine( line, text )
{
	var line = document.getElementById( "line" + line );
	if( !line ) return;
	
	line.childNodes[1].removeChild( line.childNodes[1].firstChild );
	line.childNodes[1].appendChild( document.createTextNode( text ));
}


var cursorLine = 0;
var cursorColumn = 0;
var characterWidth = 7;

function positionCursor()
{
	var currentRow = document.getElementById( "line" + cursorLine );
	var cursor = document.getElementById( "cursor" )
	if( !currentRow || !cursor ) return;
	
	cursor.style.top = position( currentRow ).y + "px";
	cursor.style.left = ( characterWidth * cursorColumn + currentRow.childNodes[1].offsetLeft ) + "px";
	
	return cursor;
}
