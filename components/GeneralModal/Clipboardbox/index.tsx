import {
    CheckmarkSvg,
    CopySvg
} from '@/components/Svg'
import { useState } from 'react';

interface ClipboardProps {
    textColor?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textOpacity?: string;
    concept: string;
}

export const Clipboardbox = (props: ClipboardProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.concept)
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    return (
        <button onClick={copyToClipboard}>
            <div className="text-base text-center text-[20px] font-extrabold w-[24px] h-[24px] flex justify-center align-center">
                {isCopied ? <CheckmarkSvg className="w-[24px] h-[24px] h-full" /> : <CopySvg className="w-[20px] h-[20px] h-full" />}
            </div>
        </button>
    )
}
