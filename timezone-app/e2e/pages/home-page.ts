import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly displayedLabelName: Locator;
    readonly timeKeeperTableRow: Locator;
    readonly localTimeCell: Locator;

    constructor(page: Page) {
        this.page = page;

        this.displayedLabelName = page.locator('[data-testid="displayed-label-name"]');
        this.timeKeeperTableRow = page.locator('[data-testid="time-keeper-table-row"]');
        this.localTimeCell = page.locator('[data-testid="local-time-cell"]');
    }

    async goToHomePage() {
        await this.page.goto(``);
    }

    async deleteTimezone(label: string) {
        await this.timeKeeperTableRow.filter( {hasText: label}).getByTestId("delete-button").click();
    }

    async  areTimesSorted() {
        const timeElements = await this.localTimeCell.all();
    
        // Extract the text content of time elements
        const timeStrings = await Promise.all(timeElements.map(async (timeElement) => {
            return await timeElement.textContent();
        }));
    
        // Convert the time strings to Date objects
        const times = timeStrings.map((timeString) => {
            return new Date(`January 1, 2023 ${timeString}`);
        });
    
        // Check if times are in ascending order
        for (let i = 1; i < times.length; i++) {
            if (times[i] < times[i - 1]) {
                return false;
            }
        }
        return true;
    }

    getDisplayedLabelLocator(label: string) {
       return this.page.locator('[data-testid="displayed-label-name"]', { hasText: label })
    }
};