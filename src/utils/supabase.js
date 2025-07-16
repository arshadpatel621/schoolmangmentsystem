import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://tzhedajejqandtrjkbkx.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aGVkYWplanFhbmR0cmprYmt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTIzMzIxMywiZXhwIjoyMDY2ODA5MjEzfQ.QnAr7sl36nCHMiE8aHMEGHvfKwsKAOFvHVG5iJVx6PI';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names matching your schema
export const TABLES = {
  USERS: 'users',
  CLASSES: 'classes',
  SECTIONS: 'sections',
  PARENTS: 'parents',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  SUBJECTS: 'subjects',
  TEACHER_SUBJECTS: 'teacher_subjects',
  STUDENT_ATTENDANCE: 'student_attendance',
  TEACHER_ATTENDANCE: 'teacher_attendance',
  FEE_STRUCTURE: 'fee_structure',
  STUDENT_FEES: 'student_fees',
  EXAMS: 'exams',
  MARKS: 'marks',
  HOMEWORKS: 'homeworks',
  TIMETABLE: 'timetable',
  NOTIFICATIONS: 'notifications',
};

// Authentication helper functions
export const authHelpers = {
  // Sign up a new user
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in user
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database helper functions
export const dbHelpers = {
  // Generic CRUD operations
  async create(table, data) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();
      return { data: result, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async read(table, filters = {}) {
    try {
      let query = supabase.from(table).select('*');
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        query = query.eq(key, filters[key]);
      });
      
      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async update(table, id, updates) {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async delete(table, id) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      return { error };
    } catch (error) {
      return { error };
    }
  },

  // User management functions
  async getUserByEmail(email) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('email', email)
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .insert(userData)
        .select()
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Class and Section management
  async getClasses() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CLASSES)
        .select('*')
        .order('class_name');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getSectionsByClass(classId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SECTIONS)
        .select('*')
        .eq('class_id', classId)
        .order('section_name');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Student management
  async getStudentsByClass(classId, sectionId = null) {
    try {
      let query = supabase
        .from(TABLES.STUDENTS)
        .select(`
          *,
          classes(class_name),
          sections(section_name),
          parents(full_name, phone, email)
        `)
        .eq('class_id', classId);
      
      if (sectionId) {
        query = query.eq('section_id', sectionId);
      }
      
      const { data, error } = await query.order('roll_no');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getStudentById(studentId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.STUDENTS)
        .select(`
          *,
          classes(class_name),
          sections(section_name),
          parents(full_name, phone, email)
        `)
        .eq('id', studentId)
        .single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Teacher management
  async getTeachers() {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEACHERS)
        .select('*')
        .order('full_name');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getTeacherSubjects(teacherId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEACHER_SUBJECTS)
        .select(`
          *,
          subjects(name),
          classes(class_name),
          sections(section_name)
        `)
        .eq('teacher_id', teacherId);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Attendance management
  async getAttendanceByDate(date, classId = null, sectionId = null) {
    try {
      let query = supabase
        .from(TABLES.STUDENT_ATTENDANCE)
        .select(`
          *,
          students(
            full_name,
            roll_no,
            classes(class_name),
            sections(section_name)
          )
        `)
        .eq('date', date);
      
      if (classId) {
        query = query.eq('students.class_id', classId);
      }
      
      if (sectionId) {
        query = query.eq('students.section_id', sectionId);
      }
      
      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async markAttendance(attendanceData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.STUDENT_ATTENDANCE)
        .upsert(attendanceData, { onConflict: 'student_id,date' })
        .select();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Fee management
  async getFeeStructure(classId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.FEE_STRUCTURE)
        .select('*')
        .eq('class_id', classId);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getStudentFees(studentId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.STUDENT_FEES)
        .select(`
          *,
          fee_structure(amount, due_date)
        `)
        .eq('student_id', studentId)
        .order('payment_date', { ascending: false });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Exam and Marks management
  async getExams(classId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.EXAMS)
        .select('*')
        .eq('class_id', classId)
        .order('date', { ascending: false });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getMarksByStudent(studentId, examId = null) {
    try {
      let query = supabase
        .from(TABLES.MARKS)
        .select(`
          *,
          exams(name, date),
          subjects(name)
        `)
        .eq('student_id', studentId);
      
      if (examId) {
        query = query.eq('exam_id', examId);
      }
      
      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Homework management
  async getHomeworks(classId, sectionId = null) {
    try {
      let query = supabase
        .from(TABLES.HOMEWORKS)
        .select(`
          *,
          subjects(name),
          teachers(full_name)
        `)
        .eq('class_id', classId);
      
      if (sectionId) {
        query = query.eq('section_id', sectionId);
      }
      
      const { data, error } = await query.order('due_date');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Timetable management
  async getTimetable(classId, sectionId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TIMETABLE)
        .select(`
          *,
          subjects(name),
          teachers(full_name)
        `)
        .eq('class_id', classId)
        .eq('section_id', sectionId)
        .order('day_of_week, start_time');
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Notifications
  async getNotificationsByRole(role, userId = null) {
    try {
      let query = supabase
        .from(TABLES.NOTIFICATIONS)
        .select('*')
        .eq('sent_to_role', role)
        .order('created_at', { ascending: false });
      
      if (userId) {
        query = query.eq('sent_to_id', userId);
      }
      
      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Dashboard statistics
  async getDashboardStats() {
    try {
      const [
        { data: students, error: studentsError },
        { data: teachers, error: teachersError },
        { data: classes, error: classesError },
        { data: todayAttendance, error: attendanceError }
      ] = await Promise.all([
        supabase.from(TABLES.STUDENTS).select('id', { count: 'exact' }),
        supabase.from(TABLES.TEACHERS).select('id', { count: 'exact' }),
        supabase.from(TABLES.CLASSES).select('id', { count: 'exact' }),
        supabase.from(TABLES.STUDENT_ATTENDANCE)
          .select('id', { count: 'exact' })
          .eq('date', new Date().toISOString().split('T')[0])
          .eq('status', 'present')
      ]);

      return {
        data: {
          totalStudents: students?.length || 0,
          totalTeachers: teachers?.length || 0,
          totalClasses: classes?.length || 0,
          todayAttendance: todayAttendance?.length || 0
        },
        error: studentsError || teachersError || classesError || attendanceError
      };
    } catch (error) {
      return { data: null, error };
    }
  },
};

export default supabase; 