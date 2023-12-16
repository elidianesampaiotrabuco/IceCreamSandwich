(function(Scratch) {
    const variables = {}; 

    let api_url = 'https://api.github.com/';
    
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
    var getJSON = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    }; 
    class Extension {
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
                      defaultValue: 'Dinosaurmod'
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
        GithubAPI_Fetch(args, util) {
          let fullapi_url = api_url + 'repos/' + args.ORG + '/' + args.REPO
          getJSON(fullapi_url,
          function(err, data) {
            if (err !== null) {
              return ('Something went wrong: ' + err);
            } else {
              if (args.LIST === 'Repo ID') {
                return data.id
              } else if (args.LIST === 'Node ID') {
                return data.node_id
              } else if (args.LIST === 'Description') {
                return data.description
              } else if (args.LIST === 'Created at') {
                return data.created_at
              } else if (args.LIST === 'Most Used Language') {
                return data.language
              }
            }
          });
        }
        GithubAPI_FetchCount(args) {
          
        }
        d() {
          return true
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);