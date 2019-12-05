import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import progress from "rollup-plugin-progress";

const production = !process.env.ROLLUP_WATCH;

const devOutput = [
    {
        file: "./components.js",
        format: "cjs",
        sourcemap: true
    }
];

export default {
    input: ["./src/main.js"],
    output: devOutput,
    external: [ "react", "services" ],
    plugins: [
        progress(),
        babel({
            exclude: "node_modules/**",
        }),
        production && uglify()
    ],
    watch: {
// According to the latest: https://github.com/rollup/rollup/issues/1828, the following line will not work, i.e the file will not be watched.
// Manually restart the process when you update the services
        // include: "../services/services.js",
        exclude: "node_modules/**"
    }
};
