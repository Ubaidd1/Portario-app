import { test, expect } from '@playwright/test'

// Canvas and observer-driven layouts resize on the next frame; measure once layout settles.
const settle = (page) =>
  page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )

const routes = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/services/app-development',
  '/services/ai-ml',
  '/services/python-data-science',
  '/services/seo',
  '/services/social-media',
  '/services/ui-ux',
  '/services/cms',
  '/projects',
  '/projects/forma',
  '/projects/frequency',
  '/projects/nova',
  '/projects/indigo',
  '/process',
  '/experience',
  '/contact',
]

for (const route of routes) {
  test(`route ${route} renders accessibly at desktop, tablet and mobile`, async ({ page }) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(route)
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page).toHaveTitle(/Folioblox/)
    await expect(page.locator('meta[name="description"]')).toHaveCount(1)
    await expect(page.locator('header')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(1)
    for (const width of [1440, 768, 320]) {
      await page.setViewportSize({ width, height: 1000 })
      await settle(page)
      const size = await page.evaluate(() => ({
        width: innerWidth,
        content: document.documentElement.scrollWidth,
      }))
      expect(size.content, `${route} overflows at ${width}`).toBeLessThanOrEqual(size.width)
    }
    expect(errors).toEqual([])
  })
}

test('all requested breakpoints keep homepage within viewport', async ({ page }) => {
  await page.goto('/')
  for (const width of [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 })
    await settle(page)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy()
  }
})

test('desktop menu, page transitions, route focus and metadata', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Explore services' })
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page
    .locator('#services-menu')
    .getByRole('link', { name: /AI \/ ML/ })
    .click()
  await expect(page).toHaveURL(/\/services\/ai-ml$/)
  await expect(page.locator('main h1')).toContainText('MAKE INTELLIGENCE USEFUL.')
  await expect(page.locator('main')).toBeFocused()
  await expect(page).toHaveTitle('AI / ML — Folioblox')
  await page.getByRole('link', { name: 'Discuss your project' }).click()
  await expect(page).toHaveURL(/\/contact\?service=/)
  await expect(page.getByLabel('Subject')).toHaveValue('Project enquiry: AI / ML')
})

test('mobile navigation traps and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const open = page.getByRole('button', { name: 'Open menu' })
  await open.click()
  const menu = page.getByRole('dialog', { name: 'Navigation menu' })
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(menu.getByRole('link', { name: 'Contact', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveCount(0)
  await expect(open).toBeFocused()
  await open.click()
  await menu.getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.locator('main h1')).toBeVisible()
  await expect(menu).toHaveCount(0)
})

test('project filters support empty states and browser history', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.locator('main article')).toHaveCount(4)
  await page.getByRole('button', { name: 'Data', exact: true }).click()
  await expect(page.locator('main article')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Frequency Analytics' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'App', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'UI/UX', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Indigo Studio' })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('button', { name: 'Data', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.getByRole('button', { name: 'All', exact: true }).click()
  await expect(page.locator('main article')).toHaveCount(4)
})

test('case-study architecture, gallery, drag and related navigation', async ({ page }) => {
  await page.goto('/projects/forma')
  await page.getByRole('button', { name: /API boundary/ }).click()
  await expect(
    page.getByText('A proposed service layer keeps data access separate from presentation.'),
  ).toBeVisible()
  const open = page.getByRole('button', { name: /Workspace overview, open in gallery/ })
  await open.click()
  const dialog = page.getByRole('dialog', { name: 'Forma Workspace gallery' })
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close gallery' })).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('[aria-live="polite"]').first()).toHaveText('Task hierarchy')
  await page.getByRole('button', { name: 'Next gallery image' }).click()
  await expect(dialog.locator('[aria-live="polite"]').first()).toHaveText('Component detail')
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(open).toBeFocused()
  await page
    .getByRole('navigation', { name: 'project navigation' })
    .getByRole('link', { name: /NEXT PROJECT/ })
    .click()
  await expect(page).toHaveURL(/\/projects\/frequency$/)
})

const fillEnquiry = async (page) => {
  await page.getByLabel('Name').fill('Alex Tester')
  await page.getByLabel('Email').fill('alex@example.com')
  await page.getByLabel('Subject').fill('A new studio website')
  await page
    .getByLabel('Message')
    .fill('A responsive website with a useful, accessible project archive.')
}

test('contact form validates and only confirms what the server accepted', async ({ page }) => {
  const requests = []
  await page.route('**/api/contact', async (route) => {
    requests.push(route.request().postDataJSON())
    await route.fulfill({
      status: requests.length === 1 ? 500 : 200,
      json: { ok: requests.length > 1 },
    })
  })
  await page.goto('/contact')
  const send = page.getByRole('button', { name: 'Send message' })
  await send.click()
  await expect(page.getByText('Please enter your name.')).toBeVisible()
  await expect(page.getByLabel('Name')).toBeFocused()
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
  expect(requests).toHaveLength(0)
  await fillEnquiry(page)
  await send.click()
  await expect(page.getByRole('alert')).toContainText('couldn’t be sent')
  await expect(
    page.getByRole('alert').getByRole('link', { name: 'hello@example.com' }),
  ).toBeVisible()
  await expect(page.getByLabel('Message')).toHaveValue(/responsive website/)
  await send.click()
  await expect(
    page.getByRole('heading', { name: 'Thanks — your message has been sent.' }),
  ).toBeFocused()
  expect(requests[1]).toMatchObject({ name: 'Alex Tester', email: 'alex@example.com', website: '' })
})

test('contact form shows server-side field errors', async ({ page }) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 422,
      json: { errors: { email: 'Please enter a valid email address.' } },
    }),
  )
  await page.goto('/contact')
  await fillEnquiry(page)
  await page.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
  await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true')
})

test('homepage interactions, preview, hidden empty sections and technology selection', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Next project', exact: true }).click()
  const projects = page.getByRole('region', { name: 'Selected projects', exact: true })
  await expect(projects.getByRole('heading', { name: 'Frequency Analytics' })).toBeVisible()
  await page.getByRole('button', { name: 'Quick Preview' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Next testimonial' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Next award' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Python', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Python', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.goto('/contact')
  await page.locator('#faq-button-1').click()
  await expect(page.locator('#faq-panel-1')).toBeVisible()
  await expect(page.locator('#faq-panel-0')).toHaveCount(0)
})

test('no template placeholders or unverified claims are visible', async ({ page }) => {
  for (const route of ['/', '/about', '/projects', '/projects/forma', '/experience', '/contact']) {
    await page.goto(route)
    const text = await page.locator('body').innerText()
    for (const phrase of [
      /to be added/i,
      /sample recognition/i,
      /not verified/i,
      /\(soon\)/i,
      /illustrative client/i,
      /lorem/i,
    ])
      expect(text, `${route} contains ${phrase}`).not.toMatch(phrase)
  }
})

test('404 and missing detail routes are useful', async ({ page }) => {
  for (const [route, text] of [
    ['/missing', 'Page not found.'],
    ['/projects/missing', 'Project not found.'],
    ['/services/missing', 'Service not found.'],
  ]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { name: text })).toBeVisible()
    await expect(page.getByRole('link', { name: /Back to/ }).first()).toBeVisible()
  }
})

test('reduced motion simplifies 3D, cursor and process', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.custom-cursor')).toHaveCount(0)
  await expect(page.locator('.core-running')).toHaveCount(0)
  await page.goto('/process')
  await expect(page.locator('.process-journey')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Growth', exact: true })).toBeVisible()
})

test('capture representative pages for visual review', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await settle(page)
    for (const route of [
      '/',
      '/about',
      '/services/ai-ml',
      '/projects',
      '/projects/forma',
      '/contact',
    ]) {
      await page.goto(route)
      await expect(page.locator('main h1')).toBeVisible()
      await page.screenshot({
        path: `test-results/${width}-${route.replaceAll('/', '-') || 'home'}.png`,
      })
    }
  }
})
