/* this is the testing extension, to find out what works and what does not. */

(function (Scratch) {
    class Extension {
        static get SAY_OR_THINK () {
            return 'SAY';
        }
        getInfo() {
            return {
                name: "Test Extension",
                id: "TESTEXTENSION",
                blocks: [
                    {
                        opcode: 'showAllsprites',
                        text: 'show all sprites',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {}
                      },
                      {
                        opcode: 'hideAllsprites',
                        text: 'hide all sprites',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {}
                      },
                      "---",
                      {
                        opcode: 'TEST',
                        text: 'RGB',
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {},
                        color1: '#ff0000', /* with my research, penguinmod has added a feature where your extension blocks can have custom colors individiully. */
                        color2: '#00ff00',
                        color3: '#0000ff'
                      },
                      "---",
                      {
                        opcode: 'BRANCHES',
                        text: 'boolean branches',
                        blockType: Scratch.BlockType.BOOLEAN,
                        branchCount: 4,
                        isTerminal: true,
                        arguments: {},
                      },
                      {
                        opcode: 'Shout',
                        text: 'shout [SHOUT]',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SHOUT: {
                                type: Scratch.ArgumentType.STRING,
                            }
                        },
                      },
                ]
            }
        }
        showAllsprites(args, util) {
            Scratch.vm.runtime.targets.setVisible(true) // tested and does not infact work.
        }
        hideAllsprites(args, util) {
            Scratch.vm.runtime.targets.setVisible(false) // tested and does not infact work.
        }
        TEST(){
            return 'RGB';
        }
        BRANCHES(){
            return ' ';
        }
        Shout (args, util) {
            Scratch.vm.runtime.emit(Extension.SAY_OR_THINK, util.target, 'shout', args.SHOUT);
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);