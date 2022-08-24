export default {
  data() {
    return {
      value: false,
      username: '',
      roomid: ''
    }
  },
  methods: {
    joinroom(flag) {
      flag = this.value
      if (this.username === '' || this.roomid === '') {
        alert('房间号或昵称不能为空')
      } else {
        if (this.value === true) {
          this.$router.push({
            name: 'admin',
            params: { flag, room: this.roomid, userName: this.username }
          })
        } else {
          this.$router.push({
            name: 'users',
            params: { flag, room: this.roomid, userName: this.username }
          })
        }
      }
    }
  }
}
