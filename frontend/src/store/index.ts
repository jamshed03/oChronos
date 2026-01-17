import { reactive } from 'vue'
import type { TimeLog } from '../types'

const STORAGE_KEY = 'ochronos_data'

export const store = reactive({
    // Daten aus LocalStorage laden
    logs: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as TimeLog[],
    activeProject: 'oChronos Branding',

    // Berechnung der heutigen Gesamtzeit
    get todayTotalMs(): number {
        const datePart = new Date().toLocaleDateString().split(',')[0]
        const today: string = datePart || ''

        return this.logs
            .filter((log: TimeLog) => {
                return log.date && log.date.includes(today)
            })
            .reduce((sum: number, log: TimeLog) => sum + log.durationMs, 0)
    },

    // Einen neuen Eintrag hinzufügen
    addLog(log: TimeLog) {
        this.logs.unshift(log)
        this.save()
    },

    // EINEN EINTRAG BEARBEITEN
    updateLogName(id: string, newName: string) {
        const log = this.logs.find((l) => l.id === id)
        if (log) {
            log.taskName = newName
            this.save() // WICHTIG: Damit die Änderung im Speicher bleibt!
        }
    },

    // Einen Eintrag löschen
    deleteLog(id: string) {
        this.logs = this.logs.filter((l) => l.id !== id)
        this.save()
    },

    // Alles im LocalStorage des Browsers permanent speichern
    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs))
    },
})
