'use server';

export async function testAction() {
  console.log('Action called');
  return { success: true };
}
