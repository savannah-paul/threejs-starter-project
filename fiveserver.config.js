module.exports = {
    //highlight: true, // enable highlight feature
    //injectBody: true, // enable instant update
    //remoteLogs: true, // enable remoteLogs
    //remoteLogs: "yellow", // enable remoteLogs and use the color yellow
    //injectCss: false, // disable injecting css
    //navigate: true, // enable auto-navigation
    port: 8086,
    root: '/',
    open: ['dist/index.html'],
    host: '0.0.0.0',
    browser: 'chrome',
    https: true,
    remoteLogs: 'magenta' // true | false | Color
  };