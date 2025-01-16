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
import Acadia from '../assets/images/Acadia.jpg';
import Brock from '../assets/images/Brock.jpg';
import Campion from '../assets/images/Campion.jpg';
import Huron from '../assets/images/huron.jpg';
import MacEwan from '../assets/images/MacEwan.jpg';
import Luther from '../assets/images/Luther.jpg';

export const DUMMY_PROGRAMS: Program[] = [

    // University of Manitoba Programs
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
  },

  // Acadia University Programs
  {
    id: '39',
    image: Acadia,
    programName: 'BA in Canadian Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Canadian studies',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '40',
    image: Acadia,
    programName: 'BA in Economics',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Economics',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '41',
    image: Acadia,
    programName: 'BA in English',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'English Language',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '42',
    image: Acadia,
    programName: 'BA in Environmental and Sustainability Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Environmental studies',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '43',
    image: Acadia,
    programName: 'BA in French',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'French Language',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '44',
    image: Acadia,
    programName: 'BA in German',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Germany Language',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '45',
    image: Acadia,
    programName: 'BA in History',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'History',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '46',
    image: Acadia,
    programName: 'BA in Law and Society',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Legal studies',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },
  {
    id: '47',
    image: Acadia,
    programName: 'BA in Mathematics and Statistics',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Mathemtics',
    university: 'Acadia University',
    province: 'Nova Scotia'
  },

  // Brock University Programs
  {
    id: '48',
    image: Brock,
    programName: 'BA in Applied Linguistics',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Applied linguistics',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '49',
    image: Brock,
    programName: 'BA in Business Communication',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Business administration and management',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '50',
    image: Brock,
    programName: 'BA in Canadian Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Canadian studies',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '51',
    image: Brock,
    programName: 'BA in Child and Youth Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Child development',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '52',
    image: Brock,
    programName: 'BA in Critical Criminology',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Criminology',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '53',
    image: Brock,
    programName: 'BA in Dramatic Arts',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Drama and dramatics',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '54',
    image: Brock,
    programName: 'BA in Economics',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Economics',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '55',
    image: Brock,
    programName: 'BA in Educational Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Education',
    university: 'Brock University',
    province: 'Ontario'
  },
  {
    id: '56',
    image: Brock,
    programName: 'BA in English Language and Literature',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'English language and literature',
    university: 'Brock University',
    province: 'Ontario'
  },

  // Campion University College Programs
  {
    id: '57',
    image: Campion,
    programName: 'BHJ (University of Regina/Campion College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Legal studies',
    university: 'Campion College',
    province: 'Saskatchewan'
  },
  {
    id: '58',
    image: Campion,
    programName: 'BDes (University of Regina/Campion College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Design and visual communications',
    university: 'Campion College',
    province: 'Saskatchewan'
  },
  {
    id: '59',
    image: Campion,
    programName: 'BHS (University of Regina/Campion College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Health Services',
    university: 'Campion College',
    province: 'Saskatchewan'
  },
  {
    id: '60',
    image: Campion,
    programName: 'BMRT (University of Regina/Campion College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Therapeutic radiographer',
    university: 'Campion College',
    province: 'Saskatchewan'
  },

  // Huron University College Programs
  {
    id: '61',
    image: Huron,
    programName: 'BA in Centre for Global Studies-Global Culture Studies (Honours Specialization, Specialization, Major, Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'International/globalization studies',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '62',
    image: Huron,
    programName: 'BA in Centre for Global Studies-Global Health Studies (Honours Specialization, Specialization)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'International health',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '63',
    image: Huron,
    programName: 'BA in China Studies (Minor, Major)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Chinese studies',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '64',
    image: Huron,
    programName: 'BA in Chinese History (Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Chinese studies/History',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '65',
    image: Huron,
    programName: 'BA in Contemporary English Literature (Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'English language and literature',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '66',
    image: Huron,
    programName: 'BA in East Asia Studies (Major, Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'East Asian studies',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '67',
    image: Huron,
    programName: 'BA in Economic Theory (Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Economics',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '68',
    image: Huron,
    programName: 'BA in English for Teachers (Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'English language and literature',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '69',
    image: Huron,
    programName: 'BA in Entrepreneurship (Minor)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Entrepreneurial studies',
    university: 'Huron University College',
    province: 'Ontario'
  },
  {
    id: '70',
    image: Huron,
    programName: 'BA in Finance (Major)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Finance',
    university: 'Huron University College',
    province: 'Ontario'
  },

  // MacEvan University Programs
  {
    id: '71',
    image: MacEwan,
    programName: 'Accounting &amp; Strategic Measurement Certificate',
    programLevel: 'Undergraduate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Accounting',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '72',
    image: MacEwan,
    programName: 'Acupuncture Diploma',
    programLevel: 'Undergraduate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Acupuncture and oriental medicine',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '73',
    image: MacEwan,
    programName: 'Asia Pacific Management Diploma',
    programLevel: 'Undergraduate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'International business',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '74',
    image: MacEwan,
    programName: 'BA in Anthropology (major/honours)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Anthropology',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '75',
    image: MacEwan,
    programName: 'BA in Economics (major/honours)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Economics',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '76',
    image: MacEwan,
    programName: 'BA in English (major/honours)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'English Language and Literature',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '77',
    image: MacEwan,
    programName: 'BA in History (major)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'History',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '78',
    image: MacEwan,
    programName: 'BA in Philosophy (major)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Philosophy',
    university: 'MacEwan University',
    province: 'Alberta'
  },
  {
    id: '79',
    image: MacEwan,
    programName: 'BA in Political Science (major/honours)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Political science and governmrnt',
    university: 'MacEwan University',
    province: 'Alberta'
  },

  // Luther University College Programs
  {
    id: '80',
    image: Luther,
    programName: 'BA Honours Certificates (University of Regina/Luther College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Liberal arts and sciences',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '81',
    image: Luther,
    programName: 'Bachelor of Design (University of Regina/Luther College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Design and visual communications',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '82',
    image: Luther,
    programName: 'BAJ - Bachelor of Arts in Journalism, News Media, and Communications (University of Regina/Luther College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Mass communication',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '83',
    image: Luther,
    programName: 'BARES – Bachelor of Arts in Resource and Environmental Studies',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Environmental studies',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '84',
    image: Luther,
    programName: 'BGISc Bachelor of Geographic Information Science (University of Regina/Luther College)',
    programLevel: 'Undergraduate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Geographic information science and cartography',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '85',
    image: Luther,
    programName: 'BHJ - Bachelor of Human Justice (University of Regina/Luther College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Legal studies',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '86',
    image: Luther,
    programName: 'BHS- Bachelor of Health Studies (University of Regina/Luther College)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Health Services',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '87',
    image: Luther,
    programName: 'BMLS Bachelor of Medical Laboratory Science (University of Regina/Luther College with Saskatchewan Polytechnic)',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Clinical/medical laboratory technician',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '88',
    image: Luther,
    programName: 'BMRT – Bachelor of Medical Radiation Technology',
    programLevel: 'Bachelor',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Industrial radiologic technology/technician',
    university: 'Luther College',
    province: 'Saskatchewan'
  },
  {
    id: '89',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '90',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '91',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '92',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '93',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '94',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '95',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '96',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '97',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '98',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '99',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '100',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
  {
    id: '',
    image: ,
    programName: '',
    programLevel: '',
    language: '',
    coop: ,
    remote: ,
    studyArea: '',
    university: '',
    province:
  },
];
