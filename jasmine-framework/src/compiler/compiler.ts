const { descr } = require('../decorators/describe.decorator.js');
const { itt } = require('../decorators/it.decorator.js');

global.jasmine = jasmineRequire.core(jasmineRequire);

jasmineRequire.html(jasmine);

var env = jasmine.getEnv();
var jasmineInterface = jasmineRequire.interface(jasmine, env);

jasmineInterface.descr = jasmineInterface.describe = descr;
jasmineInterface.itt = jasmineInterface.it = itt;
