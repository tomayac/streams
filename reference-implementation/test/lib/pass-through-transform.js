import ReadableStream from '../../lib/readable-stream';
import WritableStream from '../../lib/writable-stream';

// TODO: an evolved form of this should be part of the standard library. Although before that happens it needs to
// handle aborts/cancels/errors correctly.

export default function makeSimpleTransformStream() {
  var pushToOutput;
  var closeOutput;

  return {
    input : new WritableStream({
      write : function (data, done, error) {
        pushToOutput(data);
        done();
      },

      close : function () {
        closeOutput();
      }
    }),

    output : new ReadableStream({
      start : function (push, close) {
        pushToOutput = push;
        closeOutput = close;
      }
    })
  };
}
