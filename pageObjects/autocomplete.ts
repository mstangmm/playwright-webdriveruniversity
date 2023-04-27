import { Locator, Page } from '@playwright/test'

export class Autocomplete {
  readonly page: Page
  readonly foodItem: Locator
  readonly submitBtn: Locator
  readonly autocompleteList: Locator

  constructor(page) {
    this.page = page
    this.foodItem = page.locator('#myInput')
    this.submitBtn = page.locator('#submit-button')
    this.autocompleteList = page.locator('#myInputautocomplete-list')
  }

  async openPage() {
    await this.page.goto('/Autocomplete-TextField/autocomplete-textfield.html')
  }

  async fillAndSelectOption(fillText, optionText) {
    await this.foodItem.type(fillText, { delay: 100 })
    await this.autocompleteList
      .locator('div', { has: this.page.locator(`[value=${optionText}]`) })
      .click()
  }
}
