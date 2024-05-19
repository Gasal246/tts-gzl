/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

const SelectVoices = ({ setVoice }: { setVoice: React.Dispatch<React.SetStateAction<SpeechSynthesisVoice>> }) => {
    const synth = speechSynthesis;
    const voices = synth.getVoices()

    return (
        <Select onValueChange={(value: SpeechSynthesisVoice) => setVoice(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Voice" />
            </SelectTrigger>
            <SelectContent className="bg-black/60 text-white">
                {voices?.map((voice: SpeechSynthesisVoice)=>(
                    <SelectItem value={voice} className="text-wrap">{voice.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectVoices