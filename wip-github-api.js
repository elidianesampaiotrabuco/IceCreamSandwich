(function(Scratch) {
    const variables = {};
    let api_url = 'https://api.github.com/';
    let LISTMENU = [
      'Created at',
    ];
    let COUNTMENU = [
      'Watchers',
      'Stargazers',
    ];
    class Extension {
        getInfo() {
            return {
              id: "GithubAPI",
              name: "GitHub API",
              blocks: [
                {
                  opcode: 'GithubAPI_Fetch',
                  text: 'fetch [LIST] info from org. [ORG] repo. [REPO]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {}
                },
                {
                  opcode: 'GithubAPI_FetchCount',
                  text: 'fetch [COUNT] count from org. [ORG] repo. [REPO]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {}
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
              ]
            }
        }
        a() {
          
        }
        b() {
          
        }
        c() {
          
        }
        d() {
          
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);