define ["command", "keybindings"], (command, keybindings) ->
	console.log "loaded events"

	self =
		registerEvents: ->
			console.log "registering events"
			$(document).keydown (event) -> self.handleKeyDown event
			$(document).keypress (event) ->
				self.keypressInspector event
				return false
		handleKeyDown: (event) ->
			if (event.keyCode == 8)
				event.stopPropagation
				event.preventDefault
		keypressInspector: (event) ->
			console.log "keypress", event
			keybinding = keybindings.getKeyBinding event

			if (keybinding == "commandbar-activate")
				self.deactivateKeyRecipient
				self.keyRecipient = command.activate keybindings
			else
				self.sendKey event, self
	   deactivateKeyRecipient: ->
			keyRecipient = self.keyRecipient
			self.keyRecipient = null
			if (keyRecipient && keyRecipient.deactivate)
				keyRecipient.deactivate
		sendKey: (event) ->
			if (self.keyRecipient && self.keyRecipient.sendKey)
				self.keyRecipient.sendKey event
		keyRecipient: self
	return self