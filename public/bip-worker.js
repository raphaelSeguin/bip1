// This is "processor.js" file, evaluated in AudioWorkletGlobalScope upon
// audioWorklet.addModule() call in the main global scope.
class MyWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }
  static get parameterDescriptors() {
    return [
      {
        name: "multiplier",
        defaultValue: 0.707,
      },
    ];
  }

  process(inputs, outputs, parameters) {
    // The processor may have multiple inputs and outputs. Get the first input and
    // output.
    const input = inputs[0];
    const output = outputs[0];
    // console.log(inputs, outputs)
    // Each input or output may have multiple channels. Get the first channel.
    const inputChannel0 = input[0];
    const outputChannel0 = output[0];
    // const outputChannel1 = output[1];

    // Get the parameter value array.
    const multiplier = parameters['multiplier'];

    // if |myParam| has been a constant value during this render quantum, the
    // length of the array would be 1.
    // if (myParamValues.length === 1) {
      // Simple gain (multiplication) processing over a render quantum
      // (128 samples). This processor only supports the mono channel.
    //   for (let i = 0; i < inputChannel0.length; ++i) {
    //     outputChannel0[i] = inputChannel0[i] * myParamValues[0];
    //   }
    // } else {
      for (let i = 0; i < outputChannel0.length; ++i) {
        outputChannel0[i] = Math.sin(i * multiplier) * 0.1;
        // outputChannel1[i] = Math.random()* 0.1;
      }
    // }

    // To keep this processor alive.
    return true;
  }
}

registerProcessor("bip", MyWorkletProcessor);
