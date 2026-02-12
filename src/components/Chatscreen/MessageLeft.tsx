'use client';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import Image from 'next/image';

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
                    className="text-content text-sm leading-[22px] font-normal message-html-content"
                    style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      flex: 1,
                    }}
                  >
                    <p className="whitespace-pre-wrap">{content}</p>
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
                          <AiFillStar size={18} color="red-500" />
                        ) : (
                          <AiOutlineStar size={18} />
                        )
                      ) : rating >= star ? (
                        <AiFillStar size={18} color="text-[#8a162c]" />
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
        .message-html-content h1,
        .message-html-content h2,
        .message-html-content h3,
        .message-html-content h4,
        .message-html-content h5,
        .message-html-content h6 {
          font-weight: bold;
          margin: 16px 0 8px 0;
          color: #333;
        }
        .message-html-content h2 {
          font-size: 1.25em;
          color: #1a1a1a;
        }
        .message-html-content h3 {
          font-size: 1.125em;
          color: #1a1a1a;
        }
        .message-html-content strong,
        .message-html-content b {
          font-weight: 600;
          color: #1a1a1a;
        }
        .message-html-content em,
        .message-html-content i {
          font-style: italic;
        }
        .message-html-content ul {
          margin: 8px 0;
          padding-left: 20px;
          list-style-type: disc;
        }
        .message-html-content ol {
          margin: 8px 0;
          padding-left: 20px;
          list-style-type: decimal;
        }
        .message-html-content li {
          margin: 4px 0;
          line-height: 1.5;
        }
        .message-html-content p {
          margin: 8px 0;
          line-height: 1.5;
        }
        .message-html-content p:first-child {
          margin-top: 0;
        }
        .message-html-content p:last-child {
          margin-bottom: 0;
        }
        .message-html-content code {
          background-color: #f3f4f6;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.875em;
        }
        .message-html-content pre {
          background-color: #f3f4f6;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 8px 0;
          font-family: 'Courier New', Courier, monospace;
        }
        .message-html-content blockquote {
          border-left: 4px solid #d1d5db;
          margin: 8px 0;
          padding-left: 16px;
          color: #6b7280;
          font-style: italic;
        }
        .message-html-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 8px 0;
        }
        .message-html-content th,
        .message-html-content td {
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          text-align: left;
        }
        .message-html-content th {
          background-color: #f3f4f6;
          font-weight: 600;
        }
        .message-html-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: normal;
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
