const fader = document.querySelector('#range-input')

// The code in the main global scope.
class MyWorkletNode extends AudioWorkletNode {
    constructor(context) {
        super(context, 'bip');
    }
}
const mapRange = (input, imin, imax, min, max) => (input - imin) / imax * (max - min) + min


let context;

window.addEventListener('click', () => {
    if(!context) {
        context = new AudioContext();
        context.audioWorklet.addModule('bip-worker.js').then(() => {
            let node = new MyWorkletNode(context);
            node.connect(context.destination);
            fader.addEventListener('change', (event) => {
                const newFreq = mapRange(event.target.value, 0, 100, 100, 700)
                const frequency = node.parameters.get('frequency');
                frequency.exponentialRampToValueAtTime(newFreq, context.currentTime + 0.5);
            });
        });
    }
})