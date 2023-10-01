# TurboGPT
The power of GPT-3.5 in your projects for free!

## API Note
APIs go up and down every once in a while, so if get blank responses, please open an issue for me to update it.
The API used in LOLEMO is dead, so I've updated to it to use https://api.tmrace.net/v1/chat/completions. I would add a block to set the API URL however, I do not know how to program JS that well.

## Installation
To use this extension in Turbowarp, open Add Extension > Custom Extension and paste this link

    https://lolemo.github.io/turboGPT/extension.js
    
## How to use
To simply send a prompt to ChatGPT without any context (chat history), use this reporter:

<img src="https://lolemo.github.io/turboGPT/img/block_27_7_2023-19_31_46.svg" width="100%" height="70"/>


If you want to use prompts with history (GPT remembers previous messages) you can create a chatbot and then send prompts to it
Start by creating a chatbot with a name or ID

<img src="https://lolemo.github.io/turboGPT/img/block_27_7_2023-19_57_15.svg" width="100%" height="65"/> 

Then, use this reporter to interact with it:

<img src="https://lolemo.github.io/turboGPT/img/block_27_7_2023-20_19_46.svg" width="100%" height="71"/>

Also, you can use this block to change the behavior of the chatbot:

<img src="https://lolemo.github.io/turboGPT/img/block_27_7_2023-20_00_45.svg" width="100%" height="70"/>

Finally, use these blocks to reset or delete the chatbots:

<img src="https://lolemo.github.io/turboGPT/img/block_27_7_2023-20_01_03.svg" width="100%" height="70"/>
<img src="https://lolemo.github.io/turboGPT/img/block_27_7_2023-20_01_09.svg" width="100%" height="70"/>
