(function (Scratch){
    'use strict';
    const variables = {};

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
            variables[args.var1] = args.var2
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)