(function(Scratch) {
    const variables = {};
    class Extension {
        getInfo() {
            return {
              id: "TEMPLATE",
              name: "Template",
              blocks: [
                {
                  opcode: 'a',
                  text: 'command',
                  blockType: Scratch.BlockType.COMMAND,
                  arguments: {}
                },
                {
                  opcode: 'b',
                  text: 'reporter',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {}
                },
                {
                  opcode: 'c',
                  text: 'boolean',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {}
                },
                {
                  opcode: 'd',
                  text: 'hat',
                  blockType: Scratch.BlockType.HAT,
                  arguments: {}
                },
              ]
            }
        }
        a() {
          
        }
        b() {
          
        }
        c() {
          
        }
        d() {
          
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);