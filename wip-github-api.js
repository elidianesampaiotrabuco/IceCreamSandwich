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
                  opcode: 'GitHubAPI_doesItexist',
                  text: 'does org. [ORG], repo. [REPO] exist?',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {
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
        
        GithubAPI_Fetch(args) {
          const api_link = (api_url + args.ORG + '/' + args.REPO)
          return 'work in progress'
        }
        GithubAPI_FetchCount(args) {
          const api_link = (api_url + args.ORG + '/' + args.REPO)
          return 'work in progress'
        }
        GitHubAPI_doesItexist(args) {
          let api_link = (api_url + args.ORG + '/' + args.REPO)
          const fetched = Scratch.fetch(api_link).then((r) => r.text()).catch(() => "")
          const notexist = Scratch.fetch('https://api.github.com/r/').then((r) => r.text()).catch(() => "")
          if (!(fetched) === (notexist)) {
            return true
          } else {
            return false
          }
        }
        d() {
          return true
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);