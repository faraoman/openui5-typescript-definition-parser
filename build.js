var tsDefParser = require("ts-def-parser");
gulp.task("generate-ts-defs", function () {
    tsDefParser.parseDefinitions({
        outFilePath: "WebContent\\ui5.d.ts"
    });
});