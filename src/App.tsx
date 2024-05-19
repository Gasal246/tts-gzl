/* eslint-disable @typescript-eslint/no-unused-vars */
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { DownloadIcon, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react"
import SelectVoices from "./components/shared/SelectVoices";
import { useState } from "react";
import { Input } from "./components/ui/input";

declare type SpeechStatus = 'playing' | 'paused' | 'stopped'

function App() {
  const synth = speechSynthesis;
  const defaultVoice = synth.getVoices()
  const utterance = new SpeechSynthesisUtterance()
  const [text, setText] = useState<string>('')
  const [speed, setSpeed] = useState<number>(1)
  const [voice, setVoice] = useState<SpeechSynthesisVoice>(defaultVoice[0])
  const [status, setStatus] = useState<SpeechStatus>()
  let currentCharecter = 0;
  utterance.addEventListener('end', () => {
    setStatus('stopped')
    speechSynthesis.cancel()
  })
  utterance.addEventListener('boundary', (e) => {
    currentCharecter = e.charIndex;
  })

  const handleConvert = (text: string) => {
    setStatus('playing')
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume()
    }
    if (speechSynthesis.speaking) return
    utterance.text = text
    utterance.rate = speed
    utterance.voice = voice || defaultVoice[0]
    speechSynthesis.speak(utterance)
  }

  const handleSpeed = (speed: string) => {
    setSpeed(Number(speed))
    speechSynthesis.resume()
    speechSynthesis.cancel()
    handleConvert(utterance.text.substring(currentCharecter))
  }

  const handlePause = () => {
    setStatus('paused')
    if (speechSynthesis.speaking) {
      speechSynthesis.pause()
    }
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      setStatus('playing')
      return speechSynthesis.resume()
    }
  }

  const handleRestart = () => {
    speechSynthesis.resume()
    speechSynthesis.cancel()
    handleConvert(text)
  }

  const handleDownload = () => { };

  return (
    <main className="p-7 lg:p-10 w-full h-screen overflow-y-scroll mb-20">
      <div>
        <h1 className="flex gap-2 font-semibold text-xl"> <span className="font-black text-purple-400">&#9679; gzl ~</span>Text - Speech ⚡</h1>
        <h5 className="text-sm text-wrap text-slate-400 font-medium">&#9679; <span className="text-purple-400">Free</span> and <span className="text-purple-400">Easy</span> Convert <span className="text-purple-400">Text to Speech</span> and <span className="text-purple-400">Download</span>.</h5>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="bg-slate-800 p-4 rounded-lg w-full lg:w-1/2">
          <div className="w-full flex items-center justify-between mb-1">
            <SelectVoices setVoice={setVoice} />
            {status === 'playing' && <img src="/svgs/speakingloader.svg" alt="speaking" className="w-14 h-7 object-cover" />}
          </div>

          <Textarea rows={12}
            className="bg-slate-950 outline-none border-none text-sm font-medium"
            placeholder="&#9679; Enter your text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={status === 'playing'}
          />

          <div className="flex gap-2 items-center flex-wrap">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-900 hover:bg-purple-950 px-3 py-2 rounded-lg mt-3" onClick={() => handleConvert(text)}>Convert to Speech</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-900 hover:bg-purple-950 px-3 py-2 rounded-lg mt-3" onClick={handlePause}>
              {status === 'paused' ? <PlayIcon /> : <PauseIcon />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-900 hover:bg-purple-950 px-3 py-2 rounded-lg mt-3" onClick={handleRestart}><RotateCcwIcon /></motion.button>
            <Input className="bg-purple-900 hover:bg-purple-950 w-16 py-2 px-2 outline-none mt-2 font-bold" type="number" value={speed} onChange={(e) => handleSpeed(e.target.value)} max={2.5} min={0.5} step={0.25} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-slate-500 px-3 py-2 rounded-lg mt-3 ml-auto" onClick={handleDownload}><DownloadIcon /></motion.button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
