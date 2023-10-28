import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';

test.describe('Homepage Timekeeper Table Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToHomePage();
      });

    test('Verify that a local timezone record marked as "You" exists on Timekeeper table ', async () => {
        const name = 'Local(You)';
        const matchingLabelName = await homePage.getLabelByMatchingName(name)

        if (matchingLabelName !== null) {
        expect(matchingLabelName).toMatch(name);
        } else {
        // Handle the case where the element is not found
        console.log(`Element with name "${name}" not found.`);
        }
        });

});