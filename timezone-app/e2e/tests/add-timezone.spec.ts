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
        await addTimezoneModal.addTimezone('Timmy', TimezoneOptions.CST)
        await expect(addTimezoneModal.addTimezone2).toBeVisible();
    });

});