let warningWithoutStack = () => {};

if (__DEV__) {
  warningWithoutStack = function(condition, format, ...args) {
    if (format === undefined) {
      throw new Error(
        '`warningWithoutStack(condition, format, ...args)` requires a warning ' +
          'message argument',
      );
    }
    if (args.length > 8) {
      throw new Error(
        'warningWithoutStack() currently supports at most 8 arguments.',
      );
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      const argsWithFormat = args.map(item => '' + item);
      argsWithFormat.unshift('Warning: ' + format);

      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }
    try {
      let argIndex = 0;
      const message =
        'Warning: ' + format.replace(/%s/g, () => args[argIndex++]);
      throw new Error(message);
    } catch (x) {}
  };
}

export default warningWithoutStack;