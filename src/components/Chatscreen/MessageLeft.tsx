'use client';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageLeftProps {
  content: string;
  isLoading?: boolean;
}

const MessageLeft: React.FC<MessageLeftProps> = ({ content, isLoading = false }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Only render loading state if there's no content
  if (isLoading && (!content || content.trim() === '')) {
    return (
      <div className="flex justify-start mb-6">
        <div className="flex-shrink-0">
          <div className="w-[44px] h-[44px] mb-2 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-gray-100">
            <Image
              src="/Images/BotIconNew.svg"
              alt="Bot"
              width={32}
              height={32}
              className="block"
            />
          </div>
        </div>
        <div className="max-w-[70%]">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <div className="bg-white rounded-[20px] rounded-tl-[4px] px-6 py-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <BeatLoader color="#8a162c" size={8} margin={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render message with content
  return (
    <>
      <div className="flex justify-start mb-2">
        <div className="flex-shrink-0">
          <div className="w-[44px] h-[44px] mb-2 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-gray-100">
            <Image
              src="/Images/BotIconNew.svg"
              alt="Bot"
              width={24}
              height={24}
              className="block"
            />
          </div>
        </div>
        <div className="max-w-[70%]">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <div className="bg-white rounded-[20px] rounded-tl-[4px] px-6 py-4 shadow-sm border border-gray-100">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div
                    className="text-content text-sm leading-[22px] font-normal message-markdown-content"
                    style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      flex: 1,
                    }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </div>
                  {/* Show loader next to content if still streaming */}
                  {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                      <BeatLoader color="#8a162c" size={6} margin={2} />
                    </div>
                  )}
                </div>
              </div>

              {/* Rating and Copy Controls */}
              <div className="relative mt-2 flex items-center px-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="cursor-pointer transition-opacity text-gray-400"
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      {hoveredRating ? (
                        star <= hoveredRating ? (
                          <AiFillStar size={18} color="#8a162c" />
                        ) : (
                          <AiOutlineStar size={18} />
                        )
                      ) : rating >= star ? (
                        <AiFillStar size={18} color="#8a162c" />
                      ) : (
                        <AiOutlineStar size={18} />
                      )}
                    </button>
                  ))}
                  <button
                    onClick={handleCopy}
                    className="flex cursor-pointer items-center ml-2 space-x-1 text-gray-500 hover:text-gray-700 text-xs"
                    aria-label="Copy message"
                  >
                    <FiCopy />
                  </button>
                </div>
                {copied && (
                  <div className="absolute top-[-30px] left-0 bg-[#8a162c] text-white text-xs px-3 py-1 rounded shadow-md animate-fade-in-out">
                    Copied to clipboard
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .message-markdown-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: normal;
        }

        .message-markdown-content h1,
        .message-markdown-content h2,
        .message-markdown-content h3,
        .message-markdown-content h4,
        .message-markdown-content h5,
        .message-markdown-content h6 {
          font-weight: 600;
          margin: 16px 0 8px 0;
          color: #1a1a1a;
        }

        .message-markdown-content h1 {
          font-size: 1.5em;
        }

        .message-markdown-content h2 {
          font-size: 1.25em;
        }

        .message-markdown-content h3 {
          font-size: 1.125em;
        }

        .message-markdown-content h4 {
          font-size: 1em;
        }

        .message-markdown-content strong,
        .message-markdown-content b {
          font-weight: 600;
          color: #1a1a1a;
        }

        .message-markdown-content em,
        .message-markdown-content i {
          font-style: italic;
        }

        .message-markdown-content ul {
          margin: 12px 0;
          padding-left: 24px;
          list-style-type: disc;
        }

        .message-markdown-content ol {
          margin: 12px 0;
          padding-left: 24px;
          list-style-type: decimal;
        }

        .message-markdown-content li {
          margin: 6px 0;
          line-height: 1.6;
        }

        .message-markdown-content li > p {
          margin: 4px 0;
        }

        .message-markdown-content p {
          margin: 12px 0;
          line-height: 1.6;
        }

        .message-markdown-content p:first-child {
          margin-top: 0;
        }

        .message-markdown-content p:last-child {
          margin-bottom: 0;
        }

        .message-markdown-content code {
          background-color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.9em;
          color: #e63946;
        }

        .message-markdown-content pre {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 12px 0;
        }

        .message-markdown-content pre code {
          background-color: transparent;
          padding: 0;
          color: #1f2937;
          font-size: 0.875em;
        }

        .message-markdown-content blockquote {
          border-left: 4px solid #8a162c;
          margin: 12px 0;
          padding-left: 16px;
          color: #6b7280;
          font-style: italic;
        }

        .message-markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 0.875em;
        }

        .message-markdown-content th,
        .message-markdown-content td {
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          text-align: left;
        }

        .message-markdown-content th {
          background-color: #f9fafb;
          font-weight: 600;
          color: #1f2937;
        }

        .message-markdown-content tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .message-markdown-content a {
          color: #8a162c;
          text-decoration: underline;
        }

        .message-markdown-content a:hover {
          color: #c5203f;
        }

        .message-markdown-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 16px 0;
        }

        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-5px);
          }
        }

        .animate-fade-in-out {
          animation: fade-in-out 1.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default MessageLeft;
