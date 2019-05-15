<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-toolbar flat>
         <v-toolbar-title>회원가입</v-toolbar-title>
       </v-toolbar>
        <v-card>
          <div class="pa-3">
            <v-text-field
                v-model="name"
                label="이곳에 이름을 입력해라 애송이"

            >
            </v-text-field>
            <v-select :items="userAges" label="나이를 선택해라굿 ~ ☆ 랄까?..." required v-model="userAge"></v-select>
            <v-select :items="userSexs" label="USB 젠더를 선택해라굿 ~ ☆ 랄까?..." required v-model="userSex"></v-select>
            <v-text-field
                v-model="email"
                label="이메일을 입력하고 싶냐 애송이?"

            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="패스워드도 입력해라 애송이"
                type="password"
            >
            </v-text-field>
            <v-btn
             large
             block
             color="primary"
             @click="register()"
            >회원가입 하고 싶냐?</v-btn>
            <v-btn
             large
             block
             color="primary"
             @click="gotologin()"
            >이미 계정이 있으면 로그인이나 하지?</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    
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
      userAges : [],
      userSexs : [],
      userAge : 0,
      userSex : 0,
      name : "",
      password : "",
      email : "",
      snackbar: false,
      sbMsg: ''
    }
  },
  mounted () {
    for (let i = 1; i <= 99; i++) this.userAges.push(i)
    this.userSexs.push("男")
    this.userSexs.push("女")
    this.userSexs.push("C++")
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/api/register', {
        id: this.email,
        pw: this.password,
        sex: this.userSex,
        name: this.name,
        age: this.userAge
      })
        .then((r) => {
          switch(r.data.success) {
            case true:
              this.pop("회원가입에 성공하였습니다!")
              break;

            case false:
              this.pop("실패했습니다. 해당 이메일에 이미 존재하는 계정이 있나요?")
              break;
          }
        })
        .catch((e) => {
          console.error(e.message)
          this.pop('e.message')
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    },
    gotologin(){
      location.href = 'http://localhost:8080/login'
    }
  }
}
</script>
