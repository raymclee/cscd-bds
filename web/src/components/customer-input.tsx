import "regenerator-runtime/runtime";
import { InputProps } from "@copilotkit/react-ui";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { cn } from "~/lib/utils";
import { useEffect } from "react";
import { Check, X } from "lucide-react";

export function CustomInput({ inProgress, onSend }: InputProps) {
  const {
    listening,
    resetTranscript,
    finalTranscript,
    transcript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({});

  const handleSubmit = (value: string) => {
    if (value.trim()) onSend(value);
  };

  const wrapperStyle = "flex gap-2 p-3 border-t";
  const inputStyle =
    "flex-1 p-2 rounded-md text-neutral-900 border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100";
  // const buttonStyle =
  //   "px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed";

  useEffect(() => {
    if (!listening && finalTranscript.trim()) {
      handleSubmit(finalTranscript);
      resetTranscript();
    }
  }, [listening, finalTranscript]);

  return (
    <div className={wrapperStyle}>
      {!listening && (
        <button
          disabled={!browserSupportsSpeechRecognition}
          className="group disabled:cursor-not-allowed disabled:opacity-50 hover:[&>svg]:text-blue-500"
          onClick={() => {
            SpeechRecognition.startListening({
              language: "zh-CN",
              continuous: true,
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>
      )}

      {listening ? (
        <div className={cn(inputStyle, "select-none text-gray-400")}>
          {transcript ? transcript : "聆听中..."}
        </div>
      ) : (
        <input
          disabled={inProgress}
          type="text"
          placeholder="在此输入您的问题..."
          className={inputStyle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
          // defaultValue={finalTranscript}
        />
      )}

      {listening ? (
        <div className="flex items-center gap-1">
          <button
            className="group disabled:cursor-not-allowed disabled:opacity-50 hover:[&>svg]:text-blue-500"
            onClick={() => {
              SpeechRecognition.abortListening();
              resetTranscript();
            }}
          >
            <X
              className="text-red-600 group-hover:text-red-500"
              strokeWidth={1}
            />
          </button>
          <button
            className="group disabled:cursor-not-allowed disabled:opacity-50 hover:[&>svg]:text-blue-500"
            onClick={() => {
              SpeechRecognition.stopListening();
            }}
          >
            <Check
              className="text-green-500 group-hover:text-green-500"
              strokeWidth={1}
            />
          </button>
        </div>
      ) : (
        <button
          disabled={inProgress}
          // className={buttonStyle}
          onClick={(e) => {
            const input = e.currentTarget
              .previousElementSibling as HTMLInputElement;
            handleSubmit(input.value);
            input.value = "";
          }}
          className="hover:[&>svg]:text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
            <path d="M6 12h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
