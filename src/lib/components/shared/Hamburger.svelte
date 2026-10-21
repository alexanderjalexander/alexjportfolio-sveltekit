<script lang="ts">
  let {
    isOpen = $bindable(false),
    label = 'Toggle menu'
  } = $props();
</script>

<button
  type="button"
  class="hamburger"
  class:open={isOpen}
  aria-label={label}
  aria-expanded={isOpen}
  onclick={() => isOpen = !isOpen}
>
  <span></span>
  <span></span>
  <span></span>
</button>

<style>
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;

    width: 1.5rem;
    height: 1.5rem;

    cursor: pointer;
    box-sizing: border-box;

    span {
      width: 100%;
      height: 0.25rem;

      position: relative;
      transform-origin: 1px;

      border-radius: 10px;

      background-color: var(--color-fg);

      transition: all 0.25s cubic-bezier(0.42, 0.27, 0.07, 1);

    }

    &.open {
      span:first-child {
        transform: rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
        /*transform: translateX(20px);*/
      }
      span:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
</style>
