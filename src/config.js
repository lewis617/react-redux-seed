module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || process.env.NODE_ENV === 'production' ? 8080 : 3000,
  app: {
    title: 'React Redux Seed',
    description: 'React Redux Seed',
    head: {
      titleTemplate: 'React Redux Seed: %s',
      meta: [
        {
          name: 'description',
          content: 'React Redux Seed'
        },
        { charset: 'utf-8' }
      ]
    }
  }
};
