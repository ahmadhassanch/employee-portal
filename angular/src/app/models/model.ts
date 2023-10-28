export interface Tasks {
  taskId: string;
  title: string;
}

export interface AttendenceData {
  attendenceDate: number;
  attendenceId: string;
  checkInTime: number;
  userId: string;
  checkOutTime: number;
  lName?: string;
  fName?: string;
}

export interface SubTasks {
  taskId?: string;
  title: string;
  taskTrackId?: string;
}

export interface Roles {
  permissions: string;
  roleId: string;
  title: string;
  scale: number;
}

export interface TeamLeads {
  fName: string;
  lName?: string;
  userId: string;
}

export interface TeamProgress {
  duration: number;
  isActive?: boolean;
  user: TeamLeads;
  task: Tasks;
}

export interface Report {
  description: string;
  fName?: string;
  lName?: string;
  userId: string;
  reportId?: string;
  task?: Tasks;
  reportDate: number;
}

export interface User {
  address: string;
  designation: string;
  emailOffice: string;
  fName: string;
  lName: string;
  fatherName: string;
  isCheckedIn: boolean;
  isLoggedIn: boolean;
  joiningDate: number;
  nic: string;
  password: string;
  userName: string;
  phone: string;
  profileImage: string;
  teamLeadId: string;
  userId: string;
  roleId: string;
  createdAt?: number;
  updatedAt?: number;
  isDeleted?: boolean;
}

export interface Menu {
  icon: string;
  rout: string;
  title: string;
}
