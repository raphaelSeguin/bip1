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
- 2023-05-10
    - tuto rust wasm-audio app (cf ../wasm-audio-app-tuto)
- 2023-05-21
    - add wasm-audio directory with some dsp modules in rust
        - delay line
        - comb filter
        - allpass filter
        - one pole FIR filter
        - one pole IIR filter
    - build: `cd wasm-audio && wasm-pack build --target web`
    - tests: `cd wasm-audio && cargo test`
    - copy: `mkdir public/wasm-audio && cp wasm-audio/pkg public/wasm-audio`

### TO DO 
- function d'init, création de l'audioNode, fetch le wasm compilé
- Dans le audioNode envoyer au WorkletProcessor via port
- Dans le WorkletProcessor compiler le wasm (`WebAssembly.compile(event.wasmBytes)`)


- controlled timeline (see https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope)
- typescript (npm install --save-dev typescript ts-loader), see https://webpack.js.org/guides/typescript/
- create-react-app pour l'interface