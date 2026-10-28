<!-- TODO: IMPLEMENT -->
<script lang="ts">
  import { expoOut } from 'svelte/easing';

  const GRID_CELL_SIZE = 50;
  const GRID_ANIM_TOTAL_MS = 500;
  const GRID_ANIM_LINE_OFFSET_MS = 0.05 * GRID_ANIM_TOTAL_MS;

  let heroContainer: HTMLDivElement;
  let gridCanvas: HTMLCanvasElement;

  $effect(() => {
    if (!gridCanvas) return;

    const ctx = gridCanvas.getContext('2d')!;

    // Timing & Animation Control
    let startTime: number | null = null;
    const duration = GRID_ANIM_TOTAL_MS;

    /**
     * Applies base styling to the drawing context.
     * @param strokeWidth The width of future lines to draw.
     */
    function applyStyling(strokeWidth: number = 1): void {
      const style = getComputedStyle(document.documentElement);
      const lineColor = style.getPropertyValue('--color-secondary').trim();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = Math.max(0, strokeWidth);
    }

    /**
     * Primitive function to draw a single line.
     * @param p1x Point 1 X coordinate
     * @param p1y Point 1 Y coordinate
     * @param p2x Point 2 X coordinate
     * @param p2y Point 2 Y coordinate
     */
    function drawLine(
      p1x: number,
      p1y: number,
      p2x: number,
      p2y: number,
      inBetween: boolean = true,
      strokeWidth: number = 1
    ): void {
      applyStyling(strokeWidth);

      if (inBetween) {
        p1x = Math.floor(p1x) + 0.5;
        p1y = Math.floor(p1y) + 0.5;
        p2x = Math.floor(p2x) + 0.5;
        p2y = Math.floor(p2y) + 0.5;
      }

      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();
    }

    // Main Lines State
    let drawGridDone = false;

    /**
     * Draws the grid squares onto the div itself.
     * @param elapsed A non-eased float that tracks progression of the animation.
     */
    function drawGrid(elapsed: number): void {
      // Responsiveness Checks
      gridCanvas.width = heroContainer.offsetWidth;
      gridCanvas.height = heroContainer.offsetHeight;
      gridCanvas.style.width = heroContainer.offsetWidth + 'px';
      gridCanvas.style.height = heroContainer.offsetHeight + 'px';

      // Coordinate positions as consts
      const width = gridCanvas.width;
      const height = gridCanvas.height;
      const centerX = width / 2 + 0.5;
      const centerY = height / 2 + 0.5;

      // Main Center Line
      const centerProgress = elapsed / duration;
      drawLine(
        centerX - expoOut(centerProgress) * width * 0.5,
        centerY,
        centerX + expoOut(centerProgress) * width * 0.5,
        centerY,
        true,
        3
      );
      drawLine(
        centerX,
        centerY - expoOut(centerProgress) * height * 0.5,
        centerX,
        centerY + expoOut(centerProgress) * height * 0.5,
        true,
        3
      );

      let verticalRingsDone = false;
      let horizontalRingsDone = false;

      // Vertical "rings", i.e. horizontal lines, extending outward from center
      for (let x = GRID_CELL_SIZE; x <= width / 2; x += GRID_CELL_SIZE) {
        // Determine offset based off of cell index
        const cellIndex = Math.floor(x / GRID_CELL_SIZE);
        const lineProgress = (elapsed - cellIndex * GRID_ANIM_LINE_OFFSET_MS) / duration;
        const lastCell = x + GRID_CELL_SIZE > width / 2;

        // Update whether this is done or not
        if (lastCell && lineProgress >= 1) {
          verticalRingsDone = true;
        }

        // Horizontal line on left-hand side
        drawLine(
          centerX - x,
          centerY - expoOut(lineProgress) * height * 0.5,
          centerX - x,
          centerY + expoOut(lineProgress) * height * 0.5
        );
        // Horizontal line on right-hand side
        drawLine(
          centerX + x,
          centerY - expoOut(lineProgress) * height * 0.5,
          centerX + x,
          centerY + expoOut(lineProgress) * height * 0.5
        );
      }

      // Horizontal "rings", i.e. vertical lines, extending outward from center
      for (let y = GRID_CELL_SIZE; y <= height / 2; y += GRID_CELL_SIZE) {
        // Determine offset based off of cell index
        const cellIndex = Math.floor(y / GRID_CELL_SIZE);
        const lineProgress = (elapsed - cellIndex * GRID_ANIM_LINE_OFFSET_MS) / duration;
        const lastCell = y + GRID_CELL_SIZE > height / 2;

        // Update whether this is done or not
        if (lastCell && lineProgress >= 1) {
          horizontalRingsDone = true;
        }

        // Vertical line on top side
        drawLine(
          centerX - expoOut(lineProgress) * width * 0.5,
          centerY + y,
          centerX + expoOut(lineProgress) * width * 0.5,
          centerY + y
        );
        // Vertical line on bottom side
        drawLine(
          centerX - expoOut(lineProgress) * width * 0.5,
          centerY - y,
          centerX + expoOut(lineProgress) * width * 0.5,
          centerY - y
        );
      }

      if (verticalRingsDone && horizontalRingsDone) {
        drawGridDone = true;
      }
    }

    /**
     * Main animation draw loop.
     * @param timestamp timestamp in milliseconds
     */
    function loop(timestamp: number): void {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      drawGrid(elapsed);

      if (!drawGridDone) {
        requestAnimationFrame(loop);
      }
    }

    // Necessary resize observer
    const animationLoop = () => requestAnimationFrame(loop);
    window.addEventListener('resize', animationLoop);

    // Necessary mutation observer, for the DaisyUI 'data-theme', light and dark mode
    const observer = new MutationObserver(animationLoop);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Loop the darn thing
    animationLoop();

    // Cleanup on component destruction :P
    return () => {
      window.removeEventListener('resize', animationLoop);
      observer.disconnect();
    };
  });
</script>

<div bind:this={heroContainer} class="hero_container">
  <canvas bind:this={gridCanvas}></canvas>
</div>

<style>
  .hero_container {
    position: relative;
    width: 100lvw;
    height: 100lvh;
    overflow: hidden;

    canvas {
      position: absolute;
    }
  }
</style>
