<template>
  <b-card>
    <div>
      <b-form @submit.prevent="submit">
        <b-form-group
          id="email-input-group"
          label="Enter Email:"
          label-for="email-input"
        >
          <b-form-input
            id="email-input"
            v-model="form.email"
            type="email"
            placeholder="email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group 
          id="password-input-group" 
          label="Enter Password:" 
          label-for="password-input">
          <b-form-input
            id="password-input"
            v-model="form.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </b-card>
</template>

<script>
import { useAuthStore } from '@/store/authStore'

export default {
  name: "LoginView",
  components: {},
  setup() {
    const authStore = useAuthStore()

    return {
      authStore
    }
  },

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
    }
  },

  methods: {
    async submit() {
      await this.authStore.login({
        email: this.form.email, 
        password: this.form.password
      }).then(() => {
        this.$router.push({ name: 'alertsList' })
      })
    }
  }
}
</script>

