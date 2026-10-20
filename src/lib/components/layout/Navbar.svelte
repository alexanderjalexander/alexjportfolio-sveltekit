<!-- TODO: IMPLEMENT -->
<script lang="ts">
  import { siteConfig } from '#lib/config/site.ts';

  import { page } from '$app/state';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';

  const EASE_MS = !prefersReducedMotion.current ? 500 : 0;

  const links = siteConfig.navItems;
</script>

<nav class="navbar">
  <div class="navbar_container">
    <a href="/" class="logo" aria-label="Home"> AJ </a>
    <ul>
      {#each links as { href, label } (href)}
        {@const isActive = page.url.pathname === href}
        <li>
          {#if isActive}
            <div
              class="selected_link"
              transition:scale={{ duration: EASE_MS, easing: backOut }}
            ></div>
          {/if}
          <a {href} aria-current={isActive ? 'page' : undefined}>{label}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;

    width: 100dvw;

    background: color-mix(in srgb, var(--color-surface), transparent 50%);
    border-bottom: 2px solid var(--color-secondary);

    font-size: 1.2rem;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .navbar_container {
    width: 100%;
    max-width: 1280px;

    margin: auto;
    padding: 0.5rem 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
  }
  ul {
    display: flex;
    gap: 4px;
    list-style: none;
  }

  div.selected_link {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: center;

    width: 100%;
    height: 100%;

    border-radius: 8px;
    background-color: var(--color-accent);
  }

  .navbar ul li {
    position: relative;
    inset: 0;
  }

  .navbar ul li a {
    position: relative;

    padding: 10px 8px;
    border-radius: 8px;

    font-family: var(--font-display);
    font-variation-settings:
      'wdth' 95,
      'opsz' 50;
    text-transform: uppercase;

    z-index: 10;

    transition: all 0.5s cubic-bezier(0.42, 0.27, 0.07, 1);

    @media (prefers-reduced-motion: reduce) {
      transition: all 0s ease-in-out;
    }

    &[aria-current='page'] {
      font-weight: 800;
      font-variation-settings:
        'wdth' 100,
        'opsz' 0;
      color: var(--color-base);
    }
  }
</style>
