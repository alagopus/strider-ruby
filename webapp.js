
module.exports = {
  config: {
    /* we don't support this yet
    runtime: {
      type: String,
      enum: ['2.6', '2.7', '3.3', 'whatever']
    },
    */
    test: {
      type: String,
      enum: ['none', 'bundle exec rspec'],
      default: 'bundle exec rspec'
    },
    prepare: {
      type: String,
      default: 'bundle install'
    }
  }
}
