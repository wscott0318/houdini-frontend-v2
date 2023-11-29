import {
    CopySvg
} from '@/components/Svg'

interface ClipboardProps {
    textColor?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textOpacity?: string;
    concept: string;
}

export const Clipboardbox = (props: ClipboardProps) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.concept);
    };
    return (
        <div className="flex flex-row gap-[10px]">
            <div className={`${props.textColor} ${props.fontSize} ${props.fontWeight} ${props.lineHeight} ${props.textOpacity} text-center`}>{props.concept}</div>
            <button onClick={copyToClipboard}>
                <div className="text-base text-center text-[20px] font-extrabold">
                    <CopySvg width={19} height={22}/>
                </div>
            </button>
        </div>
    )
}
