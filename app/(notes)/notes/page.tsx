"use client"

import { ChangeEvent, useRef, useState } from "react"
import DashboardNav from "components/Navbar/DashboardNav"

import Image from "next/image"
import { ButtonModule } from "components/ui/Button/Button"
import Export from "public/images/export"
import { SearchModule } from "components/ui/Search/search-module"

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
  const [showChat, setShowChat] = useState(true)
  const [showFileUpload, setShowFileUpload] = useState(true)
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
  const [searchText, setSearchText] = useState("")

  // compute percentage for gradient
  const pct = ((quizCount - MIN) / (MAX - MIN)) * 100

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

  const handleCancelSearch = () => {
    setSearchText("")
  }

  return (
    <section className="h-auto w-full bg-[#ffffff]">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />
          <div className="flex w-full items-center justify-between px-16 py-10 max-sm:px-3">
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-[#212121]">
                Notes<span className="text-sm font-normal text-[#666666]">(10)</span>
              </p>
              <div className="flex gap-2">
                <ButtonModule variant="primary" size="md" iconPosition="start" onClick={() => alert("Button clicked!")}>
                  All
                </ButtonModule>
                <ButtonModule
                  variant="secondary"
                  size="md"
                  iconPosition="start"
                  onClick={() => alert("Button clicked!")}
                >
                  Physics
                </ButtonModule>
                <ButtonModule
                  variant="secondary"
                  size="md"
                  iconPosition="start"
                  onClick={() => alert("Button clicked!")}
                >
                  Project Management
                </ButtonModule>
              </div>
            </div>
            <SearchModule
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onCancel={handleCancelSearch}
            />
          </div>
          <div className="mt-20 flex h-full w-full flex-col items-center justify-between">
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
                  </>
                )}
              </div>
            )}

            <div className="w-full max-w-2xl flex-col items-center justify-center ">
              <div className="flex w-full items-center justify-between border-b border-[#919792] pb-2">
                <p className="font-bold text-[#919792]">Resources</p>
                <Image src="/images/more.svg" height={24} width={24} alt="Remove file" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-4 flex items-center justify-between gap-2 rounded-md bg-[#E6E6E6] p-2">
                  <div className="flex items-center gap-2 ">
                    <Image src="/images/pdf.svg" height={25} width={24} alt="" />
                    <p className="text-sm text-[#212121]">Physics</p>
                  </div>
                  <Image src="/images/download.svg" height={25} width={24} alt="" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 rounded-md bg-[#E6E6E6] p-2">
                  <div className="flex items-center gap-2 ">
                    <Image src="/images/pdf.svg" height={25} width={24} alt="" />
                    <p className="text-sm text-[#212121]">Project Management Guidelines</p>
                  </div>
                  <Image src="/images/download.svg" height={25} width={24} alt="" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 rounded-md bg-[#E6E6E6] p-2">
                  <div className="flex items-center gap-2 ">
                    <Image src="/images/pdf.svg" height={25} width={24} alt="" />
                    <p className="text-sm text-[#212121]">Physics</p>
                  </div>
                  <Image src="/images/download.svg" height={25} width={24} alt="" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 rounded-md bg-[#E6E6E6] p-2">
                  <div className="flex items-center gap-2 ">
                    <Image src="/images/pdf.svg" height={25} width={24} alt="" />
                    <p className="text-sm text-[#212121]">Project Management Guidelines</p>
                  </div>
                  <Image src="/images/download.svg" height={25} width={24} alt="" />
                </div>
              </div>
            </div>
            <div className="mb-20 w-full max-w-2xl flex-col items-center justify-center ">
              <ButtonModule
                variant="primary"
                size="md"
                icon={<Export />}
                iconPosition="start"
                onClick={() => alert("Button clicked!")}
                className="px-5"
              >
                Export
              </ButtonModule>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
