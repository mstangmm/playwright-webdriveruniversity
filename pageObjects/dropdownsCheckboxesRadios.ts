import { Locator, Page } from '@playwright/test'

export  class DropdownsCheckboxesRadios{
  readonly page: Page
  readonly dropdown1: Locator
  readonly optionsDropdown1 = ['java', 'c#', 'python', 'sql']
  readonly dropdown2: Locator
  readonly optionsDropdown2 = ['eclipse', 'maven', 'testng', 'junit']
  readonly dropdown3: Locator
  readonly optionsDropdown3 = ['html', 'css', 'javascript', 'jquery']
  readonly checkboxes: Locator
  readonly radioButtons: Locator
  readonly disabledRadioButtons: Locator
  readonly disabledDropdown: Locator

  constructor(page: Page){
    this.page = page
    this.dropdown1= page.locator('#dropdowm-menu-1')
    this.dropdown2= page.locator('#dropdowm-menu-2')
    this.dropdown3= page.locator('#dropdowm-menu-3')
    this.checkboxes= page.locator('#checkboxes')
    this.radioButtons= page.locator('#radio-buttons')
  }

  async openPage(){
    await this.page.goto('/Dropdown-Checkboxes-RadioButtons/index.html')
  }

  async checkCheckboxOptions(options: Array<string>) {
    for (const option of options) {
      await this.checkboxes.locator(`[value=${option}]`).check()
    }
  }

  async unCheckCheckboxOptions(options: Array<string>) {
    for (const option of options) {
      await this.checkboxes.locator(`[value=${option}]`).uncheck()
    }
  }

  async checkRadioOption(option: string) {
    await this.radioButtons.locator(`[value=${option}]`).check()
  }
}