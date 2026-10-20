<!-- TODO: IMPLEMENT -->
<script lang="ts">
  import { siteConfig } from '../../config/site';
  import type { ExtLink } from '../../config/site';

  import { page } from '$app/state';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';

  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { faFileLines } from '@fortawesome/free-solid-svg-icons';

  const EASE_MS = !prefersReducedMotion.current ? 500 : 0;

  const icons = {
    github: faGithub,
    linkedin: faLinkedin,
    resume: faFileLines
  };

  const navItems = siteConfig.navItems;
  const extLinks = siteConfig.extLinks;

  const extLinksKeys = Object.keys(extLinks) as (keyof typeof extLinks)[];

  // TODO:
</script>

<nav class="navbar">
  <div class="navbar_container">
    <a href="/" class="logo" aria-label="Home"> AJ </a>
    <ul>
      {#each navItems as { href, label } (href)}
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
    <ul>
      {#each extLinksKeys as key (key)}
        {@const link: ExtLink = extLinks[key]}
        {@const isActive = page.url.pathname === link.href}
        <li>
          {#if isActive}
            <div
              class="selected_link"
              transition:scale={{ duration: EASE_MS, easing: backOut }}
            ></div>
          {/if}
          <a
            target={link.target ?? undefined}
            href={link.href ?? undefined}
            rel={link.target === undefined || link.target === '_blank'
              ? 'noopener noreferrer'
              : undefined}
            aria-label={link['aria-label']}
            title={link['aria-label']}
            aria-current={isActive ? 'page' : undefined}
          >
            <FontAwesomeIcon icon={icons[key]} size="lg" />
          </a>
        </li>
      {/each}
      <!-- TODO: HAMBURGER ICON AND SUCH, ACTUAL BUTTON ELEMENT -->
    </ul>
  </div>
  <!-- TODO: MOBILE STUFF -->
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

    z-index: 5;
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
    display: block;
    position: relative;

    padding: 4px 8px;
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
