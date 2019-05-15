<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-toolbar flat>
         <v-toolbar-title>로그인</v-toolbar-title>
       </v-toolbar>
        <v-card>
          <div class="pa-3">
            <v-text-field
                v-model="email"
                label="이메일을 입력하세요"
            >
            </v-text-field>
            
            <v-text-field
                v-model="password"
                label="패스워드를 입력하세요"
                type="password"
            >
            </v-text-field>
            
            <v-btn
             large
             block
             color="primary"
             @click="login()"
            >로그인</v-btn>
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
      email: null,
      password: null,
      snackbar: false,
      sbMsg: ''
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/api/login', {
        id: this.email,
        pw: this.password
      }).then((r) => {
          switch(r.data.success) {
            case true:
              location.href = 'http://localhost:8080/logined'
              break;

            case false:
              this.pop("왜 잘못된 정보를 입력하는건가요? 닝겐? 미쳤습니까?")
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
    }
  }
}
</script>
