import { defineStore } from 'pinia'
import axios from 'axios'

async function apiGetAlerts(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    let res = await axios.post('alerts/list', 
        {}, 
        config,
    )

    return {
        alerts: res.data.alerts
    }
}

async function apiAddAlert(token, alertData) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    let res = await axios.post('alerts/add', 
        alertData, 
        config,
    )

    console.log(res)

    return {}
}

export const useAlertsStore = defineStore({
    id: 'alertsStore',

    state: () => {
        return {
            alerts: []
        }
    },

    actions: {
        async getAlerts(token) {
            this.$patch({
                alerts: []
            })
            await apiGetAlerts(token)
                .then(resAlerts => {
                    for (let i in resAlerts.alerts) {
                        this.alerts.push(resAlerts.alerts[i])
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },

        submitNewAlert(data) {
            const token = data.token
            const alertData = {
                type: data.minOrMax.toUpperCase(),
                name: data.name,
                price: parseInt(data.price),
            }
            apiAddAlert(token, alertData)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })

        },

        logout() {
            this.$reset
        }


    }

})