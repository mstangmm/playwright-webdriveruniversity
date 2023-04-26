import { expect, test } from '@playwright/test'

import { DropdownsCheckboxesRadios } from '../pageObjects/dropdownsCheckboxesRadios'
import { dataset } from '../fixtures/dropdownsCheckboxesRadiosFixture'

let dcr: DropdownsCheckboxesRadios

test.beforeEach(async ({ page }) => {
  dcr = new DropdownsCheckboxesRadios(page)
  await dcr.openPage()
})

for (const option of dataset.dropdowns[0].options) {
  test(`Select ${option} in the first dropdown`, async () => {
    await dcr.dropdown1.selectOption(option)
    // This page is retarded and selection is not reflected in the DOM. Only way to implement would some visual check.
  })
}

test('Verify checkbox selection', async () => {
  await dcr.checkCheckboxOptions(dataset.checkbox)
  await dcr.unCheckCheckboxOptions([dataset.checkbox[1], dataset.checkbox[3]])

  await expect(dcr.checkboxes.locator(`[value=${dataset.checkbox[0]}]`)).toBeChecked()
  await expect(dcr.checkboxes.locator(`[value=${dataset.checkbox[1]}]`)).not.toBeChecked()
  await expect(dcr.checkboxes.locator(`[value=${dataset.checkbox[2]}]`)).toBeChecked()
  await expect(dcr.checkboxes.locator(`[value=${dataset.checkbox[3]}]`)).not.toBeChecked()
})

for (const option of dataset.radioButtons) {
  test(`Select ${option} in the radio buttons`, async() => {
    await dcr.checkRadioOption(option)
    await expect(dcr.radioButtons.locator(`[value=${option}]`)).toBeChecked()
  })
}

