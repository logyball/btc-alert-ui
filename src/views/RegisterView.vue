<template>
  <b-card>
    <div>
      <b-form @submit="submit">
        <b-form-group
          id="email-input-group"
          label="Email address:"
          label-for="email-input"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="email-input"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="name-input-group" label="Your Name:" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="form.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="password-input-group" label="Choose Password:" label-for="password-input">
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
  name: "RegisterView",
  components: {},
  setup() {
    const authStore = useAuthStore()

    return {
      store: authStore
    }
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
    }
  },

  methods: {
    submit() {
      this.store.register({
        name: this.form.name,
        email: this.form.email, 
        password: this.form.password
      }).then(() => {
        this.$router.push({name: "alertsList"})
      })
    }
  }
}
</script>

