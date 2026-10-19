<!-- TODO: IMPLEMENT -->
<script lang="ts">
  import { siteConfig } from '#lib/config/site.ts';

  import { page } from '$app/state';

  const links = siteConfig.navItems;
</script>

<nav class="navbar">
  <a href='/' class="logo">AJ</a>
  <ul>
    {#each links as { href, label } (href)}
      <li>
        <a href={href} aria-current={page.url.pathname === href ? 'page' : undefined}>{label}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;

    width: 100dvw;
    height: 4rem;

    padding-inline: 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: color-mix(in srgb, var(--color-surface), transparent 50%);
    border-bottom: 1px solid var(--color-secondary);

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .logo {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.5rem;
  }
  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
  }
  a[aria-current='page'] {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 6px;
  }
</style>
