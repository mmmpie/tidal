require.def("tidal/keybindings",
	function () {
	    var safariKeys = {
	        63234   : "moveLeftChar",
	        63232   : "moveUpLine",
	        63235   : "moveRightChar",
	        63233   : "moveDownLine",
	        8       : "deleteLeft",
	        63272   : "deleteRight",
	        13      : "newLine",
	        9       : "tab",
	        63273   : "moveStartLine",
	        63275   : "moveEndLine",
            32      : "space"
	    };

	    var firefoxKeys = {
	        37      : "moveLeftChar",
	        38      : "moveUpLine",
	        39      : "moveRightChar",
	        40      : "moveDownLine",
	        150     : "deleteLeft",
	        152     : "deleteRight",
	        153     : "newLine",
	        154     : "tab",
	        155     : "moveStartLine",
	        156     : "moveEndLine"
	    };

	    var ieKeys = {
	        63234   : "moveLeftChar",
	        63232   : "moveUpLine",
	        63235   : "moveRightChar",
	        63233   : "moveDownLine",
	        150     : "deleteLeft",
	        152     : "deleteRight",
	        153     : "newLine",
	        154     : "tab",
	        155     : "moveStartLine",
	        156     : "moveEndLine"
	    };

        var bindings = {
            control_space   :   "commandbar-activate",
            delete_left     :   "delete-left",
            delete_right    :   "delete-right",
            new_line        :   "new-line"
        };

        var actions = {
            commandbar-activate     : 

        }

	    var keys = null;
	    if ($.browser.msie) keys = ieKeys;
	    else if ($.browser.firefox) keys = firefoxKeys;
	    else if ($.browser.safari) keys = safariKeys;

	    var self = {
	        getKeyBinding: function (event) {
	            // get the name of the key that was pressed
                var keyPress = keys[event.keyCode];
                if (keyPress === undefined) {
	                keyPress = String.fromCharCode(event.keyCode);
	            }
            
                // and combine it with the names of the meta keys
                var modifiers = "";
                if( event.ctrlKey ) modifiers = "control_" + modifiers;
                if( event.altKey ) modifiers = "alt_" + modifiers;
                if( event.shiftKey ) modifiers = "shift_" + modifiers;
                keyPress = modifiers + keyPress;
                
                // then lookup the keypress in the bindings and return the binding name
                var keyBinding = bindings[keyPress];
                if( keyBinding === undefined ) return "";
   	            return keyBinding;
	        },
            setKeyBinding: function ( name, action ) {
                
            },
            createNewScope: function( shouldRetainExistingBindings) {
                // push the existing bindings on the history stack
                self.bindingHistory.push( self.bindings );

                // and create a new set of bindings, OR copy the previous set
                self.bindings = {};

            },
            bindingHistory: []
	    }

	    return self;
	}
);
        
 /*           keyBindings = {
        "moveLeftChar": function (key) {
            cursorColumn--;
            if (cursorColumn < 0 && cursorLine > 0) {
                cursorLine--;
                cursorColumn = data[cursorLine].length;
            }
            else if (cursorColumn < 0) {
                cursorColumn = 0;
            }
            positionCursor();
            return false;
        },
        "moveUpLine": function (key) { cursorLine--; if (cursorLine < 0) cursorLine = 0; positionCursor(); return false; },
        "moveRightChar": function (key) {
            cursorColumn++;
            if (cursorColumn > data[cursorLine].length) {
                cursorColumn = 0;
                cursorLine++;
            }
            positionCursor();
            return false;
        },
        "moveDownLine": function (key) { cursorLine++; positionCursor(); return false; },
        "deleteLeft": function (key) { removeChars(data[cursorLine], cursorColumn - 1, 1); if (cursorColumn == 0) removeLine(cursorLine); },
        "deleteRight": function (key) { },
        "newLine": function (key) { insertNewLine(cursorLine); },
        "tab": function (key) { },
        "moveStartLine": function (key) { },
        "moveEndLine": function (key) { },
        "insertLetter": function (key) { insertChars(data[cursorLine], cursorColumn, key); }
}*/