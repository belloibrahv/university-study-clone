import { Program } from '../types'
import TMU from '../assets/images/tm.jpg';
import WLU from '../assets/images/tm.jpg';
import MCGILL from '../assets/images/mcgill.webp';
import TU from '../assets/images/tu.png';
import BCU from '../assets/images/bcu.jpg';

export const DUMMY_PROGRAMS: Program[] = [
  {
    id: '1',
    image: TMU,
    programName: 'Post Graduate Certificate in Program Evaluation',
    programLevel: 'certificate',
    language: 'english',
    coop: true,
    remote: false,
    studyArea: 'business',
    university: 'Toronto Metropolitan University',
    province: 'Ontario'
  },
  {
    id: '2',
    image: WLU,
    programName: 'Bachelor of Engineering in Software Engineering',
    programLevel: 'Bachelor',
    language: 'English',
    coop: true,
    remote: false,
    studyArea: 'Engineering',
    university: 'University of Waterloo',
    province: 'Ontario'
  },
  {
    id: '3',
    image: MCGILL,
    programName: 'Master of Arts in French Literature',
    programLevel: 'Master',
    language: 'French',
    coop: false,
    remote: true,
    studyArea: 'Arts',
    university: 'McGill University',
    province: 'Quebec'
  },
  {
    id: '4',
    image: BCU,
    programName: 'Diploma in Digital Marketing',
    programLevel: 'Diploma',
    language: 'English',
    coop: true,
    remote: true,
    studyArea: 'Business',
    university: 'British Columbia Institute of Technology',
    province: 'British Columbia'
  },
  {
    id: '5',
    image: TU,
    programName: 'PhD in Computer Science',
    programLevel: 'Doctorate',
    language: 'English',
    coop: false,
    remote: false,
    studyArea: 'Science',
    university: 'University of Toronto',
    province: 'Ontario'
  }
];
