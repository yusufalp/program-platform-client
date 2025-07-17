import type { Profile } from "../features/profile/types/profile";

export function getDefaultProfile(userId = ""): Profile {
  return {
    userId,
    bio: "",
    dateOfBirth: "",
    phoneNumber: "",
    status: "active",
    cohort: 0,
    graduationDate: "",
    address: {
      street: {
        line1: "",
        line2: "",
      },
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    socials: {},
  };
}
