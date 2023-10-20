(function(Scratch) {
  const variables = {};
  class Extension {
      getInfo() {
          return {
              id: "ExtraInputs",
              name: "More Inputs",
              color1: "#585abf",
              color2: "#444594",
              blocks: [
                {
                    blockType: "label",
                    text: "Numeric Input",
                  },
                  {
                    opcode: 'NumberInput',
                    text: 'number Input [TYPEIN]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                      TYPEIN: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: '1'
                      }
                    }
                  },
                  {
                    blockType: "label",
                    text: "Empty Input",
                  },
                  {
                    opcode: 'EmptyInput',
                    text: 'empty Input [NOTTYPEIN]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                      NOTTYPEIN: {
                        type: Scratch.ArgumentType,
                      }
                    }
                  },
                  {
                    blockType: "label",
                    text: "Boolean Input",
                  },
                  {
                    opcode: 'BooleanInput',
                    text: 'boolean [NOTTYPEIN]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                      NOTTYPEIN: {
                        type: Scratch.ArgumentType.BOOLEAN,
                      }
                    }
                  },
                  {
                    blockType: "label",
                    text: "Color Picker",
                  },
                  {
                    opcode: 'ColorInput',
                    text: 'color input [NOTTYPEIN]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                      NOTTYPEIN: {
                        type: Scratch.ArgumentType.COLOR,
                      }
                    }
                  },
              ],
          };
      }
      NumberInput(args) {
        return args.TYPEIN
      }
      EmptyInput(args) {
        return args.NOTTYPEIN
      }
      BooleanInput(args) {
        return args.NOTTYPEIN
      }
      ColorInput(args) {
        return args.NOTTYPEIN
      }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);