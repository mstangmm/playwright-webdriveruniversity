import { Locator, Page } from '@playwright/test'
import { format } from 'date-fns'

export class Datepicker {
  readonly page: Page
  readonly datepicker: Locator

  constructor(page) {
    this.page = page
    this.datepicker = page.locator('#datepicker input')
  }

  async openPage() {
    await this.page.goto('https://webdriveruniversity.com/Datepicker/index.html')
  }

  async setDate(date: Date) {
    const dateText = format(date, 'MM-dd-yyyy')
    await this.page.evaluate((date) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      $('#datepicker').datepicker('update', new Date(date))
    }, dateText)
  }

  async getDate(): Promise<Date> {
    const dateText = await this.datepicker.inputValue()
    const [month, day, year] = dateText.split('-')
    return new Date(Date.UTC(+year, +month - 1, +day))
  }
}
