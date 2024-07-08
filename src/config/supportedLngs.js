import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18next
  .use(Backend)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
    },
    supportedLngs: ['en', 'es'],
    preload: ['en', 'es'],
  });


export default i18next;
