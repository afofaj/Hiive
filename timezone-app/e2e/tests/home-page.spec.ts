import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { AddTimezoneComponent, TimezoneOptions } from '../pages/add-timezone-component';

test.describe('Homepage Timekeeper Table Tests', () => {
    let homePage: HomePage;
    let addTimezoneComponent: AddTimezoneComponent;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        addTimezoneComponent = new AddTimezoneComponent(page);
        await homePage.goToHomePage();
    });

    test('Verify that a local timezone record marked as "You" exists by default on Timekeeper table ', async () => {
        const label = 'Local(You)';
        await expect(homePage.getDisplayedLabelLocator(label)).toBeVisible();
    });

    test('Verify that a user can delete a timezone record from the Timekeeper table', async () => {
        const label = 'Frank';
        await addTimezoneComponent.addTimezone(label, TimezoneOptions.CST);
        await expect(homePage.getDisplayedLabelLocator(label)).toBeVisible();
        await homePage.deleteTimezone(label);
        await expect(homePage.getDisplayedLabelLocator(label)).not.toBeVisible();
    });

    test('Verify that a user cannot delete the "You" record from the Timekeeper table', async () => {
        const label = 'Local(You)';
        await expect(homePage.getDisplayedLabelLocator(label)).toBeVisible();
        await homePage.deleteTimezone(label);
        await expect(homePage.getDisplayedLabelLocator(label)).toBeVisible(); //This assertion fails because the row for the Local(You) record was deleted
    });

    test('Verify that the table is sorted by the current time, such that the earliest time is first, and the latest time is last', async () => {
        const timezones = [
            {label: 'Susan', timezoneOption: TimezoneOptions.EST},
            {label: 'Europe HQ', timezoneOption: TimezoneOptions.CST},
            {label: 'Philip', timezoneOption: TimezoneOptions.MST},
            {label: 'Tom', timezoneOption: TimezoneOptions.PST},
            {label: 'Sharon', timezoneOption: TimezoneOptions.AKST},
            {label: 'Peter', timezoneOption: TimezoneOptions.HAST}
        ]

        for (const timezone of timezones){
            await addTimezoneComponent.addTimezone(timezone.label, timezone.timezoneOption);
        }

        expect(await homePage.areTimesSorted()).toBe(true); //This assertion fails because time is not sorted by earliest
    });
});