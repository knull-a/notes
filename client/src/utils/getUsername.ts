/**
 *
 * Gets username from email
 * @example getUsername("test@gmail.com")
 * @returns "test"
 */
export default (email: string) =>
  email && email.includes("@") ? email.split("@")[0] : email;
