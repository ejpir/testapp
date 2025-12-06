"use server"

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const UPLOADS_DIR = '/tmp/uploads'

// Common pattern: Read a user-specified file
export async function readUserFile(filename) {
  const filepath = join(UPLOADS_DIR, filename)
  if (!existsSync(filepath)) {
    return { error: 'File not found' }
  }
  const content = readFileSync(filepath, 'utf-8')
  return { content }
}

// Common pattern: Write user content to a file
export async function writeUserFile(filename, content) {
  const filepath = join(UPLOADS_DIR, filename)
  writeFileSync(filepath, content)
  return { success: true, path: filepath }
}

// Pattern with options object
export async function processFile(options) {
  const { filename, operation, content } = options
  const filepath = join(UPLOADS_DIR, filename)

  if (operation === 'read') {
    return { content: readFileSync(filepath, 'utf-8') }
  } else if (operation === 'write') {
    writeFileSync(filepath, content)
    return { success: true }
  }
  return { error: 'Unknown operation' }
}

// Pattern with callback for processing
export async function transformFile(filename, transformer) {
  const filepath = join(UPLOADS_DIR, filename)
  const content = readFileSync(filepath, 'utf-8')

  // VULNERABLE: If transformer is Function, this creates new function
  const transformed = transformer(content)

  writeFileSync(filepath, transformed)
  return { success: true }
}
