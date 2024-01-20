(function (Scratch){
    'use strict';

    class Extension {
        getInfo() {
            return {
                id: "VARIABLES",
                name: "Variables Expansion",
                blocks: [
                    
                ]
            }
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)