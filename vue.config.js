module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://52.78.20.91',
        //target: 'http://localhost:8000',
      },

    }
  }
}