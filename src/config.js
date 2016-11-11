module.exports = {
  host: process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'),
  port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000),
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
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: '/favicon.ico'
        }
      ]
    }
  }
};
