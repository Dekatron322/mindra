"use client"

import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react"
import DashboardNav from "components/Navbar/DashboardNav"

import Image from "next/image"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

interface QuizQuestionData {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export default function Dashboard() {
  const MIN = 1
  const MAX = 100
  const [showChat, setShowChat] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<"quiz" | "summarize">("quiz")
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [showQuizOptions, setShowQuizOptions] = useState(false)
  const [quizCount, setQuizCount] = useState(10)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionData[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // compute percentage for gradient
  const pct = ((quizCount - MIN) / (MAX - MIN)) * 100

  const toggleChat = () => {
    setShowChat(!showChat)
  }

  const handleUploadClick = () => {
    setShowFileUpload(!showFileUpload)
    if (!showFileUpload) setSelectedFile(null)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit")
        return
      }
      setSelectedFile(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const typeText = (messageId: string, fullText: string, speed = 20) => {
    let i = 0
    const typingInterval = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: fullText.substring(0, i), isTyping: i < fullText.length } : msg
        )
      )
      i++
      if (i > fullText.length) {
        clearInterval(typingInterval)
        setIsBotTyping(false)
      }
    }, speed)
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    setIsBotTyping(true)
    const botMessageId = (Date.now() + 1).toString()
    const botMessage: Message = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, botMessage])

    setTimeout(() => {
      const responseText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies..."
      typeText(botMessageId, responseText)
    }, 1000)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage()
  }

  const handleGenerateQuiz = () => setShowQuizOptions(true)

  const handleQuizCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuizCount(parseInt(e.target.value, 10))
  }

  const generateSampleQuizQuestions = (count: number): QuizQuestionData[] => {
    const questions: QuizQuestionData[] = []
    for (let i = 1; i <= count; i++) {
      questions.push({
        question: `This is sample question ${i} based on your document. What is the correct answer?`,
        options: [
          `Option A for question ${i}`,
          `Option B for question ${i}`,
          `Option C for question ${i}`,
          `Option D for question ${i}`,
        ],
        correctAnswer: `Option ${String.fromCharCode(65 + (i % 4))} for question ${i}`,
        explanation: `This is the explanation for why option ${String.fromCharCode(
          65 + (i % 4)
        )} is the correct answer for question ${i}.`,
      })
    }
    return questions
  }

  const handleConfirmQuiz = () => {
    const generatedQuestions = generateSampleQuizQuestions(quizCount)
    setQuizQuestions(generatedQuestions)
    setShowQuizOptions(false)

    setIsBotTyping(true)
    const botMessageId = (Date.now() + 1).toString()
    const botMessage: Message = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, botMessage])

    setTimeout(() => {
      const responseText = `I've generated ${quizCount} quiz questions based on your document. Scroll down to view them.`
      typeText(botMessageId, responseText)
    }, 1500)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const QuizQuestionComponent = ({
    question,
    options,
    correctAnswer,
    explanation,
    questionNumber,
  }: QuizQuestionData & { questionNumber: number }) => {
    const [showAnswer, setShowAnswer] = useState(false)

    const handleShowAnswer = () => {
      setShowAnswer(!showAnswer)
    }

    return (
      <div className="mb-6 w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Question {questionNumber}</h3>
          <button
            onClick={handleShowAnswer}
            className={`rounded px-3 py-1 text-sm font-medium ${
              showAnswer ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>

        {/* Question Body */}
        <div className="mb-6">
          <p className="text-gray-700">{question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg border p-3 ${
                showAnswer && option === correctAnswer
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="mr-3 font-medium text-gray-600">{String.fromCharCode(65 + index)}.</span>
              <span className="text-gray-700">{option}</span>
            </div>
          ))}
        </div>

        {/* Answer Explanation (shown when answer is revealed) */}
        {showAnswer && (
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-blue-800">Explanation</h4>
            <p className="text-sm text-blue-700">{explanation}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="h-auto w-full bg-[#ffffff]">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />
          <div className="flex h-full w-full flex-col items-center justify-center">
            {showFileUpload && (
              <div className="mb-10 flex w-full flex-col items-center text-start">
                <div className=" mb-2 w-full max-w-xl flex-col items-center justify-center ">
                  <p>Upload Pdf</p>
                </div>
                <div className="flex w-full max-w-xl items-center justify-between rounded-lg border border-dashed border-[#E0E0E0] p-4">
                  <div className="flex gap-2">
                    <Image src="/images/cloud.svg" height={32} width={32} alt="" />
                    <div>
                      <p className="text-xs text-[#666666]">Choose a File or drag and drop it here (2MB)</p>
                      <p className="text-xs text-[#666666]">Limit 2MB per file</p>
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="*" />
                  <button
                    onClick={triggerFileInput}
                    className="flex gap-2 rounded border border-[#E0E0E0] bg-[#F8F9FA] px-4 py-2 text-sm text-[#666666] transition hover:bg-[#E6E6E6]"
                  >
                    <Image src="/images/tag.svg" height={14} width={14} alt="" />
                    Select File
                  </button>
                </div>

                {selectedFile && (
                  <>
                    <div className="mt-4 flex w-full max-w-xl items-center justify-between rounded-lg bg-[#F8F9FA] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Image src="/images/document.svg" height={25} width={24} alt="" />
                        <p className="text-sm font-semibold text-[#212121]">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                      <button onClick={handleRemoveFile} className="rounded p-1 hover:bg-gray-200">
                        <Image src="/images/close.svg" height={24} width={24} alt="Remove file" />
                      </button>
                    </div>

                    <div className="mt-6 flex w-full max-w-2xl gap-4 border-b border-[#E0E0E0]">
                      <button
                        className={`pb-2 ${
                          activeTab === "summarize"
                            ? "border-b-2 border-[#3841C0] px-2 font-medium text-[#3F3F3F]"
                            : "px-2 text-[#666666]"
                        }`}
                        onClick={() => setActiveTab("summarize")}
                      >
                        Summarize
                      </button>
                      <button
                        className={`pb-2 ${
                          activeTab === "quiz"
                            ? "border-b-2 border-[#3841C0] px-2 font-medium text-[#3F3F3F]"
                            : "px-2 text-[#666666]"
                        }`}
                        onClick={() => setActiveTab("quiz")}
                      >
                        Quiz
                      </button>
                    </div>

                    <div className="mt-4 w-full max-w-2xl">
                      {activeTab === "quiz" ? (
                        showQuizOptions ? (
                          <div className="w-full p-4">
                            <div className="mb-4">
                              <label className="mb-1 block text-sm font-medium text-[#3F3F3F]">
                                Number of questions: {quizCount}
                              </label>
                              <input
                                type="range"
                                min={MIN}
                                max={MAX}
                                value={quizCount}
                                onChange={handleQuizCountChange}
                                className="h-2 w-full cursor-pointer appearance-none rounded bg-gray-300"
                                style={{
                                  background: `linear-gradient(
                                    to right,
                                    #888EDC 0%,
                                    #888EDC ${pct}%,
                                    #E5E7EB ${pct}%,
                                    #E5E7EB 100%
                                  )`,
                                }}
                              />
                              <div className="mt-1 flex justify-between text-xs text-[#666666]">
                                <span>{MIN}</span>
                                <span>{MAX}</span>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setShowQuizOptions(false)}
                                className="rounded border border-[#E0E0E0] px-3 py-1 text-sm text-[#3F3F3F] hover:bg-gray-100"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleConfirmQuiz}
                                className="rounded bg-[#3841C0] px-3 py-1 text-sm text-white hover:bg-[#2a3191]"
                              >
                                Generate
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={handleGenerateQuiz} className="rounded-lg border border-[#3F3F3F] p-2">
                            <p className="text-sm text-[#3F3F3F]">Generate quiz</p>
                          </button>
                        )
                      ) : (
                        <button className="rounded-lg border border-[#3F3F3F] p-2">
                          <p className="text-sm text-[#3F3F3F]">Generate Summary</p>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Messages and Quiz Questions Container */}
            <div className="mb-4 w-full max-w-2xl overflow-y-auto">
              {messages.length > 0 && (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${
                          message.sender === "user" ? "bg-[#E6E6E6] text-[#212121]" : "text-[#212121]"
                        }`}
                      >
                        {message.text}
                        {message.isTyping && (
                          <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-gray-400"></span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Display Quiz Questions */}
              {quizQuestions.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-semibold text-gray-800">Generated Quiz Questions</h2>
                  {quizQuestions.map((question, index) => (
                    <QuizQuestionComponent
                      key={index}
                      questionNumber={index + 1}
                      question={question.question}
                      options={question.options}
                      correctAnswer={question.correctAnswer}
                      explanation={question.explanation}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex w-full gap-6 px-16 max-md:flex-col max-sm:px-3 max-sm:py-4 md:my-8">
              <div className="flex w-full flex-col items-center justify-center">
                <p className="mb-10 text-3xl text-[#212121]">Welcome Chiwendu 👋, What can I help with?</p>

                {showChat ? (
                  <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-[#E6E6E6] p-4 shadow">
                    <div className="flex justify-between gap-2 rounded-xl border border-[#707070] p-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Chat with Mindra"
                        className="w-full border-0 bg-transparent placeholder-[#9E9E9E] focus:outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === "" || isBotTyping}
                        className="rounded px-4 py-2 text-white disabled:opacity-50"
                      >
                        <Image src="/images/btn.svg" height={44} width={44} alt="Send" />
                      </button>
                    </div>
                    <div className="mt-4 flex gap-3 text-[#3F3F3F]">
                      <div
                        className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#3F3F3F] p-2 hover:bg-gray-200"
                        onClick={handleUploadClick}
                      >
                        <Image src="/images/document-upload.svg" height={24} width={24} alt="" />
                        <p>Upload File</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg border border-[#3F3F3F] p-2">
                        <Image src="/images/prompt.svg" height={15} width={11} alt="" />
                        <p>Suggested Prompts</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button onClick={toggleChat} className="cursor-pointer items-center">
                    <Image
                      src="/images/start-chat.svg"
                      height={180}
                      width={180}
                      alt="Start chat"
                      className="mb-2 hover:opacity-80"
                    />
                    <div className="flex w-[180px] justify-center">
                      <Image src="/images/Frame 5.svg" height={84} width={24} alt="" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* thumb & track override */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #888edc;
          border: 2px solid #888edc;
          margin-top: -7px;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 4px;
          background: transparent;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #888edc;
          border: 2px solid #888edc;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: transparent;
        }
      `}</style>
    </section>
  )
}
