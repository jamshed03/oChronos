import { reactive, watch } from 'vue'
import type { TimeLog } from '../types'

const STORAGE_KEY = 'ochronos_data'

export const store = reactive({
    // Daten
    logs: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as TimeLog[],
    activeProject: 'oChronos Branding',

    // Berechnungen für das Dashboard
    get todayTotalMs() {
        const today = new Date().toLocaleDateString()
        return this.logs
            .filter((log) => {
                // Wir prüfen, ob der Zeitstempel des Logs den heutigen Tag enthält
                return log.date.includes(today.split(',')[0])
            })
            .reduce((sum, log) => sum + log.durationMs, 0)
    },

    // Aktionen
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
