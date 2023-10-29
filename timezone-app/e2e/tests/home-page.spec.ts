import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { AddTimezoneModal, TimezoneOptions } from '../pages/add-timezone';

test.describe('Homepage Timekeeper Table Tests', () => {
    let homePage: HomePage;
    let addTimezoneModal: AddTimezoneModal;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        addTimezoneModal = new AddTimezoneModal(page);
        await homePage.goToHomePage();
      });

    test('Verify that a local timezone record marked as "You" exists by default on Timekeeper table ', async () => {
        const label = 'Local(You)';
        const matchingLabelName = await homePage.getLabelByMatchingName(label)

        if (matchingLabelName !== null) {
        expect(matchingLabelName).toMatch(label);
        } else {
        // Handle the case where the element is not found
        console.log(`Element with name "${label}" not found.`);
        }
        });

    test('Verify that a user can delete a timezone record from the Timekeeper table', async ({ page }) => {
        const label = 'Frank';
        await addTimezoneModal.addTimezone(label, TimezoneOptions.CST);
        await expect(page.locator('[data-testid="displayed-label-name"]', { hasText: label })).toBeVisible();
        await homePage.findRowAndClickDelete(label);
        await expect(page.locator('[data-testid="displayed-label-name"]', { hasText: label })).not.toBeVisible()
        });

    test('Verify that a user cannot delete the "You" record from the Timekeeper table', async ({ page }) => {
        const label = 'Local(You)';
        await expect(page.locator('[data-testid="displayed-label-name"]', { hasText: label })).toBeVisible();
        await homePage.findRowAndClickDelete(label);
        await expect(page.locator('[data-testid="displayed-label-name"]', { hasText: label })).toBeVisible() //This assertion fails because the row for the You record was deleted
        });

    test('Verify that the table is sorted by the current time, such that the earliest time is first, and the latest time is last', async () => {
        const label1 = 'Susan';
        const label2 = 'Europe HQ';
        const label3 = 'Philip';
        const label4 = 'Tom';
        const label5 = 'Sharon';
        const label6 = 'Peter';
        await addTimezoneModal.addTimezone(label1, TimezoneOptions.EST);
        await addTimezoneModal.addTimezone(label2, TimezoneOptions.CST);
        await addTimezoneModal.addTimezone(label3, TimezoneOptions.MST);
        await addTimezoneModal.addTimezone(label4, TimezoneOptions.PST);
        await addTimezoneModal.addTimezone(label5, TimezoneOptions.AKST);
        await addTimezoneModal.addTimezone(label6, TimezoneOptions.HAST);
       
        expect(await homePage.areTimesSorted()).toBe(true); //This assertion fails because time is not sorted 

        });

});