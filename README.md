# bip1
```
npm start
```
### Changes:
- 2023-05-09
    - webpack static server (http-server don't refresh audioWorklet...)
    - bip audioWorkletProcessor with one parameter
- 2023-05-10
    - sinus wave table with frequency control (param is a Float32Array when changed with exponentialRampToValueAtTime), with portamento.
    - start cycle sequencer class Cycle

### TO DO 
controlled timeline (see https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope)
typescript (npm install --save-dev typescript ts-loader), see https://webpack.js.org/guides/typescript/