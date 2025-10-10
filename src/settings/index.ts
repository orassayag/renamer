import path from 'path';
import { fileURLToPath } from 'url';
import { Settings } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SETTINGS: Settings = {
  targetNames: [],
  replaceName: 'notes-',
  scanPath: 'C:\\Users\\Or Assayag\\Downloads',
  separator: '_',
  ignorePaths: [],
  sleepAfterMilliseconds: 50,
};
