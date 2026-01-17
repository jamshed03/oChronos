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

            <div class="ocBottomNav__fab-wrap">
                <button class="ocBottomNav__fab">
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
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/main';
</style>
