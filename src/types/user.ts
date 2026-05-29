export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  avatarColor: string;
}

export interface UserEducation {
  level: string;
  employmentStatus: string;
  sector: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string[];
  loanRepayment: string;
}

export interface UserSocials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface UserGuarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  tier: number;
  accountBalance: string;
  bank: string;
  profile: UserProfile;
  education: UserEducation;
  socials: UserSocials;
  guarantor: UserGuarantor;
}
