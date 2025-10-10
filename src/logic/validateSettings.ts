import * as fs from 'fs';
import { Settings } from '../types';

/**
 * Validates all settings parameters and throws specific errors for invalid or missing parameters.
 */
export async function validateSettings(settings: Settings): Promise<void> {
  // Validate targetNames
  if (!Array.isArray(settings.targetNames)) {
    throw new Error('Invalid settings: targetNames must be an array of strings');
  }
  
  if (settings.targetNames.length === 0) {
    throw new Error('Invalid settings: targetNames cannot be empty - at least one target name is required');
  }
  
  for (const targetName of settings.targetNames) {
    if (typeof targetName !== 'string') {
      throw new Error(`Invalid settings: targetNames must contain only strings, found: ${typeof targetName}`);
    }
    
    if (targetName.trim().length === 0) {
      throw new Error('Invalid settings: targetNames cannot contain empty strings');
    }
    
    if (targetName.includes('/') || targetName.includes('\\')) {
      throw new Error(`Invalid settings: targetNames cannot contain path separators: "${targetName}"`);
    }
  }

  // Validate replaceName
  if (typeof settings.replaceName !== 'string') {
    throw new Error(`Invalid settings: replaceName must be a string, found: ${typeof settings.replaceName}`);
  }
  
  if (settings.replaceName.trim().length === 0) {
    throw new Error('Invalid settings: replaceName cannot be empty');
  }
  
  if (settings.replaceName.includes('/') || settings.replaceName.includes('\\')) {
    throw new Error(`Invalid settings: replaceName cannot contain path separators: "${settings.replaceName}"`);
  }

  // Validate scanPath
  if (typeof settings.scanPath !== 'string') {
    throw new Error(`Invalid settings: scanPath must be a string, found: ${typeof settings.scanPath}`);
  }
  
  if (settings.scanPath.trim().length === 0) {
    throw new Error('Invalid settings: scanPath cannot be empty');
  }

  try {
    const stats: fs.Stats = await fs.promises.stat(settings.scanPath);
    if (!stats.isDirectory()) {
      throw new Error(`Invalid settings: scanPath "${settings.scanPath}" exists but is not a directory`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid settings:')) {
      throw error;
    }
    throw new Error(`Invalid settings: Cannot access scanPath "${settings.scanPath}": ${error}`);
  }

  // Validate separator
  if (typeof settings.separator !== 'string') {
    throw new Error(`Invalid settings: separator must be a string, found: ${typeof settings.separator}`);
  }
  
  if (settings.separator.length === 0) {
    throw new Error('Invalid settings: separator cannot be empty');
  }
  
  if (settings.separator.length > 1) {
    throw new Error(`Invalid settings: separator must be a single character, found: "${settings.separator}"`);
  }
  
  // Check if separator conflicts with target names or replace name
  for (const targetName of settings.targetNames) {
    if (targetName.includes(settings.separator)) {
      throw new Error(`Invalid settings: targetName "${targetName}" contains the separator character "${settings.separator}"`);
    }
  }
  
  if (settings.replaceName.includes(settings.separator)) {
    throw new Error(`Invalid settings: replaceName "${settings.replaceName}" contains the separator character "${settings.separator}"`);
  }

  // Validate ignorePaths
  if (!Array.isArray(settings.ignorePaths)) {
    throw new Error('Invalid settings: ignorePaths must be an array of strings');
  }
  
  for (const ignorePath of settings.ignorePaths) {
    if (typeof ignorePath !== 'string') {
      throw new Error(`Invalid settings: ignorePaths must contain only strings, found: ${typeof ignorePath}`);
    }
    
    if (ignorePath.trim().length === 0) {
      throw new Error('Invalid settings: ignorePaths cannot contain empty strings');
    }
    
    if (ignorePath.includes('/') || ignorePath.includes('\\')) {
      throw new Error(`Invalid settings: ignorePaths cannot contain path separators: "${ignorePath}"`);
    }
  }

  // Validate sleepAfterMilliseconds
  if (typeof settings.sleepAfterMilliseconds !== 'number') {
    throw new Error(`Invalid settings: sleepAfterMilliseconds must be a number, found: ${typeof settings.sleepAfterMilliseconds}`);
  }
  
  if (!Number.isInteger(settings.sleepAfterMilliseconds)) {
    throw new Error(`Invalid settings: sleepAfterMilliseconds must be an integer, found: ${settings.sleepAfterMilliseconds}`);
  }
  
  if (settings.sleepAfterMilliseconds < 0) {
    throw new Error(`Invalid settings: sleepAfterMilliseconds cannot be negative, found: ${settings.sleepAfterMilliseconds}`);
  }
  
  if (settings.sleepAfterMilliseconds > 10000) {
    throw new Error(`Invalid settings: sleepAfterMilliseconds should not exceed 10000ms (10 seconds), found: ${settings.sleepAfterMilliseconds}`);
  }
}

/**
 * Legacy function for backward compatibility - validates only the scan path.
 * @deprecated Use validateSettings instead for comprehensive validation.
 */
export async function validatePath(scanPath: string) {
  try {
    const stats: fs.Stats = await fs.promises.stat(scanPath);
    if (!stats.isDirectory()) {
      console.error(`Error: ${scanPath} is not a directory`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error: Cannot access path ${scanPath}:`, error);
    process.exit(1);
  }
}
