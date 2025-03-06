// Define the structure of Zod validation error format
interface ZodErrorDetails {
  fieldErrors: Record<string, string[]>;
}

// Function to format Zod errors to a consistent structure
export function formatZodErrors(
  zodError: ZodErrorDetails,
): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};

  // Flatten and format the errors
  for (const field in zodError.fieldErrors) {
    if (zodError.fieldErrors[field]) {
      formattedErrors[field] = zodError.fieldErrors[field];
    }
  }

  return formattedErrors;
}
