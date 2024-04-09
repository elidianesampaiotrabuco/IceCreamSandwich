(function (Scratch){
    'use strict';

    class Extension {
        getInfo() {
            return {
                id: "VARIABLES",
                name: "Variables Expansion",
                blocks: [
                    {
                        opcode: "SetVarToVar",
                        text: "set [var1] to [var2]",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            var1: {
                                type: Scratch.ArgumentType.STRING
                            },
                            var2: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                ]
            }
        }
        SetVarToVar(args, util){
            
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)