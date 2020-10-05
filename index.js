const chalk = require("chalk");

module.exports.hello = () => {
    console.log(chalk.greenBright("Hello!"), chalk.green("It's me, Josh Goldberg!"));
};
