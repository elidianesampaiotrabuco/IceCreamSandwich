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

  shout (args) {
    return new Promise((resolve, reject) => {
      const timeInMilliseconds = args.SHOUT * 1000;
      setTimeout(() => {
        resolve();
      }, timeInMilliseconds);
    });
  }
}
Scratch.extensions.register(new LooksExtension());
})(Scratch);
