import WebMidi, { Output } from 'webmidi'

export function initWebMidi() {
    let outputs: Output[] = []

    WebMidi.enable(function (err) {
        if (err) {
            alert("WebMidi could not be enabled.")
            console.log('1', "WebMidi could not be enabled.", err);
        }

        // Reacting when a new device becomes available
        WebMidi.addListener("connected", function (e) {
            if (e.port.type === "output") {
                outputs.push(e.port)
                console.log(`${e.port.name} connected`)
            }
        });

        WebMidi.addListener("disconnected", function(e) {
            if (e.port.type === "output") {
                outputs = outputs.filter(o => o.id !== e.port.id)
                console.log(`${e.port.name} disconnected`)
            }
        })
    })

    return outputs
}