import { reactive } from 'vue'
import type { TimeLog } from '../types'

const STORAGE_KEY = 'ochronos_logs'

export const store = reactive({
    logs: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as TimeLog[],

    addLog(log: TimeLog) {
        this.logs.unshift(log)
        this.save()
    },

    deleteLog(id: string) {
        this.logs = this.logs.filter((l) => l.id !== id)
        this.save()
    },

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs))
    },
})
