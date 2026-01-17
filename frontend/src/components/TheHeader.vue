<template>
    <header class="ocHeader">
        <div class="ocHeader__container">
            <RouterLink
                to="/"
                class="ocHeader__brand">
                <div class="ocHeader__logo-box">
                    <i class="fas fa-stopwatch"></i>
                </div>
                <h2 class="ocHeader__title">oChronos</h2>
            </RouterLink>

            <nav class="ocHeader__nav">
                <RouterLink
                    to="/"
                    class="ocHeader__link">
                    Dashboard
                </RouterLink>
                <RouterLink
                    to="/list"
                    class="ocHeader__link">
                    Projects
                </RouterLink>
                <RouterLink
                    to="/reports"
                    class="ocHeader__link">
                    Reports
                </RouterLink>
            </nav>

            <div class="ocHeader__actions">
                <button
                    class="ocHeader__icon-btn"
                    title="Notifications">
                    <i class="fas fa-bell"></i>
                </button>
                <div
                    class="ocHeader__avatar"
                    title="Profile">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/main';
</style>
