import * as fs from 'fs';
import { Settings } from '../types';
import path from 'path';

/**
 * Validates all settings parameters and throws specific errors for invalid or missing parameters.
 */
export async function validateSettings(settings: Settings): Promise<void> {
  // Validate targetNames.
  if (!Array.isArray(settings.targetNames)) {
    throw new Error(
      'Invalid settings: targetNames must be an array of strings (1000002)'
    );
  }
  if (settings.targetNames.length === 0) {
    throw new Error(
      'Invalid settings: targetNames cannot be empty - at least one target name is required (1000003)'
    );
  }
  for (const targetName of settings.targetNames) {
    if (typeof targetName !== 'string') {
      throw new Error(
        `Invalid settings: targetNames must contain only strings, found: ${typeof targetName} (1000004)`
      );
    }
    if (targetName.trim().length === 0) {
      throw new Error(
        'Invalid settings: targetNames cannot contain empty strings (1000005)'
      );
    }
    if (targetName.includes('/') || targetName.includes('\\')) {
      throw new Error(
        `Invalid settings: targetNames cannot contain path separators: "${targetName}" (1000006)`
      );
    }
  }
  // Validate replaceName.
  if (typeof settings.replaceName !== 'string') {
    throw new Error(
      `Invalid settings: replaceName must be a string, found: ${typeof settings.replaceName} (1000007)`
    );
  }
  if (settings.replaceName.trim().length === 0) {
    throw new Error('Invalid settings: replaceName cannot be empty (1000008)');
  }
  if (
    settings.replaceName.includes('/') ||
    settings.replaceName.includes('\\')
  ) {
    throw new Error(
      `Invalid settings: replaceName cannot contain path separators: "${settings.replaceName}" (1000009)`
    );
  }
  // Validate scanPath.
  if (typeof settings.scanPath !== 'string') {
    throw new Error(
      `Invalid settings: scanPath must be a string, found: ${typeof settings.scanPath} (1000010)`
    );
  }
  if (settings.scanPath.trim().length === 0) {
    throw new Error('Invalid settings: scanPath cannot be empty (1000011)');
  }
  try {
    let stats: fs.Stats;
    try {
      stats = await fs.promises.stat(settings.scanPath);
    } catch {
      throw new Error(
        `Invalid settings: scanPath "${settings.scanPath}" does not exist or cannot be accessed (1000012)`
      );
    }
    if (!stats.isDirectory()) {
      throw new Error(
        `Invalid settings: scanPath "${settings.scanPath}" exists but is not a directory (1000013)`
      );
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid settings:')) {
      throw error;
    }
    throw new Error(
      `Invalid settings: Cannot access scanPath "${settings.scanPath}" (1000013): ${error}`
    );
  }
  // Validate separator.
  if (typeof settings.separator !== 'string') {
    throw new Error(
      `Invalid settings: separator must be a string, found: ${typeof settings.separator} (1000014)`
    );
  }
  if (settings.separator.length === 0) {
    throw new Error('Invalid settings: separator cannot be empty (1000015)');
  }
  if (settings.separator.length > 1) {
    throw new Error(
      `Invalid settings: separator must be a single character, found: "${settings.separator}" (1000016)`
    );
  }
  // Check if separator conflicts with target names or replace name.
  for (const targetName of settings.targetNames) {
    if (targetName.includes(settings.separator)) {
      throw new Error(
        `Invalid settings: targetName "${targetName}" contains the separator character "${settings.separator}" (1000017)`
      );
    }
  }
  if (settings.replaceName.includes(settings.separator)) {
    throw new Error(
      `Invalid settings: replaceName "${settings.replaceName}" contains the separator character "${settings.separator}" (1000018)`
    );
  }
  // Validate ignorePaths.
  if (!Array.isArray(settings.ignorePaths)) {
    throw new Error(
      'Invalid settings: ignorePaths must be an array of strings (1000019)'
    );
  }
  for (const ignorePath of settings.ignorePaths) {
    if (typeof ignorePath !== 'string') {
      throw new Error(
        `Invalid settings: ignorePaths must contain only strings, found: ${typeof ignorePath} (1000020)`
      );
    }
    if (ignorePath.trim().length === 0) {
      throw new Error(
        'Invalid settings: ignorePaths cannot contain empty strings (1000021)'
      );
    }
    if (ignorePath.includes('/') || ignorePath.includes('\\')) {
      throw new Error(
        `Invalid settings: ignorePaths cannot contain path separators: "${ignorePath}" (1000022)`
      );
    }
    const absPath: string = path.join(settings.scanPath, ignorePath);
    if ((await fs.promises.stat(absPath).catch(() => null)) === null) {
      console.warn(
        `⚠️ Warning: ignorePath "${ignorePath}" does not exist under "${settings.scanPath}" (1000023)`
      );
    }
  }
  // Validate sleepAfterMilliseconds.
  if (typeof settings.sleepAfterMilliseconds !== 'number') {
    throw new Error(
      `Invalid settings: sleepAfterMilliseconds must be a number, found: ${typeof settings.sleepAfterMilliseconds} (1000024)`
    );
  }
  if (!Number.isInteger(settings.sleepAfterMilliseconds)) {
    throw new Error(
      `Invalid settings: sleepAfterMilliseconds must be an integer, found: ${settings.sleepAfterMilliseconds} (1000025)`
    );
  }
  if (settings.sleepAfterMilliseconds < 0) {
    throw new Error(
      `Invalid settings: sleepAfterMilliseconds cannot be negative, found: ${settings.sleepAfterMilliseconds} (1000026)`
    );
  }
  if (settings.sleepAfterMilliseconds > 10000) {
    throw new Error(
      `Invalid settings: sleepAfterMilliseconds should not exceed 10000ms (10 seconds), found: ${settings.sleepAfterMilliseconds} (1000027)`
    );
  }
}
