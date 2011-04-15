define ->
	self =
		chunks: []
		insertText: (text) ->
			lines = text.split("\n")
			self.chunks.append lines