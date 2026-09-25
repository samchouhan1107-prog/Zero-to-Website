export default async function run(page, ui) {
  // Set light theme, reload, verify tokens apply
  await page.evaluate(() => localStorage.setItem('webzonebw_storehouse_theme', 'light'));
  await page.reload();
  await page.waitForSelector('.webzonebw-site-header');
  const result = await page.evaluate(() => ({
    themeClass: document.documentElement.className,
    headerBg: getComputedStyle(document.querySelector('.webzonebw-site-header')).backgroundColor,
    footerVisible: !!document.querySelector('footer.webzonebw-app-footer'),
    crumb: document.querySelector('.webzonebw-breadcrumbs')?.innerText?.replace('\n', ' > ')
  }));
  // Toggle back to dark via the theme button
  await page.click('#webzonebw-theme-toggle');
  await page.waitForTimeout(300);
  result.afterToggle = await page.evaluate(() => document.documentElement.className);
  return result;
}
