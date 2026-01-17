<script setup lang="ts">
    import TheHeader from '../components/TheHeader.vue'
    import TheBottomNav from '../components/TheBottomNav.vue'
</script>

<template>
    <div class="ocLayout">
        <TheHeader />
        <main class="ocMain">
            <slot />
        </main>
        <TheBottomNav class="ocMobileOnly" />
    </div>
</template>

<style lang="scss">
    @import '../assets/scss/main';

    .ocMobileOnly {
        @media (min-width: 768px) {
            display: none !important;
        }
    }
</style>
