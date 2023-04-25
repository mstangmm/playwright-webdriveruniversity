import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { ContactUs } from '../pageObjects/contactUs'

let contactUs: ContactUs
const validFirstName = faker.name.firstName()
const validLastName = faker.name.lastName()
const validEmail = faker.internet.email(validFirstName, validLastName)
const invalidEmail = faker.word.noun()
const validMessage = faker.lorem.sentence()

test.beforeEach(async ({ page }) => {
  contactUs = new ContactUs(page)
  await contactUs.openPage()
})

test('Reset form data', async () =>{
  await contactUs.fillInData(validFirstName, validLastName, validEmail, validMessage)
  await contactUs.resetForm()
  await expect(contactUs.firstName).toBeEmpty()
  await expect(contactUs.lastName).toBeEmpty()
  await expect(contactUs.email).toBeEmpty()
  await expect(contactUs.comments).toBeEmpty()
})

test('Not provide all required data', async() =>{
  await contactUs.fillInData(validFirstName, validLastName)
  await contactUs.submitForm()
  expect(await contactUs.isErrorRaised('all fields are required')).toBeTruthy()
})

test('Provide email address in wrong format', async() => {
  await contactUs.fillInData(validFirstName, validLastName, invalidEmail, validMessage)
  await contactUs.submitForm()
  expect(await contactUs.isErrorRaised('Invalid email address')).toBeTruthy()
})

test('Provide valid data', async() => {
  await contactUs.fillInData(validFirstName, validLastName, validEmail, validMessage)
  await contactUs.submitForm()
  await expect(contactUs.successMessage).toBeVisible()
})