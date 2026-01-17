<script setup lang="ts">
    import { ref, computed, onUnmounted } from 'vue'
    import { store } from '../store'
    import type { TimeLog } from '../types'

    const taskName = ref('')
    const isRunning = ref(false)
    const startTime = ref(0)
    const now = ref(Date.now())
    let interval: number | undefined

    const elapsedMs = computed(() => (isRunning.value ? now.value - startTime.value : 0))

    const formattedTime = computed(() => {
        const s = Math.floor(elapsedMs.value / 1000)
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        const sec = s % 60
        return [h, m, sec].map((v) => v.toString().padStart(2, '0')).join(':')
    })

    function toggleTimer() {
        if (!isRunning.value) {
            if (!taskName.value) return alert('Name fehlt!')
            startTime.value = Date.now()
            isRunning.value = true
            interval = window.setInterval(() => (now.value = Date.now()), 1000)
        } else {
            clearInterval(interval)
            const newLog: TimeLog = {
                id: crypto.randomUUID(),
                taskName: taskName.value,
                durationMs: elapsedMs.value,
                formattedTime: formattedTime.value,
                date: new Date().toLocaleString(),
            }
            store.addLog(newLog)
            isRunning.value = false
            taskName.value = ''
        }
    }

    onUnmounted(() => clearInterval(interval))
</script>

<template>
    <div class="timer-card">
        <input
            v-model="taskName"
            :disabled="isRunning"
            placeholder="Woran arbeitest du?" />
        <div class="display">{{ formattedTime }}</div>
        <button
            @click="toggleTimer"
            :class="{ stop: isRunning }">
            {{ isRunning ? 'Stopp' : 'Start' }}
        </button>
    </div>
</template>

<style scoped>
    .timer-card {
        text-align: center;
    }
    input {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
    }
    .display {
        font-size: 4rem;
        font-family: monospace;
        margin-bottom: 20px;
    }
    button {
        width: 100%;
        padding: 15px;
        background: #42b883;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
    }
    button.stop {
        background: #ff5f5f;
    }
</style>
