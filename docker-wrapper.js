// docker-wrapper.js (mock version – works without Docker)
const docker = {
  listContainers: async () => {
    return [
      { Id: 'mock1', Names: ['/example_container'], State: 'running', Image: 'nginx:latest' },
      { Id: 'mock2', Names: ['/test_container'], State: 'exited', Image: 'node:18' }
    ];
  },
  getContainer: (id) => ({
    start: async () => console.log(`Mock start ${id}`),
    stop: async () => console.log(`Mock stop ${id}`),
    restart: async () => console.log(`Mock restart ${id}`),
    remove: async () => console.log(`Mock remove ${id}`),
    logs: async () => ({
      on: () => {},
      pipe: () => {},
    }),
    stats: async () => ({
      on: () => {},
    }),
  }),
};

module.exports = { docker };
