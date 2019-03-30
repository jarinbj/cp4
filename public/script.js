var app = new Vue({
  el: '#app',
  data: {
    chats: [],
    currentChat: null,
    Name: "",
    myChat: "",
    polling: null
  },
  created() {
    this.getItems();
    this.pollData();
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/chats");
        this.chats = response.data;
        if (this.currentChat)
        {
          let response2 = await axios.get("/api/chat/" + this.currentChat._id);
          this.currentChat = response2.data;
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    setCurrentChat(chat) {
      this.currentChat = chat;
    },
    async sendChat() {
      let response = await axios.put("/api/chat/" + this.currentChat._id, {
        chat: this.Name + ": " + this.myChat,
      });
      this.myChat = "";
    },
    async pollData () {
      this.polling = setInterval(() => {
        this.getItems()}, 500)
    },  
    back()
    {
      this.currentChat = null;
    }
  }
});