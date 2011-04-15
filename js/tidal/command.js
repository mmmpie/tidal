define( ["commands/open"],
	function (keybindings, open) {
	    console.log("loaded command");

	    var self = {
	        activate: function (keybindings) {
	            console.log("activating command");

	            keybindings.createNewScope();
	            keybindings.setBinding("new-line", self.execute);

	            return self;
	        },
	        deactivate: function (keybindings) {
	            console.log("deactivating command");

	            keybindings.releaseScope();
	            
                return self;
	        },
	        sendKey: function (event) {
	            $("#commandbar").append(String.fromCharCode(event.keyCode));
	        },
	        execute: function (event) {
	            if (event.keyCode === 8) {

	                var buffer = $("#commandbar").text();
	                buffer = buffer.substr(0, buffer.length - 1);
	                $("#commandbar").text(buffer);
	            }
	            else if (event.keyCode === 13) {
	                self.executeCommand($("#commandbar").text());
	                $("#commandbar").text("");
	                return false;
	            }
	            else {
	                $("#commandbar").append(String.fromCharCode(event.keyCode));
	            }

	            return self;
	        },
	        executeCommand: function (commandText) {
	            var commandParts = commandText.split(" ");
	            if (commandParts[0] === "open") {
	                open.open(commandParts[1]);
	            }
	        }
	    }

	    return self;
	}
);  