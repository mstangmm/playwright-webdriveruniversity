import { expect, test } from '@playwright/test'

import { Autocomplete } from '../pageObjects/autocomplete'

let autocomplete: Autocomplete

test.beforeEach(async ({ page }) => {
  autocomplete = new Autocomplete(page)
  await autocomplete.openPage()
})

test('Reset form data', async () => {
  const partialText = 'Chi'
  const fullText = 'Chips'
  await autocomplete.fillAndSelectOption(partialText, fullText)
  expect(await autocomplete.foodItem.inputValue()).toEqual(fullText)
})
