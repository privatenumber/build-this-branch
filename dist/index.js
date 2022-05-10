#!/usr/bin/env node
'use strict';

var require$$0 = require('fs');
var childProcess = require('child_process');
var require$$2$1 = require('util');
var require$$0$2 = require('buffer');
var path$9 = require('path');
var process$2 = require('process');
var url = require('url');
var Si = require('os');
var require$$5 = require('assert');
var require$$2 = require('events');
var require$$0$1 = require('stream');
var If = require('module');
var H$2 = require('yoga-layout-prebuilt');
var Tf = require('tty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$0__namespace = /*#__PURE__*/_interopNamespace(require$$0);
var childProcess__default = /*#__PURE__*/_interopDefaultLegacy(childProcess);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path$9);
var process__default = /*#__PURE__*/_interopDefaultLegacy(process$2);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
var Si__default = /*#__PURE__*/_interopDefaultLegacy(Si);
var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var If__default = /*#__PURE__*/_interopDefaultLegacy(If);
var H__default = /*#__PURE__*/_interopDefaultLegacy(H$2);
var Tf__default = /*#__PURE__*/_interopDefaultLegacy(Tf);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var crossSpawn = {exports: {}};

var windows;
var hasRequiredWindows;

function requireWindows () {
	if (hasRequiredWindows) return windows;
	hasRequiredWindows = 1;
	windows = isexe;
	isexe.sync = sync;

	var fs = require$$0__default["default"];

	function checkPathExt (path, options) {
	  var pathext = options.pathExt !== undefined ?
	    options.pathExt : process.env.PATHEXT;

	  if (!pathext) {
	    return true
	  }

	  pathext = pathext.split(';');
	  if (pathext.indexOf('') !== -1) {
	    return true
	  }
	  for (var i = 0; i < pathext.length; i++) {
	    var p = pathext[i].toLowerCase();
	    if (p && path.substr(-p.length).toLowerCase() === p) {
	      return true
	    }
	  }
	  return false
	}

	function checkStat (stat, path, options) {
	  if (!stat.isSymbolicLink() && !stat.isFile()) {
	    return false
	  }
	  return checkPathExt(path, options)
	}

	function isexe (path, options, cb) {
	  fs.stat(path, function (er, stat) {
	    cb(er, er ? false : checkStat(stat, path, options));
	  });
	}

	function sync (path, options) {
	  return checkStat(fs.statSync(path), path, options)
	}
	return windows;
}

var mode;
var hasRequiredMode;

function requireMode () {
	if (hasRequiredMode) return mode;
	hasRequiredMode = 1;
	mode = isexe;
	isexe.sync = sync;

	var fs = require$$0__default["default"];

	function isexe (path, options, cb) {
	  fs.stat(path, function (er, stat) {
	    cb(er, er ? false : checkStat(stat, options));
	  });
	}

	function sync (path, options) {
	  return checkStat(fs.statSync(path), options)
	}

	function checkStat (stat, options) {
	  return stat.isFile() && checkMode(stat, options)
	}

	function checkMode (stat, options) {
	  var mod = stat.mode;
	  var uid = stat.uid;
	  var gid = stat.gid;

	  var myUid = options.uid !== undefined ?
	    options.uid : process.getuid && process.getuid();
	  var myGid = options.gid !== undefined ?
	    options.gid : process.getgid && process.getgid();

	  var u = parseInt('100', 8);
	  var g = parseInt('010', 8);
	  var o = parseInt('001', 8);
	  var ug = u | g;

	  var ret = (mod & o) ||
	    (mod & g) && gid === myGid ||
	    (mod & u) && uid === myUid ||
	    (mod & ug) && myUid === 0;

	  return ret
	}
	return mode;
}

var core;
if (process.platform === 'win32' || commonjsGlobal.TESTING_WINDOWS) {
  core = requireWindows();
} else {
  core = requireMode();
}

var isexe_1 = isexe$1;
isexe$1.sync = sync$1;

function isexe$1 (path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe$1(path, options || {}, function (er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    })
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}

function sync$1 (path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}

const isWindows$2 = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys';

const path$8 = path__default["default"];
const COLON = isWindows$2 ? ';' : ':';
const isexe = isexe_1;

const getNotFoundError = (cmd) =>
  Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' });

const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON;

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv = cmd.match(/\//) || isWindows$2 && cmd.match(/\\/) ? ['']
    : (
      [
        // windows always checks the cwd first
        ...(isWindows$2 ? [process.cwd()] : []),
        ...(opt.path || process.env.PATH ||
          /* istanbul ignore next: very unusual */ '').split(colon),
      ]
    );
  const pathExtExe = isWindows$2
    ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : '';
  const pathExt = isWindows$2 ? pathExtExe.split(colon) : [''];

  if (isWindows$2) {
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('');
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe,
  }
};

const which$1 = (cmd, opt, cb) => {
  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  const step = i => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found)
        : reject(getNotFoundError(cmd))

    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;

    const pCmd = path$8.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd;

    resolve(subStep(p, i, 0));
  });

  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1))
    const ext = pathExt[ii];
    isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext);
        else
          return resolve(p + ext)
      }
      return resolve(subStep(p, i, ii + 1))
    });
  });

  return cb ? step(0).then(res => cb(null, res), cb) : step(0)
};

const whichSync = (cmd, opt) => {
  opt = opt || {};

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  for (let i = 0; i < pathEnv.length; i ++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;

    const pCmd = path$8.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd;

    for (let j = 0; j < pathExt.length; j ++) {
      const cur = p + pathExt[j];
      try {
        const is = isexe.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
};

var which_1 = which$1;
which$1.sync = whichSync;

var pathKey$2 = {exports: {}};

const pathKey$1 = (options = {}) => {
	const environment = options.env || process.env;
	const platform = options.platform || process.platform;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(environment).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path';
};

pathKey$2.exports = pathKey$1;
// TODO: Remove this for the next major release
pathKey$2.exports.default = pathKey$1;

const path$7 = path__default["default"];
const which = which_1;
const getPathKey = pathKey$2.exports;

function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;

    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
            /* Empty */
        }
    }

    let resolved;

    try {
        resolved = which.sync(parsed.command, {
            path: env[getPathKey({ env })],
            pathExt: withoutPathExt ? path$7.delimiter : undefined,
        });
    } catch (e) {
        /* Empty */
    } finally {
        if (shouldSwitchCwd) {
            process.chdir(cwd);
        }
    }

    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path$7.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }

    return resolved;
}

function resolveCommand$1(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}

var resolveCommand_1 = resolveCommand$1;

var _escape = {};

// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;

function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    return arg;
}

function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;

    // Algorithm below is based on https://qntm.org/cmd

    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally

    // Quote the whole thing:
    arg = `"${arg}"`;

    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }

    return arg;
}

_escape.command = escapeCommand;
_escape.argument = escapeArgument;

var shebangRegex$1 = /^#!(.*)/;

const shebangRegex = shebangRegex$1;

var shebangCommand$1 = (string = '') => {
	const match = string.match(shebangRegex);

	if (!match) {
		return null;
	}

	const [path, argument] = match[0].replace(/#! ?/, '').split(' ');
	const binary = path.split('/').pop();

	if (binary === 'env') {
		return argument;
	}

	return argument ? `${binary} ${argument}` : binary;
};

const fs$7 = require$$0__default["default"];
const shebangCommand = shebangCommand$1;

function readShebang$1(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    const buffer = Buffer.alloc(size);

    let fd;

    try {
        fd = fs$7.openSync(command, 'r');
        fs$7.readSync(fd, buffer, 0, size, 0);
        fs$7.closeSync(fd);
    } catch (e) { /* Empty */ }

    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}

var readShebang_1 = readShebang$1;

const path$6 = path__default["default"];
const resolveCommand = resolveCommand_1;
const escape = _escape;
const readShebang = readShebang_1;

const isWin$2 = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);

    const shebang = parsed.file && readShebang(parsed.file);

    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;

        return resolveCommand(parsed);
    }

    return parsed.file;
}

function parseNonShell(parsed) {
    if (!isWin$2) {
        return parsed;
    }

    // Detect & add support for shebangs
    const commandFile = detectShebang(parsed);

    // We don't need a shell if the command filename is an executable
    const needsShell = !isExecutableRegExp.test(commandFile);

    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);

        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = path$6.normalize(parsed.command);

        // Escape command & arguments
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));

        const shellCommand = [parsed.command].concat(parsed.args).join(' ');

        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.command = process.env.comspec || 'cmd.exe';
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }

    return parsed;
}

function parse$1(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original

    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args,
        },
    };

    // Delegate further parsing to shell or non-shell
    return options.shell ? parsed : parseNonShell(parsed);
}

var parse_1 = parse$1;

const isWin$1 = process.platform === 'win32';

function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
    });
}

function hookChildProcess(cp, parsed) {
    if (!isWin$1) {
        return;
    }

    const originalEmit = cp.emit;

    cp.emit = function (name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            const err = verifyENOENT(arg1, parsed);

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}

function verifyENOENT(status, parsed) {
    if (isWin$1 && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin$1 && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    return null;
}

var enoent$1 = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
};

const cp$1 = childProcess__default["default"];
const parse = parse_1;
const enoent = enoent$1;

function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const spawned = cp$1.spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const result = cp$1.spawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

crossSpawn.exports = spawn;
crossSpawn.exports.spawn = spawn;
crossSpawn.exports.sync = spawnSync;

crossSpawn.exports._parse = parse;
crossSpawn.exports._enoent = enoent;

function stripFinalNewline(input) {
	const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, -1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, -1);
	}

	return input;
}

function pathKey(options = {}) {
	const {
		env = process.env,
		platform = process.platform
	} = options;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(env).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path';
}

function npmRunPath(options = {}) {
	const {
		cwd = process__default["default"].cwd(),
		path: path_ = process__default["default"].env[pathKey()],
		execPath = process__default["default"].execPath,
	} = options;

	let previous;
	const cwdString = cwd instanceof URL ? url__default["default"].fileURLToPath(cwd) : cwd;
	let cwdPath = path__default["default"].resolve(cwdString);
	const result = [];

	while (previous !== cwdPath) {
		result.push(path__default["default"].join(cwdPath, 'node_modules/.bin'));
		previous = cwdPath;
		cwdPath = path__default["default"].resolve(cwdPath, '..');
	}

	// Ensure the running `node` binary is used.
	result.push(path__default["default"].resolve(cwdString, execPath, '..'));

	return [...result, path_].join(path__default["default"].delimiter);
}

function npmRunPathEnv({env = process__default["default"].env, ...options} = {}) {
	env = {...env};

	const path = pathKey({env});
	options.path = env[path];
	env[path] = npmRunPath(options);

	return env;
}

const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	// `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
	// `Function#prototype` is non-writable and non-configurable so can never be modified.
	if (property === 'length' || property === 'prototype') {
		return;
	}

	// `Function#arguments` and `Function#caller` should not be copied. They were reported to be present in `Reflect.ownKeys` for some devices in React Native (#41), so we explicitly ignore them here.
	if (property === 'arguments' || property === 'caller') {
		return;
	}

	const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);

	if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
		return;
	}

	Object.defineProperty(to, property, fromDescriptor);
};

// `Object.defineProperty()` throws if the property exists, is not configurable and either:
// - one its descriptors is changed
// - it is non-writable and its value is changed
const canCopyProperty = function (toDescriptor, fromDescriptor) {
	return toDescriptor === undefined || toDescriptor.configurable || (
		toDescriptor.writable === fromDescriptor.writable &&
		toDescriptor.enumerable === fromDescriptor.enumerable &&
		toDescriptor.configurable === fromDescriptor.configurable &&
		(toDescriptor.writable || toDescriptor.value === fromDescriptor.value)
	);
};

const changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from);
	if (fromPrototype === Object.getPrototypeOf(to)) {
		return;
	}

	Object.setPrototypeOf(to, fromPrototype);
};

const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;

const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name');

// We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
// We use `bind()` instead of a closure for the same reason.
// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.
const changeToString = (to, from, name) => {
	const withName = name === '' ? '' : `with ${name.trim()}() `;
	const newToString = wrappedToString.bind(null, withName, from.toString());
	// Ensure `to.toString.toString` is non-enumerable and has the same `same`
	Object.defineProperty(newToString, 'name', toStringName);
	Object.defineProperty(to, 'toString', {...toStringDescriptor, value: newToString});
};

function mimicFunction(to, from, {ignoreNonConfigurable = false} = {}) {
	const {name} = to;

	for (const property of Reflect.ownKeys(from)) {
		copyProperty(to, from, property, ignoreNonConfigurable);
	}

	changePrototype(to, from);
	changeToString(to, from, name);

	return to;
}

const calledFunctions = new WeakMap();

const onetime = (function_, options = {}) => {
	if (typeof function_ !== 'function') {
		throw new TypeError('Expected a function');
	}

	let returnValue;
	let callCount = 0;
	const functionName = function_.displayName || function_.name || '<anonymous>';

	const onetime = function (...arguments_) {
		calledFunctions.set(onetime, ++callCount);

		if (callCount === 1) {
			returnValue = function_.apply(this, arguments_);
			function_ = null;
		} else if (options.throw === true) {
			throw new Error(`Function \`${functionName}\` can only be called once`);
		}

		return returnValue;
	};

	mimicFunction(onetime, function_);
	calledFunctions.set(onetime, callCount);

	return onetime;
};

onetime.callCount = function_ => {
	if (!calledFunctions.has(function_)) {
		throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
	}

	return calledFunctions.get(function_);
};

const getRealtimeSignals=function(){
const length=SIGRTMAX-SIGRTMIN+1;
return Array.from({length},getRealtimeSignal);
};

const getRealtimeSignal=function(value,index){
return {
name:`SIGRT${index+1}`,
number:SIGRTMIN+index,
action:"terminate",
description:"Application-specific signal (realtime)",
standard:"posix"};

};

const SIGRTMIN=34;
const SIGRTMAX=64;

const SIGNALS=[
{
name:"SIGHUP",
number:1,
action:"terminate",
description:"Terminal closed",
standard:"posix"},

{
name:"SIGINT",
number:2,
action:"terminate",
description:"User interruption with CTRL-C",
standard:"ansi"},

{
name:"SIGQUIT",
number:3,
action:"core",
description:"User interruption with CTRL-\\",
standard:"posix"},

{
name:"SIGILL",
number:4,
action:"core",
description:"Invalid machine instruction",
standard:"ansi"},

{
name:"SIGTRAP",
number:5,
action:"core",
description:"Debugger breakpoint",
standard:"posix"},

{
name:"SIGABRT",
number:6,
action:"core",
description:"Aborted",
standard:"ansi"},

{
name:"SIGIOT",
number:6,
action:"core",
description:"Aborted",
standard:"bsd"},

{
name:"SIGBUS",
number:7,
action:"core",
description:
"Bus error due to misaligned, non-existing address or paging error",
standard:"bsd"},

{
name:"SIGEMT",
number:7,
action:"terminate",
description:"Command should be emulated but is not implemented",
standard:"other"},

{
name:"SIGFPE",
number:8,
action:"core",
description:"Floating point arithmetic error",
standard:"ansi"},

{
name:"SIGKILL",
number:9,
action:"terminate",
description:"Forced termination",
standard:"posix",
forced:true},

{
name:"SIGUSR1",
number:10,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGSEGV",
number:11,
action:"core",
description:"Segmentation fault",
standard:"ansi"},

{
name:"SIGUSR2",
number:12,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGPIPE",
number:13,
action:"terminate",
description:"Broken pipe or socket",
standard:"posix"},

{
name:"SIGALRM",
number:14,
action:"terminate",
description:"Timeout or timer",
standard:"posix"},

{
name:"SIGTERM",
number:15,
action:"terminate",
description:"Termination",
standard:"ansi"},

{
name:"SIGSTKFLT",
number:16,
action:"terminate",
description:"Stack is empty or overflowed",
standard:"other"},

{
name:"SIGCHLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"posix"},

{
name:"SIGCLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"other"},

{
name:"SIGCONT",
number:18,
action:"unpause",
description:"Unpaused",
standard:"posix",
forced:true},

{
name:"SIGSTOP",
number:19,
action:"pause",
description:"Paused",
standard:"posix",
forced:true},

{
name:"SIGTSTP",
number:20,
action:"pause",
description:"Paused using CTRL-Z or \"suspend\"",
standard:"posix"},

{
name:"SIGTTIN",
number:21,
action:"pause",
description:"Background process cannot read terminal input",
standard:"posix"},

{
name:"SIGBREAK",
number:21,
action:"terminate",
description:"User interruption with CTRL-BREAK",
standard:"other"},

{
name:"SIGTTOU",
number:22,
action:"pause",
description:"Background process cannot write to terminal output",
standard:"posix"},

{
name:"SIGURG",
number:23,
action:"ignore",
description:"Socket received out-of-band data",
standard:"bsd"},

{
name:"SIGXCPU",
number:24,
action:"core",
description:"Process timed out",
standard:"bsd"},

{
name:"SIGXFSZ",
number:25,
action:"core",
description:"File too big",
standard:"bsd"},

{
name:"SIGVTALRM",
number:26,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGPROF",
number:27,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGWINCH",
number:28,
action:"ignore",
description:"Terminal window size changed",
standard:"bsd"},

{
name:"SIGIO",
number:29,
action:"terminate",
description:"I/O is available",
standard:"other"},

{
name:"SIGPOLL",
number:29,
action:"terminate",
description:"Watched event",
standard:"other"},

{
name:"SIGINFO",
number:29,
action:"ignore",
description:"Request for process information",
standard:"other"},

{
name:"SIGPWR",
number:30,
action:"terminate",
description:"Device running out of power",
standard:"systemv"},

{
name:"SIGSYS",
number:31,
action:"core",
description:"Invalid system call",
standard:"other"},

{
name:"SIGUNUSED",
number:31,
action:"terminate",
description:"Invalid system call",
standard:"other"}];

const getSignals=function(){
const realtimeSignals=getRealtimeSignals();
const signals=[...SIGNALS,...realtimeSignals].map(normalizeSignal);
return signals;
};







const normalizeSignal=function({
name,
number:defaultNumber,
description,
action,
forced=false,
standard})
{
const{
signals:{[name]:constantSignal}}=
Si.constants;
const supported=constantSignal!==undefined;
const number=supported?constantSignal:defaultNumber;
return {name,number,description,supported,action,forced,standard};
};

const getSignalsByName=function(){
const signals=getSignals();
return signals.reduce(getSignalByName,{});
};

const getSignalByName=function(
signalByNameMemo,
{name,number,description,supported,action,forced,standard})
{
return {
...signalByNameMemo,
[name]:{name,number,description,supported,action,forced,standard}};

};

const signalsByName=getSignalsByName();




const getSignalsByNumber=function(){
const signals=getSignals();
const length=SIGRTMAX+1;
const signalsA=Array.from({length},(value,number)=>
getSignalByNumber(number,signals));

return Object.assign({},...signalsA);
};

const getSignalByNumber=function(number,signals){
const signal=findSignalByNumber(number,signals);

if(signal===undefined){
return {};
}

const{name,description,supported,action,forced,standard}=signal;
return {
[number]:{
name,
number,
description,
supported,
action,
forced,
standard}};


};



const findSignalByNumber=function(number,signals){
const signal=signals.find(({name})=>Si.constants.signals[name]===number);

if(signal!==undefined){
return signal;
}

return signals.find((signalA)=>signalA.number===number);
};

getSignalsByNumber();

const getErrorPrefix = ({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => {
	if (timedOut) {
		return `timed out after ${timeout} milliseconds`;
	}

	if (isCanceled) {
		return 'was canceled';
	}

	if (errorCode !== undefined) {
		return `failed with ${errorCode}`;
	}

	if (signal !== undefined) {
		return `was killed with ${signal} (${signalDescription})`;
	}

	if (exitCode !== undefined) {
		return `failed with exit code ${exitCode}`;
	}

	return 'failed';
};

const makeError = ({
	stdout,
	stderr,
	all,
	error,
	signal,
	exitCode,
	command,
	escapedCommand,
	timedOut,
	isCanceled,
	killed,
	parsed: {options: {timeout}},
}) => {
	// `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
	// We normalize them to `undefined`
	exitCode = exitCode === null ? undefined : exitCode;
	signal = signal === null ? undefined : signal;
	const signalDescription = signal === undefined ? undefined : signalsByName[signal].description;

	const errorCode = error && error.code;

	const prefix = getErrorPrefix({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled});
	const execaMessage = `Command ${prefix}: ${command}`;
	const isError = Object.prototype.toString.call(error) === '[object Error]';
	const shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage;
	const message = [shortMessage, stderr, stdout].filter(Boolean).join('\n');

	if (isError) {
		error.originalMessage = error.message;
		error.message = message;
	} else {
		error = new Error(message);
	}

	error.shortMessage = shortMessage;
	error.command = command;
	error.escapedCommand = escapedCommand;
	error.exitCode = exitCode;
	error.signal = signal;
	error.signalDescription = signalDescription;
	error.stdout = stdout;
	error.stderr = stderr;

	if (all !== undefined) {
		error.all = all;
	}

	if ('bufferedData' in error) {
		delete error.bufferedData;
	}

	error.failed = true;
	error.timedOut = Boolean(timedOut);
	error.isCanceled = isCanceled;
	error.killed = killed && !timedOut;

	return error;
};

const aliases = ['stdin', 'stdout', 'stderr'];

const hasAlias = options => aliases.some(alias => options[alias] !== undefined);

const normalizeStdio = options => {
	if (!options) {
		return;
	}

	const {stdio} = options;

	if (stdio === undefined) {
		return aliases.map(alias => options[alias]);
	}

	if (hasAlias(options)) {
		throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map(alias => `\`${alias}\``).join(', ')}`);
	}

	if (typeof stdio === 'string') {
		return stdio;
	}

	if (!Array.isArray(stdio)) {
		throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
	}

	const length = Math.max(stdio.length, aliases.length);
	return Array.from({length}, (value, index) => stdio[index]);
};

var signalExit = {exports: {}};

var signals$1 = {exports: {}};

var hasRequiredSignals;

function requireSignals () {
	if (hasRequiredSignals) return signals$1.exports;
	hasRequiredSignals = 1;
	(function (module) {
		// This is not the set of all possible signals.
		//
		// It IS, however, the set of all signals that trigger
		// an exit on either Linux or BSD systems.  Linux is a
		// superset of the signal names supported on BSD, and
		// the unknown signals just fail to register, so we can
		// catch that easily enough.
		//
		// Don't bother with SIGKILL.  It's uncatchable, which
		// means that we can't fire any callbacks anyway.
		//
		// If a user does happen to register a handler on a non-
		// fatal signal like SIGWINCH or something, and then
		// exit, it'll end up firing `process.emit('exit')`, so
		// the handler will be fired anyway.
		//
		// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
		// artificially, inherently leave the process in a
		// state from which it is not safe to try and enter JS
		// listeners.
		module.exports = [
		  'SIGABRT',
		  'SIGALRM',
		  'SIGHUP',
		  'SIGINT',
		  'SIGTERM'
		];

		if (process.platform !== 'win32') {
		  module.exports.push(
		    'SIGVTALRM',
		    'SIGXCPU',
		    'SIGXFSZ',
		    'SIGUSR2',
		    'SIGTRAP',
		    'SIGSYS',
		    'SIGQUIT',
		    'SIGIOT'
		    // should detect profiler and enable/disable accordingly.
		    // see #21
		    // 'SIGPROF'
		  );
		}

		if (process.platform === 'linux') {
		  module.exports.push(
		    'SIGIO',
		    'SIGPOLL',
		    'SIGPWR',
		    'SIGSTKFLT',
		    'SIGUNUSED'
		  );
		}
} (signals$1));
	return signals$1.exports;
}

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
var process$1 = commonjsGlobal.process;

const processOk = function (process) {
  return process &&
    typeof process === 'object' &&
    typeof process.removeListener === 'function' &&
    typeof process.emit === 'function' &&
    typeof process.reallyExit === 'function' &&
    typeof process.listeners === 'function' &&
    typeof process.kill === 'function' &&
    typeof process.pid === 'number' &&
    typeof process.on === 'function'
};

// some kind of non-node environment, just no-op
/* istanbul ignore if */
if (!processOk(process$1)) {
  signalExit.exports = function () {
    return function () {}
  };
} else {
  var assert = require$$5__default["default"];
  var signals = requireSignals();
  var isWin = /^win/i.test(process$1.platform);

  var EE$2 = require$$2__default["default"];
  /* istanbul ignore if */
  if (typeof EE$2 !== 'function') {
    EE$2 = EE$2.EventEmitter;
  }

  var emitter;
  if (process$1.__signal_exit_emitter__) {
    emitter = process$1.__signal_exit_emitter__;
  } else {
    emitter = process$1.__signal_exit_emitter__ = new EE$2();
    emitter.count = 0;
    emitter.emitted = {};
  }

  // Because this emitter is a global, we have to check to see if a
  // previous version of this library failed to enable infinite listeners.
  // I know what you're about to say.  But literally everything about
  // signal-exit is a compromise with evil.  Get used to it.
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }

  signalExit.exports = function (cb, opts) {
    /* istanbul ignore if */
    if (!processOk(commonjsGlobal.process)) {
      return function () {}
    }
    assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler');

    if (loaded === false) {
      load();
    }

    var ev = 'exit';
    if (opts && opts.alwaysLast) {
      ev = 'afterexit';
    }

    var remove = function () {
      emitter.removeListener(ev, cb);
      if (emitter.listeners('exit').length === 0 &&
          emitter.listeners('afterexit').length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);

    return remove
  };

  var unload = function unload () {
    if (!loaded || !processOk(commonjsGlobal.process)) {
      return
    }
    loaded = false;

    signals.forEach(function (sig) {
      try {
        process$1.removeListener(sig, sigListeners[sig]);
      } catch (er) {}
    });
    process$1.emit = originalProcessEmit;
    process$1.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  signalExit.exports.unload = unload;

  var emit = function emit (event, code, signal) {
    /* istanbul ignore if */
    if (emitter.emitted[event]) {
      return
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };

  // { <signal>: <listener fn>, ... }
  var sigListeners = {};
  signals.forEach(function (sig) {
    sigListeners[sig] = function listener () {
      /* istanbul ignore if */
      if (!processOk(commonjsGlobal.process)) {
        return
      }
      // If there are no other listeners, an exit is coming!
      // Simplest way: remove us and then re-send the signal.
      // We know that this will kill the process, so we can
      // safely emit now.
      var listeners = process$1.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit('exit', null, sig);
        /* istanbul ignore next */
        emit('afterexit', null, sig);
        /* istanbul ignore next */
        if (isWin && sig === 'SIGHUP') {
          // "SIGHUP" throws an `ENOSYS` error on Windows,
          // so use a supported signal instead
          sig = 'SIGINT';
        }
        /* istanbul ignore next */
        process$1.kill(process$1.pid, sig);
      }
    };
  });

  signalExit.exports.signals = function () {
    return signals
  };

  var loaded = false;

  var load = function load () {
    if (loaded || !processOk(commonjsGlobal.process)) {
      return
    }
    loaded = true;

    // This is the number of onSignalExit's that are in play.
    // It's important so that we can count the correct number of
    // listeners on signals, and don't wait for the other one to
    // handle it instead of us.
    emitter.count += 1;

    signals = signals.filter(function (sig) {
      try {
        process$1.on(sig, sigListeners[sig]);
        return true
      } catch (er) {
        return false
      }
    });

    process$1.emit = processEmit;
    process$1.reallyExit = processReallyExit;
  };
  signalExit.exports.load = load;

  var originalProcessReallyExit = process$1.reallyExit;
  var processReallyExit = function processReallyExit (code) {
    /* istanbul ignore if */
    if (!processOk(commonjsGlobal.process)) {
      return
    }
    process$1.exitCode = code || /* istanbul ignore next */ 0;
    emit('exit', process$1.exitCode, null);
    /* istanbul ignore next */
    emit('afterexit', process$1.exitCode, null);
    /* istanbul ignore next */
    originalProcessReallyExit.call(process$1, process$1.exitCode);
  };

  var originalProcessEmit = process$1.emit;
  var processEmit = function processEmit (ev, arg) {
    if (ev === 'exit' && processOk(commonjsGlobal.process)) {
      /* istanbul ignore else */
      if (arg !== undefined) {
        process$1.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      /* istanbul ignore next */
      emit('exit', process$1.exitCode, null);
      /* istanbul ignore next */
      emit('afterexit', process$1.exitCode, null);
      /* istanbul ignore next */
      return ret
    } else {
      return originalProcessEmit.apply(this, arguments)
    }
  };
}

const DEFAULT_FORCE_KILL_TIMEOUT = 1000 * 5;

// Monkey-patches `childProcess.kill()` to add `forceKillAfterTimeout` behavior
const spawnedKill = (kill, signal = 'SIGTERM', options = {}) => {
	const killResult = kill(signal);
	setKillTimeout(kill, signal, options, killResult);
	return killResult;
};

const setKillTimeout = (kill, signal, options, killResult) => {
	if (!shouldForceKill(signal, options, killResult)) {
		return;
	}

	const timeout = getForceKillAfterTimeout(options);
	const t = setTimeout(() => {
		kill('SIGKILL');
	}, timeout);

	// Guarded because there's no `.unref()` when `execa` is used in the renderer
	// process in Electron. This cannot be tested since we don't run tests in
	// Electron.
	// istanbul ignore else
	if (t.unref) {
		t.unref();
	}
};

const shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => isSigterm(signal) && forceKillAfterTimeout !== false && killResult;

const isSigterm = signal => signal === Si__default["default"].constants.signals.SIGTERM
		|| (typeof signal === 'string' && signal.toUpperCase() === 'SIGTERM');

const getForceKillAfterTimeout = ({forceKillAfterTimeout = true}) => {
	if (forceKillAfterTimeout === true) {
		return DEFAULT_FORCE_KILL_TIMEOUT;
	}

	if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
		throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
	}

	return forceKillAfterTimeout;
};

// `childProcess.cancel()`
const spawnedCancel = (spawned, context) => {
	const killResult = spawned.kill();

	if (killResult) {
		context.isCanceled = true;
	}
};

const timeoutKill = (spawned, signal, reject) => {
	spawned.kill(signal);
	reject(Object.assign(new Error('Timed out'), {timedOut: true, signal}));
};

// `timeout` option handling
const setupTimeout = (spawned, {timeout, killSignal = 'SIGTERM'}, spawnedPromise) => {
	if (timeout === 0 || timeout === undefined) {
		return spawnedPromise;
	}

	let timeoutId;
	const timeoutPromise = new Promise((resolve, reject) => {
		timeoutId = setTimeout(() => {
			timeoutKill(spawned, killSignal, reject);
		}, timeout);
	});

	const safeSpawnedPromise = spawnedPromise.finally(() => {
		clearTimeout(timeoutId);
	});

	return Promise.race([timeoutPromise, safeSpawnedPromise]);
};

const validateTimeout = ({timeout}) => {
	if (timeout !== undefined && (!Number.isFinite(timeout) || timeout < 0)) {
		throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
	}
};

// `cleanup` option handling
const setExitHandler = async (spawned, {cleanup, detached}, timedPromise) => {
	if (!cleanup || detached) {
		return timedPromise;
	}

	const removeExitHandler = signalExit.exports(() => {
		spawned.kill();
	});

	return timedPromise.finally(() => {
		removeExitHandler();
	});
};

function isStream(stream) {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}

var getStream$1 = {exports: {}};

const {PassThrough: PassThroughStream} = require$$0__default$1["default"];

var bufferStream$1 = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};

const {constants: BufferConstants} = require$$0__default$2["default"];
const stream = require$$0__default$1["default"];
const {promisify} = require$$2__default$1["default"];
const bufferStream = bufferStream$1;

const streamPipelinePromisified = promisify(stream.pipeline);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		throw new Error('Expected a stream');
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;
	const stream = bufferStream(options);

	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		(async () => {
			try {
				await streamPipelinePromisified(inputStream, stream);
				resolve();
			} catch (error) {
				rejectPromise(error);
			}
		})();

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

getStream$1.exports = getStream;
getStream$1.exports.buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
getStream$1.exports.array = (stream, options) => getStream(stream, {...options, array: true});
getStream$1.exports.MaxBufferError = MaxBufferError;

const { PassThrough } = require$$0__default$1["default"];

var mergeStream = function (/*streams...*/) {
  var sources = [];
  var output  = new PassThrough({objectMode: true});

  output.setMaxListeners(0);

  output.add = add;
  output.isEmpty = isEmpty;

  output.on('unpipe', remove);

  Array.prototype.slice.call(arguments).forEach(add);

  return output

  function add (source) {
    if (Array.isArray(source)) {
      source.forEach(add);
      return this
    }

    sources.push(source);
    source.once('end', remove.bind(null, source));
    source.once('error', output.emit.bind(output, 'error'));
    source.pipe(output, {end: false});
    return this
  }

  function isEmpty () {
    return sources.length == 0;
  }

  function remove (source) {
    sources = sources.filter(function (it) { return it !== source });
    if (!sources.length && output.readable) { output.end(); }
  }
};

// `input` option
const handleInput = (spawned, input) => {
	// Checking for stdin is workaround for https://github.com/nodejs/node/issues/26852
	// @todo remove `|| spawned.stdin === undefined` once we drop support for Node.js <=12.2.0
	if (input === undefined || spawned.stdin === undefined) {
		return;
	}

	if (isStream(input)) {
		input.pipe(spawned.stdin);
	} else {
		spawned.stdin.end(input);
	}
};

// `all` interleaves `stdout` and `stderr`
const makeAllStream = (spawned, {all}) => {
	if (!all || (!spawned.stdout && !spawned.stderr)) {
		return;
	}

	const mixed = mergeStream();

	if (spawned.stdout) {
		mixed.add(spawned.stdout);
	}

	if (spawned.stderr) {
		mixed.add(spawned.stderr);
	}

	return mixed;
};

// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const getBufferedData = async (stream, streamPromise) => {
	if (!stream) {
		return;
	}

	stream.destroy();

	try {
		return await streamPromise;
	} catch (error) {
		return error.bufferedData;
	}
};

const getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
	if (!stream || !buffer) {
		return;
	}

	if (encoding) {
		return getStream$1.exports(stream, {encoding, maxBuffer});
	}

	return getStream$1.exports.buffer(stream, {maxBuffer});
};

// Retrieve result of child process: exit code, signal, error, streams (stdout/stderr/all)
const getSpawnedResult = async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
	const stdoutPromise = getStreamPromise(stdout, {encoding, buffer, maxBuffer});
	const stderrPromise = getStreamPromise(stderr, {encoding, buffer, maxBuffer});
	const allPromise = getStreamPromise(all, {encoding, buffer, maxBuffer: maxBuffer * 2});

	try {
		return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
	} catch (error) {
		return Promise.all([
			{error, signal: error.signal, timedOut: error.timedOut},
			getBufferedData(stdout, stdoutPromise),
			getBufferedData(stderr, stderrPromise),
			getBufferedData(all, allPromise),
		]);
	}
};

const nativePromisePrototype = (async () => {})().constructor.prototype;
const descriptors = ['then', 'catch', 'finally'].map(property => [
	property,
	Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property),
]);

// The return value is a mixin of `childProcess` and `Promise`
const mergePromise = (spawned, promise) => {
	for (const [property, descriptor] of descriptors) {
		// Starting the main `promise` is deferred to avoid consuming streams
		const value = typeof promise === 'function'
			? (...args) => Reflect.apply(descriptor.value, promise(), args)
			: descriptor.value.bind(promise);

		Reflect.defineProperty(spawned, property, {...descriptor, value});
	}

	return spawned;
};

// Use promises instead of `child_process` events
const getSpawnedPromise = spawned => new Promise((resolve, reject) => {
	spawned.on('exit', (exitCode, signal) => {
		resolve({exitCode, signal});
	});

	spawned.on('error', error => {
		reject(error);
	});

	if (spawned.stdin) {
		spawned.stdin.on('error', error => {
			reject(error);
		});
	}
});

const normalizeArgs = (file, args = []) => {
	if (!Array.isArray(args)) {
		return [file];
	}

	return [file, ...args];
};

const NO_ESCAPE_REGEXP = /^[\w.-]+$/;
const DOUBLE_QUOTES_REGEXP = /"/g;

const escapeArg = arg => {
	if (typeof arg !== 'string' || NO_ESCAPE_REGEXP.test(arg)) {
		return arg;
	}

	return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};

const joinCommand = (file, args) => normalizeArgs(file, args).join(' ');

const getEscapedCommand = (file, args) => normalizeArgs(file, args).map(arg => escapeArg(arg)).join(' ');

const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;

const getEnv = ({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
	const env = extendEnv ? {...process__default["default"].env, ...envOption} : envOption;

	if (preferLocal) {
		return npmRunPathEnv({env, cwd: localDir, execPath});
	}

	return env;
};

const handleArguments = (file, args, options = {}) => {
	const parsed = crossSpawn.exports._parse(file, args, options);
	file = parsed.command;
	args = parsed.args;
	options = parsed.options;

	options = {
		maxBuffer: DEFAULT_MAX_BUFFER,
		buffer: true,
		stripFinalNewline: true,
		extendEnv: true,
		preferLocal: false,
		localDir: options.cwd || process__default["default"].cwd(),
		execPath: process__default["default"].execPath,
		encoding: 'utf8',
		reject: true,
		cleanup: true,
		all: false,
		windowsHide: true,
		...options,
	};

	options.env = getEnv(options);

	options.stdio = normalizeStdio(options);

	if (process__default["default"].platform === 'win32' && path__default["default"].basename(file, '.exe') === 'cmd') {
		// #116
		args.unshift('/q');
	}

	return {file, args, options, parsed};
};

const handleOutput = (options, value, error) => {
	if (typeof value !== 'string' && !require$$0$2.Buffer.isBuffer(value)) {
		// When `execaSync()` errors, we normalize it to '' to mimic `execa()`
		return error === undefined ? undefined : '';
	}

	if (options.stripFinalNewline) {
		return stripFinalNewline(value);
	}

	return value;
};

function execa(file, args, options) {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand(file, args);
	const escapedCommand = getEscapedCommand(file, args);

	validateTimeout(parsed.options);

	let spawned;
	try {
		spawned = childProcess__default["default"].spawn(parsed.file, parsed.args, parsed.options);
	} catch (error) {
		// Ensure the returned error is always both a promise and a child process
		const dummySpawned = new childProcess__default["default"].ChildProcess();
		const errorPromise = Promise.reject(makeError({
			error,
			stdout: '',
			stderr: '',
			all: '',
			command,
			escapedCommand,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false,
		}));
		return mergePromise(dummySpawned, errorPromise);
	}

	const spawnedPromise = getSpawnedPromise(spawned);
	const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
	const processDone = setExitHandler(spawned, parsed.options, timedPromise);

	const context = {isCanceled: false};

	spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
	spawned.cancel = spawnedCancel.bind(null, spawned, context);

	const handlePromise = async () => {
		const [{error, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
		const stdout = handleOutput(parsed.options, stdoutResult);
		const stderr = handleOutput(parsed.options, stderrResult);
		const all = handleOutput(parsed.options, allResult);

		if (error || exitCode !== 0 || signal !== null) {
			const returnedError = makeError({
				error,
				exitCode,
				signal,
				stdout,
				stderr,
				all,
				command,
				escapedCommand,
				parsed,
				timedOut,
				isCanceled: context.isCanceled || (parsed.options.signal ? parsed.options.signal.aborted : false),
				killed: spawned.killed,
			});

			if (!parsed.options.reject) {
				return returnedError;
			}

			throw returnedError;
		}

		return {
			command,
			escapedCommand,
			exitCode: 0,
			stdout,
			stderr,
			all,
			failed: false,
			timedOut: false,
			isCanceled: false,
			killed: false,
		};
	};

	const handlePromiseOnce = onetime(handlePromise);

	handleInput(spawned, parsed.options.input);

	spawned.all = makeAllStream(spawned, parsed.options);

	return mergePromise(spawned, handlePromiseOnce);
}

var Ff=Object.defineProperty,wf=Object.defineProperties;var Sf=Object.getOwnPropertyDescriptors;var $l=Object.getOwnPropertySymbols;var xf=Object.prototype.hasOwnProperty,_f=Object.prototype.propertyIsEnumerable;var wi=(r,u,i)=>u in r?Ff(r,u,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[u]=i,an=(r,u)=>{for(var i in u||(u={}))xf.call(u,i)&&wi(r,i,u[i]);if($l)for(var i of $l(u))_f.call(u,i)&&wi(r,i,u[i]);return r},Jl=(r,u)=>wf(r,Sf(u));var Zl=(r,u,i)=>(wi(r,typeof u!="symbol"?u+"":u,i),i),es=(r,u,i)=>{if(!u.has(r))throw TypeError("Cannot "+i)};var ts=(r,u,i)=>(es(r,u,"read from private field"),i?i.call(r):u.get(r)),ns=(r,u,i)=>{if(u.has(r))throw TypeError("Cannot add the same private member more than once");u instanceof WeakSet?u.add(r):u.set(r,i);},rs=(r,u,i,c)=>(es(r,u,"write to private field"),c?c.call(r,i):u.set(r,i),i);var er;var Qe=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function is(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var $$3={exports:{}},q$1={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var os=Object.getOwnPropertySymbols,Pf=Object.prototype.hasOwnProperty,Lf=Object.prototype.propertyIsEnumerable;function Of(r){if(r==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}function Mf(){try{if(!Object.assign)return !1;var r=new String("abc");if(r[5]="de",Object.getOwnPropertyNames(r)[0]==="5")return !1;for(var u={},i=0;i<10;i++)u["_"+String.fromCharCode(i)]=i;var c=Object.getOwnPropertyNames(u).map(function(f){return u[f]});if(c.join("")!=="0123456789")return !1;var l={};return "abcdefghijklmnopqrst".split("").forEach(function(f){l[f]=f;}),Object.keys(Object.assign({},l)).join("")==="abcdefghijklmnopqrst"}catch{return !1}}var ls=Mf()?Object.assign:function(r,u){for(var i,c=Of(r),l,f=1;f<arguments.length;f++){i=Object(arguments[f]);for(var d in i)Pf.call(i,d)&&(c[d]=i[d]);if(os){l=os(i);for(var a=0;a<l.length;a++)Lf.call(i,l[a])&&(c[l[a]]=i[l[a]]);}}return c};/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xi=ls,cn=60103,ss=60106;q$1.Fragment=60107,q$1.StrictMode=60108,q$1.Profiler=60114;var as=60109,cs=60110,fs$6=60112;q$1.Suspense=60113;var ds=60115,Ds=60116;if(typeof Symbol=="function"&&Symbol.for){var Ye=Symbol.for;cn=Ye("react.element"),ss=Ye("react.portal"),q$1.Fragment=Ye("react.fragment"),q$1.StrictMode=Ye("react.strict_mode"),q$1.Profiler=Ye("react.profiler"),as=Ye("react.provider"),cs=Ye("react.context"),fs$6=Ye("react.forward_ref"),q$1.Suspense=Ye("react.suspense"),ds=Ye("react.memo"),Ds=Ye("react.lazy");}var ps=typeof Symbol=="function"&&Symbol.iterator;function zf(r){return r===null||typeof r!="object"?null:(r=ps&&r[ps]||r["@@iterator"],typeof r=="function"?r:null)}function Vn(r){for(var u="https://reactjs.org/docs/error-decoder.html?invariant="+r,i=1;i<arguments.length;i++)u+="&args[]="+encodeURIComponent(arguments[i]);return "Minified React error #"+r+"; visit "+u+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var hs={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ms={};function fn(r,u,i){this.props=r,this.context=u,this.refs=ms,this.updater=i||hs;}fn.prototype.isReactComponent={},fn.prototype.setState=function(r,u){if(typeof r!="object"&&typeof r!="function"&&r!=null)throw Error(Vn(85));this.updater.enqueueSetState(this,r,u,"setState");},fn.prototype.forceUpdate=function(r){this.updater.enqueueForceUpdate(this,r,"forceUpdate");};function gs(){}gs.prototype=fn.prototype;function _i(r,u,i){this.props=r,this.context=u,this.refs=ms,this.updater=i||hs;}var Ii=_i.prototype=new gs;Ii.constructor=_i,xi(Ii,fn.prototype),Ii.isPureReactComponent=!0;var Ri={current:null},Es=Object.prototype.hasOwnProperty,ys={key:!0,ref:!0,__self:!0,__source:!0};function vs(r,u,i){var c,l={},f=null,d=null;if(u!=null)for(c in u.ref!==void 0&&(d=u.ref),u.key!==void 0&&(f=""+u.key),u)Es.call(u,c)&&!ys.hasOwnProperty(c)&&(l[c]=u[c]);var a=arguments.length-2;if(a===1)l.children=i;else if(1<a){for(var p=Array(a),h=0;h<a;h++)p[h]=arguments[h+2];l.children=p;}if(r&&r.defaultProps)for(c in a=r.defaultProps,a)l[c]===void 0&&(l[c]=a[c]);return {$$typeof:cn,type:r,key:f,ref:d,props:l,_owner:Ri.current}}function jf(r,u){return {$$typeof:cn,type:r.type,key:u,ref:r.ref,props:r.props,_owner:r._owner}}function ki(r){return typeof r=="object"&&r!==null&&r.$$typeof===cn}function Uf(r){var u={"=":"=0",":":"=2"};return "$"+r.replace(/[=:]/g,function(i){return u[i]})}var Cs=/\/+/g;function Bi(r,u){return typeof r=="object"&&r!==null&&r.key!=null?Uf(""+r.key):u.toString(36)}function qr(r,u,i,c,l){var f=typeof r;(f==="undefined"||f==="boolean")&&(r=null);var d=!1;if(r===null)d=!0;else switch(f){case"string":case"number":d=!0;break;case"object":switch(r.$$typeof){case cn:case ss:d=!0;}}if(d)return d=r,l=l(d),r=c===""?"."+Bi(d,0):c,Array.isArray(l)?(i="",r!=null&&(i=r.replace(Cs,"$&/")+"/"),qr(l,u,i,"",function(h){return h})):l!=null&&(ki(l)&&(l=jf(l,i+(!l.key||d&&d.key===l.key?"":(""+l.key).replace(Cs,"$&/")+"/")+r)),u.push(l)),1;if(d=0,c=c===""?".":c+":",Array.isArray(r))for(var a=0;a<r.length;a++){f=r[a];var p=c+Bi(f,a);d+=qr(f,u,i,p,l);}else if(p=zf(r),typeof p=="function")for(r=p.call(r),a=0;!(f=r.next()).done;)f=f.value,p=c+Bi(f,a++),d+=qr(f,u,i,p,l);else if(f==="object")throw u=""+r,Error(Vn(31,u==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":u));return d}function Qr(r,u,i){if(r==null)return r;var c=[],l=0;return qr(r,c,"","",function(f){return u.call(i,f,l++)}),c}function Wf(r){if(r._status===-1){var u=r._result;u=u(),r._status=0,r._result=u,u.then(function(i){r._status===0&&(i=i.default,r._status=1,r._result=i);},function(i){r._status===0&&(r._status=2,r._result=i);});}if(r._status===1)return r._result;throw r._result}var Fs={current:null};function ht(){var r=Fs.current;if(r===null)throw Error(Vn(321));return r}var Hf={ReactCurrentDispatcher:Fs,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:Ri,IsSomeRendererActing:{current:!1},assign:xi};q$1.Children={map:Qr,forEach:function(r,u,i){Qr(r,function(){u.apply(this,arguments);},i);},count:function(r){var u=0;return Qr(r,function(){u++;}),u},toArray:function(r){return Qr(r,function(u){return u})||[]},only:function(r){if(!ki(r))throw Error(Vn(143));return r}},q$1.Component=fn,q$1.PureComponent=_i,q$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hf,q$1.cloneElement=function(r,u,i){if(r==null)throw Error(Vn(267,r));var c=xi({},r.props),l=r.key,f=r.ref,d=r._owner;if(u!=null){if(u.ref!==void 0&&(f=u.ref,d=Ri.current),u.key!==void 0&&(l=""+u.key),r.type&&r.type.defaultProps)var a=r.type.defaultProps;for(p in u)Es.call(u,p)&&!ys.hasOwnProperty(p)&&(c[p]=u[p]===void 0&&a!==void 0?a[p]:u[p]);}var p=arguments.length-2;if(p===1)c.children=i;else if(1<p){a=Array(p);for(var h=0;h<p;h++)a[h]=arguments[h+2];c.children=a;}return {$$typeof:cn,type:r.type,key:l,ref:f,props:c,_owner:d}},q$1.createContext=function(r,u){return u===void 0&&(u=null),r={$$typeof:cs,_calculateChangedBits:u,_currentValue:r,_currentValue2:r,_threadCount:0,Provider:null,Consumer:null},r.Provider={$$typeof:as,_context:r},r.Consumer=r},q$1.createElement=vs,q$1.createFactory=function(r){var u=vs.bind(null,r);return u.type=r,u},q$1.createRef=function(){return {current:null}},q$1.forwardRef=function(r){return {$$typeof:fs$6,render:r}},q$1.isValidElement=ki,q$1.lazy=function(r){return {$$typeof:Ds,_payload:{_status:-1,_result:r},_init:Wf}},q$1.memo=function(r,u){return {$$typeof:ds,type:r,compare:u===void 0?null:u}},q$1.useCallback=function(r,u){return ht().useCallback(r,u)},q$1.useContext=function(r,u){return ht().useContext(r,u)},q$1.useDebugValue=function(){},q$1.useEffect=function(r,u){return ht().useEffect(r,u)},q$1.useImperativeHandle=function(r,u,i){return ht().useImperativeHandle(r,u,i)},q$1.useLayoutEffect=function(r,u){return ht().useLayoutEffect(r,u)},q$1.useMemo=function(r,u){return ht().useMemo(r,u)},q$1.useReducer=function(r,u,i){return ht().useReducer(r,u,i)},q$1.useRef=function(r){return ht().useRef(r)},q$1.useState=function(r){return ht().useState(r)},q$1.version="17.0.2",function(r){r.exports=q$1;}($$3);var O$1=is($$3.exports);const ws=Symbol(),Gf=Symbol(),Ti=Symbol(),Ni=Object.getPrototypeOf,Ai=new WeakMap,Ss=r=>r&&(Ai.has(r)?Ai.get(r):Ni(r)===Object.prototype||Ni(r)===Array.prototype),xs=r=>typeof r=="object"&&r!==null,bf=(r,u)=>{let i=!1;const c=(f,d)=>{if(!i){let a=f.a.get(r);a||(a=new Set,f.a.set(r,a)),a.add(d);}},l={f:u,get(f,d){return d===Ti?r:(c(this,d),_s(f[d],this.a,this.c))},has(f,d){return d===Gf?(i=!0,this.a.delete(r),!0):(c(this,d),d in f)},ownKeys(f){return c(this,ws),Reflect.ownKeys(f)}};return u&&(l.set=l.deleteProperty=()=>!1),l},_s=(r,u,i)=>{if(!Ss(r))return r;const c=r[Ti]||r,l=(d=>Object.isFrozen(d)||Object.values(Object.getOwnPropertyDescriptors(d)).some(a=>!a.writable))(c);let f=i&&i.get(c);return f&&f.f===l||(f=bf(c,l),f.p=new Proxy(l?(d=>{if(Array.isArray(d))return Array.from(d);const a=Object.getOwnPropertyDescriptors(d);return Object.values(a).forEach(p=>{p.configurable=!0;}),Object.create(Ni(d),a)})(c):c,f),i&&i.set(c,f)),f.a=u,f.c=i,f.p},Vf=(r,u)=>{const i=Reflect.ownKeys(r),c=Reflect.ownKeys(u);return i.length!==c.length||i.some((l,f)=>l!==c[f])},Pi=(r,u,i,c)=>{if(Object.is(r,u))return !1;if(!xs(r)||!xs(u))return !0;const l=i.get(r);if(!l)return !0;if(c){const d=c.get(r);if(d&&d.n===u)return d.g;c.set(r,{n:u,g:!1});}let f=null;for(const d of l){const a=d===ws?Vf(r,u):Pi(r[d],u[d],i,c);if(a!==!0&&a!==!1||(f=a),f)break}return f===null&&(f=!0),c&&c.set(r,{n:u,g:f}),f},qf=r=>Ss(r)&&r[Ti]||null,Is=(r,u=!0)=>{Ai.set(r,u);},Rs=Symbol(),mt=Symbol(),Li=Symbol(),Yf=Symbol(),qn=Symbol(),ks=Symbol(),Bs=new WeakSet,Yr=r=>typeof r=="object"&&r!==null,Kf=r=>Yr(r)&&!Bs.has(r)&&(Array.isArray(r)||!(Symbol.iterator in r))&&!(r instanceof WeakMap)&&!(r instanceof WeakSet)&&!(r instanceof Error)&&!(r instanceof Number)&&!(r instanceof Date)&&!(r instanceof String)&&!(r instanceof RegExp)&&!(r instanceof ArrayBuffer),Ts=new WeakMap;let Ns=1;const As=new WeakMap,Ps=(r={})=>{if(!Yr(r))throw new Error("object required");const u=Ts.get(r);if(u)return u;let i=Ns;const c=new Set,l=(C,w)=>{w||(w=++Ns),i!==w&&(i=w,c.forEach(_=>_(C,w)));},f=new Map,d=C=>{let w=f.get(C);return w||(w=(_,R)=>{const z=[..._];z[1]=[C,...z[1]],l(z,R);},f.set(C,w)),w},a=C=>{const w=f.get(C);return f.delete(C),w},p=(C,w)=>{const _=As.get(w);if((_==null?void 0:_[0])===i)return _[1];const R=Array.isArray(C)?[]:Object.create(Object.getPrototypeOf(C));return Is(R,!0),As.set(w,[i,R]),Reflect.ownKeys(C).forEach(z=>{const A=Reflect.get(C,z,w);if(Bs.has(A))Is(A,!1),R[z]=A;else if(A instanceof Promise)if(qn in A)R[z]=A[qn];else {const K=A[ks]||A;Object.defineProperty(R,z,{get(){if(qn in A)return A[qn];throw K}});}else A!=null&&A[mt]?R[z]=A[Li]:R[z]=A;}),Object.freeze(R),R},h=Array.isArray(r)?[]:Object.create(Object.getPrototypeOf(r)),E={get(C,w,_){return w===Rs?i:w===mt?c:w===Li?p(C,_):w===Yf?E:Reflect.get(C,w,_)},deleteProperty(C,w){const _=Reflect.get(C,w),R=_==null?void 0:_[mt];R&&R.delete(a(w));const z=Reflect.deleteProperty(C,w);return z&&l(["delete",[w],_]),z},is:Object.is,canProxy:Kf,set(C,w,_,R){var z;const A=Reflect.get(C,w,R);if(this.is(A,_))return !0;const K=A==null?void 0:A[mt];K&&K.delete(a(w)),Yr(_)&&(_=qf(_)||_);let Q;return (z=Object.getOwnPropertyDescriptor(C,w))!=null&&z.set?Q=_:_ instanceof Promise?Q=_.then(J=>(Q[qn]=J,l(["resolve",[w],J]),J)).catch(J=>{Q[ks]=J,l(["reject",[w],J]);}):_!=null&&_[mt]?(Q=_,Q[mt].add(d(w))):this.canProxy(_)?(Q=Ps(_),Q[mt].add(d(w))):Q=_,Reflect.set(C,w,Q,R),l(["set",[w],_,A]),!0}},g=new Proxy(h,E);return Ts.set(r,g),Reflect.ownKeys(r).forEach(C=>{const w=Object.getOwnPropertyDescriptor(r,C);w.get||w.set?Object.defineProperty(h,C,w):g[C]=r[C];}),g},Xf=r=>Yr(r)?r[Rs]:void 0,$f=(r,u,i)=>{let c;const l=[],f=d=>{if(l.push(d),i){u(l.splice(0));return}c||(c=Promise.resolve().then(()=>{c=void 0,u(l.splice(0));}));};return r[mt].add(f),()=>{r[mt].delete(f);}},Oi=r=>r[Li],Bt="_uMS_T",Mi="_uMS_V",Jf=(r,u)=>({[Bt]:r,[Mi]:u}),Zf=(r,u,i)=>{const c=$$3.exports.useRef(),l=r[Mi](r[Bt]),[f,d]=$$3.exports.useState(()=>[r,u,i,l,u(r[Bt])]);let a=f[4];return f[0]!==r||f[1]!==u||f[2]!==i?(a=u(r[Bt]),d([r,u,i,l,a])):l!==f[3]&&l!==c.current&&(a=u(r[Bt]),Object.is(a,f[4])||d([r,u,i,l,a])),$$3.exports.useEffect(()=>{let p=!1;const h=()=>{if(!p)try{const g=u(r[Bt]),C=r[Mi](r[Bt]);c.current=C,d(w=>w[0]!==r||w[1]!==u||w[2]!==i||Object.is(w[4],g)?w:[w[0],w[1],w[2],C,g]);}catch{d(C=>[...C]);}},E=i(r[Bt],h);return h(),()=>{p=!0,E();}},[r,u,i]),a},ed=typeof window=="undefined"||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent),Ls=ed?$$3.exports.useEffect:$$3.exports.useLayoutEffect,zi=new WeakMap,td=r=>(zi.has(r)||zi.set(r,Jf(r,Xf)),zi.get(r)),nd=(r,u)=>{const i=$$3.exports.useReducer(g=>g+1,0)[1],c=new WeakMap,l=$$3.exports.useRef(),f=$$3.exports.useRef(),d=$$3.exports.useRef();Ls(()=>{d.current=f.current=Oi(r);},[r]),Ls(()=>{l.current=c,f.current!==d.current&&Pi(f.current,d.current,c,new WeakMap)&&(f.current=d.current,i());});const a=u==null?void 0:u.sync,p=$$3.exports.useCallback((g,C)=>$f(g,()=>{const w=Oi(g);d.current=w;try{if(l.current&&!Pi(f.current,w,l.current,new WeakMap))return}catch{}f.current=w,C();},a),[a]),h=Zf(td(r),Oi,p),E=$$3.exports.useMemo(()=>new WeakMap,[]);return _s(h,c,E)};function rd(r,u=1,i={}){const{indent:c=" ",includeEmptyLines:l=!1}=i;if(typeof r!="string")throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof r}\``);if(typeof u!="number")throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof u}\``);if(u<0)throw new RangeError(`Expected \`count\` to be at least 0, got \`${u}\``);if(typeof c!="string")throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof c}\``);if(u===0)return r;const f=l?/^/gm:/^(?!\s*$)/gm;return r.replace(f,c.repeat(u))}function ud(r){if(typeof r!="string")throw new TypeError("Expected a string");return r.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}const Os=/\s+at.*[(\s](.*)\)?/,id=/^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/,od=typeof Si__default["default"].homedir=="undefined"?"":Si__default["default"].homedir().replace(/\\/g,"/");function ld(r,{pretty:u=!1,basePath:i}={}){const c=i&&new RegExp(`(at | \\()${ud(i.replace(/\\/g,"/"))}`,"g");if(typeof r=="string")return r.replace(/\\/g,"/").split(`
`).filter(l=>{const f=l.match(Os);if(f===null||!f[1])return !0;const d=f[1];return d.includes(".app/Contents/Resources/electron.asar")||d.includes(".app/Contents/Resources/default_app.asar")?!1:!id.test(d)}).filter(l=>l.trim()!=="").map(l=>(c&&(l=l.replace(c,"$1")),u&&(l=l.replace(Os,(f,d)=>f.replace(d,d.replace(od,"~")))),l)).join(`
`)}const sd=r=>r.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g,"");class ad extends Error{constructor(i){if(!Array.isArray(i))throw new TypeError(`Expected input to be an Array, got ${typeof i}`);i=i.map(l=>l instanceof Error?l:l!==null&&typeof l=="object"?Object.assign(new Error(l.message),l):new Error(l));let c=i.map(l=>typeof l.stack=="string"?sd(ld(l.stack)):String(l)).join(`
`);c=`
`+rd(c,4);super(c);ns(this,er,void 0);Zl(this,"name","AggregateError");rs(this,er,i);}get errors(){return ts(this,er).slice()}}er=new WeakMap;async function cd(r,u,{concurrency:i=Number.POSITIVE_INFINITY,stopOnError:c=!0}={}){return new Promise((l,f)=>{if(r[Symbol.iterator]===void 0&&r[Symbol.asyncIterator]===void 0)throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof r})`);if(typeof u!="function")throw new TypeError("Mapper function is required");if(!((Number.isSafeInteger(i)||i===Number.POSITIVE_INFINITY)&&i>=1))throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${i}\` (${typeof i})`);const d=[],a=[],p=new Map;let h=!1,E=!1,g=!1,C=0,w=0;const _=r[Symbol.iterator]===void 0?r[Symbol.asyncIterator]():r[Symbol.iterator](),R=A=>{h=!0,E=!0,f(A);},z=async()=>{if(E)return;const A=await _.next(),K=w;if(w++,A.done){if(g=!0,C===0&&!E){if(!c&&a.length>0){R(new ad(a));return}if(E=!0,!p.size){l(d);return}const Q=[];for(const[J,Ne]of d.entries())p.get(J)!==Ms&&Q.push(Ne);l(Q);}return}C++,(async()=>{try{const Q=await A.value;if(E)return;const J=await u(Q,K);J===Ms&&p.set(K,J),d[K]=J,C--,await z();}catch(Q){if(c)R(Q);else {a.push(Q),C--;try{await z();}catch(J){R(J);}}}})();};(async()=>{for(let A=0;A<i;A++){try{await z();}catch(K){R(K);break}if(g||h)break}})();})}const Ms=Symbol("skip");function fd(r,u){const i=r.push(u)-1;return r[i]}function dd(r,u){const i=r.indexOf(u);i>-1&&r.splice(i,1);}var zs="Expected a function",js=0/0,Dd="[object Symbol]",pd=/^\s+|\s+$/g,hd=/^[-+]0x[0-9a-f]+$/i,md=/^0b[01]+$/i,gd=/^0o[0-7]+$/i,Ed=parseInt,yd=typeof Qe=="object"&&Qe&&Qe.Object===Object&&Qe,vd=typeof self=="object"&&self&&self.Object===Object&&self,Cd=yd||vd||Function("return this")(),Fd=Object.prototype,wd=Fd.toString,Sd=Math.max,xd=Math.min,ji=function(){return Cd.Date.now()};function _d(r,u,i){var c,l,f,d,a,p,h=0,E=!1,g=!1,C=!0;if(typeof r!="function")throw new TypeError(zs);u=Us(u)||0,Kr(i)&&(E=!!i.leading,g="maxWait"in i,f=g?Sd(Us(i.maxWait)||0,u):f,C="trailing"in i?!!i.trailing:C);function w(b){var ge=c,_e=l;return c=l=void 0,h=b,d=r.apply(_e,ge),d}function _(b){return h=b,a=setTimeout(A,u),E?w(b):d}function R(b){var ge=b-p,_e=b-h,Y=u-ge;return g?xd(Y,f-_e):Y}function z(b){var ge=b-p,_e=b-h;return p===void 0||ge>=u||ge<0||g&&_e>=f}function A(){var b=ji();if(z(b))return K(b);a=setTimeout(A,R(b));}function K(b){return a=void 0,C&&c?w(b):(c=l=void 0,d)}function Q(){a!==void 0&&clearTimeout(a),h=0,c=p=l=a=void 0;}function J(){return a===void 0?d:K(ji())}function Ne(){var b=ji(),ge=z(b);if(c=arguments,l=this,p=b,ge){if(a===void 0)return _(p);if(g)return a=setTimeout(A,u),w(p)}return a===void 0&&(a=setTimeout(A,u)),d}return Ne.cancel=Q,Ne.flush=J,Ne}function Id(r,u,i){var c=!0,l=!0;if(typeof r!="function")throw new TypeError(zs);return Kr(i)&&(c="leading"in i?!!i.leading:c,l="trailing"in i?!!i.trailing:l),_d(r,u,{leading:c,maxWait:u,trailing:l})}function Kr(r){var u=typeof r;return !!r&&(u=="object"||u=="function")}function Rd(r){return !!r&&typeof r=="object"}function kd(r){return typeof r=="symbol"||Rd(r)&&wd.call(r)==Dd}function Us(r){if(typeof r=="number")return r;if(kd(r))return js;if(Kr(r)){var u=typeof r.valueOf=="function"?r.valueOf():r;r=Kr(u)?u+"":u;}if(typeof r!="string")return r===0?r:+r;r=r.replace(pd,"");var i=md.test(r);return i||gd.test(r)?Ed(r.slice(2),i?2:8):hd.test(r)?js:+r}var Ws=Id,Hs={exports:{}};(function(r){const u=r.exports;r.exports.default=u;const i="\x1B[",c="\x1B]",l="\x07",f=";",d=process.env.TERM_PROGRAM==="Apple_Terminal";u.cursorTo=(a,p)=>{if(typeof a!="number")throw new TypeError("The `x` argument is required");return typeof p!="number"?i+(a+1)+"G":i+(p+1)+";"+(a+1)+"H"},u.cursorMove=(a,p)=>{if(typeof a!="number")throw new TypeError("The `x` argument is required");let h="";return a<0?h+=i+-a+"D":a>0&&(h+=i+a+"C"),p<0?h+=i+-p+"A":p>0&&(h+=i+p+"B"),h},u.cursorUp=(a=1)=>i+a+"A",u.cursorDown=(a=1)=>i+a+"B",u.cursorForward=(a=1)=>i+a+"C",u.cursorBackward=(a=1)=>i+a+"D",u.cursorLeft=i+"G",u.cursorSavePosition=d?"\x1B7":i+"s",u.cursorRestorePosition=d?"\x1B8":i+"u",u.cursorGetPosition=i+"6n",u.cursorNextLine=i+"E",u.cursorPrevLine=i+"F",u.cursorHide=i+"?25l",u.cursorShow=i+"?25h",u.eraseLines=a=>{let p="";for(let h=0;h<a;h++)p+=u.eraseLine+(h<a-1?u.cursorUp():"");return a&&(p+=u.cursorLeft),p},u.eraseEndLine=i+"K",u.eraseStartLine=i+"1K",u.eraseLine=i+"2K",u.eraseDown=i+"J",u.eraseUp=i+"1J",u.eraseScreen=i+"2J",u.scrollUp=i+"S",u.scrollDown=i+"T",u.clearScreen="\x1Bc",u.clearTerminal=process.platform==="win32"?`${u.eraseScreen}${i}0f`:`${u.eraseScreen}${i}3J${i}H`,u.beep=l,u.link=(a,p)=>[c,"8",f,f,p,l,a,c,"8",f,f,l].join(""),u.image=(a,p={})=>{let h=`${c}1337;File=inline=1`;return p.width&&(h+=`;width=${p.width}`),p.height&&(h+=`;height=${p.height}`),p.preserveAspectRatio===!1&&(h+=";preserveAspectRatio=0"),h+":"+a.toString("base64")+l},u.iTerm={setCwd:(a=process.cwd())=>`${c}50;CurrentDir=${a}${l}`,annotation:(a,p={})=>{let h=`${c}1337;`;const E=typeof p.x!="undefined",g=typeof p.y!="undefined";if((E||g)&&!(E&&g&&typeof p.length!="undefined"))throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");return a=a.replace(/\|/g,""),h+=p.isHidden?"AddHiddenAnnotation=":"AddAnnotation=",p.length>0?h+=(E?[a,p.length,p.x,p.y]:[p.length,a]).join("|"):h+=a,h+l}};})(Hs);var Ui=Hs.exports,Qn={},Xr={exports:{}},Wi={exports:{}};const Gs=(r,u)=>{for(const i of Reflect.ownKeys(u))Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(u,i));return r};Wi.exports=Gs,Wi.exports.default=Gs;const Bd=Wi.exports,$r=new WeakMap,bs=(r,u={})=>{if(typeof r!="function")throw new TypeError("Expected a function");let i,c=0;const l=r.displayName||r.name||"<anonymous>",f=function(...d){if($r.set(f,++c),c===1)i=r.apply(this,d),r=null;else if(u.throw===!0)throw new Error(`Function \`${l}\` can only be called once`);return i};return Bd(f,r),$r.set(f,c),f};Xr.exports=bs,Xr.exports.default=bs,Xr.exports.callCount=r=>{if(!$r.has(r))throw new Error(`The given function \`${r.name}\` is not wrapped by the \`onetime\` package`);return $r.get(r)};var Vt={exports:{}},Hi={exports:{}},Vs;function Td(){return Vs||(Vs=1,function(r){r.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"],process.platform!=="win32"&&r.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),process.platform==="linux"&&r.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED");}(Hi)),Hi.exports}var ue=Qe.process;const qt=function(r){return r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function"};if(!qt(ue))Vt.exports=function(){return function(){}};else {var Nd=require$$5__default["default"],Yn=Td(),Ad=/^win/i.test(ue.platform),Jr=require$$2__default["default"];typeof Jr!="function"&&(Jr=Jr.EventEmitter);var Ce;ue.__signal_exit_emitter__?Ce=ue.__signal_exit_emitter__:(Ce=ue.__signal_exit_emitter__=new Jr,Ce.count=0,Ce.emitted={}),Ce.infinite||(Ce.setMaxListeners(1/0),Ce.infinite=!0),Vt.exports=function(r,u){if(!qt(Qe.process))return function(){};Nd.equal(typeof r,"function","a callback must be provided for exit handler"),Kn===!1&&qs();var i="exit";u&&u.alwaysLast&&(i="afterexit");var c=function(){Ce.removeListener(i,r),Ce.listeners("exit").length===0&&Ce.listeners("afterexit").length===0&&Gi();};return Ce.on(i,r),c};var Gi=function(){!Kn||!qt(Qe.process)||(Kn=!1,Yn.forEach(function(u){try{ue.removeListener(u,bi[u]);}catch{}}),ue.emit=Vi,ue.reallyExit=Qs,Ce.count-=1);};Vt.exports.unload=Gi;var dn=function(u,i,c){Ce.emitted[u]||(Ce.emitted[u]=!0,Ce.emit(u,i,c));},bi={};Yn.forEach(function(r){bi[r]=function(){if(!!qt(Qe.process)){var i=ue.listeners(r);i.length===Ce.count&&(Gi(),dn("exit",null,r),dn("afterexit",null,r),Ad&&r==="SIGHUP"&&(r="SIGINT"),ue.kill(ue.pid,r));}};}),Vt.exports.signals=function(){return Yn};var Kn=!1,qs=function(){Kn||!qt(Qe.process)||(Kn=!0,Ce.count+=1,Yn=Yn.filter(function(u){try{return ue.on(u,bi[u]),!0}catch{return !1}}),ue.emit=Ld,ue.reallyExit=Pd);};Vt.exports.load=qs;var Qs=ue.reallyExit,Pd=function(u){!qt(Qe.process)||(ue.exitCode=u||0,dn("exit",ue.exitCode,null),dn("afterexit",ue.exitCode,null),Qs.call(ue,ue.exitCode));},Vi=ue.emit,Ld=function(u,i){if(u==="exit"&&qt(Qe.process)){i!==void 0&&(ue.exitCode=i);var c=Vi.apply(this,arguments);return dn("exit",ue.exitCode,null),dn("afterexit",ue.exitCode,null),c}else return Vi.apply(this,arguments)};}const Od=Xr.exports,Md=Vt.exports;var zd=Od(()=>{Md(()=>{process.stderr.write("\x1B[?25h");},{alwaysLast:!0});});(function(r){const u=zd;let i=!1;r.show=(c=process.stderr)=>{!c.isTTY||(i=!1,c.write("\x1B[?25h"));},r.hide=(c=process.stderr)=>{!c.isTTY||(u(),i=!0,c.write("\x1B[?25l"));},r.toggle=(c,l)=>{c!==void 0&&(i=c),i?r.show(l):r.hide(l);};})(Qn);var Ys={},jd=[{name:"AppVeyor",constant:"APPVEYOR",env:"APPVEYOR",pr:"APPVEYOR_PULL_REQUEST_NUMBER"},{name:"Azure Pipelines",constant:"AZURE_PIPELINES",env:"SYSTEM_TEAMFOUNDATIONCOLLECTIONURI",pr:"SYSTEM_PULLREQUEST_PULLREQUESTID"},{name:"Bamboo",constant:"BAMBOO",env:"bamboo_planKey"},{name:"Bitbucket Pipelines",constant:"BITBUCKET",env:"BITBUCKET_COMMIT",pr:"BITBUCKET_PR_ID"},{name:"Bitrise",constant:"BITRISE",env:"BITRISE_IO",pr:"BITRISE_PULL_REQUEST"},{name:"Buddy",constant:"BUDDY",env:"BUDDY_WORKSPACE_ID",pr:"BUDDY_EXECUTION_PULL_REQUEST_ID"},{name:"Buildkite",constant:"BUILDKITE",env:"BUILDKITE",pr:{env:"BUILDKITE_PULL_REQUEST",ne:"false"}},{name:"CircleCI",constant:"CIRCLE",env:"CIRCLECI",pr:"CIRCLE_PULL_REQUEST"},{name:"Cirrus CI",constant:"CIRRUS",env:"CIRRUS_CI",pr:"CIRRUS_PR"},{name:"AWS CodeBuild",constant:"CODEBUILD",env:"CODEBUILD_BUILD_ARN"},{name:"Codeship",constant:"CODESHIP",env:{CI_NAME:"codeship"}},{name:"Drone",constant:"DRONE",env:"DRONE",pr:{DRONE_BUILD_EVENT:"pull_request"}},{name:"dsari",constant:"DSARI",env:"DSARI"},{name:"GitLab CI",constant:"GITLAB",env:"GITLAB_CI"},{name:"GoCD",constant:"GOCD",env:"GO_PIPELINE_LABEL"},{name:"Hudson",constant:"HUDSON",env:"HUDSON_URL"},{name:"Jenkins",constant:"JENKINS",env:["JENKINS_URL","BUILD_ID"],pr:{any:["ghprbPullId","CHANGE_ID"]}},{name:"Magnum CI",constant:"MAGNUM",env:"MAGNUM"},{name:"Netlify CI",constant:"NETLIFY",env:"NETLIFY_BUILD_BASE",pr:{env:"PULL_REQUEST",ne:"false"}},{name:"Sail CI",constant:"SAIL",env:"SAILCI",pr:"SAIL_PULL_REQUEST_NUMBER"},{name:"Semaphore",constant:"SEMAPHORE",env:"SEMAPHORE",pr:"PULL_REQUEST_NUMBER"},{name:"Shippable",constant:"SHIPPABLE",env:"SHIPPABLE",pr:{IS_PULL_REQUEST:"true"}},{name:"Solano CI",constant:"SOLANO",env:"TDDIUM",pr:"TDDIUM_PR_ID"},{name:"Strider CD",constant:"STRIDER",env:"STRIDER"},{name:"TaskCluster",constant:"TASKCLUSTER",env:["TASK_ID","RUN_ID"]},{name:"TeamCity",constant:"TEAMCITY",env:"TEAMCITY_VERSION"},{name:"Travis CI",constant:"TRAVIS",env:"TRAVIS",pr:{env:"TRAVIS_PULL_REQUEST",ne:"false"}}];(function(r){var u=jd,i=process.env;Object.defineProperty(r,"_vendors",{value:u.map(function(l){return l.constant})}),r.name=null,r.isPR=null,u.forEach(function(l){var f=Array.isArray(l.env)?l.env:[l.env],d=f.every(function(a){return c(a)});if(r[l.constant]=d,d)switch(r.name=l.name,typeof l.pr){case"string":r.isPR=!!i[l.pr];break;case"object":"env"in l.pr?r.isPR=l.pr.env in i&&i[l.pr.env]!==l.pr.ne:"any"in l.pr?r.isPR=l.pr.any.some(function(a){return !!i[a]}):r.isPR=c(l.pr);break;default:r.isPR=null;}}),r.isCI=!!(i.CI||i.CONTINUOUS_INTEGRATION||i.BUILD_NUMBER||i.RUN_ID||r.name);function c(l){return typeof l=="string"?!!i[l]:Object.keys(l).every(function(f){return i[f]===l[f]})}})(Ys);var Ud=Ys.isCI;const Wd=r=>{const u=new Set;do for(const i of Reflect.ownKeys(r))u.add([r,i]);while((r=Reflect.getPrototypeOf(r))&&r!==Object.prototype);return u};var Hd=(r,{include:u,exclude:i}={})=>{const c=l=>{const f=d=>typeof d=="string"?l===d:d.test(l);return u?u.some(f):i?!i.some(f):!0};for(const[l,f]of Wd(r.constructor.prototype)){if(f==="constructor"||!c(f))continue;const d=Reflect.getOwnPropertyDescriptor(l,f);d&&typeof d.value=="function"&&(r[f]=r[f].bind(r));}return r},Zr={exports:{}},Ks={};/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */((function(r){var u,i,c,l;if(typeof performance=="object"&&typeof performance.now=="function"){var f=performance;r.unstable_now=function(){return f.now()};}else {var d=Date,a=d.now();r.unstable_now=function(){return d.now()-a};}if(typeof window=="undefined"||typeof MessageChannel!="function"){var p=null,h=null,E=function(){if(p!==null)try{var k=r.unstable_now();p(!0,k),p=null;}catch(j){throw setTimeout(E,0),j}};u=function(k){p!==null?setTimeout(u,0,k):(p=k,setTimeout(E,0));},i=function(k,j){h=setTimeout(k,j);},c=function(){clearTimeout(h);},r.unstable_shouldYield=function(){return !1},l=r.unstable_forceFrameRate=function(){};}else {var g=window.setTimeout,C=window.clearTimeout;if(typeof console!="undefined"){var w=window.cancelAnimationFrame;typeof window.requestAnimationFrame!="function"&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),typeof w!="function"&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");}var _=!1,R=null,z=-1,A=5,K=0;r.unstable_shouldYield=function(){return r.unstable_now()>=K},l=function(){},r.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<k?Math.floor(1e3/k):5;};var Q=new MessageChannel,J=Q.port2;Q.port1.onmessage=function(){if(R!==null){var k=r.unstable_now();K=k+A;try{R(!0,k)?J.postMessage(null):(_=!1,R=null);}catch(j){throw J.postMessage(null),j}}else _=!1;},u=function(k){R=k,_||(_=!0,J.postMessage(null));},i=function(k,j){z=g(function(){k(r.unstable_now());},j);},c=function(){C(z),z=-1;};}function Ne(k,j){var G=k.length;k.push(j);e:for(;;){var ie=G-1>>>1,ce=k[ie];if(ce!==void 0&&0<_e(ce,j))k[ie]=j,k[G]=ce,G=ie;else break e}}function b(k){return k=k[0],k===void 0?null:k}function ge(k){var j=k[0];if(j!==void 0){var G=k.pop();if(G!==j){k[0]=G;e:for(var ie=0,ce=k.length;ie<ce;){var $e=2*(ie+1)-1,Je=k[$e],ut=$e+1,it=k[ut];if(Je!==void 0&&0>_e(Je,G))it!==void 0&&0>_e(it,Je)?(k[ie]=it,k[ut]=G,ie=ut):(k[ie]=Je,k[$e]=G,ie=$e);else if(it!==void 0&&0>_e(it,G))k[ie]=it,k[ut]=G,ie=ut;else break e}}return j}return null}function _e(k,j){var G=k.sortIndex-j.sortIndex;return G!==0?G:k.id-j.id}var Y=[],He=[],At=1,de=null,ae=3,Pt=!1,Xe=!1,gt=!1;function gn(k){for(var j=b(He);j!==null;){if(j.callback===null)ge(He);else if(j.startTime<=k)ge(He),j.sortIndex=j.expirationTime,Ne(Y,j);else break;j=b(He);}}function Qt(k){if(gt=!1,gn(k),!Xe)if(b(Y)!==null)Xe=!0,u(Lt);else {var j=b(He);j!==null&&i(Qt,j.startTime-k);}}function Lt(k,j){Xe=!1,gt&&(gt=!1,c()),Pt=!0;var G=ae;try{for(gn(j),de=b(Y);de!==null&&(!(de.expirationTime>j)||k&&!r.unstable_shouldYield());){var ie=de.callback;if(typeof ie=="function"){de.callback=null,ae=de.priorityLevel;var ce=ie(de.expirationTime<=j);j=r.unstable_now(),typeof ce=="function"?de.callback=ce:de===b(Y)&&ge(Y),gn(j);}else ge(Y);de=b(Y);}if(de!==null)var $e=!0;else {var Je=b(He);Je!==null&&i(Qt,Je.startTime-j),$e=!1;}return $e}finally{de=null,ae=G,Pt=!1;}}var hu=l;r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(k){k.callback=null;},r.unstable_continueExecution=function(){Xe||Pt||(Xe=!0,u(Lt));},r.unstable_getCurrentPriorityLevel=function(){return ae},r.unstable_getFirstCallbackNode=function(){return b(Y)},r.unstable_next=function(k){switch(ae){case 1:case 2:case 3:var j=3;break;default:j=ae;}var G=ae;ae=j;try{return k()}finally{ae=G;}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=hu,r.unstable_runWithPriority=function(k,j){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3;}var G=ae;ae=k;try{return j()}finally{ae=G;}},r.unstable_scheduleCallback=function(k,j,G){var ie=r.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?ie+G:ie):G=ie,k){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3;}return ce=G+ce,k={id:At++,callback:j,priorityLevel:k,startTime:G,expirationTime:ce,sortIndex:-1},G>ie?(k.sortIndex=G,Ne(He,k),b(Y)===null&&k===b(He)&&(gt?c():gt=!0,i(Qt,G-ie))):(k.sortIndex=ce,Ne(Y,k),Xe||Pt||(Xe=!0,u(Lt))),k},r.unstable_wrapCallback=function(k){var j=ae;return function(){var G=ae;ae=j;try{return k.apply(this,arguments)}finally{ae=G;}}};}))(Ks),function(r){r.exports=Ks;}(Zr);var Xs={exports:{}},$s={exports:{}};/** @license React v0.26.2
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */((function(r){r.exports=function(i){var c={},l=ls,f=$$3.exports,d=Zr.exports;function a(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return "Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var p=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,h=60103,E=60106,g=60107,C=60108,w=60114,_=60109,R=60110,z=60112,A=60113,K=60120,Q=60115,J=60116,Ne=60121,b=60129,ge=60130,_e=60131;if(typeof Symbol=="function"&&Symbol.for){var Y=Symbol.for;h=Y("react.element"),E=Y("react.portal"),g=Y("react.fragment"),C=Y("react.strict_mode"),w=Y("react.profiler"),_=Y("react.provider"),R=Y("react.context"),z=Y("react.forward_ref"),A=Y("react.suspense"),K=Y("react.suspense_list"),Q=Y("react.memo"),J=Y("react.lazy"),Ne=Y("react.block"),Y("react.scope"),b=Y("react.debug_trace_mode"),ge=Y("react.offscreen"),_e=Y("react.legacy_hidden");}var He=typeof Symbol=="function"&&Symbol.iterator;function At(e){return e===null||typeof e!="object"?null:(e=He&&e[He]||e["@@iterator"],typeof e=="function"?e:null)}function de(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case g:return "Fragment";case E:return "Portal";case w:return "Profiler";case C:return "StrictMode";case A:return "Suspense";case K:return "SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case R:return (e.displayName||"Context")+".Consumer";case _:return (e._context.displayName||"Context")+".Provider";case z:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case Q:return de(e.type);case Ne:return de(e._render);case J:t=e._payload,e=e._init;try{return de(e(t))}catch{}}return null}function ae(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else {e=t;do t=e,(t.flags&1026)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Pt(e){if(ae(e)!==e)throw Error(a(188))}function Xe(e){var t=e.alternate;if(!t){if(t=ae(e),t===null)throw Error(a(188));return t!==e?null:e}for(var n=e,o=t;;){var s=n.return;if(s===null)break;var D=s.alternate;if(D===null){if(o=s.return,o!==null){n=o;continue}break}if(s.child===D.child){for(D=s.child;D;){if(D===n)return Pt(s),e;if(D===o)return Pt(s),t;D=D.sibling;}throw Error(a(188))}if(n.return!==o.return)n=s,o=D;else {for(var m=!1,y=s.child;y;){if(y===n){m=!0,n=s,o=D;break}if(y===o){m=!0,o=s,n=D;break}y=y.sibling;}if(!m){for(y=D.child;y;){if(y===n){m=!0,n=D,o=s;break}if(y===o){m=!0,o=D,n=s;break}y=y.sibling;}if(!m)throw Error(a(189))}}if(n.alternate!==o)throw Error(a(190))}if(n.tag!==3)throw Error(a(188));return n.stateNode.current===n?e:t}function gt(e){if(e=Xe(e),!e)return null;for(var t=e;;){if(t.tag===5||t.tag===6)return t;if(t.child)t.child.return=t,t=t.child;else {if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return;}t.sibling.return=t.return,t=t.sibling;}}return null}function gn(e){if(e=Xe(e),!e)return null;for(var t=e;;){if(t.tag===5||t.tag===6)return t;if(t.child&&t.tag!==4)t.child.return=t,t=t.child;else {if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return;}t.sibling.return=t.return,t=t.sibling;}}return null}function Qt(e,t){for(var n=e.alternate;t!==null;){if(t===e||t===n)return !0;t=t.return;}return !1}var Lt=i.getPublicInstance,hu=i.getRootHostContext,k=i.getChildHostContext,j=i.prepareForCommit,G=i.resetAfterCommit,ie=i.createInstance,ce=i.appendInitialChild,$e=i.finalizeInitialChildren,Je=i.prepareUpdate,ut=i.shouldSetTextContent,it=i.createTextInstance,go=i.scheduleTimeout,Ja=i.cancelTimeout,mu=i.noTimeout,Ot=i.isPrimaryRenderer,Ge=i.supportsMutation,En=i.supportsPersistence,be=i.supportsHydration,Za=i.getInstanceFromNode,ec=i.makeOpaqueHydratingObject,gu=i.makeClientId,Eo=i.beforeActiveInstanceBlur,tc=i.afterActiveInstanceBlur,nc=i.preparePortalMount,yn=i.supportsTestSelectors,rc=i.findFiberRoot,uc=i.getBoundingRect,ic=i.getTextContent,vn=i.isHiddenSubtree,oc=i.matchAccessibilityRole,lc=i.setFocusIfFocusable,sc=i.setupIntersectionObserver,ac=i.appendChild,cc=i.appendChildToContainer,fc=i.commitTextUpdate,dc=i.commitMount,Dc=i.commitUpdate,pc=i.insertBefore,hc=i.insertInContainerBefore,mc=i.removeChild,gc=i.removeChildFromContainer,yo=i.resetTextContent,Ec=i.hideInstance,yc=i.hideTextInstance,vc=i.unhideInstance,Cc=i.unhideTextInstance,Eu=i.clearContainer,Fc=i.cloneInstance,vo=i.createContainerChildSet,Co=i.appendChildToContainerChildSet,wc=i.finalizeContainerChildren,Fo=i.replaceContainerChildren,wo=i.cloneHiddenInstance,So=i.cloneHiddenTextInstance,Sc=i.canHydrateInstance,xc=i.canHydrateTextInstance,_c=i.isSuspenseInstancePending,Ic=i.isSuspenseInstanceFallback,yu=i.getNextHydratableSibling,xo=i.getFirstHydratableChild,Rc=i.hydrateInstance,kc=i.hydrateTextInstance,Bc=i.getNextHydratableInstanceAfterSuspenseInstance,_o=i.commitHydratedContainer,Tc=i.commitHydratedSuspenseInstance,vu;function Cn(e){if(vu===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);vu=t&&t[1]||"";}return `
`+vu+e}var Cu=!1;function tr(e,t){if(!e||Cu)return "";Cu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[]);}catch(S){var o=S;}Reflect.construct(e,[],t);}else {try{t.call();}catch(S){o=S;}e.call(t.prototype);}else {try{throw Error()}catch(S){o=S;}e();}}catch(S){if(S&&o&&typeof S.stack=="string"){for(var s=S.stack.split(`
`),D=o.stack.split(`
`),m=s.length-1,y=D.length-1;1<=m&&0<=y&&s[m]!==D[y];)y--;for(;1<=m&&0<=y;m--,y--)if(s[m]!==D[y]){if(m!==1||y!==1)do if(m--,y--,0>y||s[m]!==D[y])return `
`+s[m].replace(" at new "," at ");while(1<=m&&0<=y);break}}}finally{Cu=!1,Error.prepareStackTrace=n;}return (e=e?e.displayName||e.name:"")?Cn(e):""}var Fu=[],Yt=-1;function Et(e){return {current:e}}function ne(e){0>Yt||(e.current=Fu[Yt],Fu[Yt]=null,Yt--);}function le(e,t){Yt++,Fu[Yt]=e.current,e.current=t;}var yt={},Fe=Et(yt),Ie=Et(!1),Mt=yt;function Kt(e,t){var n=e.type.contextTypes;if(!n)return yt;var o=e.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===t)return o.__reactInternalMemoizedMaskedChildContext;var s={},D;for(D in n)s[D]=t[D];return o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Re(e){return e=e.childContextTypes,e!=null}function nr(){ne(Ie),ne(Fe);}function Io(e,t,n){if(Fe.current!==yt)throw Error(a(168));le(Fe,t),le(Ie,n);}function Ro(e,t,n){var o=e.stateNode;if(e=t.childContextTypes,typeof o.getChildContext!="function")return n;o=o.getChildContext();for(var s in o)if(!(s in e))throw Error(a(108,de(t)||"Unknown",s));return l({},n,o)}function rr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yt,Mt=Fe.current,le(Fe,e),le(Ie,Ie.current),!0}function ko(e,t,n){var o=e.stateNode;if(!o)throw Error(a(169));n?(e=Ro(e,t,Mt),o.__reactInternalMemoizedMergedChildContext=e,ne(Ie),ne(Fe),le(Fe,e)):ne(Ie),le(Ie,n);}var wu=null,zt=null,Nc=d.unstable_now;Nc();var ur=0,ee=8;function jt(e){if((1&e)!==0)return ee=15,1;if((2&e)!==0)return ee=14,2;if((4&e)!==0)return ee=13,4;var t=24&e;return t!==0?(ee=12,t):(e&32)!==0?(ee=11,32):(t=192&e,t!==0?(ee=10,t):(e&256)!==0?(ee=9,256):(t=3584&e,t!==0?(ee=8,t):(e&4096)!==0?(ee=7,4096):(t=4186112&e,t!==0?(ee=6,t):(t=62914560&e,t!==0?(ee=5,t):e&67108864?(ee=4,67108864):(e&134217728)!==0?(ee=3,134217728):(t=805306368&e,t!==0?(ee=2,t):(1073741824&e)!==0?(ee=1,1073741824):(ee=8,e))))))}function Ac(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Pc(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(a(358,e))}}function Fn(e,t){var n=e.pendingLanes;if(n===0)return ee=0;var o=0,s=0,D=e.expiredLanes,m=e.suspendedLanes,y=e.pingedLanes;if(D!==0)o=D,s=ee=15;else if(D=n&134217727,D!==0){var S=D&~m;S!==0?(o=jt(S),s=ee):(y&=D,y!==0&&(o=jt(y),s=ee));}else D=n&~m,D!==0?(o=jt(D),s=ee):y!==0&&(o=jt(y),s=ee);if(o===0)return 0;if(o=31-vt(o),o=n&((0>o?0:1<<o)<<1)-1,t!==0&&t!==o&&(t&m)===0){if(jt(t),s<=ee)return t;ee=s;}if(t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=o;0<t;)n=31-vt(t),s=1<<n,o|=e[n],t&=~s;return o}function Bo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ir(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return e=Xt(24&~t),e===0?ir(10,t):e;case 10:return e=Xt(192&~t),e===0?ir(8,t):e;case 8:return e=Xt(3584&~t),e===0&&(e=Xt(4186112&~t),e===0&&(e=512)),e;case 2:return t=Xt(805306368&~t),t===0&&(t=268435456),t}throw Error(a(358,e))}function Xt(e){return e&-e}function Su(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function or(e,t,n){e.pendingLanes|=t;var o=t-1;e.suspendedLanes&=o,e.pingedLanes&=o,e=e.eventTimes,t=31-vt(t),e[t]=n;}var vt=Math.clz32?Math.clz32:Mc,Lc=Math.log,Oc=Math.LN2;function Mc(e){return e===0?32:31-(Lc(e)/Oc|0)|0}var zc=d.unstable_runWithPriority,xu=d.unstable_scheduleCallback,_u=d.unstable_cancelCallback,jc=d.unstable_shouldYield,To=d.unstable_requestPaint,Iu=d.unstable_now,Uc=d.unstable_getCurrentPriorityLevel,lr=d.unstable_ImmediatePriority,No=d.unstable_UserBlockingPriority,Ao=d.unstable_NormalPriority,Po=d.unstable_LowPriority,Lo=d.unstable_IdlePriority,Ru={},Wc=To!==void 0?To:function(){},ot=null,sr=null,ku=!1,Oo=Iu(),Ee=1e4>Oo?Iu:function(){return Iu()-Oo};function $t(){switch(Uc()){case lr:return 99;case No:return 98;case Ao:return 97;case Po:return 96;case Lo:return 95;default:throw Error(a(332))}}function Mo(e){switch(e){case 99:return lr;case 98:return No;case 97:return Ao;case 96:return Po;case 95:return Lo;default:throw Error(a(332))}}function lt(e,t){return e=Mo(e),zc(e,t)}function wn(e,t,n){return e=Mo(e),xu(e,t,n)}function Pe(){if(sr!==null){var e=sr;sr=null,_u(e);}zo();}function zo(){if(!ku&&ot!==null){ku=!0;var e=0;try{var t=ot;lt(99,function(){for(;e<t.length;e++){var n=t[e];do n=n(!0);while(n!==null)}}),ot=null;}catch(n){throw ot!==null&&(ot=ot.slice(e+1)),xu(lr,Pe),n}finally{ku=!1;}}}var Hc=p.ReactCurrentBatchConfig;function Gc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Le=typeof Object.is=="function"?Object.is:Gc,bc=Object.prototype.hasOwnProperty;function ar(e,t){if(Le(e,t))return !0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return !1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return !1;for(o=0;o<n.length;o++)if(!bc.call(t,n[o])||!Le(e[n[o]],t[n[o]]))return !1;return !0}function Vc(e){switch(e.tag){case 5:return Cn(e.type);case 16:return Cn("Lazy");case 13:return Cn("Suspense");case 19:return Cn("SuspenseList");case 0:case 2:case 15:return e=tr(e.type,!1),e;case 11:return e=tr(e.type.render,!1),e;case 22:return e=tr(e.type._render,!1),e;case 1:return e=tr(e.type,!0),e;default:return ""}}function Ve(e,t){if(e&&e.defaultProps){t=l({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var cr=Et(null),fr=null,Jt=null,dr=null;function Bu(){dr=Jt=fr=null;}function jo(e,t){e=e.type._context,Ot?(le(cr,e._currentValue),e._currentValue=t):(le(cr,e._currentValue2),e._currentValue2=t);}function Tu(e){var t=cr.current;ne(cr),e=e.type._context,Ot?e._currentValue=t:e._currentValue2=t;}function Uo(e,t){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)===t){if(n===null||(n.childLanes&t)===t)break;n.childLanes|=t;}else e.childLanes|=t,n!==null&&(n.childLanes|=t);e=e.return;}}function Zt(e,t){fr=e,dr=Jt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(qe=!0),e.firstContext=null);}function Oe(e,t){if(dr!==e&&t!==!1&&t!==0)if((typeof t!="number"||t===1073741823)&&(dr=e,t=1073741823),t={context:e,observedBits:t,next:null},Jt===null){if(fr===null)throw Error(a(308));Jt=t,fr.dependencies={lanes:0,firstContext:t,responders:null};}else Jt=Jt.next=t;return Ot?e._currentValue:e._currentValue2}var Ct=!1;function Nu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null};}function Wo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects});}function Ft(e,t){return {eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function wt(e,t){if(e=e.updateQueue,e!==null){e=e.shared;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t;}}function Ho(e,t){var n=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,n===o)){var s=null,D=null;if(n=n.firstBaseUpdate,n!==null){do{var m={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};D===null?s=D=m:D=D.next=m,n=n.next;}while(n!==null);D===null?s=D=t:D=D.next=t;}else s=D=t;n={baseState:o.baseState,firstBaseUpdate:s,lastBaseUpdate:D,shared:o.shared,effects:o.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t;}function Sn(e,t,n,o){var s=e.updateQueue;Ct=!1;var D=s.firstBaseUpdate,m=s.lastBaseUpdate,y=s.shared.pending;if(y!==null){s.shared.pending=null;var S=y,I=S.next;S.next=null,m===null?D=I:m.next=I,m=S;var P=e.alternate;if(P!==null){P=P.updateQueue;var U=P.lastBaseUpdate;U!==m&&(U===null?P.firstBaseUpdate=I:U.next=I,P.lastBaseUpdate=S);}}if(D!==null){U=s.baseState,m=0,P=I=S=null;do{y=D.lane;var T=D.eventTime;if((o&y)===y){P!==null&&(P=P.next={eventTime:T,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var Z=e,re=D;switch(y=t,T=n,re.tag){case 1:if(Z=re.payload,typeof Z=="function"){U=Z.call(T,U,y);break e}U=Z;break e;case 3:Z.flags=Z.flags&-4097|64;case 0:if(Z=re.payload,y=typeof Z=="function"?Z.call(T,U,y):Z,y==null)break e;U=l({},U,y);break e;case 2:Ct=!0;}}D.callback!==null&&(e.flags|=32,y=s.effects,y===null?s.effects=[D]:y.push(D));}else T={eventTime:T,lane:y,tag:D.tag,payload:D.payload,callback:D.callback,next:null},P===null?(I=P=T,S=U):P=P.next=T,m|=y;if(D=D.next,D===null){if(y=s.shared.pending,y===null)break;D=y.next,y.next=null,s.lastBaseUpdate=y,s.shared.pending=null;}}while(1);P===null&&(S=U),s.baseState=S,s.firstBaseUpdate=I,s.lastBaseUpdate=P,zn|=m,e.lanes=m,e.memoizedState=U;}}function Go(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var o=e[t],s=o.callback;if(s!==null){if(o.callback=null,o=n,typeof s!="function")throw Error(a(191,s));s.call(o);}}}var bo=new f.Component().refs;function Dr(e,t,n,o){t=e.memoizedState,n=n(o,t),n=n==null?t:l({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n);}var pr={isMounted:function(e){return (e=e._reactInternals)?ae(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var o=Te(),s=_t(e),D=Ft(o,s);D.payload=t,n!=null&&(D.callback=n),wt(e,D),dt(e,s,o);},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var o=Te(),s=_t(e),D=Ft(o,s);D.tag=1,D.payload=t,n!=null&&(D.callback=n),wt(e,D),dt(e,s,o);},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Te(),o=_t(e),s=Ft(n,o);s.tag=2,t!=null&&(s.callback=t),wt(e,s),dt(e,o,n);}};function Vo(e,t,n,o,s,D,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,D,m):t.prototype&&t.prototype.isPureReactComponent?!ar(n,o)||!ar(s,D):!0}function qo(e,t,n){var o=!1,s=yt,D=t.contextType;return typeof D=="object"&&D!==null?D=Oe(D):(s=Re(t)?Mt:Fe.current,o=t.contextTypes,D=(o=o!=null)?Kt(e,s):yt),t=new t(n,D),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=pr,e.stateNode=t,t._reactInternals=e,o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=D),t}function Qo(e,t,n,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,o),t.state!==e&&pr.enqueueReplaceState(t,t.state,null);}function Au(e,t,n,o){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs=bo,Nu(e);var D=t.contextType;typeof D=="object"&&D!==null?s.context=Oe(D):(D=Re(t)?Mt:Fe.current,s.context=Kt(e,D)),Sn(e,n,s,o),s.state=e.memoizedState,D=t.getDerivedStateFromProps,typeof D=="function"&&(Dr(e,t,D,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&pr.enqueueReplaceState(s,s.state,null),Sn(e,n,s,o),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4);}var hr=Array.isArray;function xn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(a(309));var o=n.stateNode;}if(!o)throw Error(a(147,e));var s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(D){var m=o.refs;m===bo&&(m=o.refs={}),D===null?delete m[s]:m[s]=D;},t._stringRef=s,t)}if(typeof e!="string")throw Error(a(284));if(!n._owner)throw Error(a(290,e))}return e}function mr(e,t){if(e.type!=="textarea")throw Error(a(31,Object.prototype.toString.call(t)==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Yo(e){function t(F,v){if(e){var x=F.lastEffect;x!==null?(x.nextEffect=v,F.lastEffect=v):F.firstEffect=F.lastEffect=v,v.nextEffect=null,v.flags=8;}}function n(F,v){if(!e)return null;for(;v!==null;)t(F,v),v=v.sibling;return null}function o(F,v){for(F=new Map;v!==null;)v.key!==null?F.set(v.key,v):F.set(v.index,v),v=v.sibling;return F}function s(F,v){return F=Rt(F,v),F.index=0,F.sibling=null,F}function D(F,v,x){return F.index=x,e?(x=F.alternate,x!==null?(x=x.index,x<v?(F.flags=2,v):x):(F.flags=2,v)):v}function m(F){return e&&F.alternate===null&&(F.flags=2),F}function y(F,v,x,B){return v===null||v.tag!==6?(v=Ci(x,F.mode,B),v.return=F,v):(v=s(v,x),v.return=F,v)}function S(F,v,x,B){return v!==null&&v.elementType===x.type?(B=s(v,x.props),B.ref=xn(F,v,x),B.return=F,B):(B=br(x.type,x.key,x.props,null,F.mode,B),B.ref=xn(F,v,x),B.return=F,B)}function I(F,v,x,B){return v===null||v.tag!==4||v.stateNode.containerInfo!==x.containerInfo||v.stateNode.implementation!==x.implementation?(v=Fi(x,F.mode,B),v.return=F,v):(v=s(v,x.children||[]),v.return=F,v)}function P(F,v,x,B,L){return v===null||v.tag!==7?(v=sn(x,F.mode,B,L),v.return=F,v):(v=s(v,x),v.return=F,v)}function U(F,v,x){if(typeof v=="string"||typeof v=="number")return v=Ci(""+v,F.mode,x),v.return=F,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case h:return x=br(v.type,v.key,v.props,null,F.mode,x),x.ref=xn(F,null,v),x.return=F,x;case E:return v=Fi(v,F.mode,x),v.return=F,v}if(hr(v)||At(v))return v=sn(v,F.mode,x,null),v.return=F,v;mr(F,v);}return null}function T(F,v,x,B){var L=v!==null?v.key:null;if(typeof x=="string"||typeof x=="number")return L!==null?null:y(F,v,""+x,B);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case h:return x.key===L?x.type===g?P(F,v,x.props.children,B,L):S(F,v,x,B):null;case E:return x.key===L?I(F,v,x,B):null}if(hr(x)||At(x))return L!==null?null:P(F,v,x,B,null);mr(F,x);}return null}function Z(F,v,x,B,L){if(typeof B=="string"||typeof B=="number")return F=F.get(x)||null,y(v,F,""+B,L);if(typeof B=="object"&&B!==null){switch(B.$$typeof){case h:return F=F.get(B.key===null?x:B.key)||null,B.type===g?P(v,F,B.props.children,L,B.key):S(v,F,B,L);case E:return F=F.get(B.key===null?x:B.key)||null,I(v,F,B,L)}if(hr(B)||At(B))return F=F.get(x)||null,P(v,F,B,L,null);mr(v,B);}return null}function re(F,v,x,B){for(var L=null,te=null,W=v,X=v=0,De=null;W!==null&&X<x.length;X++){W.index>X?(De=W,W=null):De=W.sibling;var V=T(F,W,x[X],B);if(V===null){W===null&&(W=De);break}e&&W&&V.alternate===null&&t(F,W),v=D(V,v,X),te===null?L=V:te.sibling=V,te=V,W=De;}if(X===x.length)return n(F,W),L;if(W===null){for(;X<x.length;X++)W=U(F,x[X],B),W!==null&&(v=D(W,v,X),te===null?L=W:te.sibling=W,te=W);return L}for(W=o(F,W);X<x.length;X++)De=Z(W,F,X,x[X],B),De!==null&&(e&&De.alternate!==null&&W.delete(De.key===null?X:De.key),v=D(De,v,X),te===null?L=De:te.sibling=De,te=De);return e&&W.forEach(function(kt){return t(F,kt)}),L}function Ue(F,v,x,B){var L=At(x);if(typeof L!="function")throw Error(a(150));if(x=L.call(x),x==null)throw Error(a(151));for(var te=L=null,W=v,X=v=0,De=null,V=x.next();W!==null&&!V.done;X++,V=x.next()){W.index>X?(De=W,W=null):De=W.sibling;var kt=T(F,W,V.value,B);if(kt===null){W===null&&(W=De);break}e&&W&&kt.alternate===null&&t(F,W),v=D(kt,v,X),te===null?L=kt:te.sibling=kt,te=kt,W=De;}if(V.done)return n(F,W),L;if(W===null){for(;!V.done;X++,V=x.next())V=U(F,V.value,B),V!==null&&(v=D(V,v,X),te===null?L=V:te.sibling=V,te=V);return L}for(W=o(F,W);!V.done;X++,V=x.next())V=Z(W,F,X,V.value,B),V!==null&&(e&&V.alternate!==null&&W.delete(V.key===null?X:V.key),v=D(V,v,X),te===null?L=V:te.sibling=V,te=V);return e&&W.forEach(function(Cf){return t(F,Cf)}),L}return function(F,v,x,B){var L=typeof x=="object"&&x!==null&&x.type===g&&x.key===null;L&&(x=x.props.children);var te=typeof x=="object"&&x!==null;if(te)switch(x.$$typeof){case h:e:{for(te=x.key,L=v;L!==null;){if(L.key===te){switch(L.tag){case 7:if(x.type===g){n(F,L.sibling),v=s(L,x.props.children),v.return=F,F=v;break e}break;default:if(L.elementType===x.type){n(F,L.sibling),v=s(L,x.props),v.ref=xn(F,L,x),v.return=F,F=v;break e}}n(F,L);break}else t(F,L);L=L.sibling;}x.type===g?(v=sn(x.props.children,F.mode,B,x.key),v.return=F,F=v):(B=br(x.type,x.key,x.props,null,F.mode,B),B.ref=xn(F,v,x),B.return=F,F=B);}return m(F);case E:e:{for(L=x.key;v!==null;){if(v.key===L)if(v.tag===4&&v.stateNode.containerInfo===x.containerInfo&&v.stateNode.implementation===x.implementation){n(F,v.sibling),v=s(v,x.children||[]),v.return=F,F=v;break e}else {n(F,v);break}else t(F,v);v=v.sibling;}v=Fi(x,F.mode,B),v.return=F,F=v;}return m(F)}if(typeof x=="string"||typeof x=="number")return x=""+x,v!==null&&v.tag===6?(n(F,v.sibling),v=s(v,x),v.return=F,F=v):(n(F,v),v=Ci(x,F.mode,B),v.return=F,F=v),m(F);if(hr(x))return re(F,v,x,B);if(At(x))return Ue(F,v,x,B);if(te&&mr(F,x),typeof x=="undefined"&&!L)switch(F.tag){case 1:case 22:case 0:case 11:case 15:throw Error(a(152,de(F.type)||"Component"))}return n(F,v)}}var gr=Yo(!0),Ko=Yo(!1),_n={},Me=Et(_n),In=Et(_n),en=Et(_n);function Ze(e){if(e===_n)throw Error(a(174));return e}function Pu(e,t){le(en,t),le(In,e),le(Me,_n),e=hu(t),ne(Me),le(Me,e);}function tn(){ne(Me),ne(In),ne(en);}function Xo(e){var t=Ze(en.current),n=Ze(Me.current);t=k(n,e.type,t),n!==t&&(le(In,e),le(Me,t));}function Lu(e){In.current===e&&(ne(Me),ne(In));}var se=Et(0);function Er(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||_c(n)||Ic(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&64)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return;}t.sibling.return=t.return,t=t.sibling;}return null}var st=null,Ut=null,et=!1;function $o(e,t){var n=je(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,e.lastEffect!==null?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n;}function Jo(e,t){switch(e.tag){case 5:return t=Sc(t,e.type,e.pendingProps),t!==null?(e.stateNode=t,!0):!1;case 6:return t=xc(t,e.pendingProps),t!==null?(e.stateNode=t,!0):!1;case 13:return !1;default:return !1}}function Ou(e){if(et){var t=Ut;if(t){var n=t;if(!Jo(e,t)){if(t=yu(n),!t||!Jo(e,t)){e.flags=e.flags&-1025|2,et=!1,st=e;return}$o(st,n);}st=e,Ut=xo(t);}else e.flags=e.flags&-1025|2,et=!1,st=e;}}function Zo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;st=e;}function yr(e){if(!be||e!==st)return !1;if(!et)return Zo(e),et=!0,!1;var t=e.type;if(e.tag!==5||t!=="head"&&t!=="body"&&!ut(t,e.memoizedProps))for(t=Ut;t;)$o(e,t),t=yu(t);if(Zo(e),e.tag===13){if(!be)throw Error(a(316));if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ut=Bc(e);}else Ut=st?yu(e.stateNode):null;return !0}function Mu(){be&&(Ut=st=null,et=!1);}var nn=[];function zu(){for(var e=0;e<nn.length;e++){var t=nn[e];Ot?t._workInProgressVersionPrimary=null:t._workInProgressVersionSecondary=null;}nn.length=0;}var Rn=p.ReactCurrentDispatcher,ze=p.ReactCurrentBatchConfig,kn=0,fe=null,we=null,ye=null,vr=!1,Bn=!1;function ke(){throw Error(a(321))}function ju(e,t){if(t===null)return !1;for(var n=0;n<t.length&&n<e.length;n++)if(!Le(e[n],t[n]))return !1;return !0}function Uu(e,t,n,o,s,D){if(kn=D,fe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Rn.current=e===null||e.memoizedState===null?Qc:Yc,e=n(o,s),Bn){D=0;do{if(Bn=!1,!(25>D))throw Error(a(301));D+=1,ye=we=null,t.updateQueue=null,Rn.current=Kc,e=n(o,s);}while(Bn)}if(Rn.current=Sr,t=we!==null&&we.next!==null,kn=0,ye=we=fe=null,vr=!1,t)throw Error(a(300));return e}function Wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ye===null?fe.memoizedState=ye=e:ye=ye.next=e,ye}function Ht(){if(we===null){var e=fe.alternate;e=e!==null?e.memoizedState:null;}else e=we.next;var t=ye===null?fe.memoizedState:ye.next;if(t!==null)ye=t,we=e;else {if(e===null)throw Error(a(310));we=e,e={memoizedState:we.memoizedState,baseState:we.baseState,baseQueue:we.baseQueue,queue:we.queue,next:null},ye===null?fe.memoizedState=ye=e:ye=ye.next=e;}return ye}function tt(e,t){return typeof t=="function"?t(e):t}function Tn(e){var t=Ht(),n=t.queue;if(n===null)throw Error(a(311));n.lastRenderedReducer=e;var o=we,s=o.baseQueue,D=n.pending;if(D!==null){if(s!==null){var m=s.next;s.next=D.next,D.next=m;}o.baseQueue=s=D,n.pending=null;}if(s!==null){s=s.next,o=o.baseState;var y=m=D=null,S=s;do{var I=S.lane;if((kn&I)===I)y!==null&&(y=y.next={lane:0,action:S.action,eagerReducer:S.eagerReducer,eagerState:S.eagerState,next:null}),o=S.eagerReducer===e?S.eagerState:e(o,S.action);else {var P={lane:I,action:S.action,eagerReducer:S.eagerReducer,eagerState:S.eagerState,next:null};y===null?(m=y=P,D=o):y=y.next=P,fe.lanes|=I,zn|=I;}S=S.next;}while(S!==null&&S!==s);y===null?D=o:y.next=m,Le(o,t.memoizedState)||(qe=!0),t.memoizedState=o,t.baseState=D,t.baseQueue=y,n.lastRenderedState=o;}return [t.memoizedState,n.dispatch]}function Nn(e){var t=Ht(),n=t.queue;if(n===null)throw Error(a(311));n.lastRenderedReducer=e;var o=n.dispatch,s=n.pending,D=t.memoizedState;if(s!==null){n.pending=null;var m=s=s.next;do D=e(D,m.action),m=m.next;while(m!==s);Le(D,t.memoizedState)||(qe=!0),t.memoizedState=D,t.baseQueue===null&&(t.baseState=D),n.lastRenderedState=D;}return [D,o]}function el(e,t,n){var o=t._getVersion;o=o(t._source);var s=Ot?t._workInProgressVersionPrimary:t._workInProgressVersionSecondary;if(s!==null?e=s===o:(e=e.mutableReadLanes,(e=(kn&e)===e)&&(Ot?t._workInProgressVersionPrimary=o:t._workInProgressVersionSecondary=o,nn.push(t))),e)return n(t._source);throw nn.push(t),Error(a(350))}function tl(e,t,n,o){var s=xe;if(s===null)throw Error(a(349));var D=t._getVersion,m=D(t._source),y=Rn.current,S=y.useState(function(){return el(s,t,n)}),I=S[1],P=S[0];S=ye;var U=e.memoizedState,T=U.refs,Z=T.getSnapshot,re=U.source;U=U.subscribe;var Ue=fe;return e.memoizedState={refs:T,source:t,subscribe:o},y.useEffect(function(){T.getSnapshot=n,T.setSnapshot=I;var F=D(t._source);if(!Le(m,F)){F=n(t._source),Le(P,F)||(I(F),F=_t(Ue),s.mutableReadLanes|=F&s.pendingLanes),F=s.mutableReadLanes,s.entangledLanes|=F;for(var v=s.entanglements,x=F;0<x;){var B=31-vt(x),L=1<<B;v[B]|=F,x&=~L;}}},[n,t,o]),y.useEffect(function(){return o(t._source,function(){var F=T.getSnapshot,v=T.setSnapshot;try{v(F(t._source));var x=_t(Ue);s.mutableReadLanes|=x&s.pendingLanes;}catch(B){v(function(){throw B});}})},[t,o]),Le(Z,n)&&Le(re,t)&&Le(U,o)||(e={pending:null,dispatch:null,lastRenderedReducer:tt,lastRenderedState:P},e.dispatch=I=bu.bind(null,fe,e),S.queue=e,S.baseQueue=null,P=el(s,t,n),S.memoizedState=S.baseState=P),P}function nl(e,t,n){var o=Ht();return tl(o,e,t,n)}function An(e){var t=Wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e=t.queue={pending:null,dispatch:null,lastRenderedReducer:tt,lastRenderedState:e},e=e.dispatch=bu.bind(null,fe,e),[t.memoizedState,e]}function Cr(e,t,n,o){return e={tag:e,create:t,destroy:n,deps:o,next:null},t=fe.updateQueue,t===null?(t={lastEffect:null},fe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(o=n.next,n.next=e,e.next=o,t.lastEffect=e)),e}function rl(e){var t=Wt();return e={current:e},t.memoizedState=e}function Fr(){return Ht().memoizedState}function Wu(e,t,n,o){var s=Wt();fe.flags|=e,s.memoizedState=Cr(1|t,n,void 0,o===void 0?null:o);}function Hu(e,t,n,o){var s=Ht();o=o===void 0?null:o;var D=void 0;if(we!==null){var m=we.memoizedState;if(D=m.destroy,o!==null&&ju(o,m.deps)){Cr(t,n,D,o);return}}fe.flags|=e,s.memoizedState=Cr(1|t,n,D,o);}function ul(e,t){return Wu(516,4,e,t)}function wr(e,t){return Hu(516,4,e,t)}function il(e,t){return Hu(4,2,e,t)}function ol(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null);};if(t!=null)return e=e(),t.current=e,function(){t.current=null;}}function ll(e,t,n){return n=n!=null?n.concat([e]):null,Hu(4,2,ol.bind(null,t,e),n)}function Gu(){}function sl(e,t){var n=Ht();t=t===void 0?null:t;var o=n.memoizedState;return o!==null&&t!==null&&ju(t,o[1])?o[0]:(n.memoizedState=[e,t],e)}function al(e,t){var n=Ht();t=t===void 0?null:t;var o=n.memoizedState;return o!==null&&t!==null&&ju(t,o[1])?o[0]:(e=e(),n.memoizedState=[e,t],e)}function qc(e,t){var n=$t();lt(98>n?98:n,function(){e(!0);}),lt(97<n?97:n,function(){var o=ze.transition;ze.transition=1;try{e(!1),t();}finally{ze.transition=o;}});}function bu(e,t,n){var o=Te(),s=_t(e),D={lane:s,action:n,eagerReducer:null,eagerState:null,next:null},m=t.pending;if(m===null?D.next=D:(D.next=m.next,m.next=D),t.pending=D,m=e.alternate,e===fe||m!==null&&m===fe)Bn=vr=!0;else {if(e.lanes===0&&(m===null||m.lanes===0)&&(m=t.lastRenderedReducer,m!==null))try{var y=t.lastRenderedState,S=m(y,n);if(D.eagerReducer=m,D.eagerState=S,Le(S,y))return}catch{}finally{}dt(e,s,o);}}var Sr={readContext:Oe,useCallback:ke,useContext:ke,useEffect:ke,useImperativeHandle:ke,useLayoutEffect:ke,useMemo:ke,useReducer:ke,useRef:ke,useState:ke,useDebugValue:ke,useDeferredValue:ke,useTransition:ke,useMutableSource:ke,useOpaqueIdentifier:ke,unstable_isNewReconciler:!1},Qc={readContext:Oe,useCallback:function(e,t){return Wt().memoizedState=[e,t===void 0?null:t],e},useContext:Oe,useEffect:ul,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Wu(4,2,ol.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Wu(4,2,e,t)},useMemo:function(e,t){var n=Wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var o=Wt();return t=n!==void 0?n(t):t,o.memoizedState=o.baseState=t,e=o.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},e=e.dispatch=bu.bind(null,fe,e),[o.memoizedState,e]},useRef:rl,useState:An,useDebugValue:Gu,useDeferredValue:function(e){var t=An(e),n=t[0],o=t[1];return ul(function(){var s=ze.transition;ze.transition=1;try{o(e);}finally{ze.transition=s;}},[e]),n},useTransition:function(){var e=An(!1),t=e[0];return e=qc.bind(null,e[1]),rl(e),[e,t]},useMutableSource:function(e,t,n){var o=Wt();return o.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},tl(o,e,t,n)},useOpaqueIdentifier:function(){if(et){var e=!1,t=ec(function(){throw e||(e=!0,n(gu())),Error(a(355))}),n=An(t)[1];return (fe.mode&2)===0&&(fe.flags|=516,Cr(5,function(){n(gu());},void 0,null)),t}return t=gu(),An(t),t},unstable_isNewReconciler:!1},Yc={readContext:Oe,useCallback:sl,useContext:Oe,useEffect:wr,useImperativeHandle:ll,useLayoutEffect:il,useMemo:al,useReducer:Tn,useRef:Fr,useState:function(){return Tn(tt)},useDebugValue:Gu,useDeferredValue:function(e){var t=Tn(tt),n=t[0],o=t[1];return wr(function(){var s=ze.transition;ze.transition=1;try{o(e);}finally{ze.transition=s;}},[e]),n},useTransition:function(){var e=Tn(tt)[0];return [Fr().current,e]},useMutableSource:nl,useOpaqueIdentifier:function(){return Tn(tt)[0]},unstable_isNewReconciler:!1},Kc={readContext:Oe,useCallback:sl,useContext:Oe,useEffect:wr,useImperativeHandle:ll,useLayoutEffect:il,useMemo:al,useReducer:Nn,useRef:Fr,useState:function(){return Nn(tt)},useDebugValue:Gu,useDeferredValue:function(e){var t=Nn(tt),n=t[0],o=t[1];return wr(function(){var s=ze.transition;ze.transition=1;try{o(e);}finally{ze.transition=s;}},[e]),n},useTransition:function(){var e=Nn(tt)[0];return [Fr().current,e]},useMutableSource:nl,useOpaqueIdentifier:function(){return Nn(tt)[0]},unstable_isNewReconciler:!1},Xc=p.ReactCurrentOwner,qe=!1;function Be(e,t,n,o){t.child=e===null?Ko(t,null,n,o):gr(t,e.child,n,o);}function cl(e,t,n,o,s){n=n.render;var D=t.ref;return Zt(t,s),o=Uu(e,t,n,o,D,s),e!==null&&!qe?(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~s,at(e,t,s)):(t.flags|=1,Be(e,t,o,s),t.child)}function fl(e,t,n,o,s,D){if(e===null){var m=n.type;return typeof m=="function"&&!yi(m)&&m.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=m,dl(e,t,m,o,s,D)):(e=br(n.type,null,o,t,t.mode,D),e.ref=t.ref,e.return=t,t.child=e)}return m=e.child,(s&D)===0&&(s=m.memoizedProps,n=n.compare,n=n!==null?n:ar,n(s,o)&&e.ref===t.ref)?at(e,t,D):(t.flags|=1,e=Rt(m,o),e.ref=t.ref,e.return=t,t.child=e)}function dl(e,t,n,o,s,D){if(e!==null&&ar(e.memoizedProps,o)&&e.ref===t.ref)if(qe=!1,(D&s)!==0)(e.flags&16384)!==0&&(qe=!0);else return t.lanes=e.lanes,at(e,t,D);return qu(e,t,n,o,D)}function Vu(e,t,n){var o=t.pendingProps,s=o.children,D=e!==null?e.memoizedState:null;if(o.mode==="hidden"||o.mode==="unstable-defer-without-hiding")if((t.mode&4)===0)t.memoizedState={baseLanes:0},Wr(t,n);else if((n&1073741824)!==0)t.memoizedState={baseLanes:0},Wr(t,D!==null?D.baseLanes:n);else return e=D!==null?D.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},Wr(t,e),null;else D!==null?(o=D.baseLanes|n,t.memoizedState=null):o=n,Wr(t,o);return Be(e,t,s,n),t.child}function Dl(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=128);}function qu(e,t,n,o,s){var D=Re(n)?Mt:Fe.current;return D=Kt(t,D),Zt(t,s),n=Uu(e,t,n,o,D,s),e!==null&&!qe?(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~s,at(e,t,s)):(t.flags|=1,Be(e,t,n,s),t.child)}function pl(e,t,n,o,s){if(Re(n)){var D=!0;rr(t);}else D=!1;if(Zt(t,s),t.stateNode===null)e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2),qo(t,n,o),Au(t,n,o,s),o=!0;else if(e===null){var m=t.stateNode,y=t.memoizedProps;m.props=y;var S=m.context,I=n.contextType;typeof I=="object"&&I!==null?I=Oe(I):(I=Re(n)?Mt:Fe.current,I=Kt(t,I));var P=n.getDerivedStateFromProps,U=typeof P=="function"||typeof m.getSnapshotBeforeUpdate=="function";U||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(y!==o||S!==I)&&Qo(t,m,o,I),Ct=!1;var T=t.memoizedState;m.state=T,Sn(t,o,m,s),S=t.memoizedState,y!==o||T!==S||Ie.current||Ct?(typeof P=="function"&&(Dr(t,n,P,o),S=t.memoizedState),(y=Ct||Vo(t,n,y,o,T,S,I))?(U||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount()),typeof m.componentDidMount=="function"&&(t.flags|=4)):(typeof m.componentDidMount=="function"&&(t.flags|=4),t.memoizedProps=o,t.memoizedState=S),m.props=o,m.state=S,m.context=I,o=y):(typeof m.componentDidMount=="function"&&(t.flags|=4),o=!1);}else {m=t.stateNode,Wo(e,t),y=t.memoizedProps,I=t.type===t.elementType?y:Ve(t.type,y),m.props=I,U=t.pendingProps,T=m.context,S=n.contextType,typeof S=="object"&&S!==null?S=Oe(S):(S=Re(n)?Mt:Fe.current,S=Kt(t,S));var Z=n.getDerivedStateFromProps;(P=typeof Z=="function"||typeof m.getSnapshotBeforeUpdate=="function")||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(y!==U||T!==S)&&Qo(t,m,o,S),Ct=!1,T=t.memoizedState,m.state=T,Sn(t,o,m,s);var re=t.memoizedState;y!==U||T!==re||Ie.current||Ct?(typeof Z=="function"&&(Dr(t,n,Z,o),re=t.memoizedState),(I=Ct||Vo(t,n,I,o,T,re,S))?(P||typeof m.UNSAFE_componentWillUpdate!="function"&&typeof m.componentWillUpdate!="function"||(typeof m.componentWillUpdate=="function"&&m.componentWillUpdate(o,re,S),typeof m.UNSAFE_componentWillUpdate=="function"&&m.UNSAFE_componentWillUpdate(o,re,S)),typeof m.componentDidUpdate=="function"&&(t.flags|=4),typeof m.getSnapshotBeforeUpdate=="function"&&(t.flags|=256)):(typeof m.componentDidUpdate!="function"||y===e.memoizedProps&&T===e.memoizedState||(t.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&T===e.memoizedState||(t.flags|=256),t.memoizedProps=o,t.memoizedState=re),m.props=o,m.state=re,m.context=S,o=I):(typeof m.componentDidUpdate!="function"||y===e.memoizedProps&&T===e.memoizedState||(t.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&T===e.memoizedState||(t.flags|=256),o=!1);}return Qu(e,t,n,o,D,s)}function Qu(e,t,n,o,s,D){Dl(e,t);var m=(t.flags&64)!==0;if(!o&&!m)return s&&ko(t,n,!1),at(e,t,D);o=t.stateNode,Xc.current=t;var y=m&&typeof n.getDerivedStateFromError!="function"?null:o.render();return t.flags|=1,e!==null&&m?(t.child=gr(t,e.child,null,D),t.child=gr(t,null,y,D)):Be(e,t,y,D),t.memoizedState=o.state,s&&ko(t,n,!0),t.child}function hl(e){var t=e.stateNode;t.pendingContext?Io(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Io(e,t.context,!1),Pu(e,t.containerInfo);}var xr={dehydrated:null,retryLane:0};function ml(e,t,n){var o=t.pendingProps,s=se.current,D=!1,m;return (m=(t.flags&64)!==0)||(m=e!==null&&e.memoizedState===null?!1:(s&2)!==0),m?(D=!0,t.flags&=-65):e!==null&&e.memoizedState===null||o.fallback===void 0||o.unstable_avoidThisFallback===!0||(s|=1),le(se,s&1),e===null?(o.fallback!==void 0&&Ou(t),e=o.children,s=o.fallback,D?(e=gl(t,e,s,n),t.child.memoizedState={baseLanes:n},t.memoizedState=xr,e):typeof o.unstable_expectedLoadTime=="number"?(e=gl(t,e,s,n),t.child.memoizedState={baseLanes:n},t.memoizedState=xr,t.lanes=33554432,e):(n=vi({mode:"visible",children:e},t.mode,n,null),n.return=t,t.child=n)):e.memoizedState!==null?D?(o=yl(e,t,o.children,o.fallback,n),D=t.child,s=e.child.memoizedState,D.memoizedState=s===null?{baseLanes:n}:{baseLanes:s.baseLanes|n},D.childLanes=e.childLanes&~n,t.memoizedState=xr,o):(n=El(e,t,o.children,n),t.memoizedState=null,n):D?(o=yl(e,t,o.children,o.fallback,n),D=t.child,s=e.child.memoizedState,D.memoizedState=s===null?{baseLanes:n}:{baseLanes:s.baseLanes|n},D.childLanes=e.childLanes&~n,t.memoizedState=xr,o):(n=El(e,t,o.children,n),t.memoizedState=null,n)}function gl(e,t,n,o){var s=e.mode,D=e.child;return t={mode:"hidden",children:t},(s&2)===0&&D!==null?(D.childLanes=0,D.pendingProps=t):D=vi(t,s,0,null),n=sn(n,s,o,null),D.return=e,n.return=e,D.sibling=n,e.child=D,n}function El(e,t,n,o){var s=e.child;return e=s.sibling,n=Rt(s,{mode:"visible",children:n}),(t.mode&2)===0&&(n.lanes=o),n.return=t,n.sibling=null,e!==null&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}function yl(e,t,n,o,s){var D=t.mode,m=e.child;e=m.sibling;var y={mode:"hidden",children:n};return (D&2)===0&&t.child!==m?(n=t.child,n.childLanes=0,n.pendingProps=y,m=n.lastEffect,m!==null?(t.firstEffect=n.firstEffect,t.lastEffect=m,m.nextEffect=null):t.firstEffect=t.lastEffect=null):n=Rt(m,y),e!==null?o=Rt(e,o):(o=sn(o,D,s,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,o}function vl(e,t){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Uo(e.return,t);}function Yu(e,t,n,o,s,D){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:n,tailMode:s,lastEffect:D}:(m.isBackwards=t,m.rendering=null,m.renderingStartTime=0,m.last=o,m.tail=n,m.tailMode=s,m.lastEffect=D);}function Cl(e,t,n){var o=t.pendingProps,s=o.revealOrder,D=o.tail;if(Be(e,t,o.children,n),o=se.current,(o&2)!==0)o=o&1|2,t.flags|=64;else {if(e!==null&&(e.flags&64)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vl(e,n);else if(e.tag===19)vl(e,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return;}e.sibling.return=e.return,e=e.sibling;}o&=1;}if(le(se,o),(t.mode&2)===0)t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Er(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Yu(t,!1,s,n,D,t.lastEffect);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Er(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e;}Yu(t,!0,n,null,D,t.lastEffect);break;case"together":Yu(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null;}return t.child}function at(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),zn|=t.lanes,(n&t.childLanes)!==0){if(e!==null&&t.child!==e.child)throw Error(a(153));if(t.child!==null){for(e=t.child,n=Rt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Rt(e,e.pendingProps),n.return=t;n.sibling=null;}return t.child}return null}function nt(e){e.flags|=4;}var Pn,Ln,_r,Ir;if(Ge)Pn=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)ce(e,n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return;}n.sibling.return=n.return,n=n.sibling;}},Ln=function(){},_r=function(e,t,n,o,s){if(e=e.memoizedProps,e!==o){var D=t.stateNode,m=Ze(Me.current);n=Je(D,n,e,o,s,m),(t.updateQueue=n)&&nt(t);}},Ir=function(e,t,n,o){n!==o&&nt(t);};else if(En){Pn=function(e,t,n,o){for(var s=t.child;s!==null;){if(s.tag===5){var D=s.stateNode;n&&o&&(D=wo(D,s.type,s.memoizedProps,s)),ce(e,D);}else if(s.tag===6)D=s.stateNode,n&&o&&(D=So(D,s.memoizedProps,s)),ce(e,D);else if(s.tag!==4){if(s.tag===13&&(s.flags&4)!==0&&(D=s.memoizedState!==null)){var m=s.child;if(m!==null&&(m.child!==null&&(m.child.return=m,Pn(e,m,!0,D)),D=m.sibling,D!==null)){D.return=s,s=D;continue}}if(s.child!==null){s.child.return=s,s=s.child;continue}}if(s===t)break;for(;s.sibling===null;){if(s.return===null||s.return===t)return;s=s.return;}s.sibling.return=s.return,s=s.sibling;}};var Fl=function(e,t,n,o){for(var s=t.child;s!==null;){if(s.tag===5){var D=s.stateNode;n&&o&&(D=wo(D,s.type,s.memoizedProps,s)),Co(e,D);}else if(s.tag===6)D=s.stateNode,n&&o&&(D=So(D,s.memoizedProps,s)),Co(e,D);else if(s.tag!==4){if(s.tag===13&&(s.flags&4)!==0&&(D=s.memoizedState!==null)){var m=s.child;if(m!==null&&(m.child!==null&&(m.child.return=m,Fl(e,m,!0,D)),D=m.sibling,D!==null)){D.return=s,s=D;continue}}if(s.child!==null){s.child.return=s,s=s.child;continue}}if(s===t)break;for(;s.sibling===null;){if(s.return===null||s.return===t)return;s=s.return;}s.sibling.return=s.return,s=s.sibling;}};Ln=function(e){var t=e.stateNode;if(e.firstEffect!==null){var n=t.containerInfo,o=vo(n);Fl(o,e,!1,!1),t.pendingChildren=o,nt(e),wc(n,o);}},_r=function(e,t,n,o,s){var D=e.stateNode,m=e.memoizedProps;if((e=t.firstEffect===null)&&m===o)t.stateNode=D;else {var y=t.stateNode,S=Ze(Me.current),I=null;m!==o&&(I=Je(y,n,m,o,s,S)),e&&I===null?t.stateNode=D:(D=Fc(D,I,n,m,o,t,e,y),$e(D,n,o,s,S)&&nt(t),t.stateNode=D,e?nt(t):Pn(D,t,!1,!1));}},Ir=function(e,t,n,o){n!==o?(e=Ze(en.current),n=Ze(Me.current),t.stateNode=it(o,e,n,t),nt(t)):t.stateNode=e.stateNode;};}else Ln=function(){},_r=function(){},Ir=function(){};function On(e,t){if(!et)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var o=null;n!==null;)n.alternate!==null&&(o=n),n=n.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null;}}function $c(e,t,n){var o=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Re(t.type)&&nr(),null;case 3:return tn(),ne(Ie),ne(Fe),zu(),o=t.stateNode,o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(e===null||e.child===null)&&(yr(t)?nt(t):o.hydrate||(t.flags|=256)),Ln(t),null;case 5:Lu(t);var s=Ze(en.current);if(n=t.type,e!==null&&t.stateNode!=null)_r(e,t,n,o,s),e.ref!==t.ref&&(t.flags|=128);else {if(!o){if(t.stateNode===null)throw Error(a(166));return null}if(e=Ze(Me.current),yr(t)){if(!be)throw Error(a(175));e=Rc(t.stateNode,t.type,t.memoizedProps,s,e,t),t.updateQueue=e,e!==null&&nt(t);}else {var D=ie(n,o,s,e,t);Pn(D,t,!1,!1),t.stateNode=D,$e(D,n,o,s,e)&&nt(t);}t.ref!==null&&(t.flags|=128);}return null;case 6:if(e&&t.stateNode!=null)Ir(e,t,e.memoizedProps,o);else {if(typeof o!="string"&&t.stateNode===null)throw Error(a(166));if(e=Ze(en.current),s=Ze(Me.current),yr(t)){if(!be)throw Error(a(176));kc(t.stateNode,t.memoizedProps,t)&&nt(t);}else t.stateNode=it(o,e,s,t);}return null;case 13:return ne(se),o=t.memoizedState,(t.flags&64)!==0?(t.lanes=n,t):(o=o!==null,s=!1,e===null?t.memoizedProps.fallback!==void 0&&yr(t):s=e.memoizedState!==null,o&&!s&&(t.mode&2)!==0&&(e===null&&t.memoizedProps.unstable_avoidThisFallback!==!0||(se.current&1)!==0?ve===0&&(ve=3):((ve===0||ve===3)&&(ve=4),xe===null||(zn&134217727)===0&&(un&134217727)===0||on(xe,Se))),En&&o&&(t.flags|=4),Ge&&(o||s)&&(t.flags|=4),null);case 4:return tn(),Ln(t),e===null&&nc(t.stateNode.containerInfo),null;case 10:return Tu(t),null;case 17:return Re(t.type)&&nr(),null;case 19:if(ne(se),o=t.memoizedState,o===null)return null;if(s=(t.flags&64)!==0,D=o.rendering,D===null)if(s)On(o,!1);else {if(ve!==0||e!==null&&(e.flags&64)!==0)for(e=t.child;e!==null;){if(D=Er(e),D!==null){for(t.flags|=64,On(o,!1),e=D.updateQueue,e!==null&&(t.updateQueue=e,t.flags|=4),o.lastEffect===null&&(t.firstEffect=null),t.lastEffect=o.lastEffect,e=n,o=t.child;o!==null;)s=o,n=e,s.flags&=2,s.nextEffect=null,s.firstEffect=null,s.lastEffect=null,D=s.alternate,D===null?(s.childLanes=0,s.lanes=n,s.child=null,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=D.childLanes,s.lanes=D.lanes,s.child=D.child,s.memoizedProps=D.memoizedProps,s.memoizedState=D.memoizedState,s.updateQueue=D.updateQueue,s.type=D.type,n=D.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return le(se,se.current&1|2),t.child}e=e.sibling;}o.tail!==null&&Ee()>ci&&(t.flags|=64,s=!0,On(o,!1),t.lanes=33554432);}else {if(!s)if(e=Er(D),e!==null){if(t.flags|=64,s=!0,e=e.updateQueue,e!==null&&(t.updateQueue=e,t.flags|=4),On(o,!0),o.tail===null&&o.tailMode==="hidden"&&!D.alternate&&!et)return t=t.lastEffect=o.lastEffect,t!==null&&(t.nextEffect=null),null}else 2*Ee()-o.renderingStartTime>ci&&n!==1073741824&&(t.flags|=64,s=!0,On(o,!1),t.lanes=33554432);o.isBackwards?(D.sibling=t.child,t.child=D):(e=o.last,e!==null?e.sibling=D:t.child=D,o.last=D);}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.lastEffect=t.lastEffect,o.renderingStartTime=Ee(),e.sibling=null,t=se.current,le(se,s?t&1|2:t&1),e):null;case 23:case 24:return mi(),e!==null&&e.memoizedState!==null!=(t.memoizedState!==null)&&o.mode!=="unstable-defer-without-hiding"&&(t.flags|=4),null}throw Error(a(156,t.tag))}function Jc(e){switch(e.tag){case 1:Re(e.type)&&nr();var t=e.flags;return t&4096?(e.flags=t&-4097|64,e):null;case 3:if(tn(),ne(Ie),ne(Fe),zu(),t=e.flags,(t&64)!==0)throw Error(a(285));return e.flags=t&-4097|64,e;case 5:return Lu(e),null;case 13:return ne(se),t=e.flags,t&4096?(e.flags=t&-4097|64,e):null;case 19:return ne(se),null;case 4:return tn(),null;case 10:return Tu(e),null;case 23:case 24:return mi(),null;default:return null}}function Ku(e,t){try{var n="",o=t;do n+=Vc(o),o=o.return;while(o);var s=n;}catch(D){s=`
Error generating stack: `+D.message+`
`+D.stack;}return {value:e,source:t,stack:s}}function Xu(e,t){try{console.error(t.value);}catch(n){setTimeout(function(){throw n});}}var Zc=typeof WeakMap=="function"?WeakMap:Map;function wl(e,t,n){n=Ft(-1,n),n.tag=3,n.payload={element:null};var o=t.value;return n.callback=function(){Mr||(Mr=!0,fi=o),Xu(e,t);},n}function Sl(e,t,n){n=Ft(-1,n),n.tag=3;var o=e.type.getDerivedStateFromError;if(typeof o=="function"){var s=t.value;n.payload=function(){return Xu(e,t),o(s)};}var D=e.stateNode;return D!==null&&typeof D.componentDidCatch=="function"&&(n.callback=function(){typeof o!="function"&&(rt===null?rt=new Set([this]):rt.add(this),Xu(e,t));var m=t.stack;this.componentDidCatch(t.value,{componentStack:m!==null?m:""});}),n}var ef=typeof WeakSet=="function"?WeakSet:Set;function xl(e){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null);}catch(n){It(e,n);}else t.current=null;}function tf(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(t.flags&256&&e!==null){var n=e.memoizedProps,o=e.memoizedState;e=t.stateNode,t=e.getSnapshotBeforeUpdate(t.elementType===t.type?n:Ve(t.type,n),o),e.__reactInternalSnapshotBeforeUpdate=t;}return;case 3:Ge&&t.flags&256&&Eu(t.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(a(163))}function _l(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var o=n.destroy;n.destroy=void 0,o!==void 0&&o();}n=n.next;}while(n!==t)}}function nf(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(t=n.updateQueue,t=t!==null?t.lastEffect:null,t!==null){e=t=t.next;do{if((e.tag&3)===3){var o=e.create;e.destroy=o();}e=e.next;}while(e!==t)}if(t=n.updateQueue,t=t!==null?t.lastEffect:null,t!==null){e=t=t.next;do{var s=e;o=s.next,s=s.tag,(s&4)!==0&&(s&1)!==0&&(Gl(n,e),df(n,e)),e=o;}while(e!==t)}return;case 1:e=n.stateNode,n.flags&4&&(t===null?e.componentDidMount():(o=n.elementType===n.type?t.memoizedProps:Ve(n.type,t.memoizedProps),e.componentDidUpdate(o,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),t=n.updateQueue,t!==null&&Go(n,t,e);return;case 3:if(t=n.updateQueue,t!==null){if(e=null,n.child!==null)switch(n.child.tag){case 5:e=Lt(n.child.stateNode);break;case 1:e=n.child.stateNode;}Go(n,t,e);}return;case 5:e=n.stateNode,t===null&&n.flags&4&&dc(e,n.type,n.memoizedProps,n);return;case 6:return;case 4:return;case 12:return;case 13:be&&n.memoizedState===null&&(n=n.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null&&Tc(n))));return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(a(163))}function Il(e,t){if(Ge)for(var n=e;;){if(n.tag===5){var o=n.stateNode;t?Ec(o):vc(n.stateNode,n.memoizedProps);}else if(n.tag===6)o=n.stateNode,t?yc(o):Cc(o,n.memoizedProps);else if((n.tag!==23&&n.tag!==24||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return;}n.sibling.return=n.return,n=n.sibling;}}function Rl(e,t){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount(wu,t);}catch{}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(e=t.updateQueue,e!==null&&(e=e.lastEffect,e!==null)){var n=e=e.next;do{var o=n,s=o.destroy;if(o=o.tag,s!==void 0)if((o&4)!==0)Gl(t,n);else {o=t;try{s();}catch(D){It(o,D);}}n=n.next;}while(n!==e)}break;case 1:if(xl(t),e=t.stateNode,typeof e.componentWillUnmount=="function")try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount();}catch(D){It(t,D);}break;case 5:xl(t);break;case 4:Ge?Al(e,t):En&&En&&(t=t.stateNode.containerInfo,e=vo(t),Fo(t,e));}}function kl(e,t){for(var n=t;;)if(Rl(e,n),n.child===null||Ge&&n.tag===4){if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return;}n.sibling.return=n.return,n=n.sibling;}else n.child.return=n,n=n.child;}function Bl(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null;}function Tl(e){return e.tag===5||e.tag===3||e.tag===4}function Nl(e){if(Ge){e:{for(var t=e.return;t!==null;){if(Tl(t))break e;t=t.return;}throw Error(a(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var o=!1;break;case 3:t=t.containerInfo,o=!0;break;case 4:t=t.containerInfo,o=!0;break;default:throw Error(a(161))}n.flags&16&&(yo(t),n.flags&=-17);e:t:for(n=e;;){for(;n.sibling===null;){if(n.return===null||Tl(n.return)){n=null;break e}n=n.return;}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue t;n.child.return=n,n=n.child;}if(!(n.flags&2)){n=n.stateNode;break e}}o?$u(e,n,t):Ju(e,n,t);}}function $u(e,t,n){var o=e.tag,s=o===5||o===6;if(s)e=s?e.stateNode:e.stateNode.instance,t?hc(n,e,t):cc(n,e);else if(o!==4&&(e=e.child,e!==null))for($u(e,t,n),e=e.sibling;e!==null;)$u(e,t,n),e=e.sibling;}function Ju(e,t,n){var o=e.tag,s=o===5||o===6;if(s)e=s?e.stateNode:e.stateNode.instance,t?pc(n,e,t):ac(n,e);else if(o!==4&&(e=e.child,e!==null))for(Ju(e,t,n),e=e.sibling;e!==null;)Ju(e,t,n),e=e.sibling;}function Al(e,t){for(var n=t,o=!1,s,D;;){if(!o){o=n.return;e:for(;;){if(o===null)throw Error(a(160));switch(s=o.stateNode,o.tag){case 5:D=!1;break e;case 3:s=s.containerInfo,D=!0;break e;case 4:s=s.containerInfo,D=!0;break e}o=o.return;}o=!0;}if(n.tag===5||n.tag===6)kl(e,n),D?gc(s,n.stateNode):mc(s,n.stateNode);else if(n.tag===4){if(n.child!==null){s=n.stateNode.containerInfo,D=!0,n.child.return=n,n=n.child;continue}}else if(Rl(e,n),n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return,n.tag===4&&(o=!1);}n.sibling.return=n.return,n=n.sibling;}}function Zu(e,t){if(Ge){switch(t.tag){case 0:case 11:case 14:case 15:case 22:_l(3,t);return;case 1:return;case 5:var n=t.stateNode;if(n!=null){var o=t.memoizedProps;e=e!==null?e.memoizedProps:o;var s=t.type,D=t.updateQueue;t.updateQueue=null,D!==null&&Dc(n,D,s,e,o,t);}return;case 6:if(t.stateNode===null)throw Error(a(162));n=t.memoizedProps,fc(t.stateNode,e!==null?e.memoizedProps:n,n);return;case 3:be&&(t=t.stateNode,t.hydrate&&(t.hydrate=!1,_o(t.containerInfo)));return;case 12:return;case 13:Pl(t),Rr(t);return;case 19:Rr(t);return;case 17:return;case 23:case 24:Il(t,t.memoizedState!==null);return}throw Error(a(163))}switch(t.tag){case 0:case 11:case 14:case 15:case 22:_l(3,t);return;case 12:return;case 13:Pl(t),Rr(t);return;case 19:Rr(t);return;case 3:be&&(n=t.stateNode,n.hydrate&&(n.hydrate=!1,_o(n.containerInfo)));break;case 23:case 24:return}e:if(En){switch(t.tag){case 1:case 5:case 6:case 20:break e;case 3:case 4:t=t.stateNode,Fo(t.containerInfo,t.pendingChildren);break e}throw Error(a(163))}}function Pl(e){e.memoizedState!==null&&(ai=Ee(),Ge&&Il(e.child,!0));}function Rr(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ef),t.forEach(function(o){var s=hf.bind(null,e,o);n.has(o)||(n.add(o),o.then(s,s));});}}function rf(e,t){return e!==null&&(e=e.memoizedState,e===null||e.dehydrated!==null)?(t=t.memoizedState,t!==null&&t.dehydrated===null):!1}var kr=0,Br=1,Tr=2,Nr=3,Ar=4;if(typeof Symbol=="function"&&Symbol.for){var Mn=Symbol.for;kr=Mn("selector.component"),Br=Mn("selector.has_pseudo_class"),Tr=Mn("selector.role"),Nr=Mn("selector.test_id"),Ar=Mn("selector.text");}function ei(e){var t=Za(e);if(t!=null){if(typeof t.memoizedProps["data-testname"]!="string")throw Error(a(364));return t}if(e=rc(e),e===null)throw Error(a(362));return e.stateNode.current}function ti(e,t){switch(t.$$typeof){case kr:if(e.type===t.value)return !0;break;case Br:e:{t=t.value,e=[e,0];for(var n=0;n<e.length;){var o=e[n++],s=e[n++],D=t[s];if(o.tag!==5||!vn(o)){for(;D!=null&&ti(o,D);)s++,D=t[s];if(s===t.length){t=!0;break e}else for(o=o.child;o!==null;)e.push(o,s),o=o.sibling;}}t=!1;}return t;case Tr:if(e.tag===5&&oc(e.stateNode,t.value))return !0;break;case Ar:if((e.tag===5||e.tag===6)&&(e=ic(e),e!==null&&0<=e.indexOf(t.value)))return !0;break;case Nr:if(e.tag===5&&(e=e.memoizedProps["data-testname"],typeof e=="string"&&e.toLowerCase()===t.value.toLowerCase()))return !0;break;default:throw Error(a(365,t))}return !1}function ni(e){switch(e.$$typeof){case kr:return "<"+(de(e.value)||"Unknown")+">";case Br:return ":has("+(ni(e)||"")+")";case Tr:return '[role="'+e.value+'"]';case Ar:return '"'+e.value+'"';case Nr:return '[data-testname="'+e.value+'"]';default:throw Error(a(365,e))}}function Ll(e,t){var n=[];e=[e,0];for(var o=0;o<e.length;){var s=e[o++],D=e[o++],m=t[D];if(s.tag!==5||!vn(s)){for(;m!=null&&ti(s,m);)D++,m=t[D];if(D===t.length)n.push(s);else for(s=s.child;s!==null;)e.push(s,D),s=s.sibling;}}return n}function ri(e,t){if(!yn)throw Error(a(363));e=ei(e),e=Ll(e,t),t=[],e=Array.from(e);for(var n=0;n<e.length;){var o=e[n++];if(o.tag===5)vn(o)||t.push(o.stateNode);else for(o=o.child;o!==null;)e.push(o),o=o.sibling;}return t}var Pr=null;function uf(e){if(Pr===null)try{var t=("require"+Math.random()).slice(0,7);Pr=(r&&r[t]).call(r,"timers").setImmediate;}catch{Pr=function(o){var s=new MessageChannel;s.port1.onmessage=o,s.port2.postMessage(void 0);};}return Pr(e)}var of=Math.ceil,Lr=p.ReactCurrentDispatcher,ui=p.ReactCurrentOwner,ii=p.IsSomeRendererActing,M=0,xe=null,pe=null,Se=0,Gt=0,oi=Et(0),ve=0,Or=null,rn=0,zn=0,un=0,li=0,si=null,ai=0,ci=1/0;function St(){ci=Ee()+500;}var N=null,Mr=!1,fi=null,rt=null,xt=!1,jn=null,Un=90,di=[],Di=[],ct=null,Wn=0,pi=null,zr=-1,ft=0,jr=0,Hn=null,Gn=!1;function Te(){return (M&48)!==0?Ee():zr!==-1?zr:zr=Ee()}function _t(e){if(e=e.mode,(e&2)===0)return 1;if((e&4)===0)return $t()===99?1:2;if(ft===0&&(ft=rn),Hc.transition!==0){jr!==0&&(jr=si!==null?si.pendingLanes:0),e=ft;var t=4186112&~jr;return t&=-t,t===0&&(e=4186112&~e,t=e&-e,t===0&&(t=8192)),t}return e=$t(),(M&4)!==0&&e===98?e=ir(12,ft):(e=Ac(e),e=ir(e,ft)),e}function dt(e,t,n){if(50<Wn)throw Wn=0,pi=null,Error(a(185));if(e=Ur(e,t),e===null)return null;or(e,t,n),e===xe&&(un|=t,ve===4&&on(e,Se));var o=$t();t===1?(M&8)!==0&&(M&48)===0?hi(e):(Ae(e,n),M===0&&(St(),Pe())):((M&4)===0||o!==98&&o!==99||(ct===null?ct=new Set([e]):ct.add(e)),Ae(e,n)),si=e;}function Ur(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}function Ae(e,t){for(var n=e.callbackNode,o=e.suspendedLanes,s=e.pingedLanes,D=e.expirationTimes,m=e.pendingLanes;0<m;){var y=31-vt(m),S=1<<y,I=D[y];if(I===-1){if((S&o)===0||(S&s)!==0){I=t,jt(S);var P=ee;D[y]=10<=P?I+250:6<=P?I+5e3:-1;}}else I<=t&&(e.expiredLanes|=S);m&=~S;}if(o=Fn(e,e===xe?Se:0),t=ee,o===0)n!==null&&(n!==Ru&&_u(n),e.callbackNode=null,e.callbackPriority=0);else {if(n!==null){if(e.callbackPriority===t)return;n!==Ru&&_u(n);}t===15?(n=hi.bind(null,e),ot===null?(ot=[n],sr=xu(lr,zo)):ot.push(n),n=Ru):t===14?n=wn(99,hi.bind(null,e)):(n=Pc(t),n=wn(n,Ol.bind(null,e))),e.callbackPriority=t,e.callbackNode=n;}}function Ol(e){if(zr=-1,jr=ft=0,(M&48)!==0)throw Error(a(327));var t=e.callbackNode;if(Dt()&&e.callbackNode!==t)return null;var n=Fn(e,e===xe?Se:0);if(n===0)return null;var o=n,s=M;M|=16;var D=Ul();(xe!==e||Se!==o)&&(St(),ln(e,o));do try{af();break}catch(y){jl(e,y);}while(1);if(Bu(),Lr.current=D,M=s,pe!==null?o=0:(xe=null,Se=0,o=ve),(rn&un)!==0)ln(e,0);else if(o!==0){if(o===2&&(M|=64,e.hydrate&&(e.hydrate=!1,Eu(e.containerInfo)),n=Bo(e),n!==0&&(o=bn(e,n))),o===1)throw t=Or,ln(e,0),on(e,n),Ae(e,Ee()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,o){case 0:case 1:throw Error(a(345));case 2:bt(e);break;case 3:if(on(e,n),(n&62914560)===n&&(o=ai+500-Ee(),10<o)){if(Fn(e,0)!==0)break;if(s=e.suspendedLanes,(s&n)!==n){Te(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=go(bt.bind(null,e),o);break}bt(e);break;case 4:if(on(e,n),(n&4186112)===n)break;for(o=e.eventTimes,s=-1;0<n;){var m=31-vt(n);D=1<<m,m=o[m],m>s&&(s=m),n&=~D;}if(n=s,n=Ee()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*of(n/1960))-n,10<n){e.timeoutHandle=go(bt.bind(null,e),n);break}bt(e);break;case 5:bt(e);break;default:throw Error(a(329))}}return Ae(e,Ee()),e.callbackNode===t?Ol.bind(null,e):null}function on(e,t){for(t&=~li,t&=~un,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-vt(t),o=1<<n;e[n]=-1,t&=~o;}}function hi(e){if((M&48)!==0)throw Error(a(327));if(Dt(),e===xe&&(e.expiredLanes&Se)!==0){var t=Se,n=bn(e,t);(rn&un)!==0&&(t=Fn(e,t),n=bn(e,t));}else t=Fn(e,0),n=bn(e,t);if(e.tag!==0&&n===2&&(M|=64,e.hydrate&&(e.hydrate=!1,Eu(e.containerInfo)),t=Bo(e),t!==0&&(n=bn(e,t))),n===1)throw n=Or,ln(e,0),on(e,t),Ae(e,Ee()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,bt(e),Ae(e,Ee()),null}function lf(){if(ct!==null){var e=ct;ct=null,e.forEach(function(t){t.expiredLanes|=24&t.pendingLanes,Ae(t,Ee());});}Pe();}function Ml(e,t){var n=M;M|=1;try{return e(t)}finally{M=n,M===0&&(St(),Pe());}}function zl(e,t){var n=M;if((n&48)!==0)return e(t);M|=1;try{if(e)return lt(99,e.bind(null,t))}finally{M=n,Pe();}}function Wr(e,t){le(oi,Gt),Gt|=t,rn|=t;}function mi(){Gt=oi.current,ne(oi);}function ln(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==mu&&(e.timeoutHandle=mu,Ja(n)),pe!==null)for(n=pe.return;n!==null;){var o=n;switch(o.tag){case 1:o=o.type.childContextTypes,o!=null&&nr();break;case 3:tn(),ne(Ie),ne(Fe),zu();break;case 5:Lu(o);break;case 4:tn();break;case 13:ne(se);break;case 19:ne(se);break;case 10:Tu(o);break;case 23:case 24:mi();}n=n.return;}xe=e,pe=Rt(e.current,null),Se=Gt=rn=t,ve=0,Or=null,li=un=zn=0;}function jl(e,t){do{var n=pe;try{if(Bu(),Rn.current=Sr,vr){for(var o=fe.memoizedState;o!==null;){var s=o.queue;s!==null&&(s.pending=null),o=o.next;}vr=!1;}if(kn=0,ye=we=fe=null,Bn=!1,ui.current=null,n===null||n.return===null){ve=1,Or=t,pe=null;break}e:{var D=e,m=n.return,y=n,S=t;if(t=Se,y.flags|=2048,y.firstEffect=y.lastEffect=null,S!==null&&typeof S=="object"&&typeof S.then=="function"){var I=S;if((y.mode&2)===0){var P=y.alternate;P?(y.updateQueue=P.updateQueue,y.memoizedState=P.memoizedState,y.lanes=P.lanes):(y.updateQueue=null,y.memoizedState=null);}var U=(se.current&1)!==0,T=m;do{var Z;if(Z=T.tag===13){var re=T.memoizedState;if(re!==null)Z=re.dehydrated!==null;else {var Ue=T.memoizedProps;Z=Ue.fallback===void 0?!1:Ue.unstable_avoidThisFallback!==!0?!0:!U;}}if(Z){var F=T.updateQueue;if(F===null){var v=new Set;v.add(I),T.updateQueue=v;}else F.add(I);if((T.mode&2)===0){if(T.flags|=64,y.flags|=16384,y.flags&=-2981,y.tag===1)if(y.alternate===null)y.tag=17;else {var x=Ft(-1,1);x.tag=2,wt(y,x);}y.lanes|=1;break e}S=void 0,y=t;var B=D.pingCache;if(B===null?(B=D.pingCache=new Zc,S=new Set,B.set(I,S)):(S=B.get(I),S===void 0&&(S=new Set,B.set(I,S))),!S.has(y)){S.add(y);var L=pf.bind(null,D,I,y);I.then(L,L);}T.flags|=4096,T.lanes=t;break e}T=T.return;}while(T!==null);S=Error((de(y.type)||"A React component")+` suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);}ve!==5&&(ve=2),S=Ku(S,y),T=m;do{switch(T.tag){case 3:D=S,T.flags|=4096,t&=-t,T.lanes|=t;var te=wl(T,D,t);Ho(T,te);break e;case 1:D=S;var W=T.type,X=T.stateNode;if((T.flags&64)===0&&(typeof W.getDerivedStateFromError=="function"||X!==null&&typeof X.componentDidCatch=="function"&&(rt===null||!rt.has(X)))){T.flags|=4096,t&=-t,T.lanes|=t;var De=Sl(T,D,t);Ho(T,De);break e}}T=T.return;}while(T!==null)}Hl(n);}catch(V){t=V,pe===n&&n!==null&&(pe=n=n.return);continue}break}while(1)}function Ul(){var e=Lr.current;return Lr.current=Sr,e===null?Sr:e}function bn(e,t){var n=M;M|=16;var o=Ul();xe===e&&Se===t||ln(e,t);do try{sf();break}catch(s){jl(e,s);}while(1);if(Bu(),M=n,Lr.current=o,pe!==null)throw Error(a(261));return xe=null,Se=0,ve}function sf(){for(;pe!==null;)Wl(pe);}function af(){for(;pe!==null&&!jc();)Wl(pe);}function Wl(e){var t=Vl(e.alternate,e,Gt);e.memoizedProps=e.pendingProps,t===null?Hl(e):pe=t,ui.current=null;}function Hl(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&2048)===0){if(n=$c(n,t,Gt),n!==null){pe=n;return}if(n=t,n.tag!==24&&n.tag!==23||n.memoizedState===null||(Gt&1073741824)!==0||(n.mode&4)===0){for(var o=0,s=n.child;s!==null;)o|=s.lanes|s.childLanes,s=s.sibling;n.childLanes=o;}e!==null&&(e.flags&2048)===0&&(e.firstEffect===null&&(e.firstEffect=t.firstEffect),t.lastEffect!==null&&(e.lastEffect!==null&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(e.lastEffect!==null?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t));}else {if(n=Jc(t),n!==null){n.flags&=2047,pe=n;return}e!==null&&(e.firstEffect=e.lastEffect=null,e.flags|=2048);}if(t=t.sibling,t!==null){pe=t;return}pe=t=e;}while(t!==null);ve===0&&(ve=5);}function bt(e){var t=$t();return lt(99,cf.bind(null,e,t)),null}function cf(e,t){do Dt();while(jn!==null);if((M&48)!==0)throw Error(a(327));var n=e.finishedWork;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(a(177));e.callbackNode=null;var o=n.lanes|n.childLanes,s=o,D=e.pendingLanes&~s;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=s,e.mutableReadLanes&=s,e.entangledLanes&=s,s=e.entanglements;for(var m=e.eventTimes,y=e.expirationTimes;0<D;){var S=31-vt(D),I=1<<S;s[S]=0,m[S]=-1,y[S]=-1,D&=~I;}if(ct!==null&&(o&24)===0&&ct.has(e)&&ct.delete(e),e===xe&&(pe=xe=null,Se=0),1<n.flags?n.lastEffect!==null?(n.lastEffect.nextEffect=n,o=n.firstEffect):o=n:o=n.firstEffect,o!==null){s=M,M|=32,ui.current=null,Hn=j(e.containerInfo),Gn=!1,N=o;do try{ff();}catch(v){if(N===null)throw Error(a(330));It(N,v),N=N.nextEffect;}while(N!==null);Hn=null,N=o;do try{for(m=e;N!==null;){var P=N.flags;if(P&16&&Ge&&yo(N.stateNode),P&128){var U=N.alternate;if(U!==null){var T=U.ref;T!==null&&(typeof T=="function"?T(null):T.current=null);}}switch(P&1038){case 2:Nl(N),N.flags&=-3;break;case 6:Nl(N),N.flags&=-3,Zu(N.alternate,N);break;case 1024:N.flags&=-1025;break;case 1028:N.flags&=-1025,Zu(N.alternate,N);break;case 4:Zu(N.alternate,N);break;case 8:y=m,D=N,Ge?Al(y,D):kl(y,D);var Z=D.alternate;Bl(D),Z!==null&&Bl(Z);}N=N.nextEffect;}}catch(v){if(N===null)throw Error(a(330));It(N,v),N=N.nextEffect;}while(N!==null);Gn&&tc(),G(e.containerInfo),e.current=n,N=o;do try{for(P=e;N!==null;){var re=N.flags;if(re&36&&nf(P,N.alternate,N),re&128){U=void 0;var Ue=N.ref;if(Ue!==null){var F=N.stateNode;switch(N.tag){case 5:U=Lt(F);break;default:U=F;}typeof Ue=="function"?Ue(U):Ue.current=U;}}N=N.nextEffect;}}catch(v){if(N===null)throw Error(a(330));It(N,v),N=N.nextEffect;}while(N!==null);N=null,Wc(),M=s;}else e.current=n;if(xt)xt=!1,jn=e,Un=t;else for(N=o;N!==null;)t=N.nextEffect,N.nextEffect=null,N.flags&8&&(re=N,re.sibling=null,re.stateNode=null),N=t;if(o=e.pendingLanes,o===0&&(rt=null),o===1?e===pi?Wn++:(Wn=0,pi=e):Wn=0,n=n.stateNode,zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot(wu,n,void 0,(n.current.flags&64)===64);}catch{}if(Ae(e,Ee()),Mr)throw Mr=!1,e=fi,fi=null,e;return (M&8)!==0||Pe(),null}function ff(){for(;N!==null;){var e=N.alternate;Gn||Hn===null||((N.flags&8)!==0?Qt(N,Hn)&&(Gn=!0,Eo()):N.tag===13&&rf(e,N)&&Qt(N,Hn)&&(Gn=!0,Eo()));var t=N.flags;(t&256)!==0&&tf(e,N),(t&512)===0||xt||(xt=!0,wn(97,function(){return Dt(),null})),N=N.nextEffect;}}function Dt(){if(Un!==90){var e=97<Un?97:Un;return Un=90,lt(e,Df)}return !1}function df(e,t){di.push(t,e),xt||(xt=!0,wn(97,function(){return Dt(),null}));}function Gl(e,t){Di.push(t,e),xt||(xt=!0,wn(97,function(){return Dt(),null}));}function Df(){if(jn===null)return !1;var e=jn;if(jn=null,(M&48)!==0)throw Error(a(331));var t=M;M|=32;var n=Di;Di=[];for(var o=0;o<n.length;o+=2){var s=n[o],D=n[o+1],m=s.destroy;if(s.destroy=void 0,typeof m=="function")try{m();}catch(S){if(D===null)throw Error(a(330));It(D,S);}}for(n=di,di=[],o=0;o<n.length;o+=2){s=n[o],D=n[o+1];try{var y=s.create;s.destroy=y();}catch(S){if(D===null)throw Error(a(330));It(D,S);}}for(y=e.current.firstEffect;y!==null;)e=y.nextEffect,y.nextEffect=null,y.flags&8&&(y.sibling=null,y.stateNode=null),y=e;return M=t,Pe(),!0}function bl(e,t,n){t=Ku(n,t),t=wl(e,t,1),wt(e,t),t=Te(),e=Ur(e,1),e!==null&&(or(e,1,t),Ae(e,t));}function It(e,t){if(e.tag===3)bl(e,e,t);else for(var n=e.return;n!==null;){if(n.tag===3){bl(n,e,t);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(rt===null||!rt.has(o))){e=Ku(t,e);var s=Sl(n,e,1);if(wt(n,s),s=Te(),n=Ur(n,1),n!==null)or(n,1,s),Ae(n,s);else if(typeof o.componentDidCatch=="function"&&(rt===null||!rt.has(o)))try{o.componentDidCatch(t,e);}catch{}break}}n=n.return;}}function pf(e,t,n){var o=e.pingCache;o!==null&&o.delete(t),t=Te(),e.pingedLanes|=e.suspendedLanes&n,xe===e&&(Se&n)===n&&(ve===4||ve===3&&(Se&62914560)===Se&&500>Ee()-ai?ln(e,0):li|=n),Ae(e,t);}function hf(e,t){var n=e.stateNode;n!==null&&n.delete(t),t=0,t===0&&(t=e.mode,(t&2)===0?t=1:(t&4)===0?t=$t()===99?1:2:(ft===0&&(ft=rn),t=Xt(62914560&~ft),t===0&&(t=4194304))),n=Te(),e=Ur(e,t),e!==null&&(or(e,t,n),Ae(e,n));}var Vl;Vl=function(e,t,n){var o=t.lanes;if(e!==null)if(e.memoizedProps!==t.pendingProps||Ie.current)qe=!0;else if((n&o)!==0)qe=(e.flags&16384)!==0;else {switch(qe=!1,t.tag){case 3:hl(t),Mu();break;case 5:Xo(t);break;case 1:Re(t.type)&&rr(t);break;case 4:Pu(t,t.stateNode.containerInfo);break;case 10:jo(t,t.memoizedProps.value);break;case 13:if(t.memoizedState!==null)return (n&t.child.childLanes)!==0?ml(e,t,n):(le(se,se.current&1),t=at(e,t,n),t!==null?t.sibling:null);le(se,se.current&1);break;case 19:if(o=(n&t.childLanes)!==0,(e.flags&64)!==0){if(o)return Cl(e,t,n);t.flags|=64;}var s=t.memoizedState;if(s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),le(se,se.current),o)break;return null;case 23:case 24:return t.lanes=0,Vu(e,t,n)}return at(e,t,n)}else qe=!1;switch(t.lanes=0,t.tag){case 2:if(o=t.type,e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,s=Kt(t,Fe.current),Zt(t,n),s=Uu(null,t,o,e,s,n),t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,Re(o)){var D=!0;rr(t);}else D=!1;t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Nu(t);var m=o.getDerivedStateFromProps;typeof m=="function"&&Dr(t,o,m,e),s.updater=pr,t.stateNode=s,s._reactInternals=t,Au(t,o,e,n),t=Qu(null,t,o,!0,D,n);}else t.tag=0,Be(null,t,s,n),t=t.child;return t;case 16:s=t.elementType;e:{switch(e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,D=s._init,s=D(s._payload),t.type=s,D=t.tag=gf(s),e=Ve(s,e),D){case 0:t=qu(null,t,s,e,n);break e;case 1:t=pl(null,t,s,e,n);break e;case 11:t=cl(null,t,s,e,n);break e;case 14:t=fl(null,t,s,Ve(s.type,e),o,n);break e}throw Error(a(306,s,""))}return t;case 0:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:Ve(o,s),qu(e,t,o,s,n);case 1:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:Ve(o,s),pl(e,t,o,s,n);case 3:if(hl(t),o=t.updateQueue,e===null||o===null)throw Error(a(282));if(o=t.pendingProps,s=t.memoizedState,s=s!==null?s.element:null,Wo(e,t),Sn(t,o,null,n),o=t.memoizedState.element,o===s)Mu(),t=at(e,t,n);else {if(s=t.stateNode,(D=s.hydrate)&&(be?(Ut=xo(t.stateNode.containerInfo),st=t,D=et=!0):D=!1),D){if(be&&(e=s.mutableSourceEagerHydrationData,e!=null))for(s=0;s<e.length;s+=2)D=e[s],m=e[s+1],Ot?D._workInProgressVersionPrimary=m:D._workInProgressVersionSecondary=m,nn.push(D);for(n=Ko(t,null,o,n),t.child=n;n;)n.flags=n.flags&-3|1024,n=n.sibling;}else Be(e,t,o,n),Mu();t=t.child;}return t;case 5:return Xo(t),e===null&&Ou(t),o=t.type,s=t.pendingProps,D=e!==null?e.memoizedProps:null,m=s.children,ut(o,s)?m=null:D!==null&&ut(o,D)&&(t.flags|=16),Dl(e,t),Be(e,t,m,n),t.child;case 6:return e===null&&Ou(t),null;case 13:return ml(e,t,n);case 4:return Pu(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=gr(t,null,o,n):Be(e,t,o,n),t.child;case 11:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:Ve(o,s),cl(e,t,o,s,n);case 7:return Be(e,t,t.pendingProps,n),t.child;case 8:return Be(e,t,t.pendingProps.children,n),t.child;case 12:return Be(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(o=t.type._context,s=t.pendingProps,m=t.memoizedProps,D=s.value,jo(t,D),m!==null){var y=m.value;if(D=Le(y,D)?0:(typeof o._calculateChangedBits=="function"?o._calculateChangedBits(y,D):1073741823)|0,D===0){if(m.children===s.children&&!Ie.current){t=at(e,t,n);break e}}else for(y=t.child,y!==null&&(y.return=t);y!==null;){var S=y.dependencies;if(S!==null){m=y.child;for(var I=S.firstContext;I!==null;){if(I.context===o&&(I.observedBits&D)!==0){y.tag===1&&(I=Ft(-1,n&-n),I.tag=2,wt(y,I)),y.lanes|=n,I=y.alternate,I!==null&&(I.lanes|=n),Uo(y.return,n),S.lanes|=n;break}I=I.next;}}else m=y.tag===10&&y.type===t.type?null:y.child;if(m!==null)m.return=y;else for(m=y;m!==null;){if(m===t){m=null;break}if(y=m.sibling,y!==null){y.return=m.return,m=y;break}m=m.return;}y=m;}}Be(e,t,s.children,n),t=t.child;}return t;case 9:return s=t.type,D=t.pendingProps,o=D.children,Zt(t,n),s=Oe(s,D.unstable_observedBits),o=o(s),t.flags|=1,Be(e,t,o,n),t.child;case 14:return s=t.type,D=Ve(s,t.pendingProps),D=Ve(s.type,D),fl(e,t,s,D,o,n);case 15:return dl(e,t,t.type,t.pendingProps,o,n);case 17:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:Ve(o,s),e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,Re(o)?(e=!0,rr(t)):e=!1,Zt(t,n),qo(t,o,s),Au(t,o,s,n),Qu(null,t,o,!0,e,n);case 19:return Cl(e,t,n);case 23:return Vu(e,t,n);case 24:return Vu(e,t,n)}throw Error(a(156,t.tag))};var Hr={current:!1},gi=d.unstable_flushAllWithoutAsserting,ql=typeof gi=="function";function Ei(){if(gi!==void 0)return gi();for(var e=!1;Dt();)e=!0;return e}function Ql(e){try{Ei(),uf(function(){Ei()?Ql(e):e();});}catch(t){e(t);}}var Gr=0,Yl=!1;function mf(e,t,n,o){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null;}function je(e,t,n,o){return new mf(e,t,n,o)}function yi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function gf(e){if(typeof e=="function")return yi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===z)return 11;if(e===Q)return 14}return 2}function Rt(e,t){var n=e.alternate;return n===null?(n=je(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function br(e,t,n,o,s,D){var m=2;if(o=e,typeof e=="function")yi(e)&&(m=1);else if(typeof e=="string")m=5;else e:switch(e){case g:return sn(n.children,s,D,t);case b:m=8,s|=16;break;case C:m=8,s|=1;break;case w:return e=je(12,n,t,s|8),e.elementType=w,e.type=w,e.lanes=D,e;case A:return e=je(13,n,t,s),e.type=A,e.elementType=A,e.lanes=D,e;case K:return e=je(19,n,t,s),e.elementType=K,e.lanes=D,e;case ge:return vi(n,s,D,t);case _e:return e=je(24,n,t,s),e.elementType=_e,e.lanes=D,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _:m=10;break e;case R:m=9;break e;case z:m=11;break e;case Q:m=14;break e;case J:m=16,o=null;break e;case Ne:m=22;break e}throw Error(a(130,e==null?e:typeof e,""))}return t=je(m,n,t,s),t.elementType=e,t.type=o,t.lanes=D,t}function sn(e,t,n,o){return e=je(7,e,o,t),e.lanes=n,e}function vi(e,t,n,o){return e=je(23,e,o,t),e.elementType=ge,e.lanes=n,e}function Ci(e,t,n){return e=je(6,e,null,t),e.lanes=n,e}function Fi(e,t,n){return t=je(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ef(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=mu,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Su(0),this.expirationTimes=Su(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Su(0),be&&(this.mutableSourceEagerHydrationData=null);}function Kl(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(a(188)):Error(a(268,Object.keys(e)));return e=gt(t),e===null?null:e.stateNode}function Xl(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t;}}function Vr(e,t){Xl(e,t),(e=e.alternate)&&Xl(e,t);}function yf(e){return e=gt(e),e===null?null:e.stateNode}function vf(){return null}return c.IsThisRendererActing=Hr,c.act=function(e){function t(){Gr--,ii.current=n,Hr.current=o;}Yl===!1&&(Yl=!0,console.error("act(...) is not supported in production builds of React, and might not behave as expected.")),Gr++;var n=ii.current,o=Hr.current;ii.current=!0,Hr.current=!0;try{var s=Ml(e);}catch(D){throw t(),D}if(s!==null&&typeof s=="object"&&typeof s.then=="function")return {then:function(D,m){s.then(function(){1<Gr||ql===!0&&n===!0?(t(),D()):Ql(function(y){t(),y?m(y):D();});},function(y){t(),m(y);});}};try{Gr!==1||ql!==!1&&n!==!1||Ei(),t();}catch(D){throw t(),D}return {then:function(D){D();}}},c.attemptContinuousHydration=function(e){if(e.tag===13){var t=Te();dt(e,67108864,t),Vr(e,67108864);}},c.attemptHydrationAtCurrentPriority=function(e){if(e.tag===13){var t=Te(),n=_t(e);dt(e,n,t),Vr(e,n);}},c.attemptSynchronousHydration=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.hydrate){var n=jt(t.pendingLanes);t.expiredLanes|=n&t.pendingLanes,Ae(t,Ee()),(M&48)===0&&(St(),Pe());}break;case 13:var o=Te();zl(function(){return dt(e,1,o)}),Vr(e,4);}},c.attemptUserBlockingHydration=function(e){if(e.tag===13){var t=Te();dt(e,4,t),Vr(e,4);}},c.batchedEventUpdates=function(e,t){var n=M;M|=2;try{return e(t)}finally{M=n,M===0&&(St(),Pe());}},c.batchedUpdates=Ml,c.createComponentSelector=function(e){return {$$typeof:kr,value:e}},c.createContainer=function(e,t,n){return e=new Ef(e,t,n),t=je(3,null,null,t===2?7:t===1?3:0),e.current=t,t.stateNode=e,Nu(t),e},c.createHasPsuedoClassSelector=function(e){return {$$typeof:Br,value:e}},c.createPortal=function(e,t,n){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return {$$typeof:E,key:o==null?null:""+o,children:e,containerInfo:t,implementation:n}},c.createRoleSelector=function(e){return {$$typeof:Tr,value:e}},c.createTestNameSelector=function(e){return {$$typeof:Nr,value:e}},c.createTextSelector=function(e){return {$$typeof:Ar,value:e}},c.deferredUpdates=function(e){return lt(97,e)},c.discreteUpdates=function(e,t,n,o,s){var D=M;M|=4;try{return lt(98,e.bind(null,t,n,o,s))}finally{M=D,M===0&&(St(),Pe());}},c.findAllNodes=ri,c.findBoundingRects=function(e,t){if(!yn)throw Error(a(363));t=ri(e,t),e=[];for(var n=0;n<t.length;n++)e.push(uc(t[n]));for(t=e.length-1;0<t;t--){n=e[t];for(var o=n.x,s=o+n.width,D=n.y,m=D+n.height,y=t-1;0<=y;y--)if(t!==y){var S=e[y],I=S.x,P=I+S.width,U=S.y,T=U+S.height;if(o>=I&&D>=U&&s<=P&&m<=T){e.splice(t,1);break}else if(o!==I||n.width!==S.width||T<D||U>m){if(!(D!==U||n.height!==S.height||P<o||I>s)){I>o&&(S.width+=I-o,S.x=o),P<s&&(S.width=s-I),e.splice(t,1);break}}else {U>D&&(S.height+=U-D,S.y=D),T<m&&(S.height=m-U),e.splice(t,1);break}}}return e},c.findHostInstance=Kl,c.findHostInstanceWithNoPortals=function(e){return e=gn(e),e===null?null:e.tag===20?e.stateNode.instance:e.stateNode},c.findHostInstanceWithWarning=function(e){return Kl(e)},c.flushControlled=function(e){var t=M;M|=1;try{lt(99,e);}finally{M=t,M===0&&(St(),Pe());}},c.flushDiscreteUpdates=function(){(M&49)===0&&(lf(),Dt());},c.flushPassiveEffects=Dt,c.flushSync=zl,c.focusWithin=function(e,t){if(!yn)throw Error(a(363));for(e=ei(e),t=Ll(e,t),t=Array.from(t),e=0;e<t.length;){var n=t[e++];if(!vn(n)){if(n.tag===5&&lc(n.stateNode))return !0;for(n=n.child;n!==null;)t.push(n),n=n.sibling;}}return !1},c.getCurrentUpdateLanePriority=function(){return ur},c.getFindAllNodesFailureDescription=function(e,t){if(!yn)throw Error(a(363));var n=0,o=[];e=[ei(e),0];for(var s=0;s<e.length;){var D=e[s++],m=e[s++],y=t[m];if((D.tag!==5||!vn(D))&&(ti(D,y)&&(o.push(ni(y)),m++,m>n&&(n=m)),m<t.length))for(D=D.child;D!==null;)e.push(D,m),D=D.sibling;}if(n<t.length){for(e=[];n<t.length;n++)e.push(ni(t[n]));return `findAllNodes was able to match part of the selector:
  `+(o.join(" > ")+`

No matching component was found for:
  `)+e.join(" > ")}return null},c.getPublicRootInstance=function(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return Lt(e.child.stateNode);default:return e.child.stateNode}},c.injectIntoDevTools=function(e){if(e={bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:p.ReactCurrentDispatcher,findHostInstanceByFiber:yf,findFiberByHostInstance:e.findFiberByHostInstance||vf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null},typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined")e=!1;else {var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t.isDisabled&&t.supportsFiber)try{wu=t.inject(e),zt=t;}catch{}e=!0;}return e},c.observeVisibleRects=function(e,t,n,o){if(!yn)throw Error(a(363));e=ri(e,t);var s=sc(e,n,o).disconnect;return {disconnect:function(){s();}}},c.registerMutableSourceForHydration=function(e,t){var n=t._getVersion;n=n(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,n]:e.mutableSourceEagerHydrationData.push(t,n);},c.runWithPriority=function(e,t){var n=ur;try{return ur=e,t()}finally{ur=n;}},c.shouldSuspend=function(){return !1},c.unbatchedUpdates=function(e,t){var n=M;M&=-2,M|=8;try{return e(t)}finally{M=n,M===0&&(St(),Pe());}},c.updateContainer=function(e,t,n,o){var s=t.current,D=Te(),m=_t(s);e:if(n){n=n._reactInternals;t:{if(ae(n)!==n||n.tag!==1)throw Error(a(170));var y=n;do{switch(y.tag){case 3:y=y.stateNode.context;break t;case 1:if(Re(y.type)){y=y.stateNode.__reactInternalMemoizedMergedChildContext;break t}}y=y.return;}while(y!==null);throw Error(a(171))}if(n.tag===1){var S=n.type;if(Re(S)){n=Ro(n,S,y);break e}}n=y;}else n=yt;return t.context===null?t.context=n:t.pendingContext=n,t=Ft(D,m),t.payload={element:e},o=o===void 0?null:o,o!==null&&(t.callback=o),wt(s,t),dt(s,m,D),m},c};}))($s),function(r){r.exports=$s.exports;}(Xs);var Gd=is(Xs.exports),eu={exports:{}},Dn={exports:{}},bd=({onlyFirst:r=!1}={})=>{const u=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(u,r?void 0:"g")};const Vd=bd;var Js=r=>typeof r=="string"?r.replace(Vd(),""):r,tu={exports:{}};const Zs=r=>Number.isNaN(r)?!1:r>=4352&&(r<=4447||r===9001||r===9002||11904<=r&&r<=12871&&r!==12351||12880<=r&&r<=19903||19968<=r&&r<=42182||43360<=r&&r<=43388||44032<=r&&r<=55203||63744<=r&&r<=64255||65040<=r&&r<=65049||65072<=r&&r<=65131||65281<=r&&r<=65376||65504<=r&&r<=65510||110592<=r&&r<=110593||127488<=r&&r<=127569||131072<=r&&r<=262141);tu.exports=Zs,tu.exports.default=Zs;var qd=function(){return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g};const Qd=Js,Yd=tu.exports,Kd=qd,ea=r=>{if(typeof r!="string"||r.length===0||(r=Qd(r),r.length===0))return 0;r=r.replace(Kd(),"  ");let u=0;for(let i=0;i<r.length;i++){const c=r.codePointAt(i);c<=31||c>=127&&c<=159||c>=768&&c<=879||(c>65535&&i++,u+=Yd(c)?2:1);}return u};Dn.exports=ea,Dn.exports.default=ea;const Xd=Dn.exports,ta=r=>{let u=0;for(const i of r.split(`
`))u=Math.max(u,Xd(i));return u};eu.exports=ta,eu.exports.default=ta;var nu={exports:{}},qi,na;function $d(){return na||(na=1,qi={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}),qi}var Qi,ra;function ua(){if(ra)return Qi;ra=1;const r=$d(),u={};for(const l of Object.keys(r))u[r[l]]=l;const i={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};Qi=i;for(const l of Object.keys(i)){if(!("channels"in i[l]))throw new Error("missing channels property: "+l);if(!("labels"in i[l]))throw new Error("missing channel labels property: "+l);if(i[l].labels.length!==i[l].channels)throw new Error("channel and label counts mismatch: "+l);const{channels:f,labels:d}=i[l];delete i[l].channels,delete i[l].labels,Object.defineProperty(i[l],"channels",{value:f}),Object.defineProperty(i[l],"labels",{value:d});}i.rgb.hsl=function(l){const f=l[0]/255,d=l[1]/255,a=l[2]/255,p=Math.min(f,d,a),h=Math.max(f,d,a),E=h-p;let g,C;h===p?g=0:f===h?g=(d-a)/E:d===h?g=2+(a-f)/E:a===h&&(g=4+(f-d)/E),g=Math.min(g*60,360),g<0&&(g+=360);const w=(p+h)/2;return h===p?C=0:w<=.5?C=E/(h+p):C=E/(2-h-p),[g,C*100,w*100]},i.rgb.hsv=function(l){let f,d,a,p,h;const E=l[0]/255,g=l[1]/255,C=l[2]/255,w=Math.max(E,g,C),_=w-Math.min(E,g,C),R=function(z){return (w-z)/6/_+1/2};return _===0?(p=0,h=0):(h=_/w,f=R(E),d=R(g),a=R(C),E===w?p=a-d:g===w?p=1/3+f-a:C===w&&(p=2/3+d-f),p<0?p+=1:p>1&&(p-=1)),[p*360,h*100,w*100]},i.rgb.hwb=function(l){const f=l[0],d=l[1];let a=l[2];const p=i.rgb.hsl(l)[0],h=1/255*Math.min(f,Math.min(d,a));return a=1-1/255*Math.max(f,Math.max(d,a)),[p,h*100,a*100]},i.rgb.cmyk=function(l){const f=l[0]/255,d=l[1]/255,a=l[2]/255,p=Math.min(1-f,1-d,1-a),h=(1-f-p)/(1-p)||0,E=(1-d-p)/(1-p)||0,g=(1-a-p)/(1-p)||0;return [h*100,E*100,g*100,p*100]};function c(l,f){return (l[0]-f[0])**2+(l[1]-f[1])**2+(l[2]-f[2])**2}return i.rgb.keyword=function(l){const f=u[l];if(f)return f;let d=1/0,a;for(const p of Object.keys(r)){const h=r[p],E=c(l,h);E<d&&(d=E,a=p);}return a},i.keyword.rgb=function(l){return r[l]},i.rgb.xyz=function(l){let f=l[0]/255,d=l[1]/255,a=l[2]/255;f=f>.04045?((f+.055)/1.055)**2.4:f/12.92,d=d>.04045?((d+.055)/1.055)**2.4:d/12.92,a=a>.04045?((a+.055)/1.055)**2.4:a/12.92;const p=f*.4124+d*.3576+a*.1805,h=f*.2126+d*.7152+a*.0722,E=f*.0193+d*.1192+a*.9505;return [p*100,h*100,E*100]},i.rgb.lab=function(l){const f=i.rgb.xyz(l);let d=f[0],a=f[1],p=f[2];d/=95.047,a/=100,p/=108.883,d=d>.008856?d**(1/3):7.787*d+16/116,a=a>.008856?a**(1/3):7.787*a+16/116,p=p>.008856?p**(1/3):7.787*p+16/116;const h=116*a-16,E=500*(d-a),g=200*(a-p);return [h,E,g]},i.hsl.rgb=function(l){const f=l[0]/360,d=l[1]/100,a=l[2]/100;let p,h,E;if(d===0)return E=a*255,[E,E,E];a<.5?p=a*(1+d):p=a+d-a*d;const g=2*a-p,C=[0,0,0];for(let w=0;w<3;w++)h=f+1/3*-(w-1),h<0&&h++,h>1&&h--,6*h<1?E=g+(p-g)*6*h:2*h<1?E=p:3*h<2?E=g+(p-g)*(2/3-h)*6:E=g,C[w]=E*255;return C},i.hsl.hsv=function(l){const f=l[0];let d=l[1]/100,a=l[2]/100,p=d;const h=Math.max(a,.01);a*=2,d*=a<=1?a:2-a,p*=h<=1?h:2-h;const E=(a+d)/2,g=a===0?2*p/(h+p):2*d/(a+d);return [f,g*100,E*100]},i.hsv.rgb=function(l){const f=l[0]/60,d=l[1]/100;let a=l[2]/100;const p=Math.floor(f)%6,h=f-Math.floor(f),E=255*a*(1-d),g=255*a*(1-d*h),C=255*a*(1-d*(1-h));switch(a*=255,p){case 0:return [a,C,E];case 1:return [g,a,E];case 2:return [E,a,C];case 3:return [E,g,a];case 4:return [C,E,a];case 5:return [a,E,g]}},i.hsv.hsl=function(l){const f=l[0],d=l[1]/100,a=l[2]/100,p=Math.max(a,.01);let h,E;E=(2-d)*a;const g=(2-d)*p;return h=d*p,h/=g<=1?g:2-g,h=h||0,E/=2,[f,h*100,E*100]},i.hwb.rgb=function(l){const f=l[0]/360;let d=l[1]/100,a=l[2]/100;const p=d+a;let h;p>1&&(d/=p,a/=p);const E=Math.floor(6*f),g=1-a;h=6*f-E,(E&1)!==0&&(h=1-h);const C=d+h*(g-d);let w,_,R;switch(E){default:case 6:case 0:w=g,_=C,R=d;break;case 1:w=C,_=g,R=d;break;case 2:w=d,_=g,R=C;break;case 3:w=d,_=C,R=g;break;case 4:w=C,_=d,R=g;break;case 5:w=g,_=d,R=C;break}return [w*255,_*255,R*255]},i.cmyk.rgb=function(l){const f=l[0]/100,d=l[1]/100,a=l[2]/100,p=l[3]/100,h=1-Math.min(1,f*(1-p)+p),E=1-Math.min(1,d*(1-p)+p),g=1-Math.min(1,a*(1-p)+p);return [h*255,E*255,g*255]},i.xyz.rgb=function(l){const f=l[0]/100,d=l[1]/100,a=l[2]/100;let p,h,E;return p=f*3.2406+d*-1.5372+a*-.4986,h=f*-.9689+d*1.8758+a*.0415,E=f*.0557+d*-.204+a*1.057,p=p>.0031308?1.055*p**(1/2.4)-.055:p*12.92,h=h>.0031308?1.055*h**(1/2.4)-.055:h*12.92,E=E>.0031308?1.055*E**(1/2.4)-.055:E*12.92,p=Math.min(Math.max(0,p),1),h=Math.min(Math.max(0,h),1),E=Math.min(Math.max(0,E),1),[p*255,h*255,E*255]},i.xyz.lab=function(l){let f=l[0],d=l[1],a=l[2];f/=95.047,d/=100,a/=108.883,f=f>.008856?f**(1/3):7.787*f+16/116,d=d>.008856?d**(1/3):7.787*d+16/116,a=a>.008856?a**(1/3):7.787*a+16/116;const p=116*d-16,h=500*(f-d),E=200*(d-a);return [p,h,E]},i.lab.xyz=function(l){const f=l[0],d=l[1],a=l[2];let p,h,E;h=(f+16)/116,p=d/500+h,E=h-a/200;const g=h**3,C=p**3,w=E**3;return h=g>.008856?g:(h-16/116)/7.787,p=C>.008856?C:(p-16/116)/7.787,E=w>.008856?w:(E-16/116)/7.787,p*=95.047,h*=100,E*=108.883,[p,h,E]},i.lab.lch=function(l){const f=l[0],d=l[1],a=l[2];let p;p=Math.atan2(a,d)*360/2/Math.PI,p<0&&(p+=360);const E=Math.sqrt(d*d+a*a);return [f,E,p]},i.lch.lab=function(l){const f=l[0],d=l[1],p=l[2]/360*2*Math.PI,h=d*Math.cos(p),E=d*Math.sin(p);return [f,h,E]},i.rgb.ansi16=function(l,f=null){const[d,a,p]=l;let h=f===null?i.rgb.hsv(l)[2]:f;if(h=Math.round(h/50),h===0)return 30;let E=30+(Math.round(p/255)<<2|Math.round(a/255)<<1|Math.round(d/255));return h===2&&(E+=60),E},i.hsv.ansi16=function(l){return i.rgb.ansi16(i.hsv.rgb(l),l[2])},i.rgb.ansi256=function(l){const f=l[0],d=l[1],a=l[2];return f===d&&d===a?f<8?16:f>248?231:Math.round((f-8)/247*24)+232:16+36*Math.round(f/255*5)+6*Math.round(d/255*5)+Math.round(a/255*5)},i.ansi16.rgb=function(l){let f=l%10;if(f===0||f===7)return l>50&&(f+=3.5),f=f/10.5*255,[f,f,f];const d=(~~(l>50)+1)*.5,a=(f&1)*d*255,p=(f>>1&1)*d*255,h=(f>>2&1)*d*255;return [a,p,h]},i.ansi256.rgb=function(l){if(l>=232){const h=(l-232)*10+8;return [h,h,h]}l-=16;let f;const d=Math.floor(l/36)/5*255,a=Math.floor((f=l%36)/6)/5*255,p=f%6/5*255;return [d,a,p]},i.rgb.hex=function(l){const d=(((Math.round(l[0])&255)<<16)+((Math.round(l[1])&255)<<8)+(Math.round(l[2])&255)).toString(16).toUpperCase();return "000000".substring(d.length)+d},i.hex.rgb=function(l){const f=l.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!f)return [0,0,0];let d=f[0];f[0].length===3&&(d=d.split("").map(g=>g+g).join(""));const a=parseInt(d,16),p=a>>16&255,h=a>>8&255,E=a&255;return [p,h,E]},i.rgb.hcg=function(l){const f=l[0]/255,d=l[1]/255,a=l[2]/255,p=Math.max(Math.max(f,d),a),h=Math.min(Math.min(f,d),a),E=p-h;let g,C;return E<1?g=h/(1-E):g=0,E<=0?C=0:p===f?C=(d-a)/E%6:p===d?C=2+(a-f)/E:C=4+(f-d)/E,C/=6,C%=1,[C*360,E*100,g*100]},i.hsl.hcg=function(l){const f=l[1]/100,d=l[2]/100,a=d<.5?2*f*d:2*f*(1-d);let p=0;return a<1&&(p=(d-.5*a)/(1-a)),[l[0],a*100,p*100]},i.hsv.hcg=function(l){const f=l[1]/100,d=l[2]/100,a=f*d;let p=0;return a<1&&(p=(d-a)/(1-a)),[l[0],a*100,p*100]},i.hcg.rgb=function(l){const f=l[0]/360,d=l[1]/100,a=l[2]/100;if(d===0)return [a*255,a*255,a*255];const p=[0,0,0],h=f%1*6,E=h%1,g=1-E;let C=0;switch(Math.floor(h)){case 0:p[0]=1,p[1]=E,p[2]=0;break;case 1:p[0]=g,p[1]=1,p[2]=0;break;case 2:p[0]=0,p[1]=1,p[2]=E;break;case 3:p[0]=0,p[1]=g,p[2]=1;break;case 4:p[0]=E,p[1]=0,p[2]=1;break;default:p[0]=1,p[1]=0,p[2]=g;}return C=(1-d)*a,[(d*p[0]+C)*255,(d*p[1]+C)*255,(d*p[2]+C)*255]},i.hcg.hsv=function(l){const f=l[1]/100,d=l[2]/100,a=f+d*(1-f);let p=0;return a>0&&(p=f/a),[l[0],p*100,a*100]},i.hcg.hsl=function(l){const f=l[1]/100,a=l[2]/100*(1-f)+.5*f;let p=0;return a>0&&a<.5?p=f/(2*a):a>=.5&&a<1&&(p=f/(2*(1-a))),[l[0],p*100,a*100]},i.hcg.hwb=function(l){const f=l[1]/100,d=l[2]/100,a=f+d*(1-f);return [l[0],(a-f)*100,(1-a)*100]},i.hwb.hcg=function(l){const f=l[1]/100,d=l[2]/100,a=1-d,p=a-f;let h=0;return p<1&&(h=(a-p)/(1-p)),[l[0],p*100,h*100]},i.apple.rgb=function(l){return [l[0]/65535*255,l[1]/65535*255,l[2]/65535*255]},i.rgb.apple=function(l){return [l[0]/255*65535,l[1]/255*65535,l[2]/255*65535]},i.gray.rgb=function(l){return [l[0]/100*255,l[0]/100*255,l[0]/100*255]},i.gray.hsl=function(l){return [0,0,l[0]]},i.gray.hsv=i.gray.hsl,i.gray.hwb=function(l){return [0,100,l[0]]},i.gray.cmyk=function(l){return [0,0,0,l[0]]},i.gray.lab=function(l){return [l[0],0,0]},i.gray.hex=function(l){const f=Math.round(l[0]/100*255)&255,a=((f<<16)+(f<<8)+f).toString(16).toUpperCase();return "000000".substring(a.length)+a},i.rgb.gray=function(l){return [(l[0]+l[1]+l[2])/3/255*100]},Qi}var Yi,ia;function Jd(){if(ia)return Yi;ia=1;const r=ua();function u(){const f={},d=Object.keys(r);for(let a=d.length,p=0;p<a;p++)f[d[p]]={distance:-1,parent:null};return f}function i(f){const d=u(),a=[f];for(d[f].distance=0;a.length;){const p=a.pop(),h=Object.keys(r[p]);for(let E=h.length,g=0;g<E;g++){const C=h[g],w=d[C];w.distance===-1&&(w.distance=d[p].distance+1,w.parent=p,a.unshift(C));}}return d}function c(f,d){return function(a){return d(f(a))}}function l(f,d){const a=[d[f].parent,f];let p=r[d[f].parent][f],h=d[f].parent;for(;d[h].parent;)a.unshift(d[h].parent),p=c(r[d[h].parent][h],p),h=d[h].parent;return p.conversion=a,p}return Yi=function(f){const d=i(f),a={},p=Object.keys(d);for(let h=p.length,E=0;E<h;E++){const g=p[E];d[g].parent!==null&&(a[g]=l(g,d));}return a},Yi}var Ki,oa;function Zd(){if(oa)return Ki;oa=1;const r=ua(),u=Jd(),i={},c=Object.keys(r);function l(d){const a=function(...p){const h=p[0];return h==null?h:(h.length>1&&(p=h),d(p))};return "conversion"in d&&(a.conversion=d.conversion),a}function f(d){const a=function(...p){const h=p[0];if(h==null)return h;h.length>1&&(p=h);const E=d(p);if(typeof E=="object")for(let g=E.length,C=0;C<g;C++)E[C]=Math.round(E[C]);return E};return "conversion"in d&&(a.conversion=d.conversion),a}return c.forEach(d=>{i[d]={},Object.defineProperty(i[d],"channels",{value:r[d].channels}),Object.defineProperty(i[d],"labels",{value:r[d].labels});const a=u(d);Object.keys(a).forEach(h=>{const E=a[h];i[d][h]=f(E),i[d][h].raw=l(E);});}),Ki=i,Ki}(function(r){const u=(E,g)=>(...C)=>`\x1B[${E(...C)+g}m`,i=(E,g)=>(...C)=>{const w=E(...C);return `\x1B[${38+g};5;${w}m`},c=(E,g)=>(...C)=>{const w=E(...C);return `\x1B[${38+g};2;${w[0]};${w[1]};${w[2]}m`},l=E=>E,f=(E,g,C)=>[E,g,C],d=(E,g,C)=>{Object.defineProperty(E,g,{get:()=>{const w=C();return Object.defineProperty(E,g,{value:w,enumerable:!0,configurable:!0}),w},enumerable:!0,configurable:!0});};let a;const p=(E,g,C,w)=>{a===void 0&&(a=Zd());const _=w?10:0,R={};for(const[z,A]of Object.entries(a)){const K=z==="ansi16"?"ansi":z;z===g?R[K]=E(C,_):typeof A=="object"&&(R[K]=E(A[g],_));}return R};function h(){const E=new Map,g={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};g.color.gray=g.color.blackBright,g.bgColor.bgGray=g.bgColor.bgBlackBright,g.color.grey=g.color.blackBright,g.bgColor.bgGrey=g.bgColor.bgBlackBright;for(const[C,w]of Object.entries(g)){for(const[_,R]of Object.entries(w))g[_]={open:`\x1B[${R[0]}m`,close:`\x1B[${R[1]}m`},w[_]=g[_],E.set(R[0],R[1]);Object.defineProperty(g,C,{value:w,enumerable:!1});}return Object.defineProperty(g,"codes",{value:E,enumerable:!1}),g.color.close="\x1B[39m",g.bgColor.close="\x1B[49m",d(g.color,"ansi",()=>p(u,"ansi16",l,!1)),d(g.color,"ansi256",()=>p(i,"ansi256",l,!1)),d(g.color,"ansi16m",()=>p(c,"rgb",f,!1)),d(g.bgColor,"ansi",()=>p(u,"ansi16",l,!0)),d(g.bgColor,"ansi256",()=>p(i,"ansi256",l,!0)),d(g.bgColor,"ansi16m",()=>p(c,"rgb",f,!0)),g}Object.defineProperty(r,"exports",{enumerable:!0,get:h});})(nu);const Xn=Dn.exports,eD$1=Js,tD$1=nu.exports,Xi=new Set(["\x1B","\x9B"]),nD$1=39,la=r=>`${Xi.values().next().value}[${r}m`,rD$1=r=>r.split(" ").map(u=>Xn(u)),$i=(r,u,i)=>{const c=[...u];let l=!1,f=Xn(eD$1(r[r.length-1]));for(const[d,a]of c.entries()){const p=Xn(a);if(f+p<=i?r[r.length-1]+=a:(r.push(a),f=0),Xi.has(a))l=!0;else if(l&&a==="m"){l=!1;continue}l||(f+=p,f===i&&d<c.length-1&&(r.push(""),f=0));}!f&&r[r.length-1].length>0&&r.length>1&&(r[r.length-2]+=r.pop());},uD$1=r=>{const u=r.split(" ");let i=u.length;for(;i>0&&!(Xn(u[i-1])>0);)i--;return i===u.length?r:u.slice(0,i).join(" ")+u.slice(i).join("")},iD$1=(r,u,i={})=>{if(i.trim!==!1&&r.trim()==="")return "";let c="",l="",f;const d=rD$1(r);let a=[""];for(const[p,h]of r.split(" ").entries()){i.trim!==!1&&(a[a.length-1]=a[a.length-1].trimLeft());let E=Xn(a[a.length-1]);if(p!==0&&(E>=u&&(i.wordWrap===!1||i.trim===!1)&&(a.push(""),E=0),(E>0||i.trim===!1)&&(a[a.length-1]+=" ",E++)),i.hard&&d[p]>u){const g=u-E,C=1+Math.floor((d[p]-g-1)/u);Math.floor((d[p]-1)/u)<C&&a.push(""),$i(a,h,u);continue}if(E+d[p]>u&&E>0&&d[p]>0){if(i.wordWrap===!1&&E<u){$i(a,h,u);continue}a.push("");}if(E+d[p]>u&&i.wordWrap===!1){$i(a,h,u);continue}a[a.length-1]+=h;}i.trim!==!1&&(a=a.map(uD$1)),c=a.join(`
`);for(const[p,h]of [...c].entries()){if(l+=h,Xi.has(h)){const g=parseFloat(/\d[^m]*/.exec(c.slice(p,p+4)));f=g===nD$1?null:g;}const E=tD$1.codes.get(Number(f));f&&E&&(c[p+1]===`
`?l+=la(E):h===`
`&&(l+=la(f)));}return l};var oD$1=(r,u,i)=>String(r).normalize().replace(/\r\n/g,`
`).split(`
`).map(c=>iD$1(c,u,i)).join(`
`);const sa="[\uD800-\uDBFF][\uDC00-\uDFFF]",lD$1=r=>r&&r.exact?new RegExp(`^${sa}$`):new RegExp(sa,"g");var sD$1=lD$1;const aD$1=tu.exports,cD$1=sD$1,aa=nu.exports,ca=["\x1B","\x9B"],ru=r=>`${ca[0]}[${r}m`,fa=(r,u,i)=>{let c=[];r=[...r];for(let l of r){const f=l;l.match(";")&&(l=l.split(";")[0][0]+"0");const d=aa.codes.get(parseInt(l,10));if(d){const a=r.indexOf(d.toString());a>=0?r.splice(a,1):c.push(ru(u?d:f));}else if(u){c.push(ru(0));break}else c.push(ru(f));}if(u&&(c=c.filter((l,f)=>c.indexOf(l)===f),i!==void 0)){const l=ru(aa.codes.get(parseInt(i,10)));c=c.reduce((f,d)=>d===l?[d,...f]:[...f,d],[]);}return c.join("")};var Ji=(r,u,i)=>{const c=[...r.normalize()],l=[];i=typeof i=="number"?i:c.length;let f=!1,d,a=0,p="";for(const[h,E]of c.entries()){let g=!1;if(ca.includes(E)){const C=/\d[^m]*/.exec(r.slice(h,h+18));d=C&&C.length>0?C[0]:void 0,a<i&&(f=!0,d!==void 0&&l.push(d));}else f&&E==="m"&&(f=!1,g=!0);if(!f&&!g&&++a,!cD$1({exact:!0}).test(E)&&aD$1(E.codePointAt())&&++a,a>u&&a<=i)p+=E;else if(a===u&&!f&&d!==void 0)p=fa(l);else if(a>=i){p+=fa(l,!0,d);break}}return p};const Tt=Ji,fD$1=Dn.exports;function uu(r,u,i){if(r.charAt(u)===" ")return u;for(let c=1;c<=3;c++)if(i){if(r.charAt(u+c)===" ")return u+c}else if(r.charAt(u-c)===" ")return u-c;return u}var dD$1=(r,u,i)=>{i=an({position:"end",preferTruncationOnSpace:!1},i);const{position:c,space:l,preferTruncationOnSpace:f}=i;let d="\u2026",a=1;if(typeof r!="string")throw new TypeError(`Expected \`input\` to be a string, got ${typeof r}`);if(typeof u!="number")throw new TypeError(`Expected \`columns\` to be a number, got ${typeof u}`);if(u<1)return "";if(u===1)return d;const p=fD$1(r);if(p<=u)return r;if(c==="start"){if(f){const h=uu(r,p-u+1,!0);return d+Tt(r,h,p).trim()}return l===!0&&(d+=" ",a=2),d+Tt(r,p-u+a,p)}if(c==="middle"){l===!0&&(d=" "+d+" ",a=3);const h=Math.floor(u/2);if(f){const E=uu(r,h),g=uu(r,p-(u-h)+1,!0);return Tt(r,0,E)+d+Tt(r,g,p).trim()}return Tt(r,0,h)+d+Tt(r,p-(u-h)+a,p)}if(c==="end"){if(f){const h=uu(r,u-1);return Tt(r,0,h)+d}return l===!0&&(d=" "+d,a=2),Tt(r,0,u-a)+d}throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${c}`)},DD$1=(r,u=1,i)=>{if(i=an({indent:" ",includeEmptyLines:!1},i),typeof r!="string")throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof r}\``);if(typeof u!="number")throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof u}\``);if(typeof i.indent!="string")throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof i.indent}\``);if(u===0)return r;const c=i.includeEmptyLines?/^/gm:/^(?!\s*$)/gm;return r.replace(c,i.indent.repeat(u))},Zi={exports:{}},pD$1={topLeft:"\u250C",topRight:"\u2510",bottomRight:"\u2518",bottomLeft:"\u2514",vertical:"\u2502",horizontal:"\u2500"},hD$1={topLeft:"\u2554",topRight:"\u2557",bottomRight:"\u255D",bottomLeft:"\u255A",vertical:"\u2551",horizontal:"\u2550"},mD$1={topLeft:"\u256D",topRight:"\u256E",bottomRight:"\u256F",bottomLeft:"\u2570",vertical:"\u2502",horizontal:"\u2500"},gD$1={topLeft:"\u250F",topRight:"\u2513",bottomRight:"\u251B",bottomLeft:"\u2517",vertical:"\u2503",horizontal:"\u2501"},ED$1={topLeft:"\u2553",topRight:"\u2556",bottomRight:"\u255C",bottomLeft:"\u2559",vertical:"\u2551",horizontal:"\u2500"},yD={topLeft:"\u2552",topRight:"\u2555",bottomRight:"\u255B",bottomLeft:"\u2558",vertical:"\u2502",horizontal:"\u2550"},vD={topLeft:"+",topRight:"+",bottomRight:"+",bottomLeft:"+",vertical:"|",horizontal:"-"},CD$1={single:pD$1,double:hD$1,round:mD$1,bold:gD$1,singleDouble:ED$1,doubleSingle:yD,classic:vD};const da=CD$1;Zi.exports=da,Zi.exports.default=da;var FD$1=(r,u=process.argv)=>{const i=r.startsWith("-")?"":r.length===1?"-":"--",c=u.indexOf(i+r),l=u.indexOf("--");return c!==-1&&(l===-1||c<l)};const wD$1=Si__default["default"],Da=Tf__default["default"],We=FD$1,{env:he}=process;let Nt;We("no-color")||We("no-colors")||We("color=false")||We("color=never")?Nt=0:(We("color")||We("colors")||We("color=true")||We("color=always"))&&(Nt=1),"FORCE_COLOR"in he&&(he.FORCE_COLOR==="true"?Nt=1:he.FORCE_COLOR==="false"?Nt=0:Nt=he.FORCE_COLOR.length===0?1:Math.min(parseInt(he.FORCE_COLOR,10),3));function eo(r){return r===0?!1:{level:r,hasBasic:!0,has256:r>=2,has16m:r>=3}}function to(r,u){if(Nt===0)return 0;if(We("color=16m")||We("color=full")||We("color=truecolor"))return 3;if(We("color=256"))return 2;if(r&&!u&&Nt===void 0)return 0;const i=Nt||0;if(he.TERM==="dumb")return i;if(process.platform==="win32"){const c=wD$1.release().split(".");return Number(c[0])>=10&&Number(c[2])>=10586?Number(c[2])>=14931?3:2:1}if("CI"in he)return ["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(c=>c in he)||he.CI_NAME==="codeship"?1:i;if("TEAMCITY_VERSION"in he)return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(he.TEAMCITY_VERSION)?1:0;if(he.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in he){const c=parseInt((he.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(he.TERM_PROGRAM){case"iTerm.app":return c>=3?3:2;case"Apple_Terminal":return 2}}return /-256(color)?$/i.test(he.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(he.TERM)||"COLORTERM"in he?1:i}function SD(r){const u=to(r,r&&r.isTTY);return eo(u)}var xD$1={supportsColor:SD,stdout:eo(to(!0,Da.isatty(1))),stderr:eo(to(!0,Da.isatty(2)))};const _D=(r,u,i)=>{let c=r.indexOf(u);if(c===-1)return r;const l=u.length;let f=0,d="";do d+=r.substr(f,c-f)+u+i,f=c+l,c=r.indexOf(u,f);while(c!==-1);return d+=r.substr(f),d},ID=(r,u,i,c)=>{let l=0,f="";do{const d=r[c-1]==="\r";f+=r.substr(l,(d?c-1:c)-l)+u+(d?`\r
`:`
`)+i,l=c+1,c=r.indexOf(`
`,l);}while(c!==-1);return f+=r.substr(l),f};var RD={stringReplaceAll:_D,stringEncaseCRLFWithFirstIndex:ID},no,pa;function kD(){if(pa)return no;pa=1;const r=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,u=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,i=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,c=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,l=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function f(h){const E=h[0]==="u",g=h[1]==="{";return E&&!g&&h.length===5||h[0]==="x"&&h.length===3?String.fromCharCode(parseInt(h.slice(1),16)):E&&g?String.fromCodePoint(parseInt(h.slice(2,-1),16)):l.get(h)||h}function d(h,E){const g=[],C=E.trim().split(/\s*,\s*/g);let w;for(const _ of C){const R=Number(_);if(!Number.isNaN(R))g.push(R);else if(w=_.match(i))g.push(w[2].replace(c,(z,A,K)=>A?f(A):K));else throw new Error(`Invalid Chalk template style argument: ${_} (in style '${h}')`)}return g}function a(h){u.lastIndex=0;const E=[];let g;for(;(g=u.exec(h))!==null;){const C=g[1];if(g[2]){const w=d(C,g[2]);E.push([C].concat(w));}else E.push([C]);}return E}function p(h,E){const g={};for(const w of E)for(const _ of w.styles)g[_[0]]=w.inverse?null:_.slice(1);let C=h;for(const[w,_]of Object.entries(g))if(!!Array.isArray(_)){if(!(w in C))throw new Error(`Unknown Chalk style: ${w}`);C=_.length>0?C[w](..._):C[w];}return C}return no=(h,E)=>{const g=[],C=[];let w=[];if(E.replace(r,(_,R,z,A,K,Q)=>{if(R)w.push(f(R));else if(A){const J=w.join("");w=[],C.push(g.length===0?J:p(h,g)(J)),g.push({inverse:z,styles:a(A)});}else if(K){if(g.length===0)throw new Error("Found extraneous } in Chalk template literal");C.push(p(h,g)(w.join(""))),w=[],g.pop();}else w.push(Q);}),C.push(w.join("")),g.length>0){const _=`Chalk template literal is missing ${g.length} closing bracket${g.length===1?"":"s"} (\`}\`)`;throw new Error(_)}return C.join("")},no}const $n=nu.exports,{stdout:ro,stderr:uo}=xD$1,{stringReplaceAll:BD$1,stringEncaseCRLFWithFirstIndex:TD}=RD,{isArray:iu}=Array,ha=["ansi","ansi","ansi256","ansi16m"],pn=Object.create(null),ND=(r,u={})=>{if(u.level&&!(Number.isInteger(u.level)&&u.level>=0&&u.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const i=ro?ro.level:0;r.level=u.level===void 0?i:u.level;};class AD$1{constructor(u){return ma(u)}}const ma=r=>{const u={};return ND(u,r),u.template=(...i)=>ya(u.template,...i),Object.setPrototypeOf(u,ou.prototype),Object.setPrototypeOf(u.template,u),u.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},u.template.Instance=AD$1,u.template};function ou(r){return ma(r)}for(const[r,u]of Object.entries($n))pn[r]={get(){const i=lu(this,io(u.open,u.close,this._styler),this._isEmpty);return Object.defineProperty(this,r,{value:i}),i}};pn.visible={get(){const r=lu(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:r}),r}};const ga=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(const r of ga)pn[r]={get(){const{level:u}=this;return function(...i){const c=io($n.color[ha[u]][r](...i),$n.color.close,this._styler);return lu(this,c,this._isEmpty)}}};for(const r of ga){const u="bg"+r[0].toUpperCase()+r.slice(1);pn[u]={get(){const{level:i}=this;return function(...c){const l=io($n.bgColor[ha[i]][r](...c),$n.bgColor.close,this._styler);return lu(this,l,this._isEmpty)}}};}const PD=Object.defineProperties(()=>{},Jl(an({},pn),{level:{enumerable:!0,get(){return this._generator.level},set(r){this._generator.level=r;}}})),io=(r,u,i)=>{let c,l;return i===void 0?(c=r,l=u):(c=i.openAll+r,l=u+i.closeAll),{open:r,close:u,openAll:c,closeAll:l,parent:i}},lu=(r,u,i)=>{const c=(...l)=>iu(l[0])&&iu(l[0].raw)?Ea(c,ya(c,...l)):Ea(c,l.length===1?""+l[0]:l.join(" "));return Object.setPrototypeOf(c,PD),c._generator=r,c._styler=u,c._isEmpty=i,c},Ea=(r,u)=>{if(r.level<=0||!u)return r._isEmpty?"":u;let i=r._styler;if(i===void 0)return u;const{openAll:c,closeAll:l}=i;if(u.indexOf("\x1B")!==-1)for(;i!==void 0;)u=BD$1(u,i.close,i.open),i=i.parent;const f=u.indexOf(`
`);return f!==-1&&(u=TD(u,l,c,f)),c+u+l};let oo;const ya=(r,...u)=>{const[i]=u;if(!iu(i)||!iu(i.raw))return u.join(" ");const c=u.slice(1),l=[i.raw[0]];for(let f=1;f<i.length;f++)l.push(String(c[f-1]).replace(/[{}\\]/g,"\\$&"),String(i.raw[f]));return oo===void 0&&(oo=kD()),oo(r,l.join(""))};Object.defineProperties(ou.prototype,pn);const su=ou();su.supportsColor=ro,su.stderr=ou({level:uo?uo.level:0}),su.stderr.supportsColor=uo;var Ke=su;const va=require$$0__default$1["default"],Ca=["assert","count","countReset","debug","dir","dirxml","error","group","groupCollapsed","groupEnd","info","log","table","time","timeEnd","timeLog","trace","warn"];let lo={};const LD=r=>{const u=new va.PassThrough,i=new va.PassThrough;u.write=l=>r("stdout",l),i.write=l=>r("stderr",l);const c=new console.Console(u,i);for(const l of Ca)lo[l]=console[l],console[l]=c[l];return ()=>{for(const l of Ca)console[l]=lo[l];lo={};}};var OD=LD;const MD=/[|\\{}()[\]^$+*?.-]/g;var zD=r=>{if(typeof r!="string")throw new TypeError("Expected a string");return r.replace(MD,"\\$&")};const jD=zD,UD=typeof process=="object"&&process&&typeof process.cwd=="function"?process.cwd():".",Fa=[].concat(If__default["default"].builtinModules,"bootstrap_node","node").map(r=>new RegExp(`(?:\\((?:node:)?${r}(?:\\.js)?:\\d+:\\d+\\)$|^\\s*at (?:node:)?${r}(?:\\.js)?:\\d+:\\d+$)`));Fa.push(/\((?:node:)?internal\/[^:]+:\d+:\d+\)$/,/\s*at (?:node:)?internal\/[^:]+:\d+:\d+$/,/\/\.node-spawn-wrap-\w+-\w+\/node:\d+:\d+\)?$/);class mo{constructor(u){u=an({ignoredPackages:[]},u),"internals"in u||(u.internals=mo.nodeInternals()),"cwd"in u||(u.cwd=UD),this._cwd=u.cwd.replace(/\\/g,"/"),this._internals=[].concat(u.internals,WD(u.ignoredPackages)),this._wrapCallSite=u.wrapCallSite||!1;}static nodeInternals(){return [...Fa]}clean(u,i=0){i=" ".repeat(i),Array.isArray(u)||(u=u.split(`
`)),!/^\s*at /.test(u[0])&&/^\s*at /.test(u[1])&&(u=u.slice(1));let c=!1,l=null;const f=[];return u.forEach(d=>{if(d=d.replace(/\\/g,"/"),this._internals.some(p=>p.test(d)))return;const a=/^\s*at /.test(d);c?d=d.trimEnd().replace(/^(\s+)at /,"$1"):(d=d.trim(),a&&(d=d.slice(3))),d=d.replace(`${this._cwd}/`,""),d&&(a?(l&&(f.push(l),l=null),f.push(d)):(c=!0,l=d));}),f.map(d=>`${i}${d}
`).join("")}captureString(u,i=this.captureString){typeof u=="function"&&(i=u,u=1/0);const{stackTraceLimit:c}=Error;u&&(Error.stackTraceLimit=u);const l={};Error.captureStackTrace(l,i);const{stack:f}=l;return Error.stackTraceLimit=c,this.clean(f)}capture(u,i=this.capture){typeof u=="function"&&(i=u,u=1/0);const{prepareStackTrace:c,stackTraceLimit:l}=Error;Error.prepareStackTrace=(a,p)=>this._wrapCallSite?p.map(this._wrapCallSite):p,u&&(Error.stackTraceLimit=u);const f={};Error.captureStackTrace(f,i);const{stack:d}=f;return Object.assign(Error,{prepareStackTrace:c,stackTraceLimit:l}),d}at(u=this.at){const[i]=this.capture(1,u);if(!i)return {};const c={line:i.getLineNumber(),column:i.getColumnNumber()};wa(c,i.getFileName(),this._cwd),i.isConstructor()&&(c.constructor=!0),i.isEval()&&(c.evalOrigin=i.getEvalOrigin()),i.isNative()&&(c.native=!0);let l;try{l=i.getTypeName();}catch{}l&&l!=="Object"&&l!=="[object Object]"&&(c.type=l);const f=i.getFunctionName();f&&(c.function=f);const d=i.getMethodName();return d&&f!==d&&(c.method=d),c}parseLine(u){const i=u&&u.match(HD);if(!i)return null;const c=i[1]==="new";let l=i[2];const f=i[3],d=i[4],a=Number(i[5]),p=Number(i[6]);let h=i[7];const E=i[8],g=i[9],C=i[10]==="native",w=i[11]===")";let _;const R={};if(E&&(R.line=Number(E)),g&&(R.column=Number(g)),w&&h){let z=0;for(let A=h.length-1;A>0;A--)if(h.charAt(A)===")")z++;else if(h.charAt(A)==="("&&h.charAt(A-1)===" "&&(z--,z===-1&&h.charAt(A-1)===" ")){const K=h.slice(0,A-1);h=h.slice(A+1),l+=` (${K}`;break}}if(l){const z=l.match(GD);z&&(l=z[1],_=z[2]);}return wa(R,h,this._cwd),c&&(R.constructor=!0),f&&(R.evalOrigin=f,R.evalLine=a,R.evalColumn=p,R.evalFile=d&&d.replace(/\\/g,"/")),C&&(R.native=!0),l&&(R.function=l),_&&l!==_&&(R.method=_),R}}function wa(r,u,i){u&&(u=u.replace(/\\/g,"/"),u.startsWith(`${i}/`)&&(u=u.slice(i.length+1)),r.file=u);}function WD(r){if(r.length===0)return [];const u=r.map(i=>jD(i));return new RegExp(`[/\\\\]node_modules[/\\\\](?:${u.join("|")})[/\\\\][^:]+:\\d+:\\d+`)}const HD=new RegExp("^(?:\\s*at )?(?:(new) )?(?:(.*?) \\()?(?:eval at ([^ ]+) \\((.+?):(\\d+):(\\d+)\\), )?(?:(.+?):(\\d+):(\\d+)|(native))(\\)?)$"),GD=/^(.*?) \[as (.*?)\]$/;var Sa=mo,bD$1=(r,u)=>r.replace(/^\t+/gm,i=>" ".repeat(i.length*(u||2)));const VD=bD$1,qD=(r,u)=>{const i=[],c=r-u,l=r+u;for(let f=c;f<=l;f++)i.push(f);return i};var QD=(r,u,i)=>{if(typeof r!="string")throw new TypeError("Source code is missing.");if(!u||u<1)throw new TypeError("Line number must start from `1`.");if(r=VD(r).split(/\r?\n/),!(u>r.length))return i=an({around:3},i),qD(u,i.around).filter(c=>r[c-1]!==void 0).map(c=>({line:c,value:r[c-1]}))};const YD=(r,{showCursor:u=!1}={})=>{let i=0,c="",l=!1;const f=d=>{!u&&!l&&(Qn.hide(),l=!0);const a=d+`
`;a!==c&&(c=a,r.write(Ui.eraseLines(i)+a),i=a.split(`
`).length);};return f.clear=()=>{r.write(Ui.eraseLines(i)),c="",i=0;},f.done=()=>{c="",i=0,u||(Qn.show(),l=!1);},f};var KD={create:YD};const so={};var xa=r=>{if(r.length===0)return {width:0,height:0};if(so[r])return so[r];const u=eu.exports(r),i=r.split(`
`).length;return so[r]={width:u,height:i},{width:u,height:i}};const XD=(r,u)=>{"position"in u&&r.setPositionType(u.position==="absolute"?H__default["default"].POSITION_TYPE_ABSOLUTE:H__default["default"].POSITION_TYPE_RELATIVE);},$D=(r,u)=>{"marginLeft"in u&&r.setMargin(H__default["default"].EDGE_START,u.marginLeft||0),"marginRight"in u&&r.setMargin(H__default["default"].EDGE_END,u.marginRight||0),"marginTop"in u&&r.setMargin(H__default["default"].EDGE_TOP,u.marginTop||0),"marginBottom"in u&&r.setMargin(H__default["default"].EDGE_BOTTOM,u.marginBottom||0);},JD=(r,u)=>{"paddingLeft"in u&&r.setPadding(H__default["default"].EDGE_LEFT,u.paddingLeft||0),"paddingRight"in u&&r.setPadding(H__default["default"].EDGE_RIGHT,u.paddingRight||0),"paddingTop"in u&&r.setPadding(H__default["default"].EDGE_TOP,u.paddingTop||0),"paddingBottom"in u&&r.setPadding(H__default["default"].EDGE_BOTTOM,u.paddingBottom||0);},ZD=(r,u)=>{var i;"flexGrow"in u&&r.setFlexGrow((i=u.flexGrow)!=null?i:0),"flexShrink"in u&&r.setFlexShrink(typeof u.flexShrink=="number"?u.flexShrink:1),"flexDirection"in u&&(u.flexDirection==="row"&&r.setFlexDirection(H__default["default"].FLEX_DIRECTION_ROW),u.flexDirection==="row-reverse"&&r.setFlexDirection(H__default["default"].FLEX_DIRECTION_ROW_REVERSE),u.flexDirection==="column"&&r.setFlexDirection(H__default["default"].FLEX_DIRECTION_COLUMN),u.flexDirection==="column-reverse"&&r.setFlexDirection(H__default["default"].FLEX_DIRECTION_COLUMN_REVERSE)),"flexBasis"in u&&(typeof u.flexBasis=="number"?r.setFlexBasis(u.flexBasis):typeof u.flexBasis=="string"?r.setFlexBasisPercent(Number.parseInt(u.flexBasis,10)):r.setFlexBasis(NaN)),"alignItems"in u&&((u.alignItems==="stretch"||!u.alignItems)&&r.setAlignItems(H__default["default"].ALIGN_STRETCH),u.alignItems==="flex-start"&&r.setAlignItems(H__default["default"].ALIGN_FLEX_START),u.alignItems==="center"&&r.setAlignItems(H__default["default"].ALIGN_CENTER),u.alignItems==="flex-end"&&r.setAlignItems(H__default["default"].ALIGN_FLEX_END)),"alignSelf"in u&&((u.alignSelf==="auto"||!u.alignSelf)&&r.setAlignSelf(H__default["default"].ALIGN_AUTO),u.alignSelf==="flex-start"&&r.setAlignSelf(H__default["default"].ALIGN_FLEX_START),u.alignSelf==="center"&&r.setAlignSelf(H__default["default"].ALIGN_CENTER),u.alignSelf==="flex-end"&&r.setAlignSelf(H__default["default"].ALIGN_FLEX_END)),"justifyContent"in u&&((u.justifyContent==="flex-start"||!u.justifyContent)&&r.setJustifyContent(H__default["default"].JUSTIFY_FLEX_START),u.justifyContent==="center"&&r.setJustifyContent(H__default["default"].JUSTIFY_CENTER),u.justifyContent==="flex-end"&&r.setJustifyContent(H__default["default"].JUSTIFY_FLEX_END),u.justifyContent==="space-between"&&r.setJustifyContent(H__default["default"].JUSTIFY_SPACE_BETWEEN),u.justifyContent==="space-around"&&r.setJustifyContent(H__default["default"].JUSTIFY_SPACE_AROUND));},ep=(r,u)=>{var i,c;"width"in u&&(typeof u.width=="number"?r.setWidth(u.width):typeof u.width=="string"?r.setWidthPercent(Number.parseInt(u.width,10)):r.setWidthAuto()),"height"in u&&(typeof u.height=="number"?r.setHeight(u.height):typeof u.height=="string"?r.setHeightPercent(Number.parseInt(u.height,10)):r.setHeightAuto()),"minWidth"in u&&(typeof u.minWidth=="string"?r.setMinWidthPercent(Number.parseInt(u.minWidth,10)):r.setMinWidth((i=u.minWidth)!=null?i:0)),"minHeight"in u&&(typeof u.minHeight=="string"?r.setMinHeightPercent(Number.parseInt(u.minHeight,10)):r.setMinHeight((c=u.minHeight)!=null?c:0));},tp=(r,u)=>{"display"in u&&r.setDisplay(u.display==="flex"?H__default["default"].DISPLAY_FLEX:H__default["default"].DISPLAY_NONE);},np=(r,u)=>{if("borderStyle"in u){const i=typeof u.borderStyle=="string"?1:0;r.setBorder(H__default["default"].EDGE_TOP,i),r.setBorder(H__default["default"].EDGE_BOTTOM,i),r.setBorder(H__default["default"].EDGE_LEFT,i),r.setBorder(H__default["default"].EDGE_RIGHT,i);}};var rp=(r,u={})=>{XD(r,u),$D(r,u),JD(r,u),ZD(r,u),ep(r,u),tp(r,u),np(r,u);};const ao={};var _a=(r,u,i)=>{const c=r+String(u)+String(i);if(ao[c])return ao[c];let l=r;if(i==="wrap"&&(l=oD$1(r,u,{trim:!1,hard:!0})),i.startsWith("truncate")){let f="end";i==="truncate-middle"&&(f="middle"),i==="truncate-start"&&(f="start"),l=dD$1(r,u,{position:f});}return ao[c]=l,l};const co=r=>{let u="";if(r.childNodes.length>0)for(const i of r.childNodes){let c="";i.nodeName==="#text"?c=i.nodeValue:((i.nodeName==="ink-text"||i.nodeName==="ink-virtual-text")&&(c=co(i)),c.length>0&&typeof i.internal_transform=="function"&&(c=i.internal_transform(c))),u+=c;}return u},Ia=r=>{var u;const i={nodeName:r,style:{},attributes:{},childNodes:[],parentNode:null,yogaNode:r==="ink-virtual-text"?void 0:H__default["default"].Node.create()};return r==="ink-text"&&((u=i.yogaNode)==null||u.setMeasureFunc(ip.bind(null,i))),i},fo=(r,u)=>{var i;u.parentNode&&au(u.parentNode,u),u.parentNode=r,r.childNodes.push(u),u.yogaNode&&((i=r.yogaNode)==null||i.insertChild(u.yogaNode,r.yogaNode.getChildCount())),(r.nodeName==="ink-text"||r.nodeName==="ink-virtual-text")&&cu(r);},Ra=(r,u,i)=>{var c,l;u.parentNode&&au(u.parentNode,u),u.parentNode=r;const f=r.childNodes.indexOf(i);if(f>=0){r.childNodes.splice(f,0,u),u.yogaNode&&((c=r.yogaNode)==null||c.insertChild(u.yogaNode,f));return}r.childNodes.push(u),u.yogaNode&&((l=r.yogaNode)==null||l.insertChild(u.yogaNode,r.yogaNode.getChildCount())),(r.nodeName==="ink-text"||r.nodeName==="ink-virtual-text")&&cu(r);},au=(r,u)=>{var i,c;u.yogaNode&&((c=(i=u.parentNode)==null?void 0:i.yogaNode)==null||c.removeChild(u.yogaNode)),u.parentNode=null;const l=r.childNodes.indexOf(u);l>=0&&r.childNodes.splice(l,1),(r.nodeName==="ink-text"||r.nodeName==="ink-virtual-text")&&cu(r);},ka=(r,u,i)=>{r.attributes[u]=i;},Ba=(r,u)=>{r.style=u,r.yogaNode&&rp(r.yogaNode,u);},up=r=>{const u={nodeName:"#text",nodeValue:r,yogaNode:void 0,parentNode:null,style:{}};return fu(u,r),u},ip=function(r,u){var i,c;const l=r.nodeName==="#text"?r.nodeValue:co(r),f=xa(l);if(f.width<=u||f.width>=1&&u>0&&u<1)return f;const d=(c=(i=r.style)==null?void 0:i.textWrap)!=null?c:"wrap",a=_a(l,u,d);return xa(a)},Ta=r=>{var u;if(!(!r||!r.parentNode))return (u=r.yogaNode)!=null?u:Ta(r.parentNode)},cu=r=>{const u=Ta(r);u==null||u.markDirty();},fu=(r,u)=>{typeof u!="string"&&(u=String(u)),r.nodeValue=u,cu(r);},Na=r=>{r==null||r.unsetMeasureFunc(),r==null||r.freeRecursive();};var Do=Gd({schedulePassiveEffects:Zr.exports.unstable_scheduleCallback,cancelPassiveEffects:Zr.exports.unstable_cancelCallback,now:Date.now,getRootHostContext:()=>({isInsideText:!1}),prepareForCommit:()=>null,preparePortalMount:()=>null,clearContainer:()=>!1,shouldDeprioritizeSubtree:()=>!1,resetAfterCommit:r=>{if(r.isStaticDirty){r.isStaticDirty=!1,typeof r.onImmediateRender=="function"&&r.onImmediateRender();return}typeof r.onRender=="function"&&r.onRender();},getChildHostContext:(r,u)=>{const i=r.isInsideText,c=u==="ink-text"||u==="ink-virtual-text";return i===c?r:{isInsideText:c}},shouldSetTextContent:()=>!1,createInstance:(r,u,i,c)=>{if(c.isInsideText&&r==="ink-box")throw new Error("<Box> can\u2019t be nested inside <Text> component");const l=r==="ink-text"&&c.isInsideText?"ink-virtual-text":r,f=Ia(l);for(const[d,a]of Object.entries(u))d!=="children"&&(d==="style"?Ba(f,a):d==="internal_transform"?f.internal_transform=a:d==="internal_static"?f.internal_static=!0:ka(f,d,a));return f},createTextInstance:(r,u,i)=>{if(!i.isInsideText)throw new Error(`Text string "${r}" must be rendered inside <Text> component`);return up(r)},resetTextContent:()=>{},hideTextInstance:r=>{fu(r,"");},unhideTextInstance:(r,u)=>{fu(r,u);},getPublicInstance:r=>r,hideInstance:r=>{var u;(u=r.yogaNode)==null||u.setDisplay(H__default["default"].DISPLAY_NONE);},unhideInstance:r=>{var u;(u=r.yogaNode)==null||u.setDisplay(H__default["default"].DISPLAY_FLEX);},appendInitialChild:fo,appendChild:fo,insertBefore:Ra,finalizeInitialChildren:(r,u,i,c)=>(r.internal_static&&(c.isStaticDirty=!0,c.staticNode=r),!1),supportsMutation:!0,appendChildToContainer:fo,insertInContainerBefore:Ra,removeChildFromContainer:(r,u)=>{au(r,u),Na(u.yogaNode);},prepareUpdate:(r,u,i,c,l)=>{r.internal_static&&(l.isStaticDirty=!0);const f={},d=Object.keys(c);for(const a of d)if(c[a]!==i[a]){if(a==="style"&&typeof c.style=="object"&&typeof i.style=="object"){const h=c.style,E=i.style,g=Object.keys(h);for(const C of g){if(C==="borderStyle"||C==="borderColor"){if(typeof f.style!="object"){const w={};f.style=w;}f.style.borderStyle=h.borderStyle,f.style.borderColor=h.borderColor;}if(h[C]!==E[C]){if(typeof f.style!="object"){const w={};f.style=w;}f.style[C]=h[C];}}continue}f[a]=c[a];}return f},commitUpdate:(r,u)=>{for(const[i,c]of Object.entries(u))i!=="children"&&(i==="style"?Ba(r,c):i==="internal_transform"?r.internal_transform=c:i==="internal_static"?r.internal_static=!0:ka(r,i,c));},commitTextUpdate:(r,u,i)=>{fu(r,i);},removeChild:(r,u)=>{au(r,u),Na(u.yogaNode);}}),op=r=>r.getComputedWidth()-r.getComputedPadding(H__default["default"].EDGE_LEFT)-r.getComputedPadding(H__default["default"].EDGE_RIGHT)-r.getComputedBorder(H__default["default"].EDGE_LEFT)-r.getComputedBorder(H__default["default"].EDGE_RIGHT);const lp=/^(rgb|hsl|hsv|hwb)\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/,sp=/^(ansi|ansi256)\(\s?(\d+)\s?\)$/,du=(r,u)=>u==="foreground"?r:"bg"+r[0].toUpperCase()+r.slice(1);var Jn=(r,u,i)=>{if(!u)return r;if(u in Ke){const l=du(u,i);return Ke[l](r)}if(u.startsWith("#")){const l=du("hex",i);return Ke[l](u)(r)}if(u.startsWith("ansi")){const l=sp.exec(u);if(!l)return r;const f=du(l[1],i),d=Number(l[2]);return Ke[f](d)(r)}if(u.startsWith("rgb")||u.startsWith("hsl")||u.startsWith("hsv")||u.startsWith("hwb")){const l=lp.exec(u);if(!l)return r;const f=du(l[1],i),d=Number(l[2]),a=Number(l[3]),p=Number(l[4]);return Ke[f](d,a,p)(r)}return r},ap=(r,u,i,c)=>{if(typeof i.style.borderStyle=="string"){const l=i.yogaNode.getComputedWidth(),f=i.yogaNode.getComputedHeight(),d=i.style.borderColor,a=Zi.exports[i.style.borderStyle],p=Jn(a.topLeft+a.horizontal.repeat(l-2)+a.topRight,d,"foreground"),h=(Jn(a.vertical,d,"foreground")+`
`).repeat(f-2),E=Jn(a.bottomLeft+a.horizontal.repeat(l-2)+a.bottomRight,d,"foreground");c.write(r,u,p,{transformers:[]}),c.write(r,u+1,h,{transformers:[]}),c.write(r+l-1,u+1,h,{transformers:[]}),c.write(r,u+f-1,E,{transformers:[]});}};const cp=(r,u)=>{var i;const c=(i=r.childNodes[0])==null?void 0:i.yogaNode;if(c){const l=c.getComputedLeft(),f=c.getComputedTop();u=`
`.repeat(f)+DD$1(u,l);}return u},po=(r,u,i)=>{var c;const{offsetX:l=0,offsetY:f=0,transformers:d=[],skipStaticElements:a}=i;if(a&&r.internal_static)return;const{yogaNode:p}=r;if(p){if(p.getDisplay()===H__default["default"].DISPLAY_NONE)return;const h=l+p.getComputedLeft(),E=f+p.getComputedTop();let g=d;if(typeof r.internal_transform=="function"&&(g=[r.internal_transform,...d]),r.nodeName==="ink-text"){let C=co(r);if(C.length>0){const w=eu.exports(C),_=op(p);if(w>_){const R=(c=r.style.textWrap)!=null?c:"wrap";C=_a(C,_,R);}C=cp(r,C),u.write(h,E,C,{transformers:g});}return}if(r.nodeName==="ink-box"&&ap(h,E,r,u),r.nodeName==="ink-root"||r.nodeName==="ink-box")for(const C of r.childNodes)po(C,u,{offsetX:h,offsetY:E,transformers:g,skipStaticElements:a});}};class Aa{constructor(u){this.writes=[];const{width:i,height:c}=u;this.width=i,this.height=c;}write(u,i,c,l){const{transformers:f}=l;!c||this.writes.push({x:u,y:i,text:c,transformers:f});}get(){const u=[];for(let c=0;c<this.height;c++)u.push(" ".repeat(this.width));for(const c of this.writes){const{x:l,y:f,text:d,transformers:a}=c,p=d.split(`
`);let h=0;for(let E of p){const g=u[f+h];if(!g)continue;const C=Dn.exports(E);for(const w of a)E=w(E);u[f+h]=Ji(g,0,l)+E+Ji(g,l+C),h++;}}return {output:u.map(c=>c.trimRight()).join(`
`),height:u.length}}}var fp=(r,u)=>{var i;if(r.yogaNode.setWidth(u),r.yogaNode){r.yogaNode.calculateLayout(void 0,void 0,H__default["default"].DIRECTION_LTR);const c=new Aa({width:r.yogaNode.getComputedWidth(),height:r.yogaNode.getComputedHeight()});po(r,c,{skipStaticElements:!0});let l;(i=r.staticNode)!=null&&i.yogaNode&&(l=new Aa({width:r.staticNode.yogaNode.getComputedWidth(),height:r.staticNode.yogaNode.getComputedHeight()}),po(r.staticNode,l,{skipStaticElements:!1}));const{output:f,height:d}=c.get();return {output:f,outputHeight:d,staticOutput:l?`${l.get().output}
`:""}}return {output:"",outputHeight:0,staticOutput:""}},Zn=new WeakMap;const Pa=$$3.exports.createContext({exit:()=>{}});Pa.displayName="InternalAppContext";const La=$$3.exports.createContext({stdin:void 0,setRawMode:()=>{},isRawModeSupported:!1,internal_exitOnCtrlC:!0});La.displayName="InternalStdinContext";const Oa=$$3.exports.createContext({stdout:void 0,write:()=>{}});Oa.displayName="InternalStdoutContext";const Ma=$$3.exports.createContext({stderr:void 0,write:()=>{}});Ma.displayName="InternalStderrContext";const za=$$3.exports.createContext({activeId:void 0,add:()=>{},remove:()=>{},activate:()=>{},deactivate:()=>{},enableFocus:()=>{},disableFocus:()=>{},focusNext:()=>{},focusPrevious:()=>{},focus:()=>{}});za.displayName="InternalFocusContext";var dp=Object.defineProperty,Dp=Object.defineProperties,pp=Object.getOwnPropertyDescriptors,Du=Object.getOwnPropertySymbols,ja=Object.prototype.hasOwnProperty,Ua=Object.prototype.propertyIsEnumerable,Wa=(r,u,i)=>u in r?dp(r,u,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[u]=i,hp=(r,u)=>{for(var i in u||(u={}))ja.call(u,i)&&Wa(r,i,u[i]);if(Du)for(var i of Du(u))Ua.call(u,i)&&Wa(r,i,u[i]);return r},mp=(r,u)=>Dp(r,pp(u)),gp=(r,u)=>{var i={};for(var c in r)ja.call(r,c)&&u.indexOf(c)<0&&(i[c]=r[c]);if(r!=null&&Du)for(var c of Du(r))u.indexOf(c)<0&&Ua.call(r,c)&&(i[c]=r[c]);return i};const me=$$3.exports.forwardRef((r,u)=>{var i=r,{children:c}=i,l=gp(i,["children"]);const f=mp(hp({},l),{marginLeft:l.marginLeft||l.marginX||l.margin||0,marginRight:l.marginRight||l.marginX||l.margin||0,marginTop:l.marginTop||l.marginY||l.margin||0,marginBottom:l.marginBottom||l.marginY||l.margin||0,paddingLeft:l.paddingLeft||l.paddingX||l.padding||0,paddingRight:l.paddingRight||l.paddingX||l.padding||0,paddingTop:l.paddingTop||l.paddingY||l.padding||0,paddingBottom:l.paddingBottom||l.paddingY||l.padding||0});return O$1.createElement("ink-box",{ref:u,style:f},c)});me.displayName="Box",me.defaultProps={flexDirection:"row",flexGrow:0,flexShrink:1};const oe=({color:r,backgroundColor:u,dimColor:i,bold:c,italic:l,underline:f,strikethrough:d,inverse:a,wrap:p,children:h})=>{if(h==null)return null;const E=g=>(i&&(g=Ke.dim(g)),r&&(g=Jn(g,r,"foreground")),u&&(g=Jn(g,u,"background")),c&&(g=Ke.bold(g)),l&&(g=Ke.italic(g)),f&&(g=Ke.underline(g)),d&&(g=Ke.strikethrough(g)),a&&(g=Ke.inverse(g)),g);return O$1.createElement("ink-text",{style:{flexGrow:0,flexShrink:1,flexDirection:"row",textWrap:p},internal_transform:E},h)};oe.displayName="Text",oe.defaultProps={dimColor:!1,bold:!1,italic:!1,underline:!1,strikethrough:!1,wrap:"wrap"};const Ha=new Sa({cwd:process.cwd(),internals:Sa.nodeInternals()}),Ep=({error:r})=>{const u=r.stack?r.stack.split(`
`).slice(1):void 0,i=u?Ha.parseLine(u[0]):void 0;let c,l=0;if((i==null?void 0:i.file)&&(i==null?void 0:i.line)&&require$$0__namespace.existsSync(i.file)){const f=require$$0__namespace.readFileSync(i.file,"utf8");if(c=QD(f,i.line),c)for(const{line:d}of c)l=Math.max(l,String(d).length);}return O$1.createElement(me,{flexDirection:"column",padding:1},O$1.createElement(me,null,O$1.createElement(oe,{backgroundColor:"red",color:"white"}," ","ERROR"," "),O$1.createElement(oe,null," ",r.message)),i&&O$1.createElement(me,{marginTop:1},O$1.createElement(oe,{dimColor:!0},i.file,":",i.line,":",i.column)),i&&c&&O$1.createElement(me,{marginTop:1,flexDirection:"column"},c.map(({line:f,value:d})=>O$1.createElement(me,{key:f},O$1.createElement(me,{width:l+1},O$1.createElement(oe,{dimColor:f!==i.line,backgroundColor:f===i.line?"red":void 0,color:f===i.line?"white":void 0},String(f).padStart(l," "),":")),O$1.createElement(oe,{key:f,backgroundColor:f===i.line?"red":void 0,color:f===i.line?"white":void 0}," "+d)))),r.stack&&O$1.createElement(me,{marginTop:1,flexDirection:"column"},r.stack.split(`
`).slice(1).map(f=>{const d=Ha.parseLine(f);return d?O$1.createElement(me,{key:f},O$1.createElement(oe,{dimColor:!0},"- "),O$1.createElement(oe,{dimColor:!0,bold:!0},d.function),O$1.createElement(oe,{dimColor:!0,color:"gray"}," ","(",d.file,":",d.line,":",d.column,")")):O$1.createElement(me,{key:f},O$1.createElement(oe,{dimColor:!0},"- "),O$1.createElement(oe,{dimColor:!0,bold:!0},f))})))},yp="	",vp="\x1B[Z",Cp="\x1B";class Ga extends $$3.exports.PureComponent{constructor(){super(...arguments),this.state={isFocusEnabled:!0,activeFocusId:void 0,focusables:[],error:void 0},this.rawModeEnabledCount=0,this.handleSetRawMode=u=>{const{stdin:i}=this.props;if(!this.isRawModeSupported())throw i===process.stdin?new Error(`Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`):new Error(`Raw mode is not supported on the stdin provided to Ink.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);if(i.setEncoding("utf8"),u){this.rawModeEnabledCount===0&&(i.addListener("data",this.handleInput),i.resume(),i.setRawMode(!0)),this.rawModeEnabledCount++;return}--this.rawModeEnabledCount===0&&(i.setRawMode(!1),i.removeListener("data",this.handleInput),i.pause());},this.handleInput=u=>{u===""&&this.props.exitOnCtrlC&&this.handleExit(),u===Cp&&this.state.activeFocusId&&this.setState({activeFocusId:void 0}),this.state.isFocusEnabled&&this.state.focusables.length>0&&(u===yp&&this.focusNext(),u===vp&&this.focusPrevious());},this.handleExit=u=>{this.isRawModeSupported()&&this.handleSetRawMode(!1),this.props.onExit(u);},this.enableFocus=()=>{this.setState({isFocusEnabled:!0});},this.disableFocus=()=>{this.setState({isFocusEnabled:!1});},this.focus=u=>{this.setState(i=>i.focusables.some(l=>(l==null?void 0:l.id)===u)?{activeFocusId:u}:i);},this.focusNext=()=>{this.setState(u=>{var i;const c=(i=u.focusables[0])==null?void 0:i.id;return {activeFocusId:this.findNextFocusable(u)||c}});},this.focusPrevious=()=>{this.setState(u=>{var i;const c=(i=u.focusables[u.focusables.length-1])==null?void 0:i.id;return {activeFocusId:this.findPreviousFocusable(u)||c}});},this.addFocusable=(u,{autoFocus:i})=>{this.setState(c=>{let l=c.activeFocusId;return !l&&i&&(l=u),{activeFocusId:l,focusables:[...c.focusables,{id:u,isActive:!0}]}});},this.removeFocusable=u=>{this.setState(i=>({activeFocusId:i.activeFocusId===u?void 0:i.activeFocusId,focusables:i.focusables.filter(c=>c.id!==u)}));},this.activateFocusable=u=>{this.setState(i=>({focusables:i.focusables.map(c=>c.id!==u?c:{id:u,isActive:!0})}));},this.deactivateFocusable=u=>{this.setState(i=>({activeFocusId:i.activeFocusId===u?void 0:i.activeFocusId,focusables:i.focusables.map(c=>c.id!==u?c:{id:u,isActive:!1})}));},this.findNextFocusable=u=>{var i;const c=u.focusables.findIndex(l=>l.id===u.activeFocusId);for(let l=c+1;l<u.focusables.length;l++)if((i=u.focusables[l])!=null&&i.isActive)return u.focusables[l].id},this.findPreviousFocusable=u=>{var i;const c=u.focusables.findIndex(l=>l.id===u.activeFocusId);for(let l=c-1;l>=0;l--)if((i=u.focusables[l])!=null&&i.isActive)return u.focusables[l].id};}static getDerivedStateFromError(u){return {error:u}}isRawModeSupported(){return this.props.stdin.isTTY}render(){return O$1.createElement(Pa.Provider,{value:{exit:this.handleExit}},O$1.createElement(La.Provider,{value:{stdin:this.props.stdin,setRawMode:this.handleSetRawMode,isRawModeSupported:this.isRawModeSupported(),internal_exitOnCtrlC:this.props.exitOnCtrlC}},O$1.createElement(Oa.Provider,{value:{stdout:this.props.stdout,write:this.props.writeToStdout}},O$1.createElement(Ma.Provider,{value:{stderr:this.props.stderr,write:this.props.writeToStderr}},O$1.createElement(za.Provider,{value:{activeId:this.state.activeFocusId,add:this.addFocusable,remove:this.removeFocusable,activate:this.activateFocusable,deactivate:this.deactivateFocusable,enableFocus:this.enableFocus,disableFocus:this.disableFocus,focusNext:this.focusNext,focusPrevious:this.focusPrevious,focus:this.focus}},this.state.error?O$1.createElement(Ep,{error:this.state.error}):this.props.children)))))}componentDidMount(){Qn.hide(this.props.stdout);}componentWillUnmount(){Qn.show(this.props.stdout),this.isRawModeSupported()&&this.handleSetRawMode(!1);}componentDidCatch(u){this.handleExit(u);}}Ga.displayName="InternalApp";const hn=process.env.CI==="false"?!1:Ud,ba=()=>{};class Fp{constructor(u){this.resolveExitPromise=()=>{},this.rejectExitPromise=()=>{},this.unsubscribeExit=()=>{},this.onRender=()=>{if(this.isUnmounted)return;const{output:i,outputHeight:c,staticOutput:l}=fp(this.rootNode,this.options.stdout.columns||80),f=l&&l!==`
`;if(this.options.debug){f&&(this.fullStaticOutput+=l),this.options.stdout.write(this.fullStaticOutput+i);return}if(hn){f&&this.options.stdout.write(l),this.lastOutput=i;return}if(f&&(this.fullStaticOutput+=l),c>=this.options.stdout.rows){this.options.stdout.write(Ui.clearTerminal+this.fullStaticOutput+i),this.lastOutput=i;return}f&&(this.log.clear(),this.options.stdout.write(l),this.log(i)),!f&&i!==this.lastOutput&&this.throttledLog(i),this.lastOutput=i;},Hd(this),this.options=u,this.rootNode=Ia("ink-root"),this.rootNode.onRender=u.debug?this.onRender:Ws(this.onRender,32,{leading:!0,trailing:!0}),this.rootNode.onImmediateRender=this.onRender,this.log=KD.create(u.stdout),this.throttledLog=u.debug?this.log:Ws(this.log,0,{leading:!0,trailing:!0}),this.isUnmounted=!1,this.lastOutput="",this.fullStaticOutput="",this.container=Do.createContainer(this.rootNode,0,!1,null),this.unsubscribeExit=Vt.exports(this.unmount,{alwaysLast:!1}),u.patchConsole&&this.patchConsole(),hn||(u.stdout.on("resize",this.onRender),this.unsubscribeResize=()=>{u.stdout.off("resize",this.onRender);});}render(u){const i=O$1.createElement(Ga,{stdin:this.options.stdin,stdout:this.options.stdout,stderr:this.options.stderr,writeToStdout:this.writeToStdout,writeToStderr:this.writeToStderr,exitOnCtrlC:this.options.exitOnCtrlC,onExit:this.unmount},u);Do.updateContainer(i,this.container,null,ba);}writeToStdout(u){if(!this.isUnmounted){if(this.options.debug){this.options.stdout.write(u+this.fullStaticOutput+this.lastOutput);return}if(hn){this.options.stdout.write(u);return}this.log.clear(),this.options.stdout.write(u),this.log(this.lastOutput);}}writeToStderr(u){if(!this.isUnmounted){if(this.options.debug){this.options.stderr.write(u),this.options.stdout.write(this.fullStaticOutput+this.lastOutput);return}if(hn){this.options.stderr.write(u);return}this.log.clear(),this.options.stderr.write(u),this.log(this.lastOutput);}}unmount(u){this.isUnmounted||(this.onRender(),this.unsubscribeExit(),typeof this.restoreConsole=="function"&&this.restoreConsole(),typeof this.unsubscribeResize=="function"&&this.unsubscribeResize(),hn?this.options.stdout.write(this.lastOutput+`
`):this.options.debug||this.log.done(),this.isUnmounted=!0,Do.updateContainer(null,this.container,null,ba),Zn.delete(this.options.stdout),u instanceof Error?this.rejectExitPromise(u):this.resolveExitPromise());}waitUntilExit(){return this.exitPromise||(this.exitPromise=new Promise((u,i)=>{this.resolveExitPromise=u,this.rejectExitPromise=i;})),this.exitPromise}clear(){!hn&&!this.options.debug&&this.log.clear();}patchConsole(){this.options.debug||(this.restoreConsole=OD((u,i)=>{u==="stdout"&&this.writeToStdout(i),u==="stderr"&&(i.startsWith("The above error occurred")||this.writeToStderr(i));}));}}var wp=Object.defineProperty,Va=Object.getOwnPropertySymbols,Sp=Object.prototype.hasOwnProperty,xp=Object.prototype.propertyIsEnumerable,qa=(r,u,i)=>u in r?wp(r,u,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[u]=i,_p=(r,u)=>{for(var i in u||(u={}))Sp.call(u,i)&&qa(r,i,u[i]);if(Va)for(var i of Va(u))xp.call(u,i)&&qa(r,i,u[i]);return r};const Ip=(r,u)=>{const i=_p({stdout:process.stdout,stdin:process.stdin,stderr:process.stderr,debug:!1,exitOnCtrlC:!0,patchConsole:!0},Rp(u)),c=kp(i.stdout,()=>new Fp(i));return c.render(r),{rerender:c.render,unmount:()=>c.unmount(),waitUntilExit:c.waitUntilExit,cleanup:()=>Zn.delete(i.stdout),clear:c.clear}},Rp=(r={})=>r instanceof require$$0$1.Stream?{stdout:r,stdin:process.stdin}:r,kp=(r,u)=>{let i;return Zn.has(r)?i=Zn.get(r):(i=u(),Zn.set(r,i)),i},Bp=({children:r})=>O$1.createElement(me,{flexDirection:"column"},r);function Tp(){return process__default["default"].platform!=="win32"?process__default["default"].env.TERM!=="linux":Boolean(process__default["default"].env.CI)||Boolean(process__default["default"].env.WT_SESSION)||process__default["default"].env.ConEmuTask==="{cmd::Cmder}"||process__default["default"].env.TERM_PROGRAM==="vscode"||process__default["default"].env.TERM==="xterm-256color"||process__default["default"].env.TERM==="alacritty"||process__default["default"].env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}const Np={arrowRight:"\u2192",tick:"\u2714",info:"\u2139",warning:"\u26A0",cross:"\u2716",squareSmallFilled:"\u25FC",pointer:"\u276F"},Ap={arrowRight:"\u2192",tick:"\u221A",info:"i",warning:"\u203C",cross:"\xD7",squareSmallFilled:"\u25A0",pointer:">"};var mn=Tp()?Np:Ap;const Pp=({spinner:r})=>{const[u,i]=$$3.exports.useState(0);return $$3.exports.useEffect(()=>{const c=setInterval(()=>{i(l=>l===r.frames.length-1?0:l+1);},r.interval);return ()=>{clearInterval(c);}},[r]),O$1.createElement(oe,null,r.frames[u])},Lp=r=>r==="warning"?O$1.createElement(oe,{color:"yellow"},mn.warning):r==="error"?O$1.createElement(oe,{color:"red"},mn.cross):r==="success"?O$1.createElement(oe,{color:"green"},mn.tick):r==="pending"?O$1.createElement(oe,{color:"gray"},mn.squareSmallFilled):" ",Op=r=>O$1.createElement(oe,{color:r==="error"?"red":"yellow"},mn.pointer),Mp=({label:r,state:u="pending",status:i,output:c,spinner:l,isExpanded:f,children:d})=>{const a=$$3.exports.Children.toArray(d).filter(h=>$$3.exports.isValidElement(h));let p=u==="loading"?O$1.createElement(oe,{color:"yellow"},O$1.createElement(Pp,{spinner:l})):Lp(u);return f&&(p=Op(u)),O$1.createElement(me,{flexDirection:"column"},O$1.createElement(me,null,O$1.createElement(me,{marginRight:1},O$1.createElement(oe,null,p)),O$1.createElement(oe,null,r),i?O$1.createElement(me,{marginLeft:1},O$1.createElement(oe,{dimColor:!0},"[",i,"]")):void 0),c?O$1.createElement(me,{marginLeft:2},O$1.createElement(oe,{color:"gray"},`${mn.arrowRight} ${c}`)):void 0,f&&a.length>0&&O$1.createElement(me,{flexDirection:"column",marginLeft:2},a))},zp={interval:80,frames:["\u280B","\u2819","\u2839","\u2838","\u283C","\u2834","\u2826","\u2827","\u2807","\u280F"]},Qa=({task:r})=>{const u=r.children.length>0?r.children.map((i,c)=>O$1.createElement(Qa,{key:c,task:i})):[];return O$1.createElement(Mp,{state:r.state,label:r.title,status:r.status,spinner:zp,output:r.output,isExpanded:u.length>0},u)},jp=({taskList:r})=>{const u=nd(r);return O$1.createElement(Bp,null,u.map((i,c)=>O$1.createElement(Qa,{key:c,task:i})))};function Up(r){const u=Ip(O$1.createElement(jp,{taskList:r}));return {remove(){u.rerender(null),u.unmount(),u.clear(),u.cleanup();}}}const ho=Symbol("run");var Wp=Object.defineProperty,Ya=Object.getOwnPropertySymbols,Hp=Object.prototype.hasOwnProperty,Gp=Object.prototype.propertyIsEnumerable,Ka=(r,u,i)=>u in r?Wp(r,u,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[u]=i,bp=(r,u)=>{for(var i in u||(u={}))Hp.call(u,i)&&Ka(r,i,u[i]);if(Ya)for(var i of Ya(u))Gp.call(u,i)&&Ka(r,i,u[i]);return r};const Vp=r=>{const u={task:$a(r.children),setTitle(i){r.title=i;},setStatus(i){r.status=i;},setOutput(i){r.output=typeof i=="string"?i:"message"in i?i.message:"";},setWarning(i){r.state="warning",i!==void 0&&u.setOutput(i);},setError(i){r.state="error",i!==void 0&&u.setOutput(i);}};return u};let pu;function Xa(r,u,i){pu||(pu=Up(r),r.isRoot=!0);const c=fd(r,{title:u,state:"pending",children:[]});return {task:c,async[ho](){const l=Vp(c);c.state="loading";let f;try{f=await i(l);}catch(d){throw l.setError(d),d}return c.state==="loading"&&(c.state="success"),f},clear(){dd(r,c),r.isRoot&&r.length===0&&(pu.remove(),pu=void 0);}}}function $a(r){const u=async(i,c)=>{const l=Xa(r,i,c);return {result:await l[ho](),get state(){return l.task.state},clear:l.clear}};return u.group=async(i,c)=>{const l=i((d,a)=>Xa(r,d,a)),f=await cd(l,async d=>({result:await d[ho](),get state(){return d.task.state},clear:d.clear}),bp({concurrency:1},c));return Object.assign(f,{clear(){for(const d of l)d.clear();}})},u}const qp=Ps([]);var Qp=$a(qp);

var P$2=/-(\w)/g,m$1=t=>t.replace(P$2,(e,r)=>r.toUpperCase()),$$2=/\B([A-Z])/g,j$2=t=>t.replace($$2,"-$1").toLowerCase(),{stringify:u}=JSON,{hasOwnProperty:I$1}=Object.prototype,F$1=(t,e)=>I$1.call(t,e),D$1=/^--?/,K$2=/[.:=]/,C$1=t=>{let e=t.replace(D$1,""),r,n=e.match(K$2);if(n==null?void 0:n.index){let s=n.index;r=e.slice(s+1),e=e.slice(0,s);}return {flagName:e,flagValue:r}},L$2=/[\s.:=]/,M$2=(t,e)=>{let r=`Invalid flag name ${u(e)}:`;if(e.length===0)throw new Error(`${r} flag name cannot be empty}`);if(e.length===1)throw new Error(`${r} single characters are reserved for aliases`);let n=e.match(L$2);if(n)throw new Error(`${r} flag name cannot contain the character ${u(n==null?void 0:n[0])}`);let s;if(P$2.test(e)?s=m$1(e):$$2.test(e)&&(s=j$2(e)),s&&F$1(t,s))throw new Error(`${r} collides with flag ${u(s)}`)};function E(t){let e=new Map;for(let r in t){if(!F$1(t,r))continue;M$2(t,r);let n=t[r];if(n&&typeof n=="object"){let{alias:s}=n;if(typeof s=="string"){if(s.length===0)throw new Error(`Invalid flag alias ${u(r)}: flag alias cannot be empty`);if(s.length>1)throw new Error(`Invalid flag alias ${u(r)}: flag aliases can only be a single-character`);if(e.has(s))throw new Error(`Flag collision: Alias "${s}" is already used`);e.set(s,{name:r,schema:n});}}}return e}var R$2=t=>!t||typeof t=="function"?!1:Array.isArray(t)||Array.isArray(t.type),v$2=t=>{let e={};for(let r in t)F$1(t,r)&&(e[r]=R$2(t[r])?[]:void 0);return e},h=(t,e)=>t===Number&&e===""?Number.NaN:t===Boolean?e!=="false":e,_$1=(t,e)=>{for(let r in t){if(!F$1(t,r))continue;let n=t[r];if(!n)continue;let s=e[r];if(!(s!==void 0&&!(Array.isArray(s)&&s.length===0))&&"default"in n){let g=n.default;typeof g=="function"&&(g=g()),e[r]=g;}}},A$1=(t,e)=>{if(!e)throw new Error(`Missing type on flag "${t}"`);return typeof e=="function"?e:Array.isArray(e)?e[0]:A$1(t,e.type)};var z$2=/^-[\da-z]+/i,B=/^--[\w-]{2,}/,x$2="--";function U$2(t,e=process.argv.slice(2)){let r=E(t),n={flags:v$2(t),unknownFlags:{},_:Object.assign([],{[x$2]:[]})},s,g=(a,o,i)=>{let l=A$1(a,o);i=h(l,i),i!==void 0&&!Number.isNaN(i)?Array.isArray(n.flags[a])?n.flags[a].push(l(i)):n.flags[a]=l(i):s=c=>{Array.isArray(n.flags[a])?n.flags[a].push(l(h(l,c||""))):n.flags[a]=l(h(l,c||"")),s=void 0;};},S=(a,o)=>{a in n.unknownFlags||(n.unknownFlags[a]=[]),o!==void 0?n.unknownFlags[a].push(o):s=(i=!0)=>{n.unknownFlags[a].push(i),s=void 0;};};for(let a=0;a<e.length;a+=1){let o=e[a];if(o===x$2){let c=e.slice(a+1);n._[x$2]=c,n._.push(...c);break}let i=z$2.test(o);if(B.test(o)||i){s&&s();let c=C$1(o),{flagValue:d}=c,{flagName:f}=c;if(i){for(let y=0;y<f.length;y+=1){let b=f[y],w=r.get(b),T=y===f.length-1;w?g(w.name,w.schema,T?d:!0):S(b,T?d:!0);}continue}let p=t[f];if(!p){let y=m$1(f);p=t[y],p&&(f=y);}if(!p){S(f,d);continue}g(f,p,d);}else s?s(o):n._.push(o);}return s&&s(),_$1(t,n.flags),n}

var DD=Object.create;var m=Object.defineProperty,uD=Object.defineProperties,FD=Object.getOwnPropertyDescriptor,CD=Object.getOwnPropertyDescriptors,tD=Object.getOwnPropertyNames,I=Object.getOwnPropertySymbols,ED=Object.getPrototypeOf,L$1=Object.prototype.hasOwnProperty,eD=Object.prototype.propertyIsEnumerable;var W$1=(D,F,u)=>F in D?m(D,F,{enumerable:!0,configurable:!0,writable:!0,value:u}):D[F]=u,p$1=(D,F)=>{for(var u in F||(F={}))L$1.call(F,u)&&W$1(D,u,F[u]);if(I)for(var u of I(F))eD.call(F,u)&&W$1(D,u,F[u]);return D},c=(D,F)=>uD(D,CD(F)),nD=D=>m(D,"__esModule",{value:!0});var rD=(D,F)=>()=>(D&&(F=D(D=0)),F);var iD=(D,F)=>()=>(F||D((F={exports:{}}).exports,F),F.exports);var oD=(D,F,u,C)=>{if(F&&typeof F=="object"||typeof F=="function")for(let t of tD(F))!L$1.call(D,t)&&(u||t!=="default")&&m(D,t,{get:()=>F[t],enumerable:!(C=FD(F,t))||C.enumerable});return D},BD=(D,F)=>oD(nD(m(D!=null?DD(ED(D)):{},"default",!F&&D&&D.__esModule?{get:()=>D.default,enumerable:!0}:{value:D,enumerable:!0})),D);var i=rD(()=>{});var $$1=iD((LD,N)=>{i();N.exports=function(){return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g};});i();i();i();var v$1=D=>{var u,C,t;let F=(u=process.stdout.columns)!=null?u:Number.POSITIVE_INFINITY;return typeof D=="function"&&(D=D(F)),D||(D={}),Array.isArray(D)?{columns:D,stdoutColumns:F}:{columns:(C=D.columns)!=null?C:[],stdoutColumns:(t=D.stdoutColumns)!=null?t:F}};i();i();i();i();i();function w$1({onlyFirst:D=!1}={}){let F=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(F,D?void 0:"g")}function d$1(D){if(typeof D!="string")throw new TypeError(`Expected a \`string\`, got \`${typeof D}\``);return D.replace(w$1(),"")}i();function y(D){return Number.isInteger(D)?D>=4352&&(D<=4447||D===9001||D===9002||11904<=D&&D<=12871&&D!==12351||12880<=D&&D<=19903||19968<=D&&D<=42182||43360<=D&&D<=43388||44032<=D&&D<=55203||63744<=D&&D<=64255||65040<=D&&D<=65049||65072<=D&&D<=65131||65281<=D&&D<=65376||65504<=D&&D<=65510||110592<=D&&D<=110593||127488<=D&&D<=127569||131072<=D&&D<=262141):!1}var j$1=BD($$1(),1);function g(D){if(typeof D!="string"||D.length===0||(D=d$1(D),D.length===0))return 0;D=D.replace((0, j$1.default)(),"  ");let F=0;for(let u=0;u<D.length;u++){let C=D.codePointAt(u);C<=31||C>=127&&C<=159||C>=768&&C<=879||(C>65535&&u++,F+=y(C)?2:1);}return F}var b$1=D=>Math.max(...D.split(`
`).map(g));var k$1=D=>{let F=[];for(let u of D){let{length:C}=u,t=C-F.length;for(let E=0;E<t;E+=1)F.push(0);for(let E=0;E<C;E+=1){let e=b$1(u[E]);e>F[E]&&(F[E]=e);}}return F};i();var _=/^\d+%$/,z$1={width:"auto",align:"left",contentWidth:0,paddingLeft:0,paddingRight:0,paddingTop:0,paddingBottom:0,horizontalPadding:0,paddingLeftString:"",paddingRightString:""},sD=(D,F)=>{var C;let u=[];for(let t=0;t<D.length;t+=1){let E=(C=F[t])!=null?C:"auto";if(typeof E=="number"||E==="auto"||E==="content-width"||typeof E=="string"&&_.test(E)){u.push(c(p$1({},z$1),{width:E,contentWidth:D[t]}));continue}if(E&&typeof E=="object"){let e=c(p$1(p$1({},z$1),E),{contentWidth:D[t]});e.horizontalPadding=e.paddingLeft+e.paddingRight,u.push(e);continue}throw new Error(`Invalid column width: ${JSON.stringify(E)}`)}return u};function aD(D,F){for(let u of D){let{width:C}=u;if(C==="content-width"&&(u.width=u.contentWidth),C==="auto"){let n=Math.min(20,u.contentWidth);u.width=n,u.autoOverflow=u.contentWidth-n;}if(typeof C=="string"&&_.test(C)){let n=Number.parseFloat(C.slice(0,-1))/100;u.width=Math.floor(F*n)-(u.paddingLeft+u.paddingRight);}let{horizontalPadding:t}=u,E=1,e=E+t;if(e>=F){let n=e-F,o=Math.ceil(u.paddingLeft/t*n),B=n-o;u.paddingLeft-=o,u.paddingRight-=B,u.horizontalPadding=u.paddingLeft+u.paddingRight;}u.paddingLeftString=u.paddingLeft?" ".repeat(u.paddingLeft):"",u.paddingRightString=u.paddingRight?" ".repeat(u.paddingRight):"";let r=F-u.horizontalPadding;u.width=Math.max(Math.min(u.width,r),E);}}var G$1=()=>Object.assign([],{columns:0});function lD(D,F){let u=[G$1()],[C]=u;for(let t of D){let E=t.width+t.horizontalPadding;C.columns+E>F&&(C=G$1(),u.push(C)),C.push(t),C.columns+=E;}for(let t of u){let E=t.reduce((s,l)=>s+l.width+l.horizontalPadding,0),e=F-E;if(e===0)continue;let r=t.filter(s=>"autoOverflow"in s),n=r.filter(s=>s.autoOverflow>0),o=n.reduce((s,l)=>s+l.autoOverflow,0),B=Math.min(o,e);for(let s of n){let l=Math.floor(s.autoOverflow/o*B);s.width+=l,e-=l;}let a=Math.floor(e/r.length);for(let s=0;s<r.length;s+=1){let l=r[s];s===r.length-1?l.width+=e:l.width+=a,e-=a;}}return u}function Z$1(D,F,u){let C=sD(u,F);return aD(C,D),lD(C,D)}i();i();i();var O=10,U$1=(D=0)=>F=>`[${F+D}m`,V$1=(D=0)=>F=>`[${38+D};5;${F}m`,Y$1=(D=0)=>(F,u,C)=>`[${38+D};2;${F};${u};${C}m`;function AD(){let D=new Map,F={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};F.color.gray=F.color.blackBright,F.bgColor.bgGray=F.bgColor.bgBlackBright,F.color.grey=F.color.blackBright,F.bgColor.bgGrey=F.bgColor.bgBlackBright;for(let[u,C]of Object.entries(F)){for(let[t,E]of Object.entries(C))F[t]={open:`[${E[0]}m`,close:`[${E[1]}m`},C[t]=F[t],D.set(E[0],E[1]);Object.defineProperty(F,u,{value:C,enumerable:!1});}return Object.defineProperty(F,"codes",{value:D,enumerable:!1}),F.color.close="[39m",F.bgColor.close="[49m",F.color.ansi=U$1(),F.color.ansi256=V$1(),F.color.ansi16m=Y$1(),F.bgColor.ansi=U$1(O),F.bgColor.ansi256=V$1(O),F.bgColor.ansi16m=Y$1(O),Object.defineProperties(F,{rgbToAnsi256:{value:(u,C,t)=>u===C&&C===t?u<8?16:u>248?231:Math.round((u-8)/247*24)+232:16+36*Math.round(u/255*5)+6*Math.round(C/255*5)+Math.round(t/255*5),enumerable:!1},hexToRgb:{value:u=>{let C=/(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(u.toString(16));if(!C)return [0,0,0];let{colorString:t}=C.groups;t.length===3&&(t=t.split("").map(e=>e+e).join(""));let E=Number.parseInt(t,16);return [E>>16&255,E>>8&255,E&255]},enumerable:!1},hexToAnsi256:{value:u=>F.rgbToAnsi256(...F.hexToRgb(u)),enumerable:!1},ansi256ToAnsi:{value:u=>{if(u<8)return 30+u;if(u<16)return 90+(u-8);let C,t,E;if(u>=232)C=((u-232)*10+8)/255,t=C,E=C;else {u-=16;let n=u%36;C=Math.floor(u/36)/5,t=Math.floor(n/6)/5,E=n%6/5;}let e=Math.max(C,t,E)*2;if(e===0)return 30;let r=30+(Math.round(E)<<2|Math.round(t)<<1|Math.round(C));return e===2&&(r+=60),r},enumerable:!1},rgbToAnsi:{value:(u,C,t)=>F.ansi256ToAnsi(F.rgbToAnsi256(u,C,t)),enumerable:!1},hexToAnsi:{value:u=>F.ansi256ToAnsi(F.hexToAnsi256(u)),enumerable:!1}}),F}var fD=AD(),K$1=fD;var x$1=new Set(["","\x9B"]),gD=39,R$1="\x07",q="[",pD="]",H$1="m",M$1=`${pD}8;;`,J$1=D=>`${x$1.values().next().value}${q}${D}${H$1}`,Q$1=D=>`${x$1.values().next().value}${M$1}${D}${R$1}`,hD=D=>D.split(" ").map(F=>g(F)),S=(D,F,u)=>{let C=[...F],t=!1,E=!1,e=g(d$1(D[D.length-1]));for(let[r,n]of C.entries()){let o=g(n);if(e+o<=u?D[D.length-1]+=n:(D.push(n),e=0),x$1.has(n)&&(t=!0,E=C.slice(r+1).join("").startsWith(M$1)),t){E?n===R$1&&(t=!1,E=!1):n===H$1&&(t=!1);continue}e+=o,e===u&&r<C.length-1&&(D.push(""),e=0);}!e&&D[D.length-1].length>0&&D.length>1&&(D[D.length-2]+=D.pop());},cD=D=>{let F=D.split(" "),u=F.length;for(;u>0&&!(g(F[u-1])>0);)u--;return u===F.length?D:F.slice(0,u).join(" ")+F.slice(u).join("")},dD=(D,F,u={})=>{if(u.trim!==!1&&D.trim()==="")return "";let C="",t,E,e=hD(D),r=[""];for(let[o,B]of D.split(" ").entries()){u.trim!==!1&&(r[r.length-1]=r[r.length-1].trimStart());let a=g(r[r.length-1]);if(o!==0&&(a>=F&&(u.wordWrap===!1||u.trim===!1)&&(r.push(""),a=0),(a>0||u.trim===!1)&&(r[r.length-1]+=" ",a++)),u.hard&&e[o]>F){let s=F-a,l=1+Math.floor((e[o]-s-1)/F);Math.floor((e[o]-1)/F)<l&&r.push(""),S(r,B,F);continue}if(a+e[o]>F&&a>0&&e[o]>0){if(u.wordWrap===!1&&a<F){S(r,B,F);continue}r.push("");}if(a+e[o]>F&&u.wordWrap===!1){S(r,B,F);continue}r[r.length-1]+=B;}u.trim!==!1&&(r=r.map(o=>cD(o)));let n=[...r.join(`
`)];for(let[o,B]of n.entries()){if(C+=B,x$1.has(B)){let{groups:s}=new RegExp(`(?:\\${q}(?<code>\\d+)m|\\${M$1}(?<uri>.*)${R$1})`).exec(n.slice(o).join(""))||{groups:{}};if(s.code!==void 0){let l=Number.parseFloat(s.code);t=l===gD?void 0:l;}else s.uri!==void 0&&(E=s.uri.length===0?void 0:s.uri);}let a=K$1.codes.get(Number(t));n[o+1]===`
`?(E&&(C+=Q$1("")),t&&a&&(C+=J$1(a))):B===`
`&&(t&&a&&(C+=J$1(t)),E&&(C+=Q$1(E)));}return C};function T$1(D,F,u){return String(D).normalize().replace(/\r\n/g,`
`).split(`
`).map(C=>dD(C,F,u)).join(`
`)}var X$1=D=>Array.from({length:D}).fill("");function P$1(D,F){let u=[],C=0;for(let t of D){let E=0,e=t.map(n=>{var a;let o=(a=F[C])!=null?a:"";C+=1,n.preprocess&&(o=n.preprocess(o)),b$1(o)>n.width&&(o=T$1(o,n.width,{hard:!0}));let B=o.split(`
`);if(n.postprocess){let{postprocess:s}=n;B=B.map((l,h)=>s.call(n,l,h));}return n.paddingTop&&B.unshift(...X$1(n.paddingTop)),n.paddingBottom&&B.push(...X$1(n.paddingBottom)),B.length>E&&(E=B.length),c(p$1({},n),{lines:B})}),r=[];for(let n=0;n<E;n+=1){let o=e.map(B=>{var h;let a=(h=B.lines[n])!=null?h:"",s=Number.isFinite(B.width)?" ".repeat(B.width-g(a)):"",l=B.paddingLeftString;return B.align==="right"&&(l+=s),l+=a,B.align==="left"&&(l+=s),l+B.paddingRightString}).join("");r.push(o);}u.push(r.join(`
`));}return u.join(`
`)}function mD(D,F){if(!D||D.length===0)return "";let u=k$1(D),C=u.length;if(C===0)return "";let{stdoutColumns:t,columns:E}=v$1(F);if(E.length>C)throw new Error(`${E.length} columns defined, but only ${C} columns found`);let e=Z$1(t,E,u);return D.map(r=>P$1(e,r)).join(`
`)}i();var bD=["<",">","=",">=","<="];function xD(D){if(!bD.includes(D))throw new TypeError(`Invalid breakpoint operator: ${D}`)}function wD(D){let F=Object.keys(D).map(u=>{let[C,t]=u.split(" ");xD(C);let E=Number.parseInt(t,10);if(Number.isNaN(E))throw new TypeError(`Invalid breakpoint value: ${t}`);let e=D[u];return {operator:C,breakpoint:E,value:e}}).sort((u,C)=>C.breakpoint-u.breakpoint);return u=>{var C;return (C=F.find(({operator:t,breakpoint:E})=>t==="="&&u===E||t===">"&&u>E||t==="<"&&u<E||t===">="&&u>=E||t==="<="&&u<=E))==null?void 0:C.value}}

const D=r=>r.replace(/[-_ ](\w)/g,(e,t)=>t.toUpperCase()),R=r=>r.replace(/\B([A-Z])/g,"-$1").toLowerCase(),L={"> 80":[{width:"content-width",paddingLeft:2,paddingRight:8},{width:"auto"}],"> 40":[{width:"auto",paddingLeft:2,paddingRight:8,preprocess:r=>r.trim()},{width:"100%",paddingLeft:2,paddingBottom:1}],"> 0":{stdoutColumns:1e3,columns:[{width:"content-width",paddingLeft:2,paddingRight:8},{width:"content-width"}]}};function T(r){let e=!1;const n=Object.keys(r).sort((a,i)=>a.localeCompare(i)).map(a=>{const i=r[a],s="alias"in i;return s&&(e=!0),{name:a,flag:i,flagFormatted:`--${R(a)}`,aliasesEnabled:e,aliasFormatted:s?`-${i.alias}`:void 0}}).map(a=>(a.aliasesEnabled=e,[{type:"flagName",data:a},{type:"flagDescription",data:a}]));return {type:"table",data:{tableData:n,tableBreakpoints:L}}}const P=r=>{var e;return !r||((e=r.version)!=null?e:r.help?r.help.version:void 0)},C=r=>{var e;const t="parent"in r&&((e=r.parent)==null?void 0:e.name);return (t?`${t} `:"")+r.name};function F(r){var e;const t=[];r.name&&t.push(C(r));const n=(e=P(r))!=null?e:"parent"in r&&P(r.parent);if(n&&t.push(`v${n}`),t.length!==0)return {id:"name",type:"text",data:`${t.join(" ")}
`}}function H(r){const{help:e}=r;if(!(!e||!e.description))return {id:"description",type:"text",data:`${e.description}
`}}function U(r){var e;const t=r.help||{};if("usage"in t)return t.usage?{id:"usage",type:"section",data:{title:"Usage:",body:Array.isArray(t.usage)?t.usage.join(`
`):t.usage}}:void 0;if(r.name){const n=[],a=[C(r)];if(r.flags&&Object.keys(r.flags).length>0&&a.push("[flags...]"),r.parameters&&r.parameters.length>0){const{parameters:i}=r,s=i.indexOf("--"),l=s>-1&&i.slice(s+1).some(o=>o.startsWith("<"));a.push(i.map(o=>o!=="--"?o:l?"--":"[--]").join(" "));}if(a.length>1&&n.push(a.join(" ")),"commands"in r&&((e=r.commands)==null?void 0:e.length)&&n.push(`${r.name} <command>`),n.length>0)return {id:"usage",type:"section",data:{title:"Usage:",body:n.join(`
`)}}}}function V(r){var e;if(!("commands"in r)||!((e=r.commands)!=null&&e.length))return;const t=r.commands.map(a=>[a.options.name,a.options.help?a.options.help.description:""]);return {id:"commands",type:"section",data:{title:"Commands:",body:{type:"table",data:{tableData:t,tableOptions:[{width:"content-width",paddingLeft:2,paddingRight:8}]}},indentBody:0}}}function J(r){if(!(!r.flags||Object.keys(r.flags).length===0))return {id:"flags",type:"section",data:{title:"Flags:",body:T(r.flags),indentBody:0}}}function M(r){const{help:e}=r;if(!e||!e.examples||e.examples.length===0)return;let{examples:t}=e;if(Array.isArray(t)&&(t=t.join(`
`)),t)return {id:"examples",type:"section",data:{title:"Examples:",body:t}}}function k(r){if(!("alias"in r)||!r.alias)return;const{alias:e}=r,t=Array.isArray(e)?e.join(", "):e;return {id:"aliases",type:"section",data:{title:"Aliases:",body:t}}}const W=r=>[F,H,U,V,J,M,k].map(e=>e(r)).filter(e=>Boolean(e)),Z=Tf__default["default"].WriteStream.prototype.hasColors();class z{text(e){return e}bold(e){return Z?`\x1B[1m${e}\x1B[22m`:e.toLocaleUpperCase()}indentText({text:e,spaces:t}){return e.replace(/^/gm," ".repeat(t))}heading(e){return this.bold(e)}section({title:e,body:t,indentBody:n=2}){return `${(e?`${this.heading(e)}
`:"")+(t?this.indentText({text:this.render(t),spaces:n}):"")}
`}table({tableData:e,tableOptions:t,tableBreakpoints:n}){return mD(e.map(a=>a.map(i=>this.render(i))),n?wD(n):t)}flagParameter(e){return e===Boolean?"":e===String?"<string>":e===Number?"<number>":Array.isArray(e)?this.flagParameter(e[0]):"<value>"}flagOperator(e){return " "}flagName(e){const{flag:t,flagFormatted:n,aliasesEnabled:a,aliasFormatted:i}=e;let s="";if(i?s+=`${i}, `:a&&(s+="    "),s+=n,"placeholder"in t&&typeof t.placeholder=="string")s+=`${this.flagOperator(e)}${t.placeholder}`;else {const l=this.flagParameter("type"in t?t.type:t);l&&(s+=`${this.flagOperator(e)}${l}`);}return s}flagDefault(e){return JSON.stringify(e)}flagDescription({flag:e}){var t;let n="description"in e&&(t=e.description)!=null?t:"";if("default"in e){let{default:a}=e;typeof a=="function"&&(a=a()),a&&(n+=` (default: ${this.flagDefault(a)})`);}return n}render(e){if(typeof e=="string")return e;if(Array.isArray(e))return e.map(t=>this.render(t)).join(`
`);if("type"in e&&this[e.type]){const t=this[e.type];if(typeof t=="function")return t.call(this,e.data)}throw new Error(`Invalid node type: ${JSON.stringify(e)}`)}}const w=/^[\w.-]+$/;var G=Object.defineProperty,K=Object.defineProperties,Q=Object.getOwnPropertyDescriptors,x=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable,A=(r,e,t)=>e in r?G(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,p=(r,e)=>{for(var t in e||(e={}))X.call(e,t)&&A(r,t,e[t]);if(x)for(var t of x(e))Y.call(e,t)&&A(r,t,e[t]);return r},v=(r,e)=>K(r,Q(e));const{stringify:d}=JSON,ee=/[|\\{}()[\]^$+*?.]/;function b(r){const e=[];let t,n;for(const a of r){if(n)throw new Error(`Invalid parameter: Spread parameter ${d(n)} must be last`);const i=a[0],s=a[a.length-1];let l;if(i==="<"&&s===">"&&(l=!0,t))throw new Error(`Invalid parameter: Required parameter ${d(a)} cannot come after optional parameter ${d(t)}`);if(i==="["&&s==="]"&&(l=!1,t=a),l===void 0)throw new Error(`Invalid parameter: ${d(a)}. Must be wrapped in <> (required parameter) or [] (optional parameter)`);let o=a.slice(1,-1);const f=o.slice(-3)==="...";f&&(n=a,o=o.slice(0,-3));const u=o.match(ee);if(u)throw new Error(`Invalid parameter: ${d(a)}. Invalid character found ${d(u[0])}`);e.push({name:o,required:l,spread:f});}return e}function $(r,e,t,n){for(let a=0;a<e.length;a+=1){const{name:i,required:s,spread:l}=e[a],o=D(i);if(o in r)throw new Error(`Invalid parameter: ${d(i)} is used more than once.`);const f=l?t.slice(a):t[a];if(l&&(a=e.length),s&&(!f||l&&f.length===0))return console.error(`Error: Missing required parameter ${d(i)}
`),n(),process.exit(1);r[o]=f;}}function re(r){return r===void 0||r!==!1}function j(r,e,t,n){const a=p({},e.flags),i=e.version;i&&(a.version={type:Boolean,description:"Show version"});const{help:s}=e,l=re(s);l&&!("help"in a)&&(a.help={type:Boolean,alias:"h",description:"Show help"});const o=U$2(a,n),f=()=>{console.log(e.version);};if(i&&o.flags.version===!0)return f(),process.exit(0);const u=new z,N=l&&(s==null?void 0:s.render)?s.render:c=>u.render(c),h=c=>{const m=W(v(p(p({},e),c?{help:c}:{}),{flags:a}));console.log(N(m,u));};if(l&&o.flags.help===!0)return h(),process.exit(0);if(e.parameters){let{parameters:c}=e,m=o._;const y=c.indexOf("--"),O=c.slice(y+1),g=Object.create(null);if(y>-1&&O.length>0){c=c.slice(0,y);const E=o._["--"];m=m.slice(0,-E.length||void 0),$(g,b(c),m,h),$(g,b(O),E,h);}else $(g,b(c),m,h);Object.assign(o._,g);}const _=v(p({},o),{showVersion:f,showHelp:h});return typeof t=="function"&&t(_),p({command:r},_)}function te(r,e){const t=new Map;for(const n of e){const a=[n.options.name],{alias:i}=n.options;i&&(Array.isArray(i)?a.push(...i):a.push(i));for(const s of a){if(t.has(s))throw new Error(`Duplicate command name found: ${d(s)}`);t.set(s,n);}}return t.get(r)}function ae(r,e,t=process.argv.slice(2)){if(!r)throw new Error("Options is required");if("name"in r&&(!r.name||!w.test(r.name)))throw new Error(`Invalid script name: ${d(r.name)}`);const n=t[0];if(r.commands&&w.test(n)){const a=te(n,r.commands);if(a)return j(a.options.name,v(p({},a.options),{parent:r}),a.callback,t.slice(1))}return j(void 0,r,e,t)}

// pass in a manifest with a 'bin' field here, and it'll turn it
// into a properly santized bin object
const {join, basename} = path__default["default"];

const normalize = pkg =>
  !pkg.bin ? removeBin(pkg)
  : typeof pkg.bin === 'string' ? normalizeString(pkg)
  : Array.isArray(pkg.bin) ? normalizeArray(pkg)
  : typeof pkg.bin === 'object' ? normalizeObject(pkg)
  : removeBin(pkg);

const normalizeString = pkg => {
  if (!pkg.name)
    return removeBin(pkg)
  pkg.bin = { [pkg.name]: pkg.bin };
  return normalizeObject(pkg)
};

const normalizeArray = pkg => {
  pkg.bin = pkg.bin.reduce((acc, k) => {
    acc[basename(k)] = k;
    return acc
  }, {});
  return normalizeObject(pkg)
};

const removeBin = pkg => {
  delete pkg.bin;
  return pkg
};

const normalizeObject = pkg => {
  const orig = pkg.bin;
  const clean = {};
  let hasBins = false;
  Object.keys(orig).forEach(binKey => {
    const base = join('/', basename(binKey.replace(/\\|:/g, '/'))).substr(1);

    if (typeof orig[binKey] !== 'string' || !base)
      return

    const binTarget = join('/', orig[binKey])
      .replace(/\\/g, '/').substr(1);

    if (!binTarget)
      return

    clean[base] = binTarget;
    hasBins = true;
  });

  if (hasBins)
    pkg.bin = clean;
  else
    delete pkg.bin;

  return pkg
};

var npmNormalizePackageBin = normalize;

// walk the tree of deps starting from the top level list of bundled deps
// Any deps at the top level that are depended on by a bundled dep that
// does not have that dep in its own node_modules folder are considered
// bundled deps as well.  This list of names can be passed to npm-packlist
// as the "bundled" argument.  Additionally, packageJsonCache is shared so
// packlist doesn't have to re-read files already consumed in this pass

const fs$5 = require$$0__default["default"];
const path$5 = path__default["default"];
const EE$1 = require$$2__default["default"].EventEmitter;
// we don't care about the package bins, but we share a pj cache
// with other modules that DO care about it, so keep it nice.
const normalizePackageBin$1 = npmNormalizePackageBin;

class BundleWalker$1 extends EE$1 {
  constructor (opt) {
    opt = opt || {};
    super(opt);
    this.path = path$5.resolve(opt.path || process.cwd());

    this.parent = opt.parent || null;
    if (this.parent) {
      this.result = this.parent.result;
      // only collect results in node_modules folders at the top level
      // since the node_modules in a bundled dep is included always
      if (!this.parent.parent) {
        const base = path$5.basename(this.path);
        const scope = path$5.basename(path$5.dirname(this.path));
        this.result.add(/^@/.test(scope) ? scope + '/' + base : base);
      }
      this.root = this.parent.root;
      this.packageJsonCache = this.parent.packageJsonCache;
    } else {
      this.result = new Set();
      this.root = this.path;
      this.packageJsonCache = opt.packageJsonCache || new Map();
    }

    this.seen = new Set();
    this.didDone = false;
    this.children = 0;
    this.node_modules = [];
    this.package = null;
    this.bundle = null;
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    const ret = super.on(ev, fn);
    if (ev === 'done' && this.didDone) {
      this.emit('done', this.result);
    }
    return ret
  }

  done () {
    if (!this.didDone) {
      this.didDone = true;
      if (!this.parent) {
        const res = Array.from(this.result);
        this.result = res;
        this.emit('done', res);
      } else {
        this.emit('done');
      }
    }
  }

  start () {
    const pj = path$5.resolve(this.path, 'package.json');
    if (this.packageJsonCache.has(pj))
      this.onPackage(this.packageJsonCache.get(pj));
    else
      this.readPackageJson(pj);
    return this
  }

  readPackageJson (pj) {
    fs$5.readFile(pj, (er, data) =>
      er ? this.done() : this.onPackageJson(pj, data));
  }

  onPackageJson (pj, data) {
    try {
      this.package = normalizePackageBin$1(JSON.parse(data + ''));
    } catch (er) {
      return this.done()
    }
    this.packageJsonCache.set(pj, this.package);
    this.onPackage(this.package);
  }

  allDepsBundled (pkg) {
    return Object.keys(pkg.dependencies || {}).concat(
      Object.keys(pkg.optionalDependencies || {}))
  }

  onPackage (pkg) {
    // all deps are bundled if we got here as a child.
    // otherwise, only bundle bundledDeps
    // Get a unique-ified array with a short-lived Set
    const bdRaw = this.parent ? this.allDepsBundled(pkg)
      : pkg.bundleDependencies || pkg.bundledDependencies || [];

    const bd = Array.from(new Set(
      Array.isArray(bdRaw) ? bdRaw
      : bdRaw === true ? this.allDepsBundled(pkg)
      : Object.keys(bdRaw)));

    if (!bd.length)
      return this.done()

    this.bundle = bd;
    this.path + '/node_modules';
    this.readModules();
  }

  readModules () {
    readdirNodeModules(this.path + '/node_modules', (er, nm) =>
      er ? this.onReaddir([]) : this.onReaddir(nm));
  }

  onReaddir (nm) {
    // keep track of what we have, in case children need it
    this.node_modules = nm;

    this.bundle.forEach(dep => this.childDep(dep));
    if (this.children === 0)
      this.done();
  }

  childDep (dep) {
    if (this.node_modules.indexOf(dep) !== -1) {
      if (!this.seen.has(dep)) {
        this.seen.add(dep);
        this.child(dep);
      }
    } else if (this.parent) {
      this.parent.childDep(dep);
    }
  }

  child (dep) {
    const p = this.path + '/node_modules/' + dep;
    this.children += 1;
    const child = new BundleWalker$1({
      path: p,
      parent: this
    });
    child.on('done', _ => {
      if (--this.children === 0)
        this.done();
    });
    child.start();
  }
}

class BundleWalkerSync extends BundleWalker$1 {
  constructor (opt) {
    super(opt);
  }

  start () {
    super.start();
    this.done();
    return this
  }

  readPackageJson (pj) {
    try {
      this.onPackageJson(pj, fs$5.readFileSync(pj));
    } catch (er) {}
    return this
  }

  readModules () {
    try {
      this.onReaddir(readdirNodeModulesSync(this.path + '/node_modules'));
    } catch (er) {
      this.onReaddir([]);
    }
  }

  child (dep) {
    new BundleWalkerSync({
      path: this.path + '/node_modules/' + dep,
      parent: this
    }).start();
  }
}

const readdirNodeModules = (nm, cb) => {
  fs$5.readdir(nm, (er, set) => {
    if (er)
      cb(er);
    else {
      const scopes = set.filter(f => /^@/.test(f));
      if (!scopes.length)
        cb(null, set);
      else {
        const unscoped = set.filter(f => !/^@/.test(f));
        let count = scopes.length;
        scopes.forEach(scope => {
          fs$5.readdir(nm + '/' + scope, (er, pkgs) => {
            if (er || !pkgs.length)
              unscoped.push(scope);
            else
              unscoped.push.apply(unscoped, pkgs.map(p => scope + '/' + p));
            if (--count === 0)
              cb(null, unscoped);
          });
        });
      }
    }
  });
};

const readdirNodeModulesSync = nm => {
  const set = fs$5.readdirSync(nm);
  const unscoped = set.filter(f => !/^@/.test(f));
  const scopes = set.filter(f => /^@/.test(f)).map(scope => {
    try {
      const pkgs = fs$5.readdirSync(nm + '/' + scope);
      return pkgs.length ? pkgs.map(p => scope + '/' + p) : [scope]
    } catch (er) {
      return [scope]
    }
  }).reduce((a, b) => a.concat(b), []);
  return unscoped.concat(scopes)
};

const walk$2 = (options, callback) => {
  const p = new Promise((resolve, reject) => {
    new BundleWalker$1(options).on('done', resolve).on('error', reject).start();
  });
  return callback ? p.then(res => callback(null, res), callback) : p
};

const walkSync$1 = options => {
  return new BundleWalkerSync(options).start().result
};

var npmBundled = walk$2;
walk$2.sync = walkSync$1;
walk$2.BundleWalker = BundleWalker$1;
walk$2.BundleWalkerSync = BundleWalkerSync;

const isWindows$1 = typeof process === 'object' &&
  process &&
  process.platform === 'win32';
var path$4 = isWindows$1 ? { sep: '\\' } : { sep: '/' };

var balancedMatch = balanced$1;
function balanced$1(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced$1.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

var balanced = balancedMatch;

var braceExpansion = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand$1(escapeBraces(str), true).map(unescapeBraces);
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand$1(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m) return [str];

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand$1(m.post, false)
    : [''];

  if (/\$$/.test(m.pre)) {    
    for (var k = 0; k < post.length; k++) {
      var expansion = pre+ '{' + m.body + '}' + post[k];
      expansions.push(expansion);
    }
  } else {
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;
    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand$1(str);
      }
      return [str];
    }

    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand$1(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.
    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3
        ? Math.abs(numeric(n[2]))
        : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);

      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\')
            c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0)
                c = '-' + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];

      for (var j = 0; j < n.length; j++) {
        N.push.apply(N, expand$1(n[j], false));
      }
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
  }

  return expansions;
}

const minimatch$1 = minimatch_1 = (p, pattern, options = {}) => {
  assertValidPattern(pattern);

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  return new Minimatch$2(pattern, options).match(p)
};

var minimatch_1 = minimatch$1;

const path$3 = path$4;
minimatch$1.sep = path$3.sep;

const GLOBSTAR = Symbol('globstar **');
minimatch$1.GLOBSTAR = GLOBSTAR;
const expand = braceExpansion;

const plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
};

// any single thing other than /
// don't need to escape / when using new RegExp()
const qmark = '[^/]';

// * => any number of characters
const star = qmark + '*?';

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
const twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
const twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

// "abc" -> { a:true, b:true, c:true }
const charSet = s => s.split('').reduce((set, c) => {
  set[c] = true;
  return set
}, {});

// characters that need to be escaped in RegExp.
const reSpecials = charSet('().*{}+?[]^$\\!');

// characters that indicate we have to add the pattern start
const addPatternStartSet = charSet('[.(');

// normalizes slashes.
const slashSplit = /\/+/;

minimatch$1.filter = (pattern, options = {}) =>
  (p, i, list) => minimatch$1(p, pattern, options);

const ext = (a, b = {}) => {
  const t = {};
  Object.keys(a).forEach(k => t[k] = a[k]);
  Object.keys(b).forEach(k => t[k] = b[k]);
  return t
};

minimatch$1.defaults = def => {
  if (!def || typeof def !== 'object' || !Object.keys(def).length) {
    return minimatch$1
  }

  const orig = minimatch$1;

  const m = (p, pattern, options) => orig(p, pattern, ext(def, options));
  m.Minimatch = class Minimatch extends orig.Minimatch {
    constructor (pattern, options) {
      super(pattern, ext(def, options));
    }
  };
  m.Minimatch.defaults = options => orig.defaults(ext(def, options)).Minimatch;
  m.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
  m.defaults = options => orig.defaults(ext(def, options));
  m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
  m.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options));
  m.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options));

  return m
};





// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch$1.braceExpand = (pattern, options) => braceExpand(pattern, options);

const braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);

  // Thanks to Yeting Li <https://github.com/yetingli> for
  // improving this regexp to avoid a ReDOS vulnerability.
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
};

const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = pattern => {
  if (typeof pattern !== 'string') {
    throw new TypeError('invalid pattern')
  }

  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError('pattern is too long')
  }
};

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
const SUBPARSE = Symbol('subparse');

minimatch$1.makeRe = (pattern, options) =>
  new Minimatch$2(pattern, options || {}).makeRe();

minimatch$1.match = (list, pattern, options = {}) => {
  const mm = new Minimatch$2(pattern, options);
  list = list.filter(f => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list
};

// replace stuff like \* with *
const globUnescape = s => s.replace(/\\(.)/g, '$1');
const regExpEscape = s => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

class Minimatch$2 {
  constructor (pattern, options) {
    assertValidPattern(pattern);

    if (!options) options = {};

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;

    // make the set of regexps etc.
    this.make();
  }

  debug () {}

  make () {
    const pattern = this.pattern;
    const options = this.options;

    // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return
    }
    if (!pattern) {
      this.empty = true;
      return
    }

    // step 1: figure out negation, etc.
    this.parseNegate();

    // step 2: expand braces
    let set = this.globSet = this.braceExpand();

    if (options.debug) this.debug = (...args) => console.error(...args);

    this.debug(this.pattern, set);

    // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters
    set = this.globParts = set.map(s => s.split(slashSplit));

    this.debug(this.pattern, set);

    // glob --> regexps
    set = set.map((s, si, set) => s.map(this.parse, this));

    this.debug(this.pattern, set);

    // filter out everything that didn't compile properly.
    set = set.filter(s => s.indexOf(false) === -1);

    this.debug(this.pattern, set);

    this.set = set;
  }

  parseNegate () {
    if (this.options.nonegate) return

    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;

    for (let i = 0; i < pattern.length && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne (file, pattern, partial) {
    var options = this.options;

    this.debug('matchOne',
      { 'this': this, file: file, pattern: pattern });

    this.debug('matchOne', file.length, pattern.length);

    for (var fi = 0,
        pi = 0,
        fl = file.length,
        pl = pattern.length
        ; (fi < fl) && (pi < pl)
        ; fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];

      this.debug(pattern, p, f);

      // should be impossible.
      // some invalid regexp stuff in the set.
      /* istanbul ignore if */
      if (p === false) return false

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);

        // "**"
        // a/**/b/**/c would match the following:
        // a/b/x/y/z/c
        // a/x/y/z/b/c
        // a/b/x/b/x/c
        // a/b/c
        // To do this, take the rest of the pattern after
        // the **, and see if it would match the file remainder.
        // If so, return success.
        // If not, the ** "swallows" a segment, and try again.
        // This is recursively awful.
        //
        // a/**/b/**/c matching a/b/x/y/z/c
        // - a matches a
        // - doublestar
        //   - matchOne(b/x/y/z/c, b/**/c)
        //     - b matches b
        //     - doublestar
        //       - matchOne(x/y/z/c, c) -> no
        //       - matchOne(y/z/c, c) -> no
        //       - matchOne(z/c, c) -> no
        //       - matchOne(c, c) yes, hit
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug('** at the end');
          // a ** at the end will just swallow the rest.
          // We have found a match.
          // however, it will not swallow /.x, unless
          // options.dot is set.
          // . and .. are *never* matched by **, for explosively
          // exponential reasons.
          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' ||
              (!options.dot && file[fi].charAt(0) === '.')) return false
          }
          return true
        }

        // ok, let's see if we can swallow whatever we can.
        while (fr < fl) {
          var swallowee = file[fr];

          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

          // XXX remove this slice.  Just pass the start index.
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);
            // found a match.
            return true
          } else {
            // can't swallow "." or ".." ever.
            // can only swallow ".foo" when explicitly asked.
            if (swallowee === '.' || swallowee === '..' ||
              (!options.dot && swallowee.charAt(0) === '.')) {
              this.debug('dot detected!', file, fr, pattern, pr);
              break
            }

            // ** swallows a segment, and continue.
            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }

        // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then
        /* istanbul ignore if */
        if (partial) {
          // ran out of file
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true
        }
        return false
      }

      // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.
      var hit;
      if (typeof p === 'string') {
        hit = f === p;
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }

      if (!hit) return false
    }

    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*

    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial
    } else /* istanbul ignore else */ if (pi === pl) {
      // ran out of pattern, still have file left.
      // this is only acceptable if we're on the very last
      // empty segment of a file with a trailing slash.
      // a/* should match a/b/
      return (fi === fl - 1) && (file[fi] === '')
    }

    // should be unreachable.
    /* istanbul ignore next */
    throw new Error('wtf?')
  }

  braceExpand () {
    return braceExpand(this.pattern, this.options)
  }

  parse (pattern, isSub) {
    assertValidPattern(pattern);

    const options = this.options;

    // shortcuts
    if (pattern === '**') {
      if (!options.noglobstar)
        return GLOBSTAR
      else
        pattern = '*';
    }
    if (pattern === '') return ''

    let re = '';
    let hasMagic = !!options.nocase;
    let escaping = false;
    // ? => one single character
    const patternListStack = [];
    const negativeLists = [];
    let stateChar;
    let inClass = false;
    let reClassStart = -1;
    let classStart = -1;
    let cs;
    let pl;
    let sp;
    // . and .. never match anything that doesn't start with .,
    // even when options.dot is set.
    const patternStart = pattern.charAt(0) === '.' ? '' // anything
    // not (start or / followed by . or .. followed by / or end)
    : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
    : '(?!\\.)';

    const clearStateChar = () => {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
          break
          case '?':
            re += qmark;
            hasMagic = true;
          break
          default:
            re += '\\' + stateChar;
          break
        }
        this.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    };

    for (let i = 0, c; (i < pattern.length) && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);

      // skip over any that are escaped.
      if (escaping) {
        /* istanbul ignore next - completely not allowed, even escaped. */
        if (c === '/') {
          return false
        }

        if (reSpecials[c]) {
          re += '\\';
        }
        re += c;
        escaping = false;
        continue
      }

      switch (c) {
        /* istanbul ignore next */
        case '/': {
          // Should already be path-split by now.
          return false
        }

        case '\\':
          clearStateChar();
          escaping = true;
        continue

        // the various stateChar values
        // for the "extglob" stuff.
        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

          // all of those are literals inside a class, except that
          // the glob [!a] means [^a] in regexp
          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue
          }

          // if we already have a stateChar, then it means
          // that there was something like ** or +? in there.
          // Handle the stateChar, then proceed with this one.
          this.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;
          // if extglob is disabled, then +(asdf|foo) isn't a thing.
          // just clear the statechar *now*, rather than even diving into
          // the patternList stuff.
          if (options.noext) clearStateChar();
        continue

        case '(':
          if (inClass) {
            re += '(';
            continue
          }

          if (!stateChar) {
            re += '\\(';
            continue
          }

          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          // negation is (?:(?!js)[^/]*)
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
        continue

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue
          }

          clearStateChar();
          hasMagic = true;
          pl = patternListStack.pop();
          // negation is (?:(?!js)[^/]*)
          // The others are (?:<pattern>)<type>
          re += pl.close;
          if (pl.type === '!') {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
        continue

        case '|':
          if (inClass || !patternListStack.length) {
            re += '\\|';
            continue
          }

          clearStateChar();
          re += '|';
        continue

        // these are mostly the same in regexp and glob
        case '[':
          // swallow any state-tracking char before the [
          clearStateChar();

          if (inClass) {
            re += '\\' + c;
            continue
          }

          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
        continue

        case ']':
          //  a right bracket shall lose its special
          //  meaning and represent itself in
          //  a bracket expression if it occurs
          //  first in the list.  -- POSIX.2 2.8.3.2
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            continue
          }

          // handle the case where we left a class open.
          // "[z-a]" is valid, equivalent to "\[z-a\]"
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          cs = pattern.substring(classStart + 1, i);
          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue
          }

          // finish up the class.
          hasMagic = true;
          inClass = false;
          re += c;
        continue

        default:
          // swallow any state char that wasn't consumed
          clearStateChar();

          if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }

          re += c;
          break

      } // switch
    } // for

    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      let tail;
      tail = re.slice(pl.reStart + pl.open.length);
      this.debug('setting tail', re, pl);
      // maybe some even number of \, then maybe 1 \, followed by a |
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
        /* istanbul ignore else - should already be done */
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = '\\';
        }

        // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.
        return $1 + $1 + $2 + '|'
      });

      this.debug('tail=%j\n   %s', tail, tail, pl, re);
      const t = pl.type === '*' ? star
        : pl.type === '?' ? qmark
        : '\\' + pl.type;

      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }

    // handle trailing things that only matter at the very end.
    clearStateChar();
    if (escaping) {
      // trailing \\
      re += '\\\\';
    }

    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    const addPatternStart = addPatternStartSet[re.charAt(0)];

    // Hack to work around lack of negative lookbehind in JS
    // A pattern like: *.!(x).!(y|z) needs to ensure that a name
    // like 'a.xyz.yz' doesn't match.  So, the first negative
    // lookahead, has to look ALL the way ahead, to the end of
    // the pattern.
    for (let n = negativeLists.length - 1; n > -1; n--) {
      const nl = negativeLists[n];

      const nlBefore = re.slice(0, nl.reStart);
      const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      let nlAfter = re.slice(nl.reEnd);
      const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;

      // Handle nested stuff like *(*.js|!(*.json)), where open parens
      // mean that we should *not* include the ) in the bit that is considered
      // "after" the negated section.
      const openParensBefore = nlBefore.split('(').length - 1;
      let cleanAfter = nlAfter;
      for (let i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }
      nlAfter = cleanAfter;

      const dollar = nlAfter === '' && isSub !== SUBPARSE ? '$' : '';
      re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    }

    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }

    if (addPatternStart) {
      re = patternStart + re;
    }

    // parsing just a piece of a larger pattern.
    if (isSub === SUBPARSE) {
      return [re, hasMagic]
    }

    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) {
      return globUnescape(pattern)
    }

    const flags = options.nocase ? 'i' : '';
    try {
      return Object.assign(new RegExp('^' + re + '$', flags), {
        _glob: pattern,
        _src: re,
      })
    } catch (er) /* istanbul ignore next - should be impossible */ {
      // If it was an invalid regular expression, then it can't match
      // anything.  This trick looks for a character after the end of
      // the string, which is of course impossible, except in multi-line
      // mode, but it's not a /m regex.
      return new RegExp('$.')
    }
  }

  makeRe () {
    if (this.regexp || this.regexp === false) return this.regexp

    // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.
    const set = this.set;

    if (!set.length) {
      this.regexp = false;
      return this.regexp
    }
    const options = this.options;

    const twoStar = options.noglobstar ? star
      : options.dot ? twoStarDot
      : twoStarNoDot;
    const flags = options.nocase ? 'i' : '';

    // coalesce globstars and regexpify non-globstar patterns
    // if it's the only item, then we just do one twoStar
    // if it's the first, and there are more, prepend (\/|twoStar\/)? to next
    // if it's the last, append (\/twoStar|) to previous
    // if it's in the middle, append (\/|\/twoStar\/) to previous
    // then filter out GLOBSTAR symbols
    let re = set.map(pattern => {
      pattern = pattern.map(p =>
        typeof p === 'string' ? regExpEscape(p)
        : p === GLOBSTAR ? GLOBSTAR
        : p._src
      ).reduce((set, p) => {
        if (!(set[set.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
          set.push(p);
        }
        return set
      }, []);
      pattern.forEach((p, i) => {
        if (p !== GLOBSTAR || pattern[i-1] === GLOBSTAR) {
          return
        }
        if (i === 0) {
          if (pattern.length > 1) {
            pattern[i+1] = '(?:\\\/|' + twoStar + '\\\/)?' + pattern[i+1];
          } else {
            pattern[i] = twoStar;
          }
        } else if (i === pattern.length - 1) {
          pattern[i-1] += '(?:\\\/|' + twoStar + ')?';
        } else {
          pattern[i-1] += '(?:\\\/|\\\/' + twoStar + '\\\/)' + pattern[i+1];
          pattern[i+1] = GLOBSTAR;
        }
      });
      return pattern.filter(p => p !== GLOBSTAR).join('/')
    }).join('|');

    // must match entire pattern
    // ending in a * or ** will make it less strict.
    re = '^(?:' + re + ')$';

    // can match anything, as long as it's not this.
    if (this.negate) re = '^(?!' + re + ').*$';

    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) /* istanbul ignore next - should be impossible */ {
      this.regexp = false;
    }
    return this.regexp
  }

  match (f, partial = this.partial) {
    this.debug('match', f, this.pattern);
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false
    if (this.empty) return f === ''

    if (f === '/' && partial) return true

    const options = this.options;

    // windows: need to use /, not \
    if (path$3.sep !== '/') {
      f = f.split(path$3.sep).join('/');
    }

    // treat the test path as a set of pathparts.
    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);

    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    const set = this.set;
    this.debug(this.pattern, 'set', set);

    // Find the basename of the path by looking for the last non-empty segment
    let filename;
    for (let i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break
    }

    for (let i = 0; i < set.length; i++) {
      const pattern = set[i];
      let file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true
        return !this.negate
      }
    }

    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false
    return this.negate
  }

  static defaults (def) {
    return minimatch$1.defaults(def).Minimatch
  }
}

minimatch$1.Minimatch = Minimatch$2;

const fs$4 = require$$0__default["default"];
const path$2 = path__default["default"];
const EE = require$$2__default["default"].EventEmitter;
const Minimatch$1 = minimatch_1.Minimatch;

class Walker$1 extends EE {
  constructor (opts) {
    opts = opts || {};
    super(opts);
    // set to true if this.path is a symlink, whether follow is true or not
    this.isSymbolicLink = opts.isSymbolicLink;
    this.path = opts.path || process.cwd();
    this.basename = path$2.basename(this.path);
    this.ignoreFiles = opts.ignoreFiles || ['.ignore'];
    this.ignoreRules = {};
    this.parent = opts.parent || null;
    this.includeEmpty = !!opts.includeEmpty;
    this.root = this.parent ? this.parent.root : this.path;
    this.follow = !!opts.follow;
    this.result = this.parent ? this.parent.result : new Set();
    this.entries = null;
    this.sawError = false;
  }

  sort (a, b) {
    return a.localeCompare(b, 'en')
  }

  emit (ev, data) {
    let ret = false;
    if (!(this.sawError && ev === 'error')) {
      if (ev === 'error') {
        this.sawError = true;
      } else if (ev === 'done' && !this.parent) {
        data = Array.from(data)
          .map(e => /^@/.test(e) ? `./${e}` : e).sort(this.sort);
        this.result = data;
      }

      if (ev === 'error' && this.parent) {
        ret = this.parent.emit('error', data);
      } else {
        ret = super.emit(ev, data);
      }
    }
    return ret
  }

  start () {
    fs$4.readdir(this.path, (er, entries) =>
      er ? this.emit('error', er) : this.onReaddir(entries));
    return this
  }

  isIgnoreFile (e) {
    return e !== '.' &&
      e !== '..' &&
      this.ignoreFiles.indexOf(e) !== -1
  }

  onReaddir (entries) {
    this.entries = entries;
    if (entries.length === 0) {
      if (this.includeEmpty) {
        this.result.add(this.path.slice(this.root.length + 1));
      }
      this.emit('done', this.result);
    } else {
      const hasIg = this.entries.some(e =>
        this.isIgnoreFile(e));

      if (hasIg) {
        this.addIgnoreFiles();
      } else {
        this.filterEntries();
      }
    }
  }

  addIgnoreFiles () {
    const newIg = this.entries
      .filter(e => this.isIgnoreFile(e));

    let igCount = newIg.length;
    const then = _ => {
      if (--igCount === 0) {
        this.filterEntries();
      }
    };

    newIg.forEach(e => this.addIgnoreFile(e, then));
  }

  addIgnoreFile (file, then) {
    const ig = path$2.resolve(this.path, file);
    fs$4.readFile(ig, 'utf8', (er, data) =>
      er ? this.emit('error', er) : this.onReadIgnoreFile(file, data, then));
  }

  onReadIgnoreFile (file, data, then) {
    const mmopt = {
      matchBase: true,
      dot: true,
      flipNegate: true,
      nocase: true,
    };
    const rules = data.split(/\r?\n/)
      .filter(line => !/^#|^$/.test(line.trim()))
      .map(rule => {
        return new Minimatch$1(rule.trim(), mmopt)
      });

    this.ignoreRules[file] = rules;

    then();
  }

  filterEntries () {
    // at this point we either have ignore rules, or just inheriting
    // this exclusion is at the point where we know the list of
    // entries in the dir, but don't know what they are.  since
    // some of them *might* be directories, we have to run the
    // match in dir-mode as well, so that we'll pick up partials
    // of files that will be included later.  Anything included
    // at this point will be checked again later once we know
    // what it is.
    const filtered = this.entries.map(entry => {
      // at this point, we don't know if it's a dir or not.
      const passFile = this.filterEntry(entry);
      const passDir = this.filterEntry(entry, true);
      return (passFile || passDir) ? [entry, passFile, passDir] : false
    }).filter(e => e);

    // now we stat them all
    // if it's a dir, and passes as a dir, then recurse
    // if it's not a dir, but passes as a file, add to set
    let entryCount = filtered.length;
    if (entryCount === 0) {
      this.emit('done', this.result);
    } else {
      const then = _ => {
        if (--entryCount === 0) {
          this.emit('done', this.result);
        }
      };
      filtered.forEach(filt => {
        const entry = filt[0];
        const file = filt[1];
        const dir = filt[2];
        this.stat({ entry, file, dir }, then);
      });
    }
  }

  onstat ({ st, entry, file, dir, isSymbolicLink }, then) {
    const abs = this.path + '/' + entry;
    if (!st.isDirectory()) {
      if (file) {
        this.result.add(abs.slice(this.root.length + 1));
      }
      then();
    } else {
      // is a directory
      if (dir) {
        this.walker(entry, { isSymbolicLink }, then);
      } else {
        then();
      }
    }
  }

  stat ({ entry, file, dir }, then) {
    const abs = this.path + '/' + entry;
    fs$4.lstat(abs, (lstatErr, lstatResult) => {
      if (lstatErr) {
        this.emit('error', lstatErr);
      } else {
        const isSymbolicLink = lstatResult.isSymbolicLink();
        if (this.follow && isSymbolicLink) {
          fs$4.stat(abs, (statErr, statResult) => {
            if (statErr) {
              this.emit('error', statErr);
            } else {
              this.onstat({ st: statResult, entry, file, dir, isSymbolicLink }, then);
            }
          });
        } else {
          this.onstat({ st: lstatResult, entry, file, dir, isSymbolicLink }, then);
        }
      }
    });
  }

  walkerOpt (entry, opts) {
    return {
      path: this.path + '/' + entry,
      parent: this,
      ignoreFiles: this.ignoreFiles,
      follow: this.follow,
      includeEmpty: this.includeEmpty,
      ...opts,
    }
  }

  walker (entry, opts, then) {
    new Walker$1(this.walkerOpt(entry, opts)).on('done', then).start();
  }

  filterEntry (entry, partial) {
    let included = true;

    // this = /a/b/c
    // entry = d
    // parent /a/b sees c/d
    if (this.parent && this.parent.filterEntry) {
      var pt = this.basename + '/' + entry;
      included = this.parent.filterEntry(pt, partial);
    }

    this.ignoreFiles.forEach(f => {
      if (this.ignoreRules[f]) {
        this.ignoreRules[f].forEach(rule => {
          // negation means inclusion
          // so if it's negated, and already included, no need to check
          // likewise if it's neither negated nor included
          if (rule.negate !== included) {
            // first, match against /foo/bar
            // then, against foo/bar
            // then, in the case of partials, match with a /
            const match = rule.match('/' + entry) ||
              rule.match(entry) ||
              (!!partial && (
                rule.match('/' + entry + '/') ||
                rule.match(entry + '/'))) ||
              (!!partial && rule.negate && (
                rule.match('/' + entry, true) ||
                rule.match(entry, true)));

            if (match) {
              included = rule.negate;
            }
          }
        });
      }
    });

    return included
  }
}

class WalkerSync extends Walker$1 {
  start () {
    this.onReaddir(fs$4.readdirSync(this.path));
    return this
  }

  addIgnoreFile (file, then) {
    const ig = path$2.resolve(this.path, file);
    this.onReadIgnoreFile(file, fs$4.readFileSync(ig, 'utf8'), then);
  }

  stat ({ entry, file, dir }, then) {
    const abs = this.path + '/' + entry;
    let st = fs$4.lstatSync(abs);
    const isSymbolicLink = st.isSymbolicLink();
    if (this.follow && isSymbolicLink) {
      st = fs$4.statSync(abs);
    }

    // console.error('STAT SYNC', {st, entry, file, dir, isSymbolicLink, then})
    this.onstat({ st, entry, file, dir, isSymbolicLink }, then);
  }

  walker (entry, opts, then) {
    new WalkerSync(this.walkerOpt(entry, opts)).start();
    then();
  }
}

const walk$1 = (opts, callback) => {
  const p = new Promise((resolve, reject) => {
    new Walker$1(opts).on('done', resolve).on('error', reject).start();
  });
  return callback ? p.then(res => callback(null, res), callback) : p
};

const walkSync = opts => new WalkerSync(opts).start().result;

var lib$1 = walk$1;
walk$1.sync = walkSync;
walk$1.Walker = Walker$1;
walk$1.WalkerSync = WalkerSync;

var old$1 = {};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = path__default["default"];
var isWindows = process.platform === 'win32';
var fs$3 = require$$0__default["default"];

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

old$1.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs$3.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs$3.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs$3.statSync(base);
        linkTarget = fs$3.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


old$1.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs$3.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs$3.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs$3.stat(base, function(err) {
      if (err) return cb(err);

      fs$3.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};

var fs_realpath = realpath;
realpath.realpath = realpath;
realpath.sync = realpathSync;
realpath.realpathSync = realpathSync;
realpath.monkeypatch = monkeypatch;
realpath.unmonkeypatch = unmonkeypatch;

var fs$2 = require$$0__default["default"];
var origRealpath = fs$2.realpath;
var origRealpathSync = fs$2.realpathSync;

var version$1 = process.version;
var ok = /^v[0-5]\./.test(version$1);
var old = old$1;

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache;
    cache = null;
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb);
    } else {
      cb(er, result);
    }
  });
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs$2.realpath = realpath;
  fs$2.realpathSync = realpathSync;
}

function unmonkeypatch () {
  fs$2.realpath = origRealpath;
  fs$2.realpathSync = origRealpathSync;
}

var require$1 = (
			false
				? /* @__PURE__ */ If.createRequire((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href)))
				: require
		);

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;

function requireInherits_browser () {
	if (hasRequiredInherits_browser) return inherits_browser.exports;
	hasRequiredInherits_browser = 1;
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	return inherits_browser.exports;
}

(function (module) {
	try {
	  var util = require$1('util');
	  /* istanbul ignore next */
	  if (typeof util.inherits !== 'function') throw '';
	  module.exports = util.inherits;
	} catch (e) {
	  /* istanbul ignore next */
	  module.exports = requireInherits_browser();
	}
} (inherits));

var pathIsAbsolute = {exports: {}};

function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

pathIsAbsolute.exports = process.platform === 'win32' ? win32 : posix;
pathIsAbsolute.exports.posix = posix;
pathIsAbsolute.exports.win32 = win32;

var common = {};

common.setopts = setopts;
common.ownProp = ownProp;
common.makeAbs = makeAbs;
common.finish = finish;
common.mark = mark;
common.isIgnored = isIgnored;
common.childrenIgnored = childrenIgnored;

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var fs$1 = require$$0__default["default"];
var path$1 = path__default["default"];
var minimatch = minimatch_1;
var isAbsolute = pathIsAbsolute.exports;
var Minimatch = minimatch.Minimatch;

function alphasort (a, b) {
  return a.localeCompare(b, 'en')
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || [];

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore];

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap);
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null;
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '');
    gmatcher = new Minimatch(gpattern, { dot: true });
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {};

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern;
  }

  self.silent = !!options.silent;
  self.pattern = pattern;
  self.strict = options.strict !== false;
  self.realpath = !!options.realpath;
  self.realpathCache = options.realpathCache || Object.create(null);
  self.follow = !!options.follow;
  self.dot = !!options.dot;
  self.mark = !!options.mark;
  self.nodir = !!options.nodir;
  if (self.nodir)
    self.mark = true;
  self.sync = !!options.sync;
  self.nounique = !!options.nounique;
  self.nonull = !!options.nonull;
  self.nosort = !!options.nosort;
  self.nocase = !!options.nocase;
  self.stat = !!options.stat;
  self.noprocess = !!options.noprocess;
  self.absolute = !!options.absolute;
  self.fs = options.fs || fs$1;

  self.maxLength = options.maxLength || Infinity;
  self.cache = options.cache || Object.create(null);
  self.statCache = options.statCache || Object.create(null);
  self.symlinks = options.symlinks || Object.create(null);

  setupIgnores(self, options);

  self.changedCwd = false;
  var cwd = process.cwd();
  if (!ownProp(options, "cwd"))
    self.cwd = cwd;
  else {
    self.cwd = path$1.resolve(options.cwd);
    self.changedCwd = self.cwd !== cwd;
  }

  self.root = options.root || path$1.resolve(self.cwd, "/");
  self.root = path$1.resolve(self.root);
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/");

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
  self.nomount = !!options.nomount;

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true;
  options.nocomment = true;
  // always treat \ in patterns as escapes, not path separators
  options.allowWindowsEscape = true;

  self.minimatch = new Minimatch(pattern, options);
  self.options = self.minimatch.options;
}

function finish (self) {
  var nou = self.nounique;
  var all = nou ? [] : Object.create(null);

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i];
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i];
        if (nou)
          all.push(literal);
        else
          all[literal] = true;
      }
    } else {
      // had matches
      var m = Object.keys(matches);
      if (nou)
        all.push.apply(all, m);
      else
        m.forEach(function (m) {
          all[m] = true;
        });
    }
  }

  if (!nou)
    all = Object.keys(all);

  if (!self.nosort)
    all = all.sort(alphasort);

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i]);
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e));
        var c = self.cache[e] || self.cache[makeAbs(self, e)];
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c);
        return notDir
      });
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    });

  self.found = all;
}

function mark (self, p) {
  var abs = makeAbs(self, p);
  var c = self.cache[abs];
  var m = p;
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c);
    var slash = p.slice(-1) === '/';

    if (isDir && !slash)
      m += '/';
    else if (!isDir && slash)
      m = m.slice(0, -1);

    if (m !== p) {
      var mabs = makeAbs(self, m);
      self.statCache[mabs] = self.statCache[abs];
      self.cache[mabs] = self.cache[abs];
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f;
  if (f.charAt(0) === '/') {
    abs = path$1.join(self.root, f);
  } else if (isAbsolute(f) || f === '') {
    abs = f;
  } else if (self.changedCwd) {
    abs = path$1.resolve(self.cwd, f);
  } else {
    abs = path$1.resolve(f);
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/');

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}

var sync;
var hasRequiredSync;

function requireSync () {
	if (hasRequiredSync) return sync;
	hasRequiredSync = 1;
	sync = globSync;
	globSync.GlobSync = GlobSync;

	var rp = fs_realpath;
	var minimatch = minimatch_1;
	minimatch.Minimatch;
	requireGlob().Glob;
	var path = path__default["default"];
	var assert = require$$5__default["default"];
	var isAbsolute = pathIsAbsolute.exports;
	var common$1 = common;
	var setopts = common$1.setopts;
	var ownProp = common$1.ownProp;
	var childrenIgnored = common$1.childrenIgnored;
	var isIgnored = common$1.isIgnored;

	function globSync (pattern, options) {
	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  return new GlobSync(pattern, options).found
	}

	function GlobSync (pattern, options) {
	  if (!pattern)
	    throw new Error('must provide pattern')

	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  if (!(this instanceof GlobSync))
	    return new GlobSync(pattern, options)

	  setopts(this, pattern, options);

	  if (this.noprocess)
	    return this

	  var n = this.minimatch.set.length;
	  this.matches = new Array(n);
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false);
	  }
	  this._finish();
	}

	GlobSync.prototype._finish = function () {
	  assert(this instanceof GlobSync);
	  if (this.realpath) {
	    var self = this;
	    this.matches.forEach(function (matchset, index) {
	      var set = self.matches[index] = Object.create(null);
	      for (var p in matchset) {
	        try {
	          p = self._makeAbs(p);
	          var real = rp.realpathSync(p, self.realpathCache);
	          set[real] = true;
	        } catch (er) {
	          if (er.syscall === 'stat')
	            set[self._makeAbs(p)] = true;
	          else
	            throw er
	        }
	      }
	    });
	  }
	  common$1.finish(this);
	};


	GlobSync.prototype._process = function (pattern, index, inGlobStar) {
	  assert(this instanceof GlobSync);

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0;
	  while (typeof pattern[n] === 'string') {
	    n ++;
	  }
	  // now n is the index of the first one that is *not* a string.

	  // See if there's anything else
	  var prefix;
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index);
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null;
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/');
	      break
	  }

	  var remain = pattern.slice(n);

	  // get the list of entries.
	  var read;
	  if (prefix === null)
	    read = '.';
	  else if (isAbsolute(prefix) ||
	      isAbsolute(pattern.map(function (p) {
	        return typeof p === 'string' ? p : '[*]'
	      }).join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix;
	    read = prefix;
	  } else
	    read = prefix;

	  var abs = this._makeAbs(read);

	  //if ignored, skip processing
	  if (childrenIgnored(this, read))
	    return

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
	};


	GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
	  var entries = this._readdir(abs, inGlobStar);

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0];
	  var negate = !!this.minimatch.negate;
	  var rawGlob = pn._glob;
	  var dotOk = this.dot || rawGlob.charAt(0) === '.';

	  var matchedEntries = [];
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i];
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m;
	      if (negate && !prefix) {
	        m = !e.match(pn);
	      } else {
	        m = e.match(pn);
	      }
	      if (m)
	        matchedEntries.push(e);
	    }
	  }

	  var len = matchedEntries.length;
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null);

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i];
	      if (prefix) {
	        if (prefix.slice(-1) !== '/')
	          e = prefix + '/' + e;
	        else
	          e = prefix + e;
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e);
	      }
	      this._emitMatch(index, e);
	    }
	    // This was the last one, and no stats were needed
	    return
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift();
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i];
	    var newPattern;
	    if (prefix)
	      newPattern = [prefix, e];
	    else
	      newPattern = [e];
	    this._process(newPattern.concat(remain), index, inGlobStar);
	  }
	};


	GlobSync.prototype._emitMatch = function (index, e) {
	  if (isIgnored(this, e))
	    return

	  var abs = this._makeAbs(e);

	  if (this.mark)
	    e = this._mark(e);

	  if (this.absolute) {
	    e = abs;
	  }

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs];
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true;

	  if (this.stat)
	    this._stat(e);
	};


	GlobSync.prototype._readdirInGlobStar = function (abs) {
	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false)

	  var entries;
	  var lstat;
	  try {
	    lstat = this.fs.lstatSync(abs);
	  } catch (er) {
	    if (er.code === 'ENOENT') {
	      // lstat failed, doesn't exist
	      return null
	    }
	  }

	  var isSym = lstat && lstat.isSymbolicLink();
	  this.symlinks[abs] = isSym;

	  // If it's not a symlink or a dir, then it's definitely a regular file.
	  // don't bother doing a readdir in that case.
	  if (!isSym && lstat && !lstat.isDirectory())
	    this.cache[abs] = 'FILE';
	  else
	    entries = this._readdir(abs, false);

	  return entries
	};

	GlobSync.prototype._readdir = function (abs, inGlobStar) {

	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs];
	    if (!c || c === 'FILE')
	      return null

	    if (Array.isArray(c))
	      return c
	  }

	  try {
	    return this._readdirEntries(abs, this.fs.readdirSync(abs))
	  } catch (er) {
	    this._readdirError(abs, er);
	    return null
	  }
	};

	GlobSync.prototype._readdirEntries = function (abs, entries) {
	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i];
	      if (abs === '/')
	        e = abs + e;
	      else
	        e = abs + '/' + e;
	      this.cache[e] = true;
	    }
	  }

	  this.cache[abs] = entries;

	  // mark and cache dir-ness
	  return entries
	};

	GlobSync.prototype._readdirError = function (f, er) {
	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f);
	      this.cache[abs] = 'FILE';
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
	        error.path = this.cwd;
	        error.code = er.code;
	        throw error
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false;
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false;
	      if (this.strict)
	        throw er
	      if (!this.silent)
	        console.error('glob error', er);
	      break
	  }
	};

	GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

	  var entries = this._readdir(abs, inGlobStar);

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1);
	  var gspref = prefix ? [ prefix ] : [];
	  var noGlobStar = gspref.concat(remainWithoutGlobStar);

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false);

	  var len = entries.length;
	  var isSym = this.symlinks[abs];

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return

	  for (var i = 0; i < len; i++) {
	    var e = entries[i];
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
	    this._process(instead, index, true);

	    var below = gspref.concat(entries[i], remain);
	    this._process(below, index, true);
	  }
	};

	GlobSync.prototype._processSimple = function (prefix, index) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var exists = this._stat(prefix);

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null);

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix);
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix);
	    } else {
	      prefix = path.resolve(this.root, prefix);
	      if (trail)
	        prefix += '/';
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/');

	  // Mark this as a match
	  this._emitMatch(index, prefix);
	};

	// Returns either 'DIR', 'FILE', or false
	GlobSync.prototype._stat = function (f) {
	  var abs = this._makeAbs(f);
	  var needDir = f.slice(-1) === '/';

	  if (f.length > this.maxLength)
	    return false

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs];

	    if (Array.isArray(c))
	      c = 'DIR';

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return c

	    if (needDir && c === 'FILE')
	      return false

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }
	  var stat = this.statCache[abs];
	  if (!stat) {
	    var lstat;
	    try {
	      lstat = this.fs.lstatSync(abs);
	    } catch (er) {
	      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	        this.statCache[abs] = false;
	        return false
	      }
	    }

	    if (lstat && lstat.isSymbolicLink()) {
	      try {
	        stat = this.fs.statSync(abs);
	      } catch (er) {
	        stat = lstat;
	      }
	    } else {
	      stat = lstat;
	    }
	  }

	  this.statCache[abs] = stat;

	  var c = true;
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE';

	  this.cache[abs] = this.cache[abs] || c;

	  if (needDir && c === 'FILE')
	    return false

	  return c
	};

	GlobSync.prototype._mark = function (p) {
	  return common$1.mark(this, p)
	};

	GlobSync.prototype._makeAbs = function (f) {
	  return common$1.makeAbs(this, f)
	};
	return sync;
}

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy$2;
function wrappy$2 (fn, cb) {
  if (fn && cb) return wrappy$2(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var once$2 = {exports: {}};

var wrappy$1 = wrappy_1;
once$2.exports = wrappy$1(once$1);
once$2.exports.strict = wrappy$1(onceStrict);

once$1.proto = once$1(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once$1(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once$1 (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}

var wrappy = wrappy_1;
var reqs = Object.create(null);
var once = once$2.exports;

var inflight_1 = wrappy(inflight);

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb);
    return null
  } else {
    reqs[key] = [cb];
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key];
    var len = cbs.length;
    var args = slice(arguments);

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        delete reqs[key];
      }
    }
  })
}

function slice (args) {
  var length = args.length;
  var array = [];

  for (var i = 0; i < length; i++) array[i] = args[i];
  return array
}

var glob_1;
var hasRequiredGlob;

function requireGlob () {
	if (hasRequiredGlob) return glob_1;
	hasRequiredGlob = 1;
	// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern, false)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern, inGlobStar)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	//
	// If inGlobStar and PREFIX is symlink and points to dir
	//   set ENTRIES = []
	// else readdir(PREFIX) as ENTRIES
	//   If fail, END
	//
	// with ENTRIES
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       // Mark that this entry is a globstar match
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.

	glob_1 = glob;

	var rp = fs_realpath;
	var minimatch = minimatch_1;
	minimatch.Minimatch;
	var inherits$1 = inherits.exports;
	var EE = require$$2__default["default"].EventEmitter;
	var path = path__default["default"];
	var assert = require$$5__default["default"];
	var isAbsolute = pathIsAbsolute.exports;
	var globSync = requireSync();
	var common$1 = common;
	var setopts = common$1.setopts;
	var ownProp = common$1.ownProp;
	var inflight = inflight_1;
	var childrenIgnored = common$1.childrenIgnored;
	var isIgnored = common$1.isIgnored;

	var once = once$2.exports;

	function glob (pattern, options, cb) {
	  if (typeof options === 'function') cb = options, options = {};
	  if (!options) options = {};

	  if (options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return globSync(pattern, options)
	  }

	  return new Glob(pattern, options, cb)
	}

	glob.sync = globSync;
	var GlobSync = glob.GlobSync = globSync.GlobSync;

	// old api surface
	glob.glob = glob;

	function extend (origin, add) {
	  if (add === null || typeof add !== 'object') {
	    return origin
	  }

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin
	}

	glob.hasMagic = function (pattern, options_) {
	  var options = extend({}, options_);
	  options.noprocess = true;

	  var g = new Glob(pattern, options);
	  var set = g.minimatch.set;

	  if (!pattern)
	    return false

	  if (set.length > 1)
	    return true

	  for (var j = 0; j < set[0].length; j++) {
	    if (typeof set[0][j] !== 'string')
	      return true
	  }

	  return false
	};

	glob.Glob = Glob;
	inherits$1(Glob, EE);
	function Glob (pattern, options, cb) {
	  if (typeof options === 'function') {
	    cb = options;
	    options = null;
	  }

	  if (options && options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return new GlobSync(pattern, options)
	  }

	  if (!(this instanceof Glob))
	    return new Glob(pattern, options, cb)

	  setopts(this, pattern, options);
	  this._didRealPath = false;

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length;

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n);

	  if (typeof cb === 'function') {
	    cb = once(cb);
	    this.on('error', cb);
	    this.on('end', function (matches) {
	      cb(null, matches);
	    });
	  }

	  var self = this;
	  this._processing = 0;

	  this._emitQueue = [];
	  this._processQueue = [];
	  this.paused = false;

	  if (this.noprocess)
	    return this

	  if (n === 0)
	    return done()

	  var sync = true;
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false, done);
	  }
	  sync = false;

	  function done () {
	    --self._processing;
	    if (self._processing <= 0) {
	      if (sync) {
	        process.nextTick(function () {
	          self._finish();
	        });
	      } else {
	        self._finish();
	      }
	    }
	  }
	}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob);
	  if (this.aborted)
	    return

	  if (this.realpath && !this._didRealpath)
	    return this._realpath()

	  common$1.finish(this);
	  this.emit('end', this.found);
	};

	Glob.prototype._realpath = function () {
	  if (this._didRealpath)
	    return

	  this._didRealpath = true;

	  var n = this.matches.length;
	  if (n === 0)
	    return this._finish()

	  var self = this;
	  for (var i = 0; i < this.matches.length; i++)
	    this._realpathSet(i, next);

	  function next () {
	    if (--n === 0)
	      self._finish();
	  }
	};

	Glob.prototype._realpathSet = function (index, cb) {
	  var matchset = this.matches[index];
	  if (!matchset)
	    return cb()

	  var found = Object.keys(matchset);
	  var self = this;
	  var n = found.length;

	  if (n === 0)
	    return cb()

	  var set = this.matches[index] = Object.create(null);
	  found.forEach(function (p, i) {
	    // If there's a problem with the stat, then it means that
	    // one or more of the links in the realpath couldn't be
	    // resolved.  just return the abs value in that case.
	    p = self._makeAbs(p);
	    rp.realpath(p, self.realpathCache, function (er, real) {
	      if (!er)
	        set[real] = true;
	      else if (er.syscall === 'stat')
	        set[p] = true;
	      else
	        self.emit('error', er); // srsly wtf right here

	      if (--n === 0) {
	        self.matches[index] = set;
	        cb();
	      }
	    });
	  });
	};

	Glob.prototype._mark = function (p) {
	  return common$1.mark(this, p)
	};

	Glob.prototype._makeAbs = function (f) {
	  return common$1.makeAbs(this, f)
	};

	Glob.prototype.abort = function () {
	  this.aborted = true;
	  this.emit('abort');
	};

	Glob.prototype.pause = function () {
	  if (!this.paused) {
	    this.paused = true;
	    this.emit('pause');
	  }
	};

	Glob.prototype.resume = function () {
	  if (this.paused) {
	    this.emit('resume');
	    this.paused = false;
	    if (this._emitQueue.length) {
	      var eq = this._emitQueue.slice(0);
	      this._emitQueue.length = 0;
	      for (var i = 0; i < eq.length; i ++) {
	        var e = eq[i];
	        this._emitMatch(e[0], e[1]);
	      }
	    }
	    if (this._processQueue.length) {
	      var pq = this._processQueue.slice(0);
	      this._processQueue.length = 0;
	      for (var i = 0; i < pq.length; i ++) {
	        var p = pq[i];
	        this._processing--;
	        this._process(p[0], p[1], p[2], p[3]);
	      }
	    }
	  }
	};

	Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
	  assert(this instanceof Glob);
	  assert(typeof cb === 'function');

	  if (this.aborted)
	    return

	  this._processing++;
	  if (this.paused) {
	    this._processQueue.push([pattern, index, inGlobStar, cb]);
	    return
	  }

	  //console.error('PROCESS %d', this._processing, pattern)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0;
	  while (typeof pattern[n] === 'string') {
	    n ++;
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix;
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index, cb);
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null;
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/');
	      break
	  }

	  var remain = pattern.slice(n);

	  // get the list of entries.
	  var read;
	  if (prefix === null)
	    read = '.';
	  else if (isAbsolute(prefix) ||
	      isAbsolute(pattern.map(function (p) {
	        return typeof p === 'string' ? p : '[*]'
	      }).join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix;
	    read = prefix;
	  } else
	    read = prefix;

	  var abs = this._makeAbs(read);

	  //if ignored, skip _processing
	  if (childrenIgnored(this, read))
	    return cb()

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
	};

	Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this;
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  });
	};

	Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return cb()

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0];
	  var negate = !!this.minimatch.negate;
	  var rawGlob = pn._glob;
	  var dotOk = this.dot || rawGlob.charAt(0) === '.';

	  var matchedEntries = [];
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i];
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m;
	      if (negate && !prefix) {
	        m = !e.match(pn);
	      } else {
	        m = e.match(pn);
	      }
	      if (m)
	        matchedEntries.push(e);
	    }
	  }

	  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

	  var len = matchedEntries.length;
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return cb()

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null);

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i];
	      if (prefix) {
	        if (prefix !== '/')
	          e = prefix + '/' + e;
	        else
	          e = prefix + e;
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e);
	      }
	      this._emitMatch(index, e);
	    }
	    // This was the last one, and no stats were needed
	    return cb()
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift();
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i];
	    if (prefix) {
	      if (prefix !== '/')
	        e = prefix + '/' + e;
	      else
	        e = prefix + e;
	    }
	    this._process([e].concat(remain), index, inGlobStar, cb);
	  }
	  cb();
	};

	Glob.prototype._emitMatch = function (index, e) {
	  if (this.aborted)
	    return

	  if (isIgnored(this, e))
	    return

	  if (this.paused) {
	    this._emitQueue.push([index, e]);
	    return
	  }

	  var abs = isAbsolute(e) ? e : this._makeAbs(e);

	  if (this.mark)
	    e = this._mark(e);

	  if (this.absolute)
	    e = abs;

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs];
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true;

	  var st = this.statCache[abs];
	  if (st)
	    this.emit('stat', e, st);

	  this.emit('match', e);
	};

	Glob.prototype._readdirInGlobStar = function (abs, cb) {
	  if (this.aborted)
	    return

	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false, cb)

	  var lstatkey = 'lstat\0' + abs;
	  var self = this;
	  var lstatcb = inflight(lstatkey, lstatcb_);

	  if (lstatcb)
	    self.fs.lstat(abs, lstatcb);

	  function lstatcb_ (er, lstat) {
	    if (er && er.code === 'ENOENT')
	      return cb()

	    var isSym = lstat && lstat.isSymbolicLink();
	    self.symlinks[abs] = isSym;

	    // If it's not a symlink or a dir, then it's definitely a regular file.
	    // don't bother doing a readdir in that case.
	    if (!isSym && lstat && !lstat.isDirectory()) {
	      self.cache[abs] = 'FILE';
	      cb();
	    } else
	      self._readdir(abs, false, cb);
	  }
	};

	Glob.prototype._readdir = function (abs, inGlobStar, cb) {
	  if (this.aborted)
	    return

	  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb);
	  if (!cb)
	    return

	  //console.error('RD %j %j', +inGlobStar, abs)
	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs, cb)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs];
	    if (!c || c === 'FILE')
	      return cb()

	    if (Array.isArray(c))
	      return cb(null, c)
	  }

	  var self = this;
	  self.fs.readdir(abs, readdirCb(this, abs, cb));
	};

	function readdirCb (self, abs, cb) {
	  return function (er, entries) {
	    if (er)
	      self._readdirError(abs, er, cb);
	    else
	      self._readdirEntries(abs, entries, cb);
	  }
	}

	Glob.prototype._readdirEntries = function (abs, entries, cb) {
	  if (this.aborted)
	    return

	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i];
	      if (abs === '/')
	        e = abs + e;
	      else
	        e = abs + '/' + e;
	      this.cache[e] = true;
	    }
	  }

	  this.cache[abs] = entries;
	  return cb(null, entries)
	};

	Glob.prototype._readdirError = function (f, er, cb) {
	  if (this.aborted)
	    return

	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f);
	      this.cache[abs] = 'FILE';
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
	        error.path = this.cwd;
	        error.code = er.code;
	        this.emit('error', error);
	        this.abort();
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false;
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false;
	      if (this.strict) {
	        this.emit('error', er);
	        // If the error is handled, then we abort
	        // if not, we threw out of here
	        this.abort();
	      }
	      if (!this.silent)
	        console.error('glob error', er);
	      break
	  }

	  return cb()
	};

	Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this;
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
	  });
	};


	Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
	  //console.error('pgs2', prefix, remain[0], entries)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return cb()

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1);
	  var gspref = prefix ? [ prefix ] : [];
	  var noGlobStar = gspref.concat(remainWithoutGlobStar);

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false, cb);

	  var isSym = this.symlinks[abs];
	  var len = entries.length;

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return cb()

	  for (var i = 0; i < len; i++) {
	    var e = entries[i];
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
	    this._process(instead, index, true, cb);

	    var below = gspref.concat(entries[i], remain);
	    this._process(below, index, true, cb);
	  }

	  cb();
	};

	Glob.prototype._processSimple = function (prefix, index, cb) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var self = this;
	  this._stat(prefix, function (er, exists) {
	    self._processSimple2(prefix, index, er, exists, cb);
	  });
	};
	Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

	  //console.error('ps2', prefix, exists)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null);

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return cb()

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix);
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix);
	    } else {
	      prefix = path.resolve(this.root, prefix);
	      if (trail)
	        prefix += '/';
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/');

	  // Mark this as a match
	  this._emitMatch(index, prefix);
	  cb();
	};

	// Returns either 'DIR', 'FILE', or false
	Glob.prototype._stat = function (f, cb) {
	  var abs = this._makeAbs(f);
	  var needDir = f.slice(-1) === '/';

	  if (f.length > this.maxLength)
	    return cb()

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs];

	    if (Array.isArray(c))
	      c = 'DIR';

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return cb(null, c)

	    if (needDir && c === 'FILE')
	      return cb()

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }
	  var stat = this.statCache[abs];
	  if (stat !== undefined) {
	    if (stat === false)
	      return cb(null, stat)
	    else {
	      var type = stat.isDirectory() ? 'DIR' : 'FILE';
	      if (needDir && type === 'FILE')
	        return cb()
	      else
	        return cb(null, type, stat)
	    }
	  }

	  var self = this;
	  var statcb = inflight('stat\0' + abs, lstatcb_);
	  if (statcb)
	    self.fs.lstat(abs, statcb);

	  function lstatcb_ (er, lstat) {
	    if (lstat && lstat.isSymbolicLink()) {
	      // If it's a symlink, then treat it as the target, unless
	      // the target does not exist, then treat it as a file.
	      return self.fs.stat(abs, function (er, stat) {
	        if (er)
	          self._stat2(f, abs, null, lstat, cb);
	        else
	          self._stat2(f, abs, er, stat, cb);
	      })
	    } else {
	      self._stat2(f, abs, er, lstat, cb);
	    }
	  }
	};

	Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
	  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	    this.statCache[abs] = false;
	    return cb()
	  }

	  var needDir = f.slice(-1) === '/';
	  this.statCache[abs] = stat;

	  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
	    return cb(null, false, stat)

	  var c = true;
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE';
	  this.cache[abs] = this.cache[abs] || c;

	  if (needDir && c === 'FILE')
	    return cb()

	  return cb(null, c, stat)
	};
	return glob_1;
}

// Do a two-pass walk, first to get the list of packages that need to be
// bundled, then again to get the actual files and folders.
// Keep a cache of node_modules content and package.json data, so that the
// second walk doesn't have to re-do all the same work.

const bundleWalk = npmBundled;
const BundleWalker = bundleWalk.BundleWalker;

const ignoreWalk = lib$1;
const IgnoreWalker = ignoreWalk.Walker;

const rootBuiltinRules = Symbol('root-builtin-rules');
const packageNecessaryRules = Symbol('package-necessary-rules');
const path = path__default["default"];

const normalizePackageBin = npmNormalizePackageBin;

// Weird side-effect of this: a readme (etc) file will be included
// if it exists anywhere within a folder with a package.json file.
// The original intent was only to include these files in the root,
// but now users in the wild are dependent on that behavior for
// localized documentation and other use cases.  Adding a `/` to
// these rules, while tempting and arguably more "correct", is a
// significant change that will break existing use cases.
const packageMustHaveFileNames = 'readme|copying|license|licence';

const packageMustHaves = `@(${packageMustHaveFileNames}){,.*[^~$]}`;
const packageMustHavesRE = new RegExp(`^(${packageMustHaveFileNames})(\\..*[^~$])?$`, 'i');

const fs = require$$0__default["default"];
const glob = requireGlob();
const globify = pattern => pattern.split('\\').join('/');

const pathHasPkg = (input) => {
  if (!input.startsWith('node_modules/')) {
    return false
  }

  const segments = input.slice('node_modules/'.length).split('/', 2);
  return segments[0].startsWith('@')
    ? segments.length === 2
    : true
};

const pkgFromPath = (input) => {
  const segments = input.slice('node_modules/'.length).split('/', 2);
  return segments[0].startsWith('@')
    ? segments.join('/')
    : segments[0]
};

const defaultRules = [
  '.npmignore',
  '.gitignore',
  '**/.git',
  '**/.svn',
  '**/.hg',
  '**/CVS',
  '**/.git/**',
  '**/.svn/**',
  '**/.hg/**',
  '**/CVS/**',
  '/.lock-wscript',
  '/.wafpickle-*',
  '/build/config.gypi',
  'npm-debug.log',
  '**/.npmrc',
  '.*.swp',
  '.DS_Store',
  '**/.DS_Store/**',
  '._*',
  '**/._*/**',
  '*.orig',
  '/package-lock.json',
  '/yarn.lock',
  '/pnpm-lock.yaml',
  '/archived-packages/**',
];

// There may be others, but :?|<> are handled by node-tar
const nameIsBadForWindows = file => /\*/.test(file);

class Walker extends IgnoreWalker {
  constructor (opt) {
    opt = opt || {};

    // the order in which rules are applied.
    opt.ignoreFiles = [
      rootBuiltinRules,
      'package.json',
      '.npmignore',
      '.gitignore',
      packageNecessaryRules,
    ];

    opt.includeEmpty = false;
    opt.path = opt.path || process.cwd();

    // only follow links in the root node_modules folder, because if those
    // folders are included, it's because they're bundled, and bundles
    // should include the contents, not the symlinks themselves.
    // This regexp tests to see that we're either a node_modules folder,
    // or a @scope within a node_modules folder, in the root's node_modules
    // hierarchy (ie, not in test/foo/node_modules/ or something).
    const followRe = /^(?:\/node_modules\/(?:@[^/]+\/[^/]+|[^/]+)\/)*\/node_modules(?:\/@[^/]+)?$/;
    const rootPath = opt.parent ? opt.parent.root : opt.path;
    const followTestPath = opt.path.replace(/\\/g, '/').slice(rootPath.length);
    opt.follow = followRe.test(followTestPath);

    super(opt);

    // ignore a bunch of things by default at the root level.
    // also ignore anything in the main project node_modules hierarchy,
    // except bundled dependencies
    if (this.isProject) {
      this.bundled = opt.bundled || [];
      this.bundledScopes = Array.from(new Set(
        this.bundled.filter(f => /^@/.test(f))
          .map(f => f.split('/')[0])));
      const rules = defaultRules.join('\n') + '\n';
      this.packageJsonCache = this.parent ? this.parent.packageJsonCache
        : (opt.packageJsonCache || new Map());
      super.onReadIgnoreFile(rootBuiltinRules, rules, _ => _);
    } else {
      this.bundled = [];
      this.bundledScopes = [];
      this.packageJsonCache = this.parent.packageJsonCache;
    }
  }

  get isProject () {
    return !this.parent || this.parent.follow && this.isSymbolicLink
  }

  onReaddir (entries) {
    if (this.isProject) {
      entries = entries.filter(e =>
        e !== '.git' &&
        !(e === 'node_modules' && this.bundled.length === 0)
      );
    }

    // if we have a package.json, then look in it for 'files'
    // we _only_ do this in the root project, not bundled deps
    // or other random folders.  Bundled deps are always assumed
    // to be in the state the user wants to include them, and
    // a package.json somewhere else might be a template or
    // test or something else entirely.
    if (!this.isProject || !entries.includes('package.json')) {
      return super.onReaddir(entries)
    }

    // when the cache has been seeded with the root manifest,
    // we must respect that (it may differ from the filesystem)
    const ig = path.resolve(this.path, 'package.json');

    if (this.packageJsonCache.has(ig)) {
      const pkg = this.packageJsonCache.get(ig);

      // fall back to filesystem when seeded manifest is invalid
      if (!pkg || typeof pkg !== 'object') {
        return this.readPackageJson(entries)
      }

      // feels wonky, but this ensures package bin is _always_
      // normalized, as well as guarding against invalid JSON
      return this.getPackageFiles(entries, JSON.stringify(pkg))
    }

    this.readPackageJson(entries);
  }

  onReadPackageJson (entries, er, pkg) {
    if (er) {
      this.emit('error', er);
    } else {
      this.getPackageFiles(entries, pkg);
    }
  }

  mustHaveFilesFromPackage (pkg) {
    const files = [];
    if (pkg.browser) {
      files.push('/' + pkg.browser);
    }
    if (pkg.main) {
      files.push('/' + pkg.main);
    }
    if (pkg.bin) {
      // always an object because normalized already
      for (const key in pkg.bin) {
        files.push('/' + pkg.bin[key]);
      }
    }
    files.push(
      '/package.json',
      '/npm-shrinkwrap.json',
      '!/package-lock.json',
      packageMustHaves
    );
    return files
  }

  getPackageFiles (entries, pkg) {
    try {
      // XXX this could be changed to use read-package-json-fast
      // which handles the normalizing of bins for us, and simplifies
      // the test for bundleDependencies and bundledDependencies later.
      // HOWEVER if we do this, we need to be sure that we're careful
      // about what we write back out since rpj-fast removes some fields
      // that the user likely wants to keep. it also would add a second
      // file read that we would want to optimize away.
      pkg = normalizePackageBin(JSON.parse(pkg.toString()));
    } catch (er) {
      // not actually a valid package.json
      return super.onReaddir(entries)
    }

    const ig = path.resolve(this.path, 'package.json');
    this.packageJsonCache.set(ig, pkg);

    // no files list, just return the normal readdir() result
    if (!Array.isArray(pkg.files)) {
      return super.onReaddir(entries)
    }

    pkg.files.push(...this.mustHaveFilesFromPackage(pkg));

    // If the package has a files list, then it's unlikely to include
    // node_modules, because why would you do that?  but since we use
    // the files list as the effective readdir result, that means it
    // looks like we don't have a node_modules folder at all unless we
    // include it here.
    if ((pkg.bundleDependencies || pkg.bundledDependencies) && entries.includes('node_modules')) {
      pkg.files.push('node_modules');
    }

    const patterns = Array.from(new Set(pkg.files)).reduce((set, pattern) => {
      const excl = pattern.match(/^!+/);
      if (excl) {
        pattern = pattern.slice(excl[0].length);
      }
      // strip off any / or ./ from the start of the pattern.  /foo => foo, ./foo => foo
      pattern = pattern.replace(/^\.?\/+/, '');
      // an odd number of ! means a negated pattern.  !!foo ==> foo
      const negate = excl && excl[0].length % 2 === 1;
      set.push({ pattern, negate });
      return set
    }, []);

    let n = patterns.length;
    const set = new Set();
    const negates = new Set();
    const results = [];
    const then = (pattern, negate, er, fileList, i) => {
      if (er) {
        return this.emit('error', er)
      }

      results[i] = { negate, fileList };
      if (--n === 0) {
        processResults(results);
      }
    };
    const processResults = processed => {
      for (const { negate, fileList } of processed) {
        if (negate) {
          fileList.forEach(f => {
            f = f.replace(/\/+$/, '');
            set.delete(f);
            negates.add(f);
          });
        } else {
          fileList.forEach(f => {
            f = f.replace(/\/+$/, '');
            set.add(f);
            negates.delete(f);
          });
        }
      }

      const list = Array.from(set);
      // replace the files array with our computed explicit set
      pkg.files = list.concat(Array.from(negates).map(f => '!' + f));
      const rdResult = Array.from(new Set(
        list.map(f => f.replace(/^\/+/, ''))
      ));
      super.onReaddir(rdResult);
    };

    // maintain the index so that we process them in-order only once all
    // are completed, otherwise the parallelism messes things up, since a
    // glob like **/*.js will always be slower than a subsequent !foo.js
    patterns.forEach(({ pattern, negate }, i) =>
      this.globFiles(pattern, (er, res) => then(pattern, negate, er, res, i)));
  }

  filterEntry (entry, partial) {
    // get the partial path from the root of the walk
    const p = this.path.slice(this.root.length + 1);
    const { isProject } = this;
    const pkg = isProject && pathHasPkg(entry)
      ? pkgFromPath(entry)
      : null;
    const rootNM = isProject && entry === 'node_modules';
    const rootPJ = isProject && entry === 'package.json';

    return (
      // if we're in a bundled package, check with the parent.
      /^node_modules($|\/)/i.test(p) && !this.isProject ? this.parent.filterEntry(
        this.basename + '/' + entry, partial)

      // if package is bundled, all files included
      // also include @scope dirs for bundled scoped deps
      // they'll be ignored if no files end up in them.
      // However, this only matters if we're in the root.
      // node_modules folders elsewhere, like lib/node_modules,
      // should be included normally unless ignored.
      : pkg ? this.bundled.indexOf(pkg) !== -1 ||
        this.bundledScopes.indexOf(pkg) !== -1

      // only walk top node_modules if we want to bundle something
      : rootNM ? !!this.bundled.length

      // always include package.json at the root.
      : rootPJ ? true

      // always include readmes etc in any included dir
      : packageMustHavesRE.test(entry) ? true

      // npm-shrinkwrap and package.json always included in the root pkg
      : isProject && (entry === 'npm-shrinkwrap.json' || entry === 'package.json')
        ? true

      // package-lock never included
        : isProject && entry === 'package-lock.json' ? false

        // otherwise, follow ignore-walk's logic
        : super.filterEntry(entry, partial)
    )
  }

  filterEntries () {
    if (this.ignoreRules['.npmignore']) {
      this.ignoreRules['.gitignore'] = null;
    }
    this.filterEntries = super.filterEntries;
    super.filterEntries();
  }

  addIgnoreFile (file, then) {
    const ig = path.resolve(this.path, file);
    if (file === 'package.json' && !this.isProject) {
      then();
    } else if (this.packageJsonCache.has(ig)) {
      this.onPackageJson(ig, this.packageJsonCache.get(ig), then);
    } else {
      super.addIgnoreFile(file, then);
    }
  }

  onPackageJson (ig, pkg, then) {
    this.packageJsonCache.set(ig, pkg);

    if (Array.isArray(pkg.files)) {
      // in this case we already included all the must-haves
      super.onReadIgnoreFile('package.json', pkg.files.map(
        f => '!' + f
      ).join('\n') + '\n', then);
    } else {
      // if there's a bin, browser or main, make sure we don't ignore it
      // also, don't ignore the package.json itself, or any files that
      // must be included in the package.
      const rules = this.mustHaveFilesFromPackage(pkg).map(f => `!${f}`);
      const data = rules.join('\n') + '\n';
      super.onReadIgnoreFile(packageNecessaryRules, data, then);
    }
  }

  // override parent stat function to completely skip any filenames
  // that will break windows entirely.
  // XXX(isaacs) Next major version should make this an error instead.
  stat ({ entry, file, dir }, then) {
    if (nameIsBadForWindows(entry)) {
      then();
    } else {
      super.stat({ entry, file, dir }, then);
    }
  }

  // override parent onstat function to nix all symlinks, other than
  // those coming out of the followed bundled symlink deps
  onstat ({ st, entry, file, dir, isSymbolicLink }, then) {
    if (st.isSymbolicLink()) {
      then();
    } else {
      super.onstat({ st, entry, file, dir, isSymbolicLink }, then);
    }
  }

  onReadIgnoreFile (file, data, then) {
    if (file === 'package.json') {
      try {
        const ig = path.resolve(this.path, file);
        this.onPackageJson(ig, JSON.parse(data), then);
      } catch (er) {
        // ignore package.json files that are not json
        then();
      }
    } else {
      super.onReadIgnoreFile(file, data, then);
    }
  }

  sort (a, b) {
    // optimize for compressibility
    // extname, then basename, then locale alphabetically
    // https://twitter.com/isntitvacant/status/1131094910923231232
    const exta = path.extname(a).toLowerCase();
    const extb = path.extname(b).toLowerCase();
    const basea = path.basename(a).toLowerCase();
    const baseb = path.basename(b).toLowerCase();

    return exta.localeCompare(extb, 'en') ||
      basea.localeCompare(baseb, 'en') ||
      a.localeCompare(b, 'en')
  }

  globFiles (pattern, cb) {
    glob(globify(pattern), { dot: true, cwd: this.path, nocase: true }, cb);
  }

  readPackageJson (entries) {
    fs.readFile(this.path + '/package.json', (er, pkg) =>
      this.onReadPackageJson(entries, er, pkg));
  }

  walker (entry, opt, then) {
    new Walker(this.walkerOpt(entry, opt)).on('done', then).start();
  }
}

const walk = (options, callback) => {
  options = options || {};
  const p = new Promise((resolve, reject) => {
    const bw = new BundleWalker(options);
    bw.on('done', bundled => {
      options.bundled = bundled;
      options.packageJsonCache = bw.packageJsonCache;
      new Walker(options).on('done', resolve).on('error', reject).start();
    });
    bw.start();
  });
  return callback ? p.then(res => callback(null, res), callback) : p
};

var lib = walk;
walk.Walker = Walker;

/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node {
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

class Queue {
	#head;
	#tail;
	#size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
		if (!current) {
			return;
		}

		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}

function pLimit(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = new Queue();
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.size > 0) {
			queue.dequeue()();
		}
	};

	const run = async (fn, resolve, args) => {
		activeCount++;

		const result = (async () => fn(...args))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (fn, resolve, args) => {
		queue.enqueue(run.bind(undefined, fn, resolve, args));

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// when the run function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency && queue.size > 0) {
				queue.dequeue()();
			}
		})();
	};

	const generator = (fn, ...args) => new Promise(resolve => {
		enqueue(fn, resolve, args);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value: () => {
				queue.clear();
			},
		},
	});

	return generator;
}

class EndError extends Error {
	constructor(value) {
		super();
		this.value = value;
	}
}

// The input can also be a promise, so we await it.
const testElement = async (element, tester) => tester(await element);

// The input can also be a promise, so we `Promise.all()` them both.
const finder = async element => {
	const values = await Promise.all(element);
	if (values[1] === true) {
		throw new EndError(values[0]);
	}

	return false;
};

async function pLocate(
	iterable,
	tester,
	{
		concurrency = Number.POSITIVE_INFINITY,
		preserveOrder = true,
	} = {},
) {
	const limit = pLimit(concurrency);

	// Start all the promises concurrently with optional limit.
	const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

	// Check the promises either serially or concurrently.
	const checkLimit = pLimit(preserveOrder ? 1 : Number.POSITIVE_INFINITY);

	try {
		await Promise.all(items.map(element => checkLimit(finder, element)));
	} catch (error) {
		if (error instanceof EndError) {
			return error.value;
		}

		throw error;
	}
}

const typeMappings = {
	directory: 'isDirectory',
	file: 'isFile',
};

function checkType(type) {
	if (type in typeMappings) {
		return;
	}

	throw new Error(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

async function locatePath(
	paths,
	{
		cwd = process__default["default"].cwd(),
		type = 'file',
		allowSymlinks = true,
		concurrency,
		preserveOrder,
	} = {},
) {
	checkType(type);

	const statFunction = allowSymlinks ? require$$0.promises.stat : require$$0.promises.lstat;

	return pLocate(paths, async path_ => {
		try {
			const stat = await statFunction(path__default["default"].resolve(cwd, path_));
			return matchType(type, stat);
		} catch {
			return false;
		}
	}, {concurrency, preserveOrder});
}

const findUpStop = Symbol('findUpStop');

async function findUpMultiple(name, options = {}) {
	let directory = path__default["default"].resolve(options.cwd || '');
	const {root} = path__default["default"].parse(directory);
	const stopAt = path__default["default"].resolve(directory, options.stopAt || root);
	const limit = options.limit || Number.POSITIVE_INFINITY;
	const paths = [name].flat();

	const runMatcher = async locateOptions => {
		if (typeof name !== 'function') {
			return locatePath(paths, locateOptions);
		}

		const foundPath = await name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath([foundPath], locateOptions);
		}

		return foundPath;
	};

	const matches = [];
	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await runMatcher({...options, cwd: directory});

		if (foundPath === findUpStop) {
			break;
		}

		if (foundPath) {
			matches.push(path__default["default"].resolve(directory, foundPath));
		}

		if (directory === stopAt || matches.length >= limit) {
			break;
		}

		directory = path__default["default"].dirname(directory);
	}

	return matches;
}

async function findUp(name, options = {}) {
	const matches = await findUpMultiple(name, {...options, limit: 1});
	return matches[0];
}

async function pkgUp({cwd} = {}) {
	return findUp('package.json', {cwd});
}

var name = "build-this-branch";
var version = "0.0.0-semantic-release";
var description = "Script to automate creating built branches";

async function assertCleanTree() {
  const { stdout } = await execa("git", ["status", "--porcelain", "--untracked-files=no"]).catch((error) => {
    if (error.stderr.includes("not a git repository")) {
      throw new Error("Not in a git repository");
    }
    throw error;
  });
  if (stdout) {
    throw new Error("Working tree is not clean");
  }
}
async function getCurrentBranchOrTagName() {
  const silenceError = () => {
  };
  const branch = await execa("git", ["symbolic-ref", "--short", "-q", "HEAD"]).then(({ stdout }) => stdout, silenceError);
  if (branch) {
    return branch;
  }
  const tag = await execa("git", ["describe", "--tags"]).then(({ stdout }) => stdout, silenceError);
  if (tag) {
    return tag;
  }
  throw new Error("Failed to get current branch name");
}
async function readJson(path) {
  const jsonString = await require$$0__default["default"].promises.readFile(path, "utf8");
  try {
    return JSON.parse(jsonString);
  } catch {
    throw new Error(`Failed to parse JSON file: ${path}`);
  }
}
const { stringify } = JSON;
(async () => {
  const argv = ae({
    name,
    version,
    flags: {
      builtBranch: {
        type: String,
        alias: "b",
        placeholder: "<branch name>",
        description: 'The name of the built branch. Defaults to prefixing "built/" to the current branch or tag name.'
      },
      buildCommand: {
        type: String,
        alias: "c",
        placeholder: "<command>",
        description: "The command to build the branch.",
        default: "npm run build"
      },
      remote: {
        type: String,
        alias: "r",
        placeholder: "<remote>",
        description: "The remote to push to.",
        default: "origin"
      },
      dry: {
        type: Boolean,
        alias: "d",
        description: "Dry run mode. Will not build, commit, or push to the remote."
      }
    },
    help: {
      description
    }
  });
  await assertCleanTree();
  const branchFrom = await getCurrentBranchOrTagName();
  const packageJsonPath = await pkgUp();
  if (!packageJsonPath) {
    throw new Error("No package.json found");
  }
  const packageJson = await readJson(packageJsonPath);
  const {
    builtBranch = `built/${branchFrom}`,
    buildCommand,
    remote,
    dry
  } = argv.flags;
  await Qp(`Building branch ${stringify(branchFrom)} \u2192 ${stringify(builtBranch)}`, async ({
    task: task2,
    setTitle,
    setStatus,
    setOutput
  }) => {
    if (dry) {
      setStatus("Dry run");
    }
    const localBuiltBranch = `build-this-branch/${builtBranch}-${Date.now()}`;
    let success = false;
    try {
      let publishFiles = [];
      const createBuild = await task2(`Creating build with ${stringify(buildCommand)}`, async ({ setWarning, setTitle: setTitle2 }) => {
        if (!buildCommand) {
          setTitle2("No build command passed in. Skipping build.");
          if (dry) {
            setWarning("");
          }
          return;
        }
        if (dry) {
          setWarning("");
          return;
        }
        await require$$2$1.promisify(childProcess__default["default"].exec)(buildCommand);
      });
      if (!dry) {
        createBuild.clear();
      }
      const getPublishFiles = await task2("Getting publish files", async ({ setWarning }) => {
        if (dry) {
          setWarning("");
          return;
        }
        publishFiles = await lib();
        if (publishFiles.length === 0) {
          throw new Error("No publish files found");
        }
      });
      if (!dry) {
        getPublishFiles.clear();
      }
      const removePrepack = await task2("Removing prepack & prepare scripts", async ({ setWarning }) => {
        if (dry) {
          setWarning("");
          return;
        }
        if (!("scripts" in packageJson)) {
          return;
        }
        const { scripts } = packageJson;
        let mutated = false;
        if ("prepack" in scripts) {
          delete scripts.prepack;
          mutated = true;
        }
        if ("prepare" in scripts) {
          delete scripts.prepare;
          mutated = true;
        }
        if (mutated) {
          await require$$0__default["default"].promises.writeFile(packageJsonPath, stringify(packageJson, null, 2));
        }
      });
      if (!dry) {
        removePrepack.clear();
      }
      const checkoutBranch = await task2(`Checking out branch ${stringify(builtBranch)}`, async ({ setWarning }) => {
        if (dry) {
          setWarning("");
          return;
        }
        await execa("git", ["checkout", "--orphan", localBuiltBranch]);
        await execa("git", ["reset"]);
      });
      if (!dry) {
        checkoutBranch.clear();
      }
      const commit = await task2("Commiting distribution assets", async ({ setWarning }) => {
        if (dry) {
          setWarning("");
          return;
        }
        await execa("git", ["add", "-f", ...publishFiles]);
        await execa("git", ["commit", "-nm", `Built from ${stringify(branchFrom)}`]);
      });
      if (!dry) {
        commit.clear();
      }
      const push = await task2(`Force pushing branch ${stringify(builtBranch)} to remote ${stringify(remote)}`, async ({ setWarning }) => {
        if (dry) {
          setWarning("");
          return;
        }
        await execa("git", ["push", "-f", remote, `${localBuiltBranch}:${builtBranch}`]);
        success = true;
      });
      if (!dry) {
        push.clear();
      }
    } finally {
      const revertBranch = await task2(`Switching branch back to ${stringify(branchFrom)}`, async ({ setWarning }) => {
        if (dry) {
          setWarning("");
          return;
        }
        await execa("git", ["reset", "--hard"]);
        await execa("git", ["checkout", "-f", branchFrom]);
        await execa("git", ["branch", "-D", localBuiltBranch]);
      });
      revertBranch.clear();
    }
    if (success) {
      let remoteUrl = remote;
      try {
        const { stdout } = await execa("git", ["remote", "get-url", remoteUrl]);
        remoteUrl = stdout.trim();
      } catch {
      }
      const parsedGitUrl = remoteUrl.match(/github\.com:(.+)\.git$/);
      if (parsedGitUrl) {
        const [, repo] = parsedGitUrl;
        setTitle("Successfully built branch! Install with command:");
        setOutput(`npm i '${repo}#${builtBranch}'`);
      }
    }
  });
})().catch((error) => {
  console.log("Error:", error.message);
  process.exit(1);
});
