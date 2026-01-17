<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { store } from '../store'

    const activeMenuId = ref<string | null>(null)

    const toggleMenu = (id: string) => {
        activeMenuId.value = activeMenuId.value === id ? null : id
    }

    // NEU: Bearbeiten Funktion
    const editItem = (id: string, currentName: string) => {
        const newName = prompt('Aufgabenname bearbeiten:', currentName)
        if (newName !== null && newName.trim() !== '') {
            store.updateLogName(id, newName.trim())
        }
        activeMenuId.value = null
    }

    const deleteItem = (id: string) => {
        if (confirm('Eintrag wirklich löschen?')) {
            store.deleteLog(id)
            activeMenuId.value = null
        }
    }

    const closeMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('.ocProjectCard__menu-container')) {
            activeMenuId.value = null
        }
    }

    onMounted(() => window.addEventListener('click', closeMenu))
    onUnmounted(() => window.removeEventListener('click', closeMenu))

    const getBudgetPercent = (ms: number) => {
        const maxMs = 40 * 3600000
        return Math.min(Math.round((ms / maxMs) * 100), 100)
    }
</script>

<template>
    <div class="ocList">
        <header class="ocList__header">
            <h1 class="ocList__title">Projekte</h1>
            <p class="ocList__stats">{{ store.logs.length }} Einträge • {{ (store.todayTotalMs / 3600000).toFixed(1) }}h heute</p>
        </header>

        <div class="ocList__grid">
            <div
                v-for="log in store.logs"
                :key="log.id"
                class="ocProjectCard">
                <div class="ocProjectCard__top">
                    <div class="ocProjectCard__status">
                        <span class="ocProjectCard__status-dot"></span>
                        Abgeschlossen
                    </div>

                    <div class="ocProjectCard__menu-container">
                        <button
                            class="ocProjectCard__menu-btn"
                            @click.stop="toggleMenu(log.id)">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>

                        <Transition name="scale">
                            <div
                                v-if="activeMenuId === log.id"
                                class="ocDropdown">
                                <button
                                    class="ocDropdown__item"
                                    @click="editItem(log.id, log.taskName)">
                                    <i class="fas fa-edit"></i>
                                    Bearbeiten
                                </button>
                                <button
                                    class="ocDropdown__item ocDropdown__item--danger"
                                    @click="deleteItem(log.id)">
                                    <i class="fas fa-trash-alt"></i>
                                    Löschen
                                </button>
                            </div>
                        </Transition>
                    </div>
                </div>

                <div class="ocProjectCard__heading">
                    <h3>{{ log.taskName }}</h3>
                    <p>{{ log.project }} • {{ log.date }}</p>
                </div>

                <div class="ocProjectCard__info">
                    <div>
                        <span class="ocProjectCard__label">Gesamtzeit</span>
                        <div class="ocProjectCard__time">{{ log.formattedTime }}</div>
                    </div>
                    <div class="ocProjectCard__budget">
                        <span class="ocProjectCard__label">Budget</span>
                        <div class="ocProjectCard__budget-text">{{ getBudgetPercent(log.durationMs) }}%</div>
                    </div>
                </div>

                <div class="ocProjectCard__progress-bg">
                    <div
                        class="ocProjectCard__progress-fill"
                        :style="{ width: getBudgetPercent(log.durationMs) + '%' }"></div>
                </div>
            </div>
        </div>

        <div
            v-if="store.logs.length === 0"
            class="ocEmptyState">
            <i class="fas fa-folder-open"></i>
            <p>Noch keine Aktivitäten aufgezeichnet.</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/main';
</style>
