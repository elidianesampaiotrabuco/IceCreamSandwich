(function(Scratch) {
    const variables = {};

    //variables["isTabTypable"] = false

    function handleKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
  
        const textarea = document.activeElement;
        if (textarea && (textarea.tagName === 'TEXTAREA' || textarea.tagName === 'INPUT')) {
          const cursorPos = textarea.selectionStart;
          const textBefore = textarea.value.substring(0, cursorPos);
          const textAfter = textarea.value.substring(cursorPos);
          textarea.value = textBefore + '\t' + textAfter;
    
          textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
        }
      }
    }

    function addEventForKeydown() {
      document.addEventListener('keydown', handleKeyDown, true);
    }

    function removeEventForKeydown() {
      document.removeEventListener('keydown', handleKeyDown, true);
    }

    class Extension {
        getInfo() {
            return {
              id: "TAB",
              name: "Typable Tab Character",
              blocks: [
                {
                  opcode: 'tab_enabletyping',
                  text: '[ENABLE_MENU] typing for tab character',
                  blockType: Scratch.BlockType.COMMAND,
                  arguments: {
                    ENABLE_MENU: {
                      type: Scratch.ArgumentType.STRING,
                      menu: 'ENABLE_MENU'
                    }
                  }
                },
                /*{
                  opcode: 'tab_whentabKeypressed',
                  text: 'when tab key pressed',
                  blockType: Scratch.BlockType.HAT,
                  arguments: {}
                }*/,
              ],
              menus: {
                ENABLE_MENU: {
                  acceptReporters: true,
                  items: [
                    {
                        text: "enable",
                        value: "true"
                    },
                    {
                        text: "disable",
                        value: "false"
                    }
                  ]
                }
              }
            }
        }
        tab_enabletyping(args, util) {
            //variables["isTabTypable"] = args.ENABLE_MENU
            if (args.ENABLE_MENU == "true") {
              addEventForKeydown()
            } else {
              removeEventForKeydown()
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);