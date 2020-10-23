<template>
  <div>
    <div id="window-drag"></div>
    <div id="controls">
      <span class="control" id="minimize" @click="minimizeWindow">_</span>
      <span class="control" @click="closeApp">×</span>
    </div>
  </div>
</template>

<script>
const { remote } = require('electron');
export default {
  name: 'TabControls',
  methods: {
    closeApp: () => {
      remote.BrowserWindow.getFocusedWindow().close();
    },
    minimizeWindow: () => {
      remote.BrowserWindow.getFocusedWindow().minimize();
    },
  },
};
</script>

<style lang="scss" scoped>
#window-drag {
  z-index: 100;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 22px;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-app-region: drag;
}
#controls {
  z-index: 100;
  position: absolute;
  right: 0;
  top: 12px;
  padding: 0 24px 0 0;
  width: 100%;
  z-index: 100;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
}
.control {
  cursor: pointer;
  font-size: 36px;
  user-select: none;
}
#minimize {
  margin-bottom: 10px;
}
</style>
