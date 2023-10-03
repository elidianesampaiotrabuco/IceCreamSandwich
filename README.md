# TurboGPT
The power of GPT-3.5 in your projects for free!

## API Note
APIs go up and down every once in a while, so if you get blank responses, you should be able to find more reverse proxies here on the internet.
The API used in LOLEMO's version is dead, so I've updated it to use https://api.tmrace.net/v1/chat/completions by default, although you can update it using the "Set Reverse Proxy API URL" block.

## Installation
To use this extension in Turbowarp (or Turbowarp Mods), open Add Extension > Custom Extension and paste this link

    https://anonymous-cat1.github.io/WorkingTurboGPT/extension.js
    
## How to use
To simply send a prompt to ChatGPT without any context (chat history), use this reporter:

<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_27_7_2023-19_31_46.svg" width="100%" height="70"/>


If you want to use prompts with history (GPT remembers previous messages) you can create a chatbot and then send prompts to it
Start by creating a chatbot with a name or ID

<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_27_7_2023-19_57_15.svg" width="100%" height="65"/> 

Then, use this reporter to interact with it:

<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_27_7_2023-20_19_46.svg" width="100%" height="71"/>

Also, you can use this block to change the behavior of the chatbot:

<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_27_7_2023-20_00_45.svg" width="100%" height="70"/>

Finally, use these blocks to reset or delete the chatbots:

<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_27_7_2023-20_01_03.svg" width="100%" height="70"/>
<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_27_7_2023-20_01_09.svg" width="100%" height="70"/>

If you find that using the extension only reports errors, use this block to update the API URL. (You can find ChatGPT reverse proxies by looking them up)

<img src="https://anonymous-cat1.github.io/WorkingTurboGPT/img/block_10_2_2023-4_59_51%20PM.svg" width="100%" height="70"/>
