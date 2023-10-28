import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly timeKeeperTable: Locator;
    readonly deleteRecord: Locator;
    readonly displayedLabelName: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.timeKeeperTable = page.getByTestId('time-keeper-table');
        this.deleteRecord = page.getByTestId('delete-button');
        this.displayedLabelName = page.getByTestId('displayed-label-name');
        this.saveButton = page.getByTestId('submit-button');
    }

    async goToHomePage() {
        await this.page.goto(``);
    };

    async getTableRowLabelName() {
        return await this.timeKeeperTable
          .locator('tbody')
          .locator('tr')
          .locator('[data-testid="displayed-label-name"]')
          .textContent();
      }

    async getLabelByMatchingName(name: string): Promise<string | null> {
        const elements = await this.page.locator('[data-testid="displayed-label-name"]').all();
    
        for (const element of elements) {
            const textContent = await element.textContent();
            if (textContent === name) {
                return textContent;
            }
        }
        return null; // Element with the specified name not found
    }

};