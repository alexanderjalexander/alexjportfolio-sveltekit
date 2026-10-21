<!-- TODO: IMPLEMENT -->
<script lang="ts">
  import { siteConfig } from '../../config/site';
  import type { ExtLink } from '../../config/site';

  import { page } from '$app/state';
  import { MediaQuery } from 'svelte/reactivity';
  import { backOut } from 'svelte/easing';
  import { scale, slide } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';

  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { faFileLines } from '@fortawesome/free-solid-svg-icons';
  import Hamburger from '../shared/Hamburger.svelte';
  import { onMount } from 'svelte';

  const EASE_MS = !prefersReducedMotion.current ? 500 : 0;

  const icons = {
    github: faGithub,
    linkedin: faLinkedin,
    resume: faFileLines
  };

  const navItems = siteConfig.navItems;
  const extLinks = siteConfig.extLinks;

  const extLinksKeys = Object.keys(extLinks) as (keyof typeof extLinks)[];

  const maxWidth = 960;
  let hamburgerOpen = $state(false);
  let isMobile = $state(false);

  onMount(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

    isMobile = mediaQuery.matches;

    const responsiveWidthHandler = (widthEvent: MediaQueryListEvent) => {
      isMobile = widthEvent.matches;
      if (hamburgerOpen && !isMobile)
      {
        hamburgerOpen = isMobile;
      }
    };

    mediaQuery.addEventListener('change', responsiveWidthHandler);
    return () => mediaQuery.removeEventListener('change', responsiveWidthHandler);
  })
</script>

<nav class="navbar">
  <div class="navbar_container">
    <a href="/" class="logo" aria-label="Home"> AJ </a>
    {#if !isMobile}
      <ul
        transition:slide={{ axis: 'x', duration: EASE_MS, easing: backOut }}
      >
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
    {/if}
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
      {#if isMobile}
        <li
          transition:slide={{ axis: 'x', duration: EASE_MS, easing: backOut }}
        >
          <Hamburger
            bind:isOpen={hamburgerOpen}
            label='Toggle Navigation Menu'/>
        </li>
      {/if}
    </ul>
  </div>
  <!-- TODO: MOBILE STUFF -->
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

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

  .navbar ul {
    align-items: center;
  }

  .navbar ul:first-of-type {
    flex-shrink: 1;
  }

  .navbar ul:last-of-type {
    flex-shrink: 0;
  }

  .navbar ul li {
    position: relative;
    inset: 0;

    padding: 4px 8px;
  }

  .navbar ul li {
    a {
      display: block;
      position: relative;

      border-radius: 8px;

      font-family: var(--font-display);
      font-variation-settings:
        'wdth' 95,
        'opsz' 50;
      text-transform: uppercase;
      text-wrap: nowrap;

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
  }
</style>
