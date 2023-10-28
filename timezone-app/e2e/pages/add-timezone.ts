import { type Locator, type Page } from '@playwright/test';

export class AddTimezoneModal {
    readonly page: Page;
    readonly addTimezoneButton: Locator;
    readonly labelInput: Locator;
    readonly locationDropdown: Locator;
    readonly saveButton: Locator;
    readonly addTimezone2: Locator;


    constructor(page: Page) {
        this.page = page;

        this.addTimezoneButton = page.getByTestId('add-timezone-button');
        this.labelInput = page.getByTestId('label-input');
        this.locationDropdown = page.getByTestId('select-timezone');
        this.saveButton = page.getByTestId('submit-button');
    }

    async clickTimezoneOption(listOption: TimezoneOptions) {
        const values = `${listOption}`;
        await this.locationDropdown.selectOption({ value: values });
    }
    
    async addTimezone(label: string, location: TimezoneOptions) {
        await this.addTimezoneButton.click();
        await this.labelInput.fill(label);
        await this.clickTimezoneOption(location)
        await this.saveButton.click();
    }

};

// export enum TimezoneOptions {
//     EST = 'Eastern Standard Time',
//     CST = 'Central Standard Time',
//     MST = 'Mountain Standard Time',
//     PST = 'Pacific Standard Time',
//     AKST = 'Alaska Standard Time',
//     HAST = 'Hawaii-Aleutian Standard Time',
//   }

  export enum TimezoneOptions {
    EST = 'America/New_York',
    CST = 'America/Chicago',
    MST = 'America/Denver',
    PST = 'America/Los_Angeles',
    AKST = 'America/Juneau',
    HAST = 'Pacific/Honolulu',
  }