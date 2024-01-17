(function(Scratch) {
  const variables = {};

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("TurboBuilder must run unsandboxed");
  }

  class Extension {
      getInfo() {
          return {
              id: "Turbobuilder",
              name: "TurboBuilder",
              color1: "#ff6680",
              blocks: [
                  {
                    func: 'JScodeClipboard',
                    blockType: Scratch.BlockType.BUTTON,
                    text: 'copy extension code to clipboard'
                  },
                  {
                    opcode: 'TurboBuilder_Setup',
                    func: 'Setup',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set up extension [ID] [NAME] [COLOR1]',
                    arguments: {
                      ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'ID'
                      },
                      NAME: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'EXTENSION NAME'
                      },
                      COLOR1: {
                        type: Scratch.ArgumentType.COLOR,
                        defaultValue: '#000000'
                      },
                    }
                  },
                  {
                    opcode: 'TurboBuilder_JScode',
                    func: 'JScode',
                    text: 'extension code',
                    blockType: Scratch.BlockType.REPORTER,
                  },
                  {
                    opcode: 'TurboBuilder_createblock',
                    func: 'createblock',
                    text: 'create block / id [ID] text [TEXT] blockType: [BLOCKTYPE_MENU]',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                      ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "ID"
                      },
                      TEXT: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'text'
                      },
                      BLOCKTYPE_MENU: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'BLOCKTYPE_MENU'
                      },
                    },
                  },
                  {
                    opcode: 'TurboBuilder_addFunctionality',
                    func: 'addFunctionality',
                    text: 'add function [FUNCTIONALITY] / BlockID [BLOCKID]',
                    blockType: Scratch.BlockType.COMMAND,
                    hideFromPalette: false,
                    arguments: {
                      FUNCTIONALITY: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'return true;',
                      },
                      BLOCKID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'ID'
                      },
                    },
                  },
                  {
                    opcode: 'TurboBuilder_addInput',
                    func: 'addInput',
                    text: 'add Input / Parent: [BlockID], ID: [ID] DefaultValue: [TEXT] / ArgumentType: [ARGUMENU]',
                    blockType: Scratch.BlockType.COMMAND,
                    hideFromPalette: true,
                    arguments: {
                      BlockID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'ID'
                      },
                      ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'ID'
                      },
                      TEXT: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'text'
                      },
                      ARGUMENU: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'ARGUMENU'
                      },
                    }
                  },
              ],
              menus: {
                ARGUMENU: {
                  acceptReporters: false,
                  items: [
                    { text: "string", value: "STRING" },
                    { text: "number", value: "NUMBER" },
                    { text: "boolean", value: "BOOLEAN" },
                    { text: "empty", value: "EMPTY" },
                    { text: "color", value: "COLOR" },
                  ]
                },
                BLOCKTYPE_MENU: {
                  acceptReporters: false,
                  items: [
                    { text: "command", value: "COMMAND" },
                    { text: "reporter", value: "REPORTER" },
                    { text: "boolean", value: "BOOLEAN" },
                    { text: "hat", value: "HAT" },
                  ]
                },
              }
          };
      }
      _Clear() {
        localStorage.setItem("SAVE-EXT-" + "LatestInputID", 'Blank');
        localStorage.setItem("SAVE-EXT-" + "LatestInputArgument", 'Blank');
        localStorage.setItem("SAVE-EXT-" + "LatestInputText", 'Blank');
      }
      Setup(args, util) {
        this._Clear()
        const ID = args.ID;
        const ExtName = args.NAME;
        const color1 = args.COLOR1;
        localStorage.setItem("SAVE-EXT-" + "ID", ID)
        localStorage.setItem("SAVE-EXT-" + "ExtName", ExtName)
        localStorage.setItem("SAVE-EXT-" + "color1", color1)
        const Script = `(function(Scratch) {
          const variables = {};
          const blocks = [];
          const menus = [];
      
          class Extension {
              getInfo() {
                  return {
                      "id": "${ID}",
                      "name": "${ExtName}",
                      "color1": "${color1}",
                      "blocks": blocks
                  }
              }   
      }
      `;
      localStorage.setItem("SAVE-EXT-" + "JS", Script)
        
      }
      JScode(args, util){
        return localStorage.getItem("SAVE-EXT-" + "JS") + `Scratch.extensions.register(new Extension());
})(Scratch);`
      }
      JScodeClipboard() {
        let JScode = localStorage.getItem("SAVE-EXT-" + "JS") + `Scratch.extensions.register(new Extension());
      })(Scratch);`
        navigator.clipboard.writeText(JScode);
      }
      createblock(args, util) {
        const BlockID = args.ID;
        const BlockText = args.TEXT;
        const BlockType = args.BLOCKTYPE_MENU;

        const Script = `blocks.push({
        blockType: Scratch.BlockType.${BlockType},
        text: '${BlockText}',
        opcode: '${BlockID}',
        arguments: {}
      });
      Extension.prototype['${BlockID}'] = (args, util) => {
        
      };
      `;
      const LocalStorage_JS = localStorage.getItem("SAVE-EXT-" + "JS");
      localStorage.setItem("SAVE-EXT-" + "JS", LocalStorage_JS + Script);
      }
      addFunctionality(args, util){
        let LocalStorage_JS = localStorage.getItem("SAVE-EXT-" + "JS");
        let BlockID = args.BLOCKID;
        let Function = args.FUNCTIONALITY;
        let [ firstPart, middlePart, secondPart ] = this._splitByTwo(LocalStorage_JS, `Extension.prototype['${BlockID}'] = (args, util) => {
          `, `};`)
        let AfterMath = (firstPart + Function + secondPart)
        localStorage.setItem("SAVE-EXT-" + "JS", AfterMath);
      }
      addInput(args, util) {
        let Script1 = `"${LatestInputID}": {
            type: Scratch.ArgumentType.${LatestInputArgument},
            defaultValue: '${LatestInputText}',
          },
        `;
        let Script2 = `"${InputID}": {
          type: Scratch.ArgumentType.${InputArgument},
          defaultValue: '${InputTEXT}',
        },
      `;
      }
      _splitByTwo(input, splitValue1, splitValue2) {
        // Find the indices of the split values in the input
        let splitIndex1 = input.indexOf(splitValue1);
        let splitIndex2 = input.indexOf(splitValue2);
    
        // Check if both split values are found in the input
        if (splitIndex1 !== -1 && splitIndex2 !== -1) {
            // Determine the starting and ending indices for the split
            let startIndex = Math.min(splitIndex1, splitIndex2);
            let endIndex = Math.max(splitIndex1 + String(splitValue1).length, splitIndex2 + String(splitValue2).length);
    
            // Split the input into two parts based on the specified values
            let firstPart = input.slice(0, startIndex);
            let middlePart = input.slice(startIndex, endIndex);
            let secondPart = input.slice(endIndex);
    
            return [firstPart, middlePart, secondPart];
        } else {
            // Handle case where one or both split values are not found
            return "One or both split values not found in the input.";
        }
      }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);