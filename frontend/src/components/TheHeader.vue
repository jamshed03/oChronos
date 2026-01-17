<template>
    <header class="ocHeader">
        <div class="ocHeader__container">
            <div class="ocHeader__brand">
                <div class="ocHeader__logo-box">
                    <i class="fas fa-stopwatch"></i>
                </div>
                <h2 class="ocHeader__title">oChronos</h2>
            </div>

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
                <a
                    href="#"
                    class="ocHeader__link">
                    Reports
                </a>
            </nav>

            <div class="ocHeader__actions">
                <button class="ocHeader__icon-btn">
                    <i class="fas fa-bell"></i>
                </button>
                <div class="ocHeader__avatar">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/main';
</style>
