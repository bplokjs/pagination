var transformEs = require("transform-es");

transformEs("./src", "./lib", {
    target: 'web',
    watch: true
});