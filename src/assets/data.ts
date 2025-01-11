import { Program } from '../types';

import Providence from '../assets/images/Providence.png';
import UAlberta from '../assets/images/tm.jpg'; // TO BE CHANGED
import McGill from '../assets/images/mcgill.webp';
import UofT from '../assets/images/tu.png';
import UBC from '../assets/images/bcu.jpg';
import CMU from '../assets/images/CMU.png';
import UManitoba from '../assets/images/um.png';
import BrandonU from '../assets/images/BrandonU.png';
import USB from '../assets/images/usb.jpg';
import UCalgary from '../assets/images/UCalgary.png';
import UWinnipeg from '../assets/images/UWinnipeg.png';
import BoothUC from '../assets/images/BoothUC.png';

export const DUMMY_PROGRAMS: Program[] = [

  {
    id: '1',
    image: UManitoba,
    programName: 'Bachelor of Science in Computer Science',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Science',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },
  {
    id: '2',
    image: UManitoba,
    programName: 'Master of Business Administration',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Business',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },
  {
    id: '3',
    image: UManitoba,
    programName: 'Doctor of Medicine',
    programLevel: 'Doctorate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Medicine',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },

  // University of Winnipeg Programs
  {
    id: '4',
    image: UWinnipeg,
    programName: 'Bachelor of Arts in Psychology',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Social Sciences',
    university: 'University of Winnipeg',
    province: 'Manitoba'
  },
  {
    id: '5',
    image: UWinnipeg,
    programName: 'Master of Arts in Indigenous Governance',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Social Sciences',
    university: 'University of Winnipeg',
    province: 'Manitoba'
  },

  // Brandon University Programs
  {
    id: '6',
    image: BrandonU,
    programName: 'Bachelor of Education',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Education',
    university: 'Brandon University',
    province: 'Manitoba'
  },
  {
    id: '7',
    image: BrandonU,
    programName: 'Bachelor of Music',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Arts',
    university: 'Brandon University',
    province: 'Manitoba'
  },

  // University of Calgary Programs
  {
    id: '8',
    image: UCalgary,
    programName: 'Bachelor of Engineering in Software Engineering',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Engineering',
    university: 'University of Calgary',
    province: 'Alberta'
  },
  {
    id: '9',
    image: UCalgary,
    programName: 'Master of Science in Data Science',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Science',
    university: 'University of Calgary',
    province: 'Alberta'
  },

  // UBC Programs
  {
    id: '10',
    image: UBC,
    programName: 'Bachelor of Commerce',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Business',
    university: 'University of British Columbia',
    province: 'British Columbia'
  },
  {
    id: '11',
    image: UBC,
    programName: 'Master of Environmental Science',
    programLevel: 'Master',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Science',
    university: 'University of British Columbia',
    province: 'British Columbia'
  },

  // University of Toronto Programs
  {
    id: '12',
    image: UofT,
    programName: 'Bachelor of Applied Science in Chemical Engineering',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Engineering',
    university: 'University of Toronto',
    province: 'Ontario'
  },
  {
    id: '13',
    image: UofT,
    programName: 'Master of Information',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Technology',
    university: 'University of Toronto',
    province: 'Ontario'
  },

  // McGill University Programs
  {
    id: '14',
    image: McGill,
    programName: 'Bachelor of Arts in Economics',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Social Sciences',
    university: 'McGill University',
    province: 'Quebec'
  },
  {
    id: '15',
    image: McGill,
    programName: 'Master in Public Health',
    programLevel: 'Master',
    language: 'Bilingual',
    coop: false,
    remote: false,
    studyArea: 'Medicine',
    university: 'McGill University',
    province: 'Quebec'
  },

  // University of Alberta Programs
  {
    id: '16',
    image: UAlberta,
    programName: 'Certificate in Indigenous Business',
    programLevel: 'Certificate',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Business',
    university: 'University of Alberta',
    province: 'Alberta'
  },
  {
    id: '17',
    image: UAlberta,
    programName: 'Diploma in Digital Marketing',
    programLevel: 'Diploma',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Business',
    university: 'University of Alberta',
    province: 'Alberta'
  },
  {
    id: '18',
    image: UAlberta,
    programName: 'PhD in Computing Science',
    programLevel: 'Doctorate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Science',
    university: 'University of Alberta',
    province: 'Alberta'
  },
  {
    id: '19',
    image: UManitoba,
    programName: 'Bachelor of Arts (Honours) in Economics',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Social Sciences',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },
  {
    id: '20',
    image: UManitoba,
    programName: 'Master of Science in Mechanical Engineering',
    programLevel: 'Master',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Engineering',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },
  {
    id: '21',
    image: UManitoba,
    programName: 'Bachelor of Commerce (Honours)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Business',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },
  {
    id: '22',
    image: UManitoba,
    programName: 'Master of Architecture',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Architecture',
    university: 'University of Manitoba',
    province: 'Manitoba'
  },

  // Additional University of Winnipeg Programs
  {
    id: '23',
    image: UWinnipeg,
    programName: 'Bachelor of Science in Environmental Science',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Science',
    university: 'University of Winnipeg',
    province: 'Manitoba'
  },
  {
    id: '24',
    image: UWinnipeg,
    programName: 'Master of Arts in Criminal Justice',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Social Sciences',
    university: 'University of Winnipeg',
    province: 'Manitoba'
  },
  {
    id: '25',
    image: UWinnipeg,
    programName: 'Bachelor of Business Administration',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Business',
    university: 'University of Winnipeg',
    province: 'Manitoba'
  },

  // Additional Brandon University Programs
  {
    id: '26',
    image: BrandonU,
    programName: 'Bachelor of Science in Biology',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Science',
    university: 'Brandon University',
    province: 'Manitoba'
  },
  {
    id: '27',
    image: BrandonU,
    programName: 'Master of Education in Curriculum and Pedagogy',
    programLevel: 'Master',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Education',
    university: 'Brandon University',
    province: 'Manitoba'
  },

  // Booth University College Programs
  {
    id: '28',
    image: BoothUC,
    programName: 'Bachelor of Social Work',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Social Sciences',
    university: 'Booth University College',
    province: 'Manitoba'
  },
  {
    id: '29',
    image: BoothUC,
    programName: 'Bachelor of Business Administration',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Business',
    university: 'Booth University College',
    province: 'Manitoba'
  },

  // Canadian Mennonite University Programs
  {
    id: '30',
    image: CMU,
    programName: 'Bachelor of Arts in Peace and Conflict Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Social Sciences',
    university: 'Canadian Mennonite University',
    province: 'Manitoba'
  },
  {
    id: '31',
    image: CMU,
    programName: 'Bachelor of Music',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Arts',
    university: 'Canadian Mennonite University',
    province: 'Manitoba'
  },

  // Université de Saint-Boniface Programs
  {
    id: '32',
    image: USB,
    programName: 'Baccalauréat en éducation',
    programLevel: 'Bachelor',
    language: 'French',
    coop: true,
    remote: false,
    studyArea: 'Education',
    university: 'Université de Saint-Boniface',
    province: 'Manitoba'
  },
  {
    id: '33',
    image: USB,
    programName: 'Diplôme en administration des affaires',
    programLevel: 'Diploma',
    language: 'French',
    coop: true,
    remote: true,
    studyArea: 'Business',
    university: 'Université de Saint-Boniface',
    province: 'Manitoba'
  },

  // Providence University College Programs
  {
    id: '34',
    image: Providence,
    programName: 'Bachelor of Theology',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Theology',
    university: 'Providence University College',
    province: 'Manitoba'
  },
  {
    id: '35',
    image: Providence,
    programName: 'Bachelor of Arts in Communications and Media',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Arts',
    university: 'Providence University College',
    province: 'Manitoba'
  },

  // Additional programs from other provinces...
  {
    id: '36',
    image: UBC,
    programName: 'Master of Digital Media',
    programLevel: 'Master',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Technology',
    university: 'University of British Columbia',
    province: 'British Columbia'
  },
  {
    id: '37',
    image: McGill,
    programName: 'PhD in Experimental Medicine',
    programLevel: 'Doctorate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Medicine',
    university: 'McGill University',
    province: 'Quebec'
  },
  {
    id: '38',
    image: UofT,
    programName: 'Certificate in Data Analytics',
    programLevel: 'Certificate',
    language: 'English',
    coop: false,
    remote: true,
    studyArea: 'Technology',
    university: 'University of Toronto',
    province: 'Ontario'
  }
];
