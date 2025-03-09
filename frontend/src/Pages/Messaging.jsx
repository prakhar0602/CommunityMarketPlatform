import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";

const backend_link = import.meta.env.VITE_BACKEND_LINK;

const Messaging = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state?.User?.user?._id);

  useEffect(() => {
    if (id) fetchConversations();
  }, [id]);

  const createConversation = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${backend_link}/createConversation`, {
        email: e.target.email.value,
        id,
      });
      if (response.data.bool) {
        toast.success("Conversation Created");
        fetchConversations();
      } else {
        toast.error("Conversation Creation Failed");
      }
    } catch (error) {
      console.error("Error creating conversation", error);
      toast.error("An error occurred");
    }
  };

  const fetchConversations = async () => {
    try {
      let response = await axios.post(`${backend_link}/getConversations`, { id });
      if (response.data.bool) {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error("Error fetching conversations", error);
    }
  };

  const fetchMessages = async (chatId) => {
    setSelectedChat(chatId);
    try {
      const response = await axios.get(`${backend_link}/messages/${chatId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const response = await axios.post(`${backend_link}/messages`, {
        chatId: selectedChat,
        text: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-1/3 bg-gray-800 p-4 flex flex-col">
        <form onSubmit={createConversation} className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
          />
          <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
            Start Conversation
          </button>
        </form>
        <h3 className="text-lg font-semibold mt-4">Conversations</h3>
        <div className="flex-1 overflow-auto">
          {conversations.map((conv) => (
            <div
              key={conv._id}
              onClick={() => fetchMessages(conv._id)}
              className={`p-2 cursor-pointer hover:bg-gray-700 ${selectedChat === conv._id ? "bg-gray-700" : ""}`}
            >
              {conv.user1._id === id ? conv.user2.name : conv.user1.name}
            </div>
          ))}
        </div>
      </aside>

      <main className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex-1 p-4 overflow-auto border-b border-gray-700">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold text-blue-400">
                    {msg.senderName}:
                  </span>{" "}
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-gray-800 flex border-t border-gray-700">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700 text-white"
                placeholder="Type a message..."
              />
              <button type="submit" className="ml-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            Select a conversation to start messaging.
          </div>
        )}
      </main>
    </div>
  );
};

export default Messaging;
