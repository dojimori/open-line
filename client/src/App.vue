<template>
  <router-view></router-view>
</template>

<style>
body {
  font-family: Tahoma, Verdana, "Helvetica Neue", Arial, sans-serif;
  background-color: rgb(233, 234, 237);
  background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.016) 2px,
      rgba(0, 0, 0, 0.016) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.016) 2px,
      rgba(0, 0, 0, 0.016) 4px
    ),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 3px,
      rgba(255, 255, 255, 0.024) 3px,
      rgba(255, 255, 255, 0.024) 6px
    ),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(200, 200, 200, 0.15) 50%,
      rgba(255, 255, 255, 0.2) 100%
    );
  background-size: 4px 4px, 4px 4px, 6px 6px, 100% 100%;
  /* color: rgb(29, 33, 41); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  font-size: 14px;
  min-height: 100vh;
  margin: 0;
  /* padding: 20px; */
}
</style>
