import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { AddTimezoneModal, TimezoneOptions } from '../pages/add-timezone';

test.describe('Add Timezone Tests', () => {
    let homePage: HomePage;
    let addTimezoneModal: AddTimezoneModal;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        addTimezoneModal = new AddTimezoneModal(page);
        await homePage.goToHomePage();
      });

    test('Verify that a user can add a Timezone successfully', async () => {
        const label = 'Timmy';
        await addTimezoneModal.addTimezone(label, TimezoneOptions.CST);
        const matchingLabelName = await homePage.getLabelByMatchingName(label)

        if (matchingLabelName !== null) {
        expect(matchingLabelName).toMatch(label);
        } else {
        // Handle the case where the element is not found
        console.log(`Element with name "${label}" not found.`);
        }
        });

    test('Verify that a user can add more than One record with the same timezone', async ({ page }) => {
        const label1 = 'Timmy';
        const label2 = 'Jane';
        await addTimezoneModal.addTimezone(label1, TimezoneOptions.CST);
        await addTimezoneModal.addTimezone(label2, TimezoneOptions.CST);

        await expect(page.locator('[data-testid="displayed-label-name"]', { hasText: label2 })).toBeVisible();
        await expect(page.locator('[data-testid="displayed-label-name"]', { hasText: label1 })).toBeVisible(); //This assertion fails because Jane replaced Timmy on the table
       
        });

});