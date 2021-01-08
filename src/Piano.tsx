import React from 'react';
import { Output } from 'webmidi'

interface PianoProps {
  outputs: Output[]
}

export function Piano(props: PianoProps) {
  console.log(props)
  return (
    <div>
      {["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "B3"].map(note => {
        return <button onClick={() => props.outputs.map(output => output.playNote(note, "all", {duration: 500} ) && console.log("played on", output.name))}>
          Play the {note} note!
        </button>
      })}
    </div>
  );
}
