<template>
  <div>
    <b-button-group>
      <b-button to="/">Home</b-button>
      <b-button to="/about" variant="info">About</b-button>
      <b-button v-if="store.isLoggedIn === false" to="/login" variant="success">Login</b-button>
      <b-button v-if="store.isLoggedIn === false" to="/register" variant="success">Register</b-button>
      <b-button v-if="store.isLoggedIn" to="/alerts/list" variant="info">My Alerts</b-button>
      <b-button v-if="store.isLoggedIn" to="/alerts/add" variant="success">Create New Alert</b-button>
      <b-button v-if="store.isLoggedIn" @click="logout" variant="danger">Logout</b-button>
    </b-button-group>
  </div>

  <div v-if="store.isLoggedIn">
    Welcome {{ store.userEmail }}
  </div>

  <router-view/>

</template>

<script>
import { useAuthStore } from './store/authStore'
import { useAlertsStore } from '@/store/alertsStore';

export default {
  setup() {
    const authStore = useAuthStore()
    const alertsStore = useAlertsStore()

    return {
      store: authStore,
      alertsStore
    }
  },

  methods: {
    logout() {
      this.store.logout()
      this.alertsStore.logout()
      this.$router.push("/home");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
