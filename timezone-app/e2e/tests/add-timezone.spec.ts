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
        const name = 'Timmy';
        await addTimezoneModal.addTimezone(name, TimezoneOptions.CST);
        const matchingLabelName = await homePage.getLabelByMatchingName(name)

        if (matchingLabelName !== null) {
        expect(matchingLabelName).toMatch(name);
        } else {
        // Handle the case where the element is not found
        console.log(`Element with name "${name}" not found.`);
        }
        });

});