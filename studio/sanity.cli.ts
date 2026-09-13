import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'o65rl8jj',
    dataset: 'production'
  },
  deployment: {
    appId: 'p6enp2o69d26txlrnv6hwm62',
    autoUpdates: true,
  },
})
