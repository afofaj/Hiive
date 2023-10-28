import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly addTimezoneButton: Locator;
    readonly labelInput: Locator;
    readonly locationDropdown: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addTimezoneButton = page.getByTestId('add-timezone-button');
        this.labelInput = page.getByTestId('label-input');
        this.locationDropdown = page.getByTestId('select-timezone');
        this.saveButton = page.getByTestId('submit-button');
    }

    async goToHomePage() {
        await this.page.goto(``);
    };

};