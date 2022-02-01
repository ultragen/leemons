module.exports = {
  welcome_page: {
    page_title: 'Academic Portfolio',
    page_description:
      'Portfolio allow you to create programs or educational stages and add subjects with course, group, professors… within this information, we create a visual tree in order to manage the portfolio, assign students, create clusters, edit rules and much more.',
    hide_info_label: `Ok, I've got it. When the configuration is complete, don't show this info anymore`,
    step_programs: {
      title: 'Create programs',
      description:
        'Elementary, High School, Bachelor, Masters… define the programs and courses offered in your organization.',
      btn: 'Create programs',
    },
    step_subjects: {
      title: 'Add subjects',
      description:
        'With bulk upload or manually, create your subjects portfolio related with an specific program and course.',
      btn: 'Add subjects',
    },
    step_tree: {
      title: 'Manage your academic portfolio',
      description:
        'Define the kind of tree for your specific education system and asssing students, create clusters or edit information.',
      btn: 'Create your tree',
    },
  },
  programs_page: {
    page_title: 'Learning programs',
    page_description:
      'Elementary, High School, Bachelor, Masters… define the programs and courses offered in your organization. If you do not have traditional stages, you can create simple programs or courses instead.',
    common: {
      select_center: 'Select center',
      add_program: 'Add new program',
      create_done: 'Program created',
      update_done: 'Program updated',
    },
    setup: {
      title: 'Setup new program',
      editTitle: 'Edit program',
      basicData: {
        step_label: 'Basic Data',
        labels: {
          title: 'Basic Data',
          name: 'Program name',
          abbreviation: 'Program abbreviation',
          creditSystem: 'No need for credit system',
          credits: 'Total credits',
          oneStudentGroup: 'This program has only one group of students',
          groupsIDAbbrev: 'Groups ID Abbreviation',
          maxGroupAbbreviation: 'Max abbreviation length for groups',
          maxGroupAbbreviationIsOnlyNumbers: 'Only numbers',
          buttonNext: 'Next',
        },
        descriptions: {
          maxGroupAbbreviation:
            'If you need to create more than one group of students (classrooms) per subject, this configuration allow you to define the alphanumeric ID format.',
        },
        placeholders: {
          name: 'My awesome program',
          abbreviation: 'HIGSxxxx',
        },
        helps: {
          abbreviation: '(8 char. max)',
          maxGroupAbbreviation: '(i.e: G01, G02, G03…)',
        },
        errorMessages: {
          name: { required: 'Required field' },
          abbreviation: { required: 'Required field' },
          maxGroupAbbreviation: { required: 'Required field' },
        },
      },
      coursesData: {
        step_label: 'Courses',
        labels: {
          title: 'Courses',
          oneCourseOnly: 'This program takes one course only',
          hideCoursesInTree: 'Hidden courses in the tree (not nested subjects behind courses)',
          moreThanOneAcademicYear: 'The same subject may be offered in more than one academic year',
          maxNumberOfCourses: 'Number of courses',
          courseCredits: 'Credits per course',
          courseSubstage: 'Course substages',
          haveSubstagesPerCourse: 'No substages per course',
          substagesFrequency: 'Frecuency',
          numberOfSubstages: 'Number of substages',
          subtagesNames: 'Name the substages',
          useDefaultSubstagesName: 'Use the default name and abbreviation',
          abbreviation: 'Abbreviation',
          maxSubstageAbbreviation: 'Max abbrevation length',
          maxSubstageAbbreviationIsOnlyNumbers: 'Only numbers',
          buttonNext: 'Next',
          buttonPrev: 'Previous',
        },
        placeholders: {
          substagesFrequency: 'Select frequency',
        },
        errorMessages: {
          useDefaultSubstagesName: { required: 'Required field' },
          maxNumberOfCourses: { required: 'Required field' },
          courseCredits: { required: 'Required field' },
          substagesFrequency: { required: 'Required field' },
          numberOfSubstages: { required: 'Required field' },
          maxSubstageAbbreviation: { required: 'Required field' },
        },
      },
      subjectsData: {
        step_label: 'Subjects',
        labels: {
          title: 'Subjects',
          standardDuration: 'Standard duration of the subjects',
          allSubjectsSameDuration:
            'All subjects have the same duraction as the evaluation substage',
          numberOfSemesters: 'Number of semesters',
          periodName: 'Period name',
          numOfPeriods: 'N. periods',
          substagesFrequency: 'Frecuency',
          knowledgeAreas: 'Knowledge areas abbreviation',
          haveKnowledge: 'Program have Knowledge areas',
          maxKnowledgeAbbreviation: 'Max abbreviation length for areas:',
          maxKnowledgeAbbreviationIsOnlyNumbers: 'Only numbers',
          subjectsIDConfig: 'Subjects ID configuration',
          subjectsFirstDigit: 'First digit',
          subjectsDigits: 'Digits',
          buttonNext: 'Save Program',
          buttonPrev: 'Previous',
          buttonAdd: 'Add',
          buttonRemove: 'Remove',
        },
        helps: {
          maxKnowledgeAbbreviation: '(i.e: MKTG, MATH, HIST…)',
        },
        errorMessages: {
          periodName: { required: 'Required field' },
          numOfPeriods: { required: 'Required field' },
          substagesFrequency: { required: 'Required field' },
        },
      },
      frequencies: {
        year: 'Annual',
        semester: 'Half-yearly(Semester)',
        quarter: 'Four-month period',
        trimester: 'Quarterly(Trimester/Quarter)',
        month: 'Monthly',
        week: 'Weekly',
        day: 'Daily',
      },
      firstDigits: {
        course: 'Course Nº',
        none: 'None',
      },
    },
  },
};