<!-- TODO: IMPLEMENT -->
<script lang="ts">
  import { siteConfig } from '../../config/site';
  import type { ExtLink } from '../../config/site';

  import { page } from '$app/state';
  import { backIn, backOut } from 'svelte/easing';
  import { scale, slide } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';

  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { faFileLines } from '@fortawesome/free-solid-svg-icons';
  import Hamburger from '../shared/Hamburger.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  const EASE_MS = !prefersReducedMotion.current ? 500 : 0;

  const icons = {
    github: faGithub,
    linkedin: faLinkedin,
    resume: faFileLines
  };

  const navItems = siteConfig.navItems;
  const extLinks = siteConfig.extLinks;

  const extLinksKeys = Object.keys(extLinks) as (keyof typeof extLinks)[];

  const maxWidth = 860;
  let hamburgerMenuOpen = $state(false);
  let isMobile = $state(false);

  onMount(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

    isMobile = mediaQuery.matches;

    const responsiveWidthHandler = (widthEvent: MediaQueryListEvent) => {
      isMobile = widthEvent.matches;
      if (hamburgerMenuOpen && !isMobile)
      {
        hamburgerMenuOpen = isMobile;
      }
    };

    mediaQuery.addEventListener('change', responsiveWidthHandler);
    return () => mediaQuery.removeEventListener('change', responsiveWidthHandler);
  });

  afterNavigate(() => {
    hamburgerMenuOpen = false;
  });
</script>

<nav class="navbar_container">
  <div class="top_navbar">
  <div class="top_navbar_container">
    <a href="/" class="logo" aria-label="Home"> AJ </a>
    {#if !isMobile}
      <ul
        class="navbar_center_links"
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
    <ul class="navbar_side_buttons">
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
      {#if isMobile}
        <li
          transition:slide={{ axis: 'x', duration: EASE_MS, easing: backOut }}
        >
          <Hamburger
            bind:isOpen={hamburgerMenuOpen}
            label='Toggle Navigation Menu'/>
        </li>
      {/if}
    </ul>
  </div>
  </div>
  <!-- TODO: MOBILE STUFF -->
  {#if isMobile && hamburgerMenuOpen}
    <div
      class="mobile_menu"
      in:slide={{ axis: 'x', duration: EASE_MS, easing: backOut }}
      out:slide={{ axis: 'x', duration: EASE_MS, easing: backIn }}
    >
      <ul
        class="navbar_mobile_menu_links"
      >
        {#each navItems as { href, label }, idx (href)}
          {@const isActive = page.url.pathname === href}
          <li
            in:scale|global={{
              delay: idx * EASE_MS/5,
              duration: EASE_MS,
              easing: backOut
            }}
          >
            <a {href} aria-current={isActive ? 'page' : undefined}>{label}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</nav>

<style>
  .navbar_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    font-size: 1.2rem;

    z-index: 5;
  }

  .top_navbar {
    position: relative;
    width: 100%;

    background: color-mix(in srgb, var(--color-surface), transparent 50%);
    border-bottom: 2px solid var(--color-secondary);

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    z-index: 10;

    ul {
      display: flex;
      gap: 0px;
      align-items: center;

      list-style: none;

      &:first-of-type {
        flex-shrink: 1;
      }

      &:last-of-type {
        flex-shrink: 0;
      }

      li {
        position: relative;
        inset: 0;
      }

      &.navbar_center_links li {
        padding: 6px 12px;
      }

      &.navbar_side_buttons li {
        padding: 4px;
      }
    }
  }

  .top_navbar_container  {
    max-width: 1280px;
    margin: auto;
    padding: 0.5rem 1rem;
    height: 4rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
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

  .top_navbar ul li a {
    display: block;
    position: relative;

    border-radius: 8px;

    font-family: var(--font-display);
    font-variation-settings: 'wdth' 85, 'opsz' 50;
    text-transform: uppercase;
    text-wrap: nowrap;

    z-index: 10;

    transition: all 0.25s cubic-bezier(0.42, 0.27, 0.07, 1);

    @media (prefers-reduced-motion: reduce) {
      transition: all 0s ease-in-out;
    }

    @media (hover: hover) {
      &:hover {
        font-variation-settings: 'wdth' 95, 'opsz' 0;
        font-weight: 600;
      }
    }

    &[aria-current='page'] {
      font-weight: 900;
      font-variation-settings:
        'wdth' 100,
        'opsz' 0;
      color: var(--color-base);
    }
  }

  .navbar_center_links {
    font-size: 1.2rem;
  }

  .navbar_side_buttons {
    font-size: 1.5rem;
  }

  .mobile_menu {
    display: block;
    width: 100%;
    height: 100lvh;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    padding-top: calc(4rem + 2px);

    overflow-y: auto;

    background: color-mix(in srgb, var(--color-primary), transparent 90%);
    border-bottom: 2px solid var(--color-secondary);

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    .navbar_mobile_menu_links {
      display: block;

      text-align: center;
    }

    .navbar_mobile_menu_links li {
      width: 100%;

      transition: all 0.25s cubic-bezier(0.42, 0.27, 0.07, 1);

      @media (prefers-reduced-motion: reduce) {
        transition: all 0s ease-in-out;
      }

      &:has(> a:hover) {
        background-color: var(--color-secondary);
      }

      &:has(> a[aria-current='page']) {
        background-color: var(--color-accent);
      }
    }

    .navbar_mobile_menu_links li a {
      display: block;

      width: 100%;
      padding: 1rem 1.5rem;

      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: normal;
      font-variation-settings: 'wdth' 85, 'opsz' 50;
      text-transform: uppercase;
      text-wrap: nowrap;

      transition: all 0.25s cubic-bezier(0.42, 0.27, 0.07, 1);

      @media (prefers-reduced-motion: reduce) {
        transition: all 0s ease-in-out;
      }

      @media (hover: hover) {
        &:hover {
          font-variation-settings: 'wdth' 95, 'opsz' 0;
          font-weight: 600;
        }
      }

      &[aria-current='page'] {
        font-variation-settings: 'wdth' 95, 'opsz' 0;
        font-weight: 900;
        color: black;
      }
    }
  }
</style>
