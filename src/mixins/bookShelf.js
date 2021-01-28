import { myShelf } from "@/api/BookShelf";

const mixin = {
  methods: {
    getBookNum: function () {
      let userId = JSON.parse(localStorage.getItem('user')).Id;
      return myShelf(userId)

    },
  }
}

export default mixin