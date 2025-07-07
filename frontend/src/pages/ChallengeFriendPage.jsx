import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Share2, Users, Award, Clock, ChevronRight } from "lucide-react";

// Mock data for the quiz
const mockQuiz = {
  id: "quiz-123",
  title: "JavaScript Fundamentals",
  questions: [
    {
      id: 1,
      text: 'What is the result of 2 + "2" in JavaScript?',
      answers: [
        { id: 1, text: "4", isCorrect: false },
        { id: 2, text: "22", isCorrect: true },
        { id: 3, text: "NaN", isCorrect: false },
        { id: 4, text: "TypeError", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "Which method adds elements to the end of an array?",
      answers: [
        { id: 1, text: "push()", isCorrect: true },
        { id: 2, text: "pop()", isCorrect: false },
        { id: 3, text: "shift()", isCorrect: false },
        { id: 4, text: "unshift()", isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'What does the "this" keyword refer to in a method?',
      answers: [
        { id: 1, text: "The function itself", isCorrect: false },
        { id: 2, text: "The global object", isCorrect: false },
        { id: 3, text: "The object that owns the method", isCorrect: true },
        { id: 4, text: "The parent object", isCorrect: false },
      ],
    },
  ],
};

// Mock players data
const mockPlayers = [
  {
    id: "user-1",
    username: "You",
    score: 0,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "user-2",
    username: "Alex",
    score: 0,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "user-3",
    username: "Sam",
    score: 0,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

const ChallengeFriendPage = () => {
  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameState, setGameState] = useState("waiting"); // waiting, playing, finished
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const { quizId } = useParams();

  // Initialize with mock data
  useEffect(() => {
    setPlayers(mockPlayers);
    setLeaderboard([...mockPlayers].sort((a, b) => b.score - a.score));
  }, []);

  const createRoom = () => {
    // In a real app, this would call your backend
    const newRoomId = Math.random().toString(36).substr(2, 6).toUpperCase();
    setRoomId(newRoomId);
    console.log("Room created:", newRoomId);
  };

  const startGame = () => {
    setGameState("playing");
    startTimer();
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    // Auto-submit if time runs out
    if (selectedAnswer === null) {
      const currentQuestion = mockQuiz.questions[currentQuestionIndex];
      submitAnswer({ id: 0, text: "", isCorrect: false });
    }
  };

  const submitAnswer = (answer) => {
    setSelectedAnswer(answer);

    // Update score (mock implementation)
    const updatedPlayers = players.map((player) => {
      if (player.id === "user-1") {
        // You
        return {
          ...player,
          score: player.score + (answer.isCorrect ? timeLeft * 10 : 0),
        };
      }
      // Simulate other players answering
      if (Math.random() > 0.5) {
        return {
          ...player,
          score: player.score + (Math.random() > 0.3 ? timeLeft * 10 : 0),
        };
      }
      return player;
    });

    setPlayers(updatedPlayers);
    setLeaderboard([...updatedPlayers].sort((a, b) => b.score - a.score));

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < mockQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
        startTimer();
      } else {
        setGameState("finished");
      }
    }, 1500);
  };

  const playAgain = () => {
    setGameState("waiting");
    setCurrentQuestionIndex(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    // Reset scores
    const resetPlayers = players.map((p) => ({ ...p, score: 0 }));
    setPlayers(resetPlayers);
    setLeaderboard([...resetPlayers].sort((a, b) => b.score - a.score));
  };

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {!roomId ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Challenge Friends
          </h1>
          <p className="text-gray-600 mb-6">
            Create a room and invite friends to compete in this quiz in
            real-time!
          </p>
          <button
            onClick={createRoom}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Create Challenge Room
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Room Info Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Room: {roomId}
              </h2>
              <CopyToClipboard
                text={`${window.location.origin}/join/${roomId}`}
              >
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition duration-200">
                  <Share2 size={16} />
                  Share Link
                </button>
              </CopyToClipboard>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} />
                <span>{players.length} Players</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>
                  {gameState === "waiting" && "Waiting for players..."}
                  {gameState === "playing" && `${timeLeft}s left`}
                  {gameState === "finished" && "Game finished"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Players/Leaderboard Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Award size={18} />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      player.id === "user-1" ? "bg-indigo-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{index + 1}.</span>
                      <div className="flex items-center gap-2">
                        <img
                          src={player.avatar}
                          alt={player.username}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{player.username}</span>
                      </div>
                    </div>
                    <span className="font-bold">{player.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz/Game Section */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              {gameState === "waiting" && (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold mb-2">
                    Waiting for players...
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Share the room code with friends to start the challenge!
                  </p>
                  <button
                    onClick={startGame}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                  >
                    Start Game Now (Demo Mode)
                  </button>
                </div>
              )}

              {gameState === "playing" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-500">
                      Question {currentQuestionIndex + 1} of{" "}
                      {mockQuiz.questions.length}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        timeLeft > 5
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {timeLeft}s left
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-6">
                    {currentQuestion.text}
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.answers.map((answer) => (
                      <button
                        key={answer.id}
                        onClick={() => !selectedAnswer && submitAnswer(answer)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 border rounded-lg text-left transition-all flex items-center justify-between ${
                          selectedAnswer
                            ? answer.isCorrect
                              ? "bg-green-100 border-green-500"
                              : selectedAnswer.id === answer.id
                              ? "bg-red-100 border-red-500"
                              : "border-gray-200"
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        <span>{answer.text}</span>
                        {selectedAnswer?.id === answer.id && (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {gameState === "finished" && (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-bold mb-6">Game Finished!</h3>

                  <div className="max-w-md mx-auto mb-8">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={leaderboard[0]?.avatar}
                            alt="Winner"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">
                            Winner: {leaderboard[0]?.username}
                          </h4>
                          <p className="text-gray-600">
                            Score: {leaderboard[0]?.score}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-bold mb-3">Final Standings</h4>
                    <div className="space-y-2">
                      {leaderboard.map((player, index) => (
                        <div
                          key={player.id}
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            player.id === "user-1"
                              ? "bg-indigo-50"
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{index + 1}.</span>
                            <div className="flex items-center gap-2">
                              <img
                                src={player.avatar}
                                alt={player.username}
                                className="w-6 h-6 rounded-full"
                              />
                              <span>{player.username}</span>
                            </div>
                          </div>
                          <span className="font-bold">{player.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={playAgain}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeFriendPage;
