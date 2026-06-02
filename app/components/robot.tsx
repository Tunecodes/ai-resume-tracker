"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SpeechBubble from "./talk-bubble";

export default function Robot({ text }) {
  return (
    <div className="scale-80">
      <SpeechBubble text={text} />
      <DotLottieReact src="/robot.lottie" loop autoplay />
    </div>
  );
}
