import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { AddTimezoneComponent, TimezoneOptions } from '../pages/add-timezone-component';

test.describe('Add Timezone Tests', () => {
    let homePage: HomePage;
    let addTimezoneComponent: AddTimezoneComponent;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        addTimezoneComponent = new AddTimezoneComponent(page);
        await homePage.goToHomePage();
    });

    test('Verify that a user can add a Timezone successfully', async () => {
        const label = 'Timmy';
        await addTimezoneComponent.addTimezone(label, TimezoneOptions.CST);
        await expect(homePage.getDisplayedLabelLocator(label)).toBeVisible();
    });

    test('Verify that a user can add more than one record with the same timezone', async () => {
        const label1 = 'Timmy';
        const label2 = 'Jane';
        await addTimezoneComponent.addTimezone(label1, TimezoneOptions.CST);
        await addTimezoneComponent.addTimezone(label2, TimezoneOptions.CST);

        await expect(homePage.getDisplayedLabelLocator(label2)).toBeVisible();
        await expect(homePage.getDisplayedLabelLocator(label1)).toBeVisible(); //This assertion fails because label Jane replaced Timmy on the table
    });
});