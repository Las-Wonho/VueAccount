<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{user.name}}</h3>
            <div>{{user.age}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="putDialog(user)">수정</v-btn>
          <v-btn flat color="error" @click="delUser(user._id)">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    
    <v-btn absolute dark fab bottom right color="pink" @click="mdUp">
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>

  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal last name" hint="example of persistent helper text" persistent-hint required v-model="userName"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select :items="userAges" label="Age" required v-model="userAge"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="putUser">수정</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="postUser">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar">
    {{ sbMsg }}
    <v-btn color="pink" flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>

</v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: '',
      dialog: false,
      userAges: [],
      userAge: 0,
      userName: '',
      snackbar: false,
      sbMsg: '',
      putiId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    this.getUsers()
  },
  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'getMan'
      })
        .then((r) => {
          this.getMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    postReq () {
      axios.post('http://localhost:3000/api/user', {
        name: '마이스터',
        age: 12 // req.body
        // user: 'postMan'
      })
        .then((r) => {
          this.postMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    putReq () {
      axios.put('http://localhost:3000/api/user', {
        user: 'putMan'
      })
        .then((r) => {
          this.putMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    delReq () {
      axios.delete('http://localhost:3000/api/user')
        .then((r) => {
          this.delMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    mdUp () {
      // console.log('mdup')
      this.dialog = true
      this.userName = ''
      this.userAge = ''
    },
    postUser () {
      console.log(this.userName, this.userAge)
      this.dialog = false
      this.pop(this.userName)
      axios.post('http://localhost:3000/api/user', {
        name: this.userName,
        age: this.userAge
        // user: 'postMan'
      })
        .then((r) => {
          this.pop('사용자 등록 완료')
          this.getUsers() // 데이터갱신
        })
        .catch((e) => {
          console.error(e.message)
          this.pop('e.message')
        })
    },
    getUsers () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          this.users = r.data.users
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
        name: this.userName,
        age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 수정 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delUser (id) {
      axios.delete(`http://localhost:3000/api/user/${id}`)
        .then((r) => {
          this.pop('사용자 삭제 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
