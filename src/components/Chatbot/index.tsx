"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlineSend, MdOutlineWarningAmber } from "react-icons/md";
import { HiOutlineChatBubbleLeftEllipsis, HiXMark } from "react-icons/hi2";

interface Message {
  id: string;
  text: string | React.ReactNode;
  isUser: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Olá! 👋 Sou o assistente virtual do sistema de gerenciamento. Precisa de uma mãozinha? Digite “ajuda” para ver tudo o que posso fazer por você.`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
  
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string | React.ReactNode => {
    const input = userInput.toLowerCase();
    if(input.includes("ajuda")){
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: `Estou aqui para te ajudar!<br />
            Você pode me perguntar sobre:<br />
            1 - Tickets<br />
            2 - Login<br />
            3 - Cadastro de colaboradores<br />
            4 - Dashboard<br />
            5 - Painel<br />
            6 - Registro`
          }}
        />
      );
    }
    switch (input) {
      case "1":
        return "Para abrir um ticket, você pode acessar a seção 'Abrir Ticket' no menu principal. Lá você encontrará um formulário para preencher com os detalhes do seu problema.";
      case "2":
        return "Para fazer login, clique no botão 'Entrar' no canto superior direito da página. Você pode usar suas credenciais de colaborador ou criar uma nova conta.";
      case "3":
        return "Para se cadastrar como colaborador, você precisa entrar em contato com o administrador do sistema ou usar o link de registro disponível na página de login.";
      case "4":
        return "O dashboard está disponível apenas para usuários autenticados. Após fazer login, você terá acesso ao painel de controle com todas as funcionalidades.";
      case "5":
        return "O painel está disponível apenas para usuários autenticados. Após fazer login, você terá acesso ao painel de controle com todas as funcionalidades.";
      case "6":
        return "Para se cadastrar como colaborador, você precisa entrar em contato com o administrador do sistema ou usar o link de registro disponível na página de login.";
        default:
        return (
          <div dangerouslySetInnerHTML={{ __html: `Desculpe, não entendi sua pergunta<br />Posso te ajudar com informações sobre os seguintes tópicos: <br /> 1 - tickets<br />2 - login<br />3 - cadastro de colaboradores<br />4 - dashboard<br />5 - painel<br />6 - registro` }} />
        );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Abrir chatbot"
      >
       <HiOutlineChatBubbleLeftEllipsis className="w-6 h-6" />
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
{/*           <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          /> */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <HiOutlineChatBubbleLeftEllipsis className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistente Virtual</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <HiXMark className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages && messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {!inputValue.trim() ? <MdOutlineWarningAmber className="w-6 h-6 text-white" /> : <MdOutlineSend className="w-6 h-6 text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
