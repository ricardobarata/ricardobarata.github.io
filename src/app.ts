import { Buttons } from './buttons';
import { Icons } from './icons';
import { RadarChart } from './radar';
import { Translations } from './translations';

class App {
    public initApp(): void {
        const currentDate = new Date();
        const workYears = this.getWorkYears(currentDate);
        const livingInUkYears = this.getLivingInUkYears(currentDate);

        const translations: Translations = new Translations(workYears, livingInUkYears);
        translations.initTranslations();

        new Buttons(translations).initButtons();
        new Icons();

        this.showElementsNowWeHaveJavascript();

        new RadarChart(workYears).initChart();

        (document.getElementById('copyright') as any).textContent = `© ${currentDate.getFullYear()} Ricardo Barata`;

        this.logMe(
            'Hi there ツ Hope you have a nice day!',
            'background-color: #202124; color: #ffee58; font-weight: bold; font-size: x-large;'
        );
        this.logMe(
            `© ${currentDate.getFullYear()} Ricardo Barata`,
            'background-color: #202124; color: #fff; font-size: medium;'
        );
    }

    private logMe(message: string, props: string): void {
        setTimeout(console.log.bind(console, `%c ${message}`, props));
    }

    private getWorkYears(currentDate: Date): number {
        // check if date is not based on locale
        const firstJobDate = new Date(2013, 9, 2);
        const diffInDays = this.getDaysBetweenTwoDates(firstJobDate, currentDate);

        return Math.round(diffInDays / 365);
    }

    private getLivingInUkYears(currentDate: Date): number {
        const arrivedInUkDate = new Date(2016, 7, 26);
        const diffInDays = this.getDaysBetweenTwoDates(arrivedInUkDate, currentDate);

        return Math.round(diffInDays / 365);
    }

    private getDaysBetweenTwoDates(startDate: Date, endDate: Date): number {
        return Math.floor(
            (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
                Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) /
                (1000 * 60 * 60 * 24)
        );
    }

    private showElementsNowWeHaveJavascript(): void {
        const loading = document.getElementById('main__loading');
        loading?.parentNode?.removeChild(loading);

        const hidden = document.querySelectorAll('.hidden');
        Array.prototype.forEach.call(hidden, function (element) {
            element.classList.remove('hidden');
        });
    }
}

export { App };
