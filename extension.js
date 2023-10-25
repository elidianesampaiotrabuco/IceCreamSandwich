(function(Scratch) {
  'use strict';

class LooksExtension {
  getInfo() {
    return {
      id: 'looksexample',
      name: 'Looks Expansion',
      color1: "#9966ff",
      blocks: [
        {
          opcode: 'shout',
          text: 'shout [SHOUT]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            SHOUT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello!'
            }
          }
        },
	{
          opcode: 'shout_for_seconds',
          text: 'shout [SHOUT] for [NUMBER] seconds',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            SHOUT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello!'
            },
	    NUMBER: {
	      type: Scratch.ArgumentType.NUMBER,
	      defaultValue: 2
	    }
          }
        }
      ]
    };
  }
  static get SAY_OR_THINK () {
    // There are currently many places in the codebase which explicitly refer to this event by the string 'SAY',
    // so keep this as the string 'SAY' for now rather than changing it to 'SAY_OR_THINK' and breaking things.
    return 'SAY';
  }
  shout (args, util) {
    const message = args.SHOUT;
    this._say(message, util.target);
  }
  _say (message, target) { // used by compiler
    this.runtime.emit(LooksExtension.SAY_OR_THINK, target, 'say', message);
  }
}
Scratch.extensions.register(new LooksExtension());
})(Scratch);
