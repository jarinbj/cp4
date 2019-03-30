var app = new Vue({
  el: '#admin',
  data: {
    chats: [],
    title: "",
    findTitle: "",
    findItem: "",
    addItem: null,
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      if (this.findTitle)
      {
        return this.chats.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      }
      else
      {
       return [];
      }
    }
  },
  methods: {
    async upload() {
      console.log(this.title);
      if (!this.title)
      {
        return;
      }
      try {
        let r = await axios.post('/api/chatTitle', {
          title: this.title,
        });
        this.getItems();
        this.addItem = this.title + " room added!";
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/chats");
        this.chats = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/chats/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/editTitle/" + item._id, {
          title: this.findItem.title,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
