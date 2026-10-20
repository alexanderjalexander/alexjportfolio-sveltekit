<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.ico';
  import type { LayoutProps } from './$types';

  import Navbar from '#lib/components/layout/Navbar.svelte';
  import Footer from '#lib/components/layout/Footer.svelte';

  let { children }: LayoutProps = $props();

  import { config } from '@fortawesome/fontawesome-svg-core';
  import '@fortawesome/fontawesome-svg-core/styles.css';

  config.autoAddCss = false;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main>
  {@render children()}
</main>
<Footer />
