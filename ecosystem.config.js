module.exports = {
  apps: [
    {
      name: "webzet-backend",
      script: "tsx",
      args: "server.ts",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
