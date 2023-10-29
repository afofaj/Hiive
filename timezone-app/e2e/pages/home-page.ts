import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly displayedLabelName: Locator;
    readonly timeKeeperTableRow: Locator;
    readonly localTimeCell: Locator;

    constructor(page: Page) {
        this.page = page;

        this.displayedLabelName = page.locator('[data-testid="displayed-label-name"]');
        this.timeKeeperTableRow = page.locator('[data-testid="time-keeper-table-body"]>tr');
        this.localTimeCell = page.locator('[data-testid="time-keeper-table-body"]>tr>td:nth-child(3)');
    }

    async goToHomePage() {
        await this.page.goto(``);
    };

    async getLabelByMatchingName(name: string): Promise<string | null> {
        const elements = await this.displayedLabelName.all();
    
        for (const element of elements) {
            const textContent = await element.textContent();
            if (textContent === name) {
                return textContent;
            }
        }
        return null; // Element with the specified name not found
    }

    async findRowAndClickDelete(label: string) {
        const rows = await this.timeKeeperTableRow.all();
        
        for (const row of rows) {
            const textContent = await row.textContent();
            if (textContent !== null && textContent.includes(label)) {
                const deleteButton = row.locator('[data-testid="delete-button"]').first();
                await deleteButton.click();
                return; 
            }
        }
        console.log(`Row with name "${label}" not found.`);
    }

    async  areTimesSorted() {
        const timeElements = await this.localTimeCell.all();
    
        // Extract the text content of time elements
        const timeStrings = await Promise.all(timeElements.map(async (timeElement) => {
            const timeText = await timeElement.textContent();
            return timeText || ''; // Handle null text content, if any
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

};