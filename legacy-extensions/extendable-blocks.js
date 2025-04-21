/*
The Block in the extension cannot extend yet.
*/
(function(Scratch) {
    let Blockly = null;

    const loadBlocklyOnce = async () => {
        if (window.Blockly && window.Blockly.Blocks) {
            Blockly = window.Blockly;
            console.log("Blockly already loaded.");
            return;
        }
    
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/blockly/blockly.min.js";
            script.onload = () => {
                Blockly = window.Blockly;
                const waitUntilBlocksAvailable = setInterval(() => {
                    if (Blockly.Blocks) {
                        clearInterval(waitUntilBlocksAvailable);
                        console.log("Blockly is fully ready!");
                        resolve();
                    }
                }, 10);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };    

    const categoryPrefix = 'extendable_'

    const extendable_join_mutator = {
        itemCount_: 0,

        mutationToDom: function () {
            if (!this.itemCount_ && !this.itemCount_) {
                return null;
            }

            const container = Blockly.utils.xml.createElement('mutation');
            if (this.itemCount_) {
              container.setAttribute('item', String(this.itemCount_));
            }
            return container;
        },

        domToMutation: function (xmlElement) {
            this.itemCount_ = parseInt(xmlElement.getAttribute('item'));
            this.rebuildShape_()
        },

        decompose: function (workspace) {
            const containerBlock = workspace.newBlock(`${categoryPrefix}join_mutator_join`);
            containerBlock.initSvg();
            let connection = containerBlock.nextConnection;

            for (let i = 1; i <= this.itemCount_; i++) {
                const itemBlock = workspace.newBlock(`${categoryPrefix}join_mutator_item`);
                itemBlock.initSvg()
                connection.connect(itemBlock.previousConnection);
                connection = itemBlock.nextConnection;
            }

            return containerBlock
        },

        compose: function (containerBlock) {
            let clauseBlock = containerBlock.nextConnection.targetBlock();

            this.itemCount_ = 0;

            const valueConnections = [null]

            while (clauseBlock) {
                if (clauseBlock.isInsertionMarker()) {
                    clauseBlock = clauseBlock.getNextBlock()
                    continue;
                }

                switch (clauseBlock.type) {
                    case `${categoryPrefix}join_mutator_item`:
                        this.itemCount_++;
                        valueConnections.push(clauseBlock.valueConnection_);
                        break;
                }

                clauseBlock = clauseBlock.getNextBlock();
            }

            this.updateShape_()

            this.reconnectChildBlocks_(valueConnections)
        },

        saveConnections: function (containerBlock) {
            let clauseBlock = containerBlock.nextConnection.targetBlock();
            let i = 1;
            while (clauseBlock) {
                if (clauseBlock.isInsertionMarker()) {
                    clauseBlock = clauseBlock.getNextBlock()
                    continue;
                }

                switch (clauseBlock.type) {
                    case `${categoryPrefix}join_mutator_item`:
                        const inputBool = this.getInput(`ITEM${i}`);
                        clauseBlock.valueConnection_ = inputBool && inputBool.connection.targetConnection;
                        i++;
                        break;
                }

                clauseBlock = clauseBlock.getNextBlock();
            }
        },

        rebuildShape_: function () {
            const valueConnections = [null]

            for (let i = 1; this.getInput(`ITEM${i}`); i++) {
                valueConnections.push(this.getInput(`ITEM${i}`).connection.targetConnection);
            }

            this.updateShape_()
            this.reconnectChildBlocks_(
                valueConnections,
            );
        },

        updateShape_: function () {
            //remove all
            for (let i = 1; this.getInput(`ITEM${i}`); i++) {
                this.removeInput(`ITEM${i}`)
            }

            //rebuild
            for (let i = 1; i <= this.itemCount_; i++) {
                this.appendValueInput(`ITEM${i}`)
            }
        },
        reconnectChildBlocks_: function (
            valueConnections,
        ) {
            for (let i = 1; i <= this.itemCount_; i++) {
                Blockly.Mutator.reconnect(valueConnections[i], this, `ITEM${i}`)
            }
        }
    }

    window.applyMutatorChanges = () => {
        const block = window.currentEditingBlock;
        if (!block || !window.mutatorWorkspace) return;
    
        const containerBlock = window.mutatorWorkspace.getTopBlocks(false)[0];
        block.compose(containerBlock);
    
        document.getElementById('mutatorModal').style.display = 'none';
        window.mutatorWorkspace.dispose();
        window.mutatorWorkspace = null;
    };    

    class Extension {
        constructor() {
            loadBlocklyOnce().then(() => {
                this.injectMutatorModal()
                this.setupBlockly();
            });
        }

        injectMutatorModal() {
            if (document.getElementById('mutatorModal')) return;
        
            const modalHTML = `
                <div id="mutatorModal" style="
                    display:none;
                    position:fixed;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                    width:400px;
                    height:300px;
                    background:white;
                    border:2px solid #888;
                    z-index:1000;
                    padding:10px;
                    box-shadow:0 4px 16px rgba(0,0,0,0.25);
                ">
                    <div id="mutatorWorkspace" style="width:100%; height:240px;"></div>
                    <div style="text-align:right; margin-top:5px;">
                        <button onclick="window.applyMutatorChanges()">Apply</button>
                        <button onclick="document.getElementById('mutatorModal').style.display='none'">Cancel</button>
                    </div>
                </div>
            `;
        
            const div = document.createElement('div');
            div.innerHTML = modalHTML;
            document.body.appendChild(div);
        }        
    
        setupBlockly() {
            if (!this.hasBlocklyLoaded()) {
                console.error("Either Blockly or Blockly.Blocks didn't load.")
                return;
            }
            Blockly.Blocks['extendable_join'] = {
                init: function () {
                    this.setOutput(true);
                    this.setColour(160);
                    this.itemCount_ = 2;
                    this.updateShape_();
                    this.setMutator(new Blockly.Mutator([`${categoryPrefix}join_mutator_item`]));
                    const block = this;
                
                    this.appendDummyInput()
                        .appendField('join')
                        .appendField(new Blockly.FieldImage(
                            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 16 16'><g><rect rx='4' ry='4' height='16' width='16' fill='%23ccc'/><path d='m4.203,7.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 -0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z' fill='%23000'/></g></svg>",
                            16, 16, "*", () => {
                                if (typeof block.openMutatorModal === 'function') {
                                    block.openMutatorModal();
                                }
                            }
                        ));
                },                
                mutationToDom: extendable_join_mutator.mutationToDom,
                domToMutation: extendable_join_mutator.domToMutation,
                decompose: extendable_join_mutator.decompose,
                compose: extendable_join_mutator.compose,
                saveConnections: extendable_join_mutator.saveConnections,
                updateShape_: extendable_join_mutator.updateShape_,
                rebuildShape_: extendable_join_mutator.rebuildShape_,
                reconnectChildBlocks_: extendable_join_mutator.reconnectChildBlocks_
            };   

            Blockly.Blocks['extendable_join'].openMutatorModal = function () {
                const modal = document.getElementById('mutatorModal');
                modal.style.display = 'block';
            
                if (window.mutatorWorkspace) {
                    window.mutatorWorkspace.dispose();
                }
            
                window.mutatorWorkspace = Blockly.inject('mutatorWorkspace', {
                    toolbox: {
                        kind: 'flyoutToolbox',
                        contents: [
                            {
                                kind: 'block',
                                type: 'extendable_join_mutator_item'
                            }
                        ]
                    }
                });
            
                const containerBlock = this.decompose(window.mutatorWorkspace);
                containerBlock.initSvg();
                containerBlock.render();
            
                window.currentEditingBlock = this;
            };  
            
            Blockly.JavaScript['extendable_join'] = function(block) {
                let code = '';
                for (let i = 1; i <= block.itemCount_; i++) {
                    const input = Blockly.JavaScript.valueToCode(block, `ITEM${i}`, Blockly.JavaScript.ORDER_NONE) || "''";
                    code += (i === 1 ? '' : ' + ') + input;
                }
                return [code, Blockly.JavaScript.ORDER_ADDITION];
            };            
    
            Blockly.Blocks['extendable_join_mutator_join'] = {
                init: function () {
                    this.setColour(160);
                    this.appendDummyInput().appendField('join');
                    this.setNextStatement(true);
                    this.setTooltip('');
                    this.contextMenu = true;
                }
            };
    
            Blockly.Blocks['extendable_join_mutator_item'] = {
                init: function () {
                    this.setColour(160);
                    this.appendDummyInput().appendField('item');
                    this.setPreviousStatement(true);
                    this.setNextStatement(true);
                    this.setTooltip('');
                    this.contextMenu = true;
                }
            };
            
            if (Blockly.Extensions.all_ && Blockly.Extensions.all_[`${categoryPrefix}join_mutator`]) {
                Blockly.Extensions.unregister(`${categoryPrefix}join_mutator`);
            }
            Blockly.Extensions.registerMutator(
                `${categoryPrefix}join_mutator`,
                extendable_join_mutator,
                null,
                [`${categoryPrefix}join_mutator_item`]
            );            
        }

        getInfo() {
            return {
                id: "BLOCKLY",
                name: "blockly",
                blocks: [
                    {
                        opcode: /*'extendable_join'*/'BLOCKLY_extendable_join',
                        text: 'join [ITEM1] [ITEM2]',
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                          ITEM1: { type: Scratch.ArgumentType.STRING, defaultValue: '' },
                          ITEM2: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
                        },
                        disableMonitor: true,
                        isDynamic: true
                    }
                ]
            };
        }

        hasBlocklyLoaded() {
            return !!(Blockly && Blockly.Blocks);
        }
        extendable_join() {
            return 'work in progress';
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);
