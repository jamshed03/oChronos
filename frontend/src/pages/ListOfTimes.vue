<script setup lang="ts">
    import { store } from '../store'

    const deleteItem = (id: string) => {
        if (confirm('Löschen?')) store.deleteLog(id)
    }
</script>

<template>
    <div class="list-page">
        <h2>Deine Zeiten</h2>
        <div
            v-for="log in store.logs"
            :key="log.id"
            class="log-item">
            <div>
                <strong>{{ log.taskName }}</strong>
                <br />
                <small>{{ log.date }}</small>
            </div>
            <div class="right">
                <span class="duration">{{ log.formattedTime }}</span>
                <button
                    @click="deleteItem(log.id)"
                    class="btn-del">
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .log-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
    .duration {
        font-family: monospace;
        font-weight: bold;
        margin-right: 15px;
    }
    .btn-del {
        border: none;
        background: none;
        color: #ccc;
        cursor: pointer;
    }
    .btn-del:hover {
        color: red;
    }
</style>
