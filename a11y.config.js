module.exports = {
  rules: {
    'color-contrast': {
      enabled: true,
      level: 'AA',
    },
    'heading-order': {
      enabled: true,
    },
    'image-alt': {
      enabled: true,
    },
    'label': {
      enabled: true,
    },
    'link-name': {
      enabled: true,
    },
    'list': {
      enabled: true,
    },
    'listitem': {
      enabled: true,
    },
    'region': {
      enabled: true,
    },
  },
  checks: {
    'color-contrast': {
      options: {
        noScroll: true,
      },
    },
  },
  reporter: {
    reportType: 'json',
    outputDir: 'a11y-reports',
  },
} 