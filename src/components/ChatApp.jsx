import React, { useState } from "react";
import "./Chat.scss";

// Emoji-Mart
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// React icons
import { BsEmojiLaughing } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showMention, setShowMention] = useState(false);


  // For Input 
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMessage(value);
    if (value.endsWith("@")) {
      setShowMention(true);
    } else {
      setShowMention(false);
    }
  };

  // TO send the message
  const handleSend = () => {
    if (message) {
      const randomUser = Math.floor(Math.random() * user_list.length);
      const random = user_list[randomUser];
      const randomName = random.charAt(0);
      const randomNameColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      const chat = {
        name: randomName,
        user: random,
        message: message,
        likes: 0,
        nameColor: randomNameColor,
      };
      setChat((prev) => [...prev, chat]);
      setMessage("");
      setShowEmoji(false);
    }
  };


  // For Likes
  const handlelikeClick = (index) => {
    setLiked(true);
    setChat((prev) =>
      prev.map((chat, i) =>
        i === index ? { ...chat, likes: chat.likes + 1 } : chat
      )
    );
  };

  // For Mention
  const handleMention = (mention) => {
    setMessage((prev) => prev.replace(/@\w*$/, `@${mention}`));
    setShowMention(false);
  };


  // Adding the emojis
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const emojiarr = [];
    sym.forEach((element) => {
      emojiarr.push("0x" + element);
    });
    let emoji = String.fromCodePoint(...emojiarr);
    setMessage(message + emoji);
  };

  return (
    <div className="box">
      <div className="heading">
        <div className="head1">
          <h1>Introductions</h1>
          <span>This Channel is For Company Wide Chatter</span>
        </div>
        <div className="head2">
          <span>3|100</span>

          <IoMdContacts />
        </div>
      </div>
      <div className="chatbox">

        {chat.map((chats, index) => (
          <div key={index} className="chat-message">

            <div>
              <h1 className="name" style={{ backgroundColor: chats.nameColor }}>
                {chats.name}
              </h1>
            </div>


            <div className="messageData">
              <h1 className="user">{chats.user}</h1>
              <span className="message">{chats.message}</span>
              {!liked ? (
                <button className="like" onClick={() => handlelikeClick(index)}>
                  <FaRegThumbsUp />
                </button>
              ) : (
                <button className="like" onClick={() => handlelikeClick(index)}>
                  <FaRegThumbsUp />({chats.likes})
                </button>
              )}
            </div>

          </div>
        ))}

        <div className="textarea">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type Message"
          />

          <button onClick={() => setShowEmoji(!showEmoji)}>
            <BsEmojiLaughing />
          </button>
          <button onClick={handleSend}>
            <FaArrowRight />
          </button>

        </div>


        <div className="emoji">
          {showEmoji && (
            <Picker
              data={data}
              emojiSize={20}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
            />
          )}
        </div>


        {showMention && (
          <div className="mention-list">
            {user_list.map((user) => (
              <div
                key={user}
                onClick={() => handleMention(user)}
                className="mention-item"
              >
                {user}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
