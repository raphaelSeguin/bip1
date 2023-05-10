// This is "processor.js" file, evaluated in AudioWorkletGlobalScope upon
// audioWorklet.addModule() call in the main global scope.
class MyWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.index = 0;
    }
    static get parameterDescriptors() {
        return [
            {
                name: "frequency",
                defaultValue: 444,
            },
        ];
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        let outputChannel0 = output[0];

        const freqParam = parameters['frequency'];
        const frequency = typeof freqParam === 'object'
            ? freqParam[0]
            : freqParam;
        const phaseIncrement = (frequency * tableSize) / (sampleRate)
        console.log(frequency)
        for (let i = 0; i < outputChannel0.length; i+= 1) {
            this.index += phaseIncrement;
            while (this.index > tableSize) {
                this.index -= tableSize
            }
            outputChannel0[i] = sinusTable[Math.floor(this.index)] * 0.1
        }
        return true;
    }
}
const tableSize = 1024;
const sinusTable = Float32Array.from(
    Array(tableSize).fill(0)
    .map((_, i) => Math.sin(2 * i / tableSize * Math.PI))
)

registerProcessor("bip", MyWorkletProcessor);

class Cycle {
    constructor(length) {
        this.cycleLength = length
        this.eventList = []
    }
    insert(cycleEvent) {
        this.eventList.push(cycleEvent);
        this.eventList.sort((a, b) => a.time - b.time)
    }
}

class CycleEvent {
    constructor(time, payload) {
        this.time = time;
        this.payload = payload
    }
}

const cycler = new Cycle(4000)
cycler.insert(new CycleEvent(2000, 500))
cycler.insert(new CycleEvent(2500, 700))
cycler.insert(new CycleEvent(3000, 800))
cycler.insert(new CycleEvent(3500, 200))
cycler.insert(new CycleEvent(0, 400))
cycler.insert(new CycleEvent(500, 800))
cycler.insert(new CycleEvent(1000, 300))
cycler.insert(new CycleEvent(1500, 600))


console.assert(cycler.eventList[0].payload === 400, 'oups')
console.assert(cycler.eventList[7].payload === 200, 'oups')
console.assert(cycler.eventList[3].payload === 600, 'oups')