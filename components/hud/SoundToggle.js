"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerSimpleHigh, SpeakerSimpleSlash } from "@phosphor-icons/react";

// Synthesised wind (filtered brown noise with a slow sweep). No audio file.
function createWind(ctx) {
  const length = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 420;
  filter.Q.value = 0.7;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const sweep = ctx.createGain();
  sweep.gain.value = 260;
  lfo.connect(sweep).connect(filter.frequency);
  const gain = ctx.createGain();
  gain.gain.value = 0;
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
  lfo.start();
  return gain;
}

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctx = useRef(null);
  const gain = useRef(null);

  useEffect(() => () => ctx.current?.close(), []);

  const toggle = async () => {
    if (!ctx.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx.current = new AC();
      gain.current = createWind(ctx.current);
    }
    const next = !on;
    if (next) await ctx.current.resume();
    const now = ctx.current.currentTime;
    gain.current.gain.cancelScheduledValues(now);
    gain.current.gain.setTargetAtTime(next ? 0.22 : 0, now, 0.4);
    setOn(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className="hud pointer-events-auto inline-flex items-center gap-2 py-2 transition-opacity hover:opacity-70"
    >
      {on ? <SpeakerSimpleHigh size={15} aria-hidden="true" /> : <SpeakerSimpleSlash size={15} aria-hidden="true" />}
      Sound: {on ? "On" : "Off"}
    </button>
  );
}
