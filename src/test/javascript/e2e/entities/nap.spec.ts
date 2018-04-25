import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Nap e2e test', () => {

    let navBarPage: NavBarPage;
    let napDialogPage: NapDialogPage;
    let napComponentsPage: NapComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Naps', () => {
        navBarPage.goToEntity('nap');
        napComponentsPage = new NapComponentsPage();
        expect(napComponentsPage.getTitle())
            .toMatch(/My Naps/);

    });

    it('should load create Nap dialog', () => {
        napComponentsPage.clickOnCreateButton();
        napDialogPage = new NapDialogPage();
        expect(napDialogPage.getModalTitle())
            .toMatch(/Create or edit a Nap/);
        napDialogPage.close();
    });

    it('should create and save Naps', () => {
        napComponentsPage.clickOnCreateButton();
        napDialogPage.setDurationInput('5');
        expect(napDialogPage.getDurationInput()).toMatch('5');
        napDialogPage.setRatingInput('5');
        expect(napDialogPage.getRatingInput()).toMatch('5');
        napDialogPage.setDateInput('2000-12-31');
        expect(napDialogPage.getDateInput()).toMatch('2000-12-31');
        napDialogPage.getExerciseInput().isSelected().then((selected) => {
            if (selected) {
                napDialogPage.getExerciseInput().click();
                expect(napDialogPage.getExerciseInput().isSelected()).toBeFalsy();
            } else {
                napDialogPage.getExerciseInput().click();
                expect(napDialogPage.getExerciseInput().isSelected()).toBeTruthy();
            }
        });
        napDialogPage.userSelectLastOption();
        napDialogPage.save();
        expect(napDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NapComponentsPage {
    createButton = element(by.css('#create-nap'));
    title = element.all(by.css('#title'));

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class NapDialogPage {
    modalTitle = element(by.css('h4#myNapLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    durationInput = element(by.css('input#field_duration'));
    ratingInput = element(by.css('input#field_rating'));
    dateInput = element(by.css('input#field_date'));
    exerciseInput = element(by.css('input#field_exercise'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    };

    setRatingInput = function(rating) {
        this.ratingInput.sendKeys(rating);
    };

    getRatingInput = function() {
        return this.ratingInput.getAttribute('value');
    };

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    getExerciseInput = function() {
        return this.exerciseInput;
    };
    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
