<template>
    <nav class="ocBottomNav">
        <div class="ocBottomNav__container">
            <RouterLink
                to="/list"
                class="ocBottomNav__item"
                active-class="ocBottomNav__item--active">
                <i class="fas fa-th-large"></i>
                <span class="ocBottomNav__label">Projects</span>
            </RouterLink>

            <div class="ocBottomNav__item">
                <i class="fas fa-chart-pie"></i>
                <span class="ocBottomNav__label">Insights</span>
            </div>

            <div class="ocBottomNav__fab-wrap">
                <button
                    class="ocBottomNav__fab"
                    @click="$emit('add-task')">
                    <i class="fas fa-plus"></i>
                </button>
            </div>

            <RouterLink
                to="/"
                class="ocBottomNav__item"
                active-class="ocBottomNav__item--active">
                <i class="fas fa-stopwatch"></i>
                <span class="ocBottomNav__label">Timer</span>
            </RouterLink>

            <div class="ocBottomNav__item">
                <i class="fas fa-cog"></i>
                <span class="ocBottomNav__label">Settings</span>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/main';
</style>
