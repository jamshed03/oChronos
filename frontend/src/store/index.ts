import { reactive } from 'vue'
import type { TimeLog } from '../types'

const STORAGE_KEY = 'ochronos_data'

export const store = reactive({
    logs: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as TimeLog[],
    activeProject: 'oChronos Branding',

    get todayTotalMs(): number {
        // Wir stellen sicher, dass 'today' immer ein String ist
        const datePart = new Date().toLocaleDateString().split(',')[0]
        const today: string = datePart || ''

        return this.logs
            .filter((log: TimeLog) => {
                // Zusätzlicher Check, falls log.date mal fehlt
                return log.date && log.date.includes(today)
            })
            .reduce((sum: number, log: TimeLog) => sum + log.durationMs, 0)
    },

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
