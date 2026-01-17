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

    .ocHeader {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba($oc-bg, 0.8);
        backdrop-filter: $oc-blur;
        border-bottom: 1px solid $oc-border;

        &__container {
            max-width: $desktop;
            margin: 0 auto;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        &__logo-box {
            width: 32px;
            height: 32px;
            background: $oc-primary;
            border-radius: 8px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 20px;
            }

            i {
                font-size: 1.2rem;
                color: white;
            }
        }

        &__title {
            font-size: 1.2rem;
            font-weight: 800;
        }

        &__nav {
            display: none;
            @media (min-width: 768px) {
                display: flex;
                gap: 2rem;
            }
        }

        &__link {
            text-decoration: none;
            color: $oc-muted;
            font-weight: 600;
            font-size: 0.9rem;
            transition: color 0.2s;
            &.router-link-active {
                color: $oc-primary;
            }
            &:hover {
                color: $oc-text;
            }
        }

        &__actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        &__icon-btn {
            background: none;
            border: none;
            color: $oc-muted;
            cursor: pointer;
        }
        &__avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #eee;
            border: 1px solid $oc-border;
        }
    }
</style>
