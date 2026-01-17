<template>
    <div class="layout">
        <header class="navbar">
            <div class="logo">oChronos</div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/list">Liste</RouterLink>
            </nav>
        </header>
        <main class="content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: #fff;
        border-bottom: 1px solid #eee;
    }
    nav a {
        margin-left: 20px;
        text-decoration: none;
        color: #666;
    }
    nav a.router-link-active {
        color: #42b883;
        font-weight: bold;
    }
    .content {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }
</style>
