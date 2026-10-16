import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 60000,
  expect: { timeout: 10000 },
  // A dedicated dev server with a test contact endpoint; the tests mock its responses.
  webServer: {
    command: 'npx vite --port 5174 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: false,
    env: {
      VITE_CONTACT_ENDPOINT: '/api/contact',
      VITE_CONTACT_EMAIL: 'hello@example.com',
    },
  },
  use: {
    baseURL: 'http://localhost:5174',
    headless: true,
    channel: 'chrome',
  },
  reporter: 'list',
})
