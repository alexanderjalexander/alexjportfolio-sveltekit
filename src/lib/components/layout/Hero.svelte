<!-- TODO: IMPLEMENT -->
<script lang="ts">
  const GRID_CELL_SIZE = 50;
  const GRID_ANIM_TOTAL_MS = 500;
  const GRID_ANIM_LINE_OFFSET_MS = 0.05 * GRID_ANIM_TOTAL_MS;

  let gridCanvas: HTMLCanvasElement;

  $effect(() => {
    if (!gridCanvas) return;

    const ctx = gridCanvas.getContext('2d');

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
      ctx!.strokeStyle = lineColor;
      ctx!.lineWidth = Math.max(0, strokeWidth);
    };

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

      ctx!.beginPath();
      ctx!.moveTo(p1x, p1y);
      ctx!.lineTo(p2x, p2y);
      ctx!.stroke();
    }
  });
</script>

<div class="hero_container">
  <canvas bind:this={gridCanvas}></canvas>
</div>

<style></style>
