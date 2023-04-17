import * as gravatar from "gravatar";

/**
 * Generates a Gravatar URL based on an email address.
 *
 * @param {string} email - The email address to generate the Gravatar URL for.
 * @returns {string} - The generated Gravatar URL.
 */
export const generateGravatarUrl = (email: string): string => {
  const options: gravatar.Options = {
    s: "200", // Size of the Gravatar image
    r: "pg", // Maximum allowed rating for the image
    d: "mm", // Default image to be displayed if no Gravatar is found for the email
  };
  return gravatar.url(email, options);
};
