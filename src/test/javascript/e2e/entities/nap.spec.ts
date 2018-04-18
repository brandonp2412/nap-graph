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
            .toMatch(/Naps/);

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
        napDialogPage.daySelectLastOption();
        napDialogPage.getExerciseInput().isSelected().then((selected) => {
            if (selected) {
                napDialogPage.getExerciseInput().click();
                expect(napDialogPage.getExerciseInput().isSelected()).toBeFalsy();
            } else {
                napDialogPage.getExerciseInput().click();
                expect(napDialogPage.getExerciseInput().isSelected()).toBeTruthy();
            }
        });
        napDialogPage.personSelectLastOption();
        napDialogPage.save();
        expect(napDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NapComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-nap div h2 span')).first();

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
    daySelect = element(by.css('select#field_day'));
    exerciseInput = element(by.css('input#field_exercise'));
    personSelect = element(by.css('select#field_person'));

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

    setDaySelect = function(day) {
        this.daySelect.sendKeys(day);
    };

    getDaySelect = function() {
        return this.daySelect.element(by.css('option:checked')).getText();
    };

    daySelectLastOption = function() {
        this.daySelect.all(by.tagName('option')).last().click();
    };
    getExerciseInput = function() {
        return this.exerciseInput;
    };
    personSelectLastOption = function() {
        this.personSelect.all(by.tagName('option')).last().click();
    };

    personSelectOption = function(option) {
        this.personSelect.sendKeys(option);
    };

    getPersonSelect = function() {
        return this.personSelect;
    };

    getPersonSelectedOption = function() {
        return this.personSelect.element(by.css('option:checked')).getText();
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
