<script setup lang="ts">
    import { ref, computed, onUnmounted } from 'vue'
    import { store } from '../store'

    // State
    const taskName = ref('')
    const isRunning = ref(false)
    const isPaused = ref(false)
    const startTime = ref(0)
    const accumulatedTime = ref(0)
    const now = ref(Date.now())
    let interval: number | undefined

    // Computed: Zeit-Formatierung
    const totalElapsedMs = computed(() => {
        if (!isRunning.value) return accumulatedTime.value
        return accumulatedTime.value + (now.value - startTime.value)
    })

    const h = computed(() =>
        Math.floor(totalElapsedMs.value / 3600000)
            .toString()
            .padStart(2, '0')
    )
    const m = computed(() =>
        Math.floor((totalElapsedMs.value % 3600000) / 60000)
            .toString()
            .padStart(2, '0')
    )
    const s = computed(() =>
        Math.floor((totalElapsedMs.value % 60000) / 1000)
            .toString()
            .padStart(2, '0')
    )

    // Funktionen
    function toggleTimer() {
        if (!isRunning.value) {
            // START
            if (!taskName.value) taskName.value = 'Unbenannte Aufgabe'
            startTime.value = Date.now()
            isRunning.value = true
            isPaused.value = false
            interval = window.setInterval(() => (now.value = Date.now()), 1000)
        } else {
            // PAUSE
            clearInterval(interval)
            accumulatedTime.value += Date.now() - startTime.value
            isRunning.value = false
            isPaused.value = true
        }
    }

    function stopAndSave() {
        if (totalElapsedMs.value < 1000) return // Verhindert leere Logs

        const newLog = {
            id: crypto.randomUUID(),
            taskName: taskName.value,
            durationMs: totalElapsedMs.value,
            formattedTime: `${h.value}:${m.value}:${s.value}`,
            date: new Date().toLocaleString(),
            project: store.activeProject,
        }

        store.addLog(newLog)
        resetTimer()
    }

    function resetTimer() {
        clearInterval(interval)
        isRunning.value = false
        isPaused.value = false
        accumulatedTime.value = 0
        taskName.value = ''
    }

    // Hilfsfunktion für die "Heute"-Anzeige
    const formattedToday = computed(() => {
        const s = Math.floor(store.todayTotalMs / 1000)
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    })

    onUnmounted(() => clearInterval(interval))
</script>
<template>
    <div class="ocDashboard">
        <section class="ocTimerHero">
            <div class="ocTimerHero__input-wrap">
                <i class="fas fa-pen-nib"></i>
                <input
                    v-model="taskName"
                    :disabled="isRunning"
                    class="ocTimerHero__input"
                    placeholder="Woran arbeitest du?" />
            </div>

            <div class="ocDisplay">
                <div class="ocDisplay__unit">
                    <span class="ocDisplay__digit">{{ h }}</span>
                    <span class="ocDisplay__label">Hours</span>
                </div>
                <div class="ocDisplay__sep">:</div>
                <div class="ocDisplay__unit">
                    <span class="ocDisplay__digit">{{ m }}</span>
                    <span class="ocDisplay__label">Minutes</span>
                </div>
                <div class="ocDisplay__sep">:</div>
                <div
                    class="ocDisplay__unit"
                    :class="{ 'ocDisplay__unit--active': isRunning }">
                    <span class="ocDisplay__digit">{{ s }}</span>
                    <span class="ocDisplay__label">Seconds</span>
                </div>
            </div>

            <div class="ocTimerHero__btns">
                <button
                    @click="toggleTimer"
                    class="ocBtn ocBtn--primary">
                    <i
                        class="fas"
                        :class="isRunning ? 'fa-pause' : 'fa-play'"></i>
                    {{ isRunning ? 'Pause' : isPaused ? 'Fortsetzen' : 'Start' }}
                </button>

                <button
                    v-if="totalElapsedMs > 0"
                    @click="stopAndSave"
                    class="ocBtn ocBtn--primary"
                    style="background: #ff5f5f; margin-left: 10px">
                    <i class="fas fa-stop"></i>
                    Stop
                </button>

                <button
                    @click="resetTimer"
                    class="ocBtn ocBtn--icon">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        </section>

        <div class="ocGrid">
            <aside class="ocGrid__sidebar">
                <div class="ocCard">
                    <h3 class="ocCard__title">Aktives Projekt</h3>
                    <div class="ocProjectBadge">
                        <i class="fas fa-project-diagram"></i>
                        {{ store.activeProject }}
                    </div>
                </div>

                <div
                    class="ocCard"
                    style="margin-top: 20px">
                    <h3 class="ocCard__title">Heute Gesamt</h3>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #42b883">{{ formattedToday }} h</div>
                </div>
            </aside>

            <section class="ocGrid__content">
                <div class="ocCard ocCard--full">
                    <div class="ocCard__header">
                        <h3>
                            <i class="fas fa-history"></i>
                            Letzte Aktivitäten
                        </h3>
                    </div>
                    <div class="ocActivity">
                        <div
                            v-for="log in store.logs.slice(0, 5)"
                            :key="log.id"
                            class="ocActivity__item">
                            <div class="ocActivity__info">
                                <span class="ocActivity__name">{{ log.taskName }}</span>
                                <small class="ocActivity__project">{{ log.project }}</small>
                            </div>
                            <strong class="ocActivity__time">
                                {{ log.formattedTime }}
                                <i
                                    @click="store.deleteLog(log.id)"
                                    class="fas fa-trash"
                                    style="margin-left: 15px; cursor: pointer; color: #ccc"></i>
                            </strong>
                        </div>
                        <div
                            v-if="store.logs.length === 0"
                            style="padding: 20px; text-align: center; color: #999">
                            Noch keine Aktivitäten vorhanden.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/main';

    .ocTimerHero {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 4rem;
        &__input-wrap {
            display: flex;
            align-items: center;
            border-bottom: 2px solid $oc-border;
            padding: 1rem 0;
            span {
                color: $oc-primary;
            }
            i {
                color: $oc-primary;
                margin-right: 15px;
            }
        }
        &__input {
            border: none;
            font-size: 1.5rem;
            width: 100%;
            outline: none;
            padding-left: 1rem;
        }
        &__btns {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
    }

    .ocActivity__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #f1f3f2;
        &:last-child {
            border-bottom: none;
        }
    }

    .ocActivity__info {
        display: flex;
        flex-direction: column;
    }
    .ocActivity__project {
        font-size: 0.7rem;
        color: #6b8076;
        text-transform: uppercase;
        font-weight: bold;
    }

    .ocDisplay {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3rem 0;
        gap: 1rem;
        &__digit {
            font-family: $font-mono;
            font-size: 4rem;
            font-weight: 700;
            @media (min-width: 768px) {
                font-size: 7rem;
            }
        }
        &__unit--active {
            color: $oc-primary;
        }
        &__sep {
            font-size: 3rem;
            opacity: 0.2;
            padding-bottom: 1rem;
        }
        &__label {
            display: block;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            color: $oc-muted;
        }
    }

    .ocGrid {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
        @media (min-width: 1024px) {
            grid-template-columns: 300px 1fr;
        }
    }

    .ocCard {
        background: white;
        padding: 1.5rem;
        border-radius: 20px;
        border: 1px solid $oc-border;
        box-shadow: $oc-shadow;
        &__title {
            font-size: 1rem;
            margin-bottom: 1rem;
        }
    }

    .ocBtn {
        height: 54px;
        border-radius: 14px;
        border: none;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        &--primary {
            background: $oc-primary;
            color: white;
            padding: 0 3rem;
            font-size: 1.1rem;
        }
        &--icon {
            width: 54px;
            background: $oc-surface;
            border: 1px solid $oc-border;
        }
    }
</style>
