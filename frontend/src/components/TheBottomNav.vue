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

    .ocBottomNav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;
        background: linear-gradient(to top, white 70%, transparent);

        &__container {
            max-width: 400px;
            margin: 0 auto;
            background: rgba(white, 0.9);
            backdrop-filter: $oc-blur;
            border: 1px solid $oc-border;
            border-radius: 24px;
            display: flex;
            justify-content: space-around;
            padding: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        &__item {
            text-decoration: none;
            color: #bbb;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            flex: 1;

            i {
                font-size: 1.4rem;
                margin-bottom: 2px;
            }

            &--active {
                color: $oc-primary;
            }
        }

        &__label {
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
        }

        &__fab {
            width: 54px;
            height: 54px;
            background: $oc-primary;
            border: none;
            border-radius: 50%;
            color: white;
            margin-top: -35px;
            box-shadow: 0 8px 20px rgba($oc-primary, 0.3);
        }
    }
</style>
