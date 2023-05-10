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