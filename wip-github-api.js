(function(Scratch) {
    const variables = {};
    let api_url = 'https://api.github.com/repos/';
    let LISTMENU = [
      'Repo ID',
      'Node ID',
      'Description',
      'Created at',
      'Most Used Language'
    ];
    let COUNTMENU = [
      'Watchers',
      'Stargazers',
      'Size',
      'Open Issues'
    ];
    class Extension {
      constructor() {
        
      }
        getInfo() {
            return {
              id: "GithubAPI",
              name: "GitHub API",
              blocks: [
                {
                  opcode: 'GithubAPI_Fetch',
                  text: 'fetch [LIST] from org. [ORG] repo. [REPO]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {
                    LIST: {
                      type: Scratch.ArgumentType.STRING,
                      menu: 'LIST'
                    },
                    ORG: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'DinosaurMod'
                    },
                    REPO: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'dinosaurmod.github.io'
                    },
                  }
                },
                {
                  opcode: 'GithubAPI_FetchCount',
                  text: 'fetch [COUNT] count from org. [ORG] repo. [REPO]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {
                    COUNT: {
                      type: Scratch.ArgumentType.STRING,
                      menu: 'COUNT'
                    },
                    ORG: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'DinosaurMod'
                    },
                    REPO: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'dinosaurmod.github.io'
                    },
                  }
                },
                {
                  opcode: 'c',
                  text: 'boolean',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {}
                },
                {
                  opcode: 'd',
                  text: 'hat',
                  blockType: Scratch.BlockType.HAT,
                  arguments: {}
                },
              ],
              menus: {
                LIST: {
                  acceptReporters: true,
                  items: LISTMENU
                },
                COUNT: {
                  acceptReporters: true,
                  items: COUNTMENU
                },
              }
            }
        }
        
        GithubAPI_Fetch() {
          return 'work in progress'
        }
        GithubAPI_FetchCount() {
          return 'work in progress'
        }
        c() {
          return 'work in progress'
        }
        d() {
          return true
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);