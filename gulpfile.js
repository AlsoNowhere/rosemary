
const gulp = require("gulp");
const rollup = require("rollup");

gulp.task("build-services", () => {
	return rollup.rollup({
		input: "./services/src/main.js",
	})
	.then(bundle => {
		return bundle.write({
			file: "./services/services.js",
			format: "cjs"
		});
	});
});

gulp.task("watch-services",()=>{
	return gulp.watch("./services/src/**/*.js",gulp.series("build-services"));
});
