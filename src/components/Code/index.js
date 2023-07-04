import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { srcery } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { twMerge } from "tailwind-merge";
import Icon from "../Icon";

const Code = ({ items }) => {
  const [value, setValue] = useState("0");
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl">
        <div className="flex items-center py-1 pl-2 pr-4 bg-n-6">
          <div className="flex mr-auto md:mr-0 md:w-full">
            {items.map((item) => (
              <button
                className={twMerge(
                  `min-w-[9rem] h-8 rounded-lg caption1 font-semibold text-n-4 transition-colors hover:text-n-1 2xl:min-w-[1rem] md:basis-1/3 ${
                    value === item.id && "bg-n-5 text-n-1"
                  }`
                )}
                key={item.id}
                onClick={() => setValue(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
          {copied ? (
            <div className="flex items-center font-semibold caption1 text-n-1">
              <Icon className="w-4 h-4 mr-1 fill-n-1" name="check-thin" />
              Copied!
            </div>
          ) : (
            items
              .filter((x) => x.id === value)
              .map((item) => (
                <CopyToClipboard
                  key={item.id}
                  text={item.value}
                  onCopy={onCopy}
                >
                  <button className="ml-3 font-semibold transition-colors shrink-0 caption1 text-n-1 hover:text-primary-1 md:hidden">
                    Copy code
                  </button>
                </CopyToClipboard>
              ))
          )}
        </div>
        <div className="max-h-[17.625rem] overflow-auto md:max-h-[20rem]">
          {items
            .filter((x) => x.id === value)
            .map((item) => (
              <SyntaxHighlighter
                language={item.language}
                showLineNumbers
                style={srcery}
                customStyle={{
                  maxWidth: "100%",
                  padding: "1rem 1rem 1.5rem",
                }}
                lineNumberStyle={{
                  textAlign: "left",
                  color: "#7A7C7C",
                }}
                key={item.id}
              >
                {item.value}
              </SyntaxHighlighter>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Code;
