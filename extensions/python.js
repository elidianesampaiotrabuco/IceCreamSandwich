(function(Scratch) {
    const variables = {};
    let pyodide = null;
    class Extension {
        constructor() {
            this.loadPyodideOnce();
        }

        async loadPyodideOnce() {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/pyodide.js";

            script.onload = async () => {
                console.log("Pyodide script loaded!");
                pyodide = await loadPyodide();
                console.log("Pyodide is ready!");
            };

            document.head.appendChild(script);
        }
        getInfo() {
            return {
              id: "PYTHON",
              name: "PYTHON",
              blocks: [
                {
                    opcode: 'PYTHON_runPython',
                    text: 'run python [CODE]',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                      CODE: {
                          type: Scratch.ArgumentType.STRING,
                          defaultValue: `import js\njs.alert("Hello World!")`
                      }
                    }
                  },
                {
                  opcode: 'PYTHON_runPython_Reporter',
                  text: 'run python [CODE]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {
                    CODE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: `def square(n):\n\treturn n * n\nsquare(7)`
                    }
                  }
                },
              ]
            }
        }
        async PYTHON_runPython_Reporter(args) {
            if (!pyodide) {
                console.log("Pyodide not ready yet!");
                return;
            }
        
            try {
                const cleanCode = args.CODE
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t');
        
                const result = await pyodide.runPythonAsync(cleanCode);
                console.log("Python returned:", result);
                return result
            } catch (e) {
                console.error("Python error:", e);
            }
        }
        async PYTHON_runPython(args) {
            if (!pyodide) {
                console.log("Pyodide not ready yet!");
                return;
            }
        
            try {
                const cleanCode = args.CODE
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t');
        
                await pyodide.runPythonAsync(cleanCode);
            } catch (e) {
                console.error("Python error:", e);
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);