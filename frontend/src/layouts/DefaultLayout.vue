<script setup lang="ts">
    import TheHeader from '../components/TheHeader.vue'
    import TheBottomNav from '../components/TheBottomNav.vue'
</script>

<template>
    <div class="ocLayout">
        <TheHeader />

        <main class="ocMain">
            <Transition
                name="fade"
                mode="out-in">
                <slot />
            </Transition>
        </main>

        <TheBottomNav class="ocMobileOnly" />
    </div>
</template>

<style lang="scss">
    @import '../assets/scss/main';
    // Einfache Transition für Seitenwechsel
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
