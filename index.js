/**
 * @file 入口模块
 * @author sparklewhy@gmail.com
 */

var pkgManage = require('fisx-package');

exports.name = 'update <components>';
exports.desc = 'update components package';
exports.options = {
    '-h, --help': 'print this help message',
    '-r, --root <path>': 'set project root',
    '-s, --save': 'update component(s) dependencies of `package.json` file',
    '-d, --save-dev': 'update component(s) devDependencies of `package.json`',
    '--registry <url>': 'set the npm default registry to use'
};

exports.run = function (argv, cli, env) {
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }

    argv._.shift();
    var installComponents = argv._;
    var options = {
        root: env.cwd,
        saveToDevDep: argv['save-dev'] || argv.d,
        saveToDep: argv.save || argv.s,
        registry: argv.registry
    };
    return pkgManage.initProjectRoot(env.configNameSearch[0], options, fis)
        .then(pkgManage.loadUserConfig.bind(this, env.configNameSearch[0], options, fis))
        .then(function () {
            return pkgManage.update(installComponents, options);
        });
};
