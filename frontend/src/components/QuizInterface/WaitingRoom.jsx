import React from "react";
import { Copy, Share2 } from "lucide-react";

export default function WaitingRoom({ roomCode }) {
  const gameLink = `joinmyquiz.com/${roomCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    // Add toast notification if desired
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join my quiz!",
        text: "Use this code to join my quiz game:",
        url: gameLink,
      });
    } else {
      copyToClipboard();
      // Fallback notification
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Waiting for your friends to join the game...
        </h1>

        <div className="space-y-6 mb-8">
          <div className="text-gray-600">
            <p className="mb-2">Ask your friends to</p>
            <ol className="list-decimal list-inside space-y-2 text-left pl-4">
              <li>Use any device to open</li>
              <li className="font-bold text-blue-600">joinmyquiz.com</li>
              <li>Enter game code</li>
            </ol>
          </div>

          {/* Game Code Box */}
          <div className="bg-blue-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">GAME CODE</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold tracking-wider text-gray-800">
                {roomCode.match(/.{1,3}/g).join(" ")}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-full hover:bg-blue-200 transition-colors"
                aria-label="Copy code"
              >
                <Copy size={18} className="text-blue-600" />
              </button>
            </div>
          </div>

          <p className="text-gray-500">or share a direct link</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={shareLink}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <Share2 size={18} />
            Share Invite
          </button>

          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors">
            START
          </button>
        </div>
      </div>

      {/* Player Preview (YASH Tupkor) */}
      <div className="mt-8 bg-white rounded-full shadow-sm px-6 py-3 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <span className="text-blue-600 font-bold">YT</span>
        </div>
        <div>
          <p className="font-medium text-gray-800">YASH Tupkor</p>
          <p className="text-xs text-gray-500">Host</p>
        </div>
      </div>
    </div>
  );
};

// Usage example:
// <WaitingRoom roomCode="4066698" />
