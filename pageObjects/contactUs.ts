import { Locator, Page } from '@playwright/test'

export class ContactUs {
  readonly page: Page
  readonly firstName: Locator
  readonly lastName: Locator
  readonly email: Locator
  readonly comments: Locator
  readonly resetBtn: Locator
  readonly submitBtn: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstName = page.locator('input[name=first_name]')
    this.lastName = page.locator('input[name=last_name]')
    this.email = page.locator('input[name=email]')
    this.comments = page.locator('textarea[name=message]')
    this.resetBtn = page.locator('input[type=reset]')
    this.submitBtn = page.locator('input[type=submit]')
    this.successMessage = page.locator('#contact_reply h1')
  }

  async openPage() {
    await this.page.goto('/Contact-Us/contactus.html')
  }

  async fillInData(firstName = '', lastName = '', email = '', comments = '') {
    if (firstName) await this.firstName.fill(firstName)
    if (lastName) await this.lastName.fill(lastName)
    if (email) await this.email.fill(email)
    if (comments) await this.comments.fill(comments)
  }

  async submitForm() {
    await this.submitBtn.click()
  }

  async resetForm() {
    await this.resetBtn.click()
  }

  async isErrorRaised(error: string): Promise<boolean> {
    const errorMessages = await this.page.locator('body').textContent()
    return errorMessages.includes(error)
  }
}
