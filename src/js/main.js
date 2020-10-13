const form = document.getElementById("searchForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const item = document.getElementById("searchBtn").value;
  const chat = document.getElementById("channelChat");

  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: [`${item}`],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    const chatMessage = document.createElement("p");
    const chatMessageText = document.createTextNode(`${tags.username}: ` + message);
    const lastChatMessage = chat.lastElementChild;

    lastChatMessage.scrollIntoView();

    chatMessage.appendChild(chatMessageText);
    chat.appendChild(chatMessage);
    
    console.log(chat.children.length);

    if (chat.children.length > 100) {
      let child = chat.firstElementChild;
      for (let i = 0; i < 20; i++) {
        chat.removeChild(child);
        child = chat.firstElementChild;
      }
    }
  });
});
