// src/server/models/associations.js

import Department from './Department.js';
import Major from './Major.js';
import Professor from './Professor.js';
import Subject from './Subject.js';
import EducationProgram from './EducationProgram.js';
import Schedule from './Schedule.js';
import ScheduleItem from './ScheduleItem.js';
import EducationProgramSubject from './EducationProgramSubject.js';
import SubjectClass from './SubjectClass.js';
import Account from './Account.js';
import Room from './Room.js';

// Department and Major
Department.hasMany(Major, { foreignKey: 'DepartmentID' });
Major.belongsTo(Department, { foreignKey: 'DepartmentID' });

// Department and Subject
Department.hasMany(Subject, { foreignKey: 'DepartmentID' });
Subject.belongsTo(Department, { foreignKey: 'DepartmentID' });

// EducationProgram and Major
EducationProgram.hasMany(Major, { foreignKey: 'EducationProgramID' });
Major.belongsTo(EducationProgram, { foreignKey: 'EducationProgramID' });

// Schedule and ScheduleItem
Schedule.hasMany(ScheduleItem, { foreignKey: 'ScheduleID' });
ScheduleItem.belongsTo(Schedule, { foreignKey: 'ScheduleID' });

// EducationProgram and Subject through EducationProgramSubject
EducationProgram.belongsToMany(Subject, {
  through: EducationProgramSubject,
  foreignKey: 'EducationProgramID',
  otherKey: 'SubjectID',
});

Subject.belongsToMany(EducationProgram, {
  through: EducationProgramSubject,
  foreignKey: 'SubjectID',
  otherKey: 'EducationProgramID',
});

// Subject and SubjectClass
Subject.hasMany(SubjectClass, { foreignKey: 'SubjectID' });
SubjectClass.belongsTo(Subject, { foreignKey: 'SubjectID' });

// Professor and SubjectClass
Professor.hasMany(SubjectClass, { foreignKey: 'ProfessorID' });
SubjectClass.belongsTo(Professor, { foreignKey: 'ProfessorID' });

// Subject self-association for idPreviousSubject
Subject.belongsTo(Subject, { as: 'PreviousSubject', foreignKey: 'idPreviousSubject' });

// ScheduleItem and SubjectClass
ScheduleItem.belongsTo(SubjectClass, { foreignKey: 'SubjectClassID' });
SubjectClass.hasMany(ScheduleItem, { foreignKey: 'SubjectClassID' });

// ScheduleItem and Room
ScheduleItem.belongsTo(Room, { foreignKey: 'RoomID' });
Room.hasMany(ScheduleItem, { foreignKey: 'RoomID' });

// ScheduleItem and Professor
ScheduleItem.belongsTo(Professor, { foreignKey: 'ProfessorID' });
Professor.hasMany(ScheduleItem, { foreignKey: 'ProfessorID' });

// ScheduleItem and Department
ScheduleItem.belongsTo(Department, { foreignKey: 'DepartmentID' });
Department.hasMany(ScheduleItem, { foreignKey: 'DepartmentID' });

// DepartmentLeader association
Department.belongsTo(Professor, { as: 'Leader', foreignKey: 'DepartmentLeader' });
Professor.hasOne(Department, { as: 'LeadsDepartment', foreignKey: 'DepartmentLeader' });

// Export the function to apply associations
export default function applyAssociations() {
  // Các associations đã được định nghĩa ở trên
  // Chỉ cần gọi hàm này khi khởi tạo ứng dụng
}
