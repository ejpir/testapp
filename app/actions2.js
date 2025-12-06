"use server"

// Default export - does this change the module structure?
export default async function defaultAction(formData) {
  console.log("Default action called")
  return { success: true }
}
