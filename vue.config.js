module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.200.158.21',
        //target: 'http://localhost:8000',
      },

    }
  }
}
