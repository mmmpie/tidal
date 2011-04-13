require.def("tidal/text/enfilade",
    function () {
        self = {
            chunks: [],
            insertText: function (text) {
                var lines = text.split("\n");
                self.chunks.append(lines);
            }
        }

        return self;
    }
)