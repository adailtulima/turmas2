import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'findLanguageFromKey'})
export class FindLanguageFromKeyPipe implements PipeTransform {
    private languages: any = {
        'nl': { name: 'Nederlands' },
        'en': { name: 'English' },
        'et': { name: 'Eesti' },
        'fr': { name: 'Français' },
        'de': { name: 'Deutsch' },
        'el': { name: 'Ελληνικά' },
        'hi': { name: 'हिंदी' },
        'pt-br': { name: 'Português (Brasil)' }
        // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    };
    transform(lang: string): string {
        return this.languages[lang].name;
    }
}
