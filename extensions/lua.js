(function(Scratch) {
    const variables = {};
    let fengari = null;
    let lua = null;
    let lauxlib = null;
    let lualib = null;
    let L = null;

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("this extension must be run unsandboxed");
    }

    class Extension {
        constructor() {
            this.loadPyodideOnce();
        }

        async loadPyodideOnce() {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.js";

            script.onload = async () => {
                console.log("Fengari script loaded!");
                fengari = window.fengari;
                lua = fengari.lua;
                lauxlib = fengari.lauxlib;
                lualib = fengari.lualib;
                L = lua.luaL_newstate();
                lualib.luaL_openlibs(L);
                console.log("Fengari is ready!");
            };

            document.head.appendChild(script);
        }
        getInfo() {
            return {
              id: "LUA",
              name: "Lua (Fengari)",
              blocks: [
                {
                  opcode: 'runLua',
                  text: 'run lua code [CODE]',
                  blockType: Scratch.BlockType.COMMAND,
                  arguments: {
                    CODE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: `print("Hello World!")`
                    }
                  }
                },
                {
                  opcode: 'runLua_Reporter',
                  text: 'run lua code [CODE]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {
                    CODE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: `return (2 + 2)`
                    }
                  }
                },
                {
                  opcode: 'runLua_Boolean',
                  text: 'run lua code [CODE]',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {
                    CODE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: `return (3 > 2)`
                    }
                  }
                },
              ]
            }
        }
        async checkForFengari() {
            if (!fengari) {
                console.log("Fengari isn't ready yet!");
                return;
            }
        }
        async runLua(args) {
            try {
                this.runLuaCode(args.CODE);
            } catch (e) {
                console.error("Lua error:", e);
                throw new Error(e);
            }
        }
        async runLuaCode(code) {
            await this.checkForFengari();
        
            const luaCode = code.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

            const status = lauxlib.luaL_loadstring(L, fengari.to_luastring(luaCode));

            if (status !== lua.LUA_OK) {
                const msg = fengari.to_jsstring(lua.lua_tostring(L, -1));
                lua.lua_pop(L, 1);
                throw new Error("Lua syntax error: " + msg);
            }

            const result = lua.lua_pcall(L, 0, lua.LUA_MULTRET, 0);
            if (result !== lua.LUA_OK) {
                const msg = fengari.to_jsstring(lua.lua_tostring(L, -1));
                lua.lua_pop(L, 1);
                throw new Error("Lua runtime error: " + msg);
            }
        }
        async runLua_Reporter(args) {
            await this.checkForFengari();
        
            try {
                const code = args.CODE.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

                const wrappedCode = `
                    function __scratch_return()
                        ${code}
                    end
                `;

                lauxlib.luaL_loadstring(L, fengari.to_luastring(wrappedCode));
                lua.lua_pcall(L, 0, 0, 0);

                lua.lua_getglobal(L, fengari.to_luastring("__scratch_return"));
                lua.lua_pcall(L, 0, 1, 0);

                let retVal;
                if (lua.lua_isstring(L, -1)) {
                    retVal = fengari.to_jsstring(lua.lua_tostring(L, -1));
                } else if (lua.lua_isnumber(L, -1)) {
                    retVal = lua.lua_tonumber(L, -1);
                } else if (lua.lua_isboolean(L, -1)) {
                    retVal = lua.lua_toboolean(L, -1);
                } else if (lua.lua_isnil(L, -1)) {
                    retVal = "";
                } else {
                    retVal = "[Lua value]";
                }

                lua.lua_pop(L, 1);
                return retVal;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        async runLua_Boolean(args) {
            await this.checkForFengari();
        
            try {
                const code = args.CODE.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                const wrappedCode = `
                    function __scratch_return()
                        ${code}
                    end
                `;

                lauxlib.luaL_loadstring(L, fengari.to_luastring(wrappedCode));
                lua.lua_pcall(L, 0, 0, 0);

                lua.lua_getglobal(L, fengari.to_luastring("__scratch_return"));
                lua.lua_pcall(L, 0, 1, 0);

                const val = lua.lua_toboolean(L, -1);
                lua.lua_pop(L, 1);
                return val;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);