export default class BaseModal {
  /**
    * @param {import('@playwright/test').Page} page
    */
  constructor(page) {
    this.page = page;
  }
}