import { expect, test } from '@playwright/test'

import { Datepicker } from '../pageObjects/datepicker'

let datepicker: Datepicker
test.beforeEach(async ({ page }) => {
  datepicker = new Datepicker(page)
  await datepicker.openPage()
})

test('Set plus one week date', async () => {
  const plusOneWeekDate = new Date()
  plusOneWeekDate.setDate(plusOneWeekDate.getDate() + 7)
  await datepicker.setDate(plusOneWeekDate)
  expect((await datepicker.getDate()).getDate()).toEqual(plusOneWeekDate.getDate())
})
