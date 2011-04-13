require.def("tidal/events", ["tidal/command", "tidal/keybindings"],
	function (command, keybindings) {
	    console.log("loaded events");

	    var self = {
	        registerEvents: function () {
	            console.log("registering events");
	            $(document).keydown(function (event) { self.handleKeyDown(event); });
	            $(document).keypress(function (event) { self.keypressInspector(event); return false; });
	        },
	        handleKeyDown: function (event) {
	            if (event.keyCode === 8) {
	                event.stopPropagation();
	                event.preventDefault();
	            }
	        },
	        keypressInspector: function (event) {
	            console.log("keypress", event);
	            var keybinding = keybindings.getKeyBinding(event);
	            
                if (keybinding === "commandbar-activate") {
	                self.deactivateKeyRecipient();
	                self.keyRecipient = command.activate( keybindings );
	            }
	            else {
	                self.sendKey(event, self);
	            }
	        },
	        deactivateKeyRecipient: function () {
	            var keyRecipient = self.keyRecipient;
	            self.keyRecipient = null;
	            if (keyRecipient && keyRecipient.deactivate) keyRecipient.deactivate();
	        },
	        sendKey: function (event) {
	            if (self.keyRecipient && self.keyRecipient.sendKey) self.keyRecipient.sendKey(event);
	        },
	        keyRecipient: self
	    }

	    return self;
	}
);