var ffi = require('ffi');
var ref = require('ref');

var ctxStruct = ref.types.void;
var ctxStructPtr = ref.refType(ctxStruct);
var ctxConfig = ref.types.void;
var ctxConfigPtr = ref.refType(ctxConfig);
var intPtr = ref.refType('int');

var libfact = ffi.Library('libfactfut', {
  'futhark_entry_main': [ 'int', [ ctxStructPtr, intPtr, 'int' ] ],
  'futhark_context_config_new': [ ctxConfigPtr, [  ] ],
  'futhark_context_config_free': [ 'int', [ ctxConfigPtr ] ],
  'futhark_context_new': [ ctxStructPtr, [ ctxConfigPtr ] ],
  'futhark_context_sync': [ 'int', [ ctxStructPtr ] ],
  'futhark_context_free': [ 'int', [ ctxStructPtr ] ],
});


var config = libfact.futhark_context_config_new();
var ctx = libfact.futhark_context_new(config);
if (ctx.isNull()) {
  console.log("Couldn't get context");
}else {
  var result = ref.alloc('int');
  libfact.futhark_entry_main(ctx, result, 10);
  libfact.futhark_context_sync(ctx);
  console.log("Result: ", result.deref());

  libfact.futhark_context_free(ctx);
  libfact.futhark_context_config_free(config);
}
