<template>
  <transition name="animation-loader">
    <div class="loader-container">
      <div class="loader">
        <svg class="circle" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.75;
    z-index: 1084;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.219);
  }

  .animation-loader-enter-active {
    animation: show 400ms;
  }
  .animation-loader-leave-active {
    animation: show 400ms reverse;
  }

  .loader {
    width: 50%;
    height: 50%;
    max-width: 50px;
    max-height: 50px;
    margin: auto;
  }

  .circle {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-width: 6;
    stroke: $color-normal;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes show {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0.75;
    }
  }

</style>
