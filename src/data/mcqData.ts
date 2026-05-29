export interface MCQ {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  topic: string
  subject: string
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  topics: string[]
}

export const subjects: Subject[] = [
  { id: 'anatomy', name: 'Anatomy', icon: '🫀', color: '#ef4444', topics: ['Upper Limb', 'Lower Limb', 'Thorax', 'Abdomen', 'Head & Neck', 'Neuroanatomy', 'Embryology', 'Histology'] },
  { id: 'physiology', name: 'Physiology', icon: '🧬', color: '#f97316', topics: ['General Physiology', 'Nerve & Muscle', 'Blood', 'CVS', 'Respiratory', 'Renal', 'GI', 'Endocrine', 'Reproductive', 'CNS'] },
  { id: 'biochemistry', name: 'Biochemistry', icon: '🧪', color: '#eab308', topics: ['Cell Biology', 'Enzymes', 'Metabolism', 'Molecular Biology', 'Nutrition', 'Genetics'] },
  { id: 'pathology', name: 'Pathology', icon: '🔬', color: '#22c55e', topics: ['General Pathology', 'Inflammation', 'Neoplasia', 'Hematology', 'CVS Pathology', 'Respiratory Pathology', 'Renal Pathology', 'GI Pathology'] },
  { id: 'pharma', name: 'Pharmacology', icon: '💊', color: '#06b6d4', topics: ['General Pharma', 'ANS', 'CVS Drugs', 'CNS Drugs', 'Antimicrobials', 'Chemotherapy', 'Endocrine Drugs'] },
  { id: 'micro', name: 'Microbiology', icon: '🦠', color: '#3b82f6', topics: ['Bacteriology', 'Virology', 'Parasitology', 'Mycology', 'Immunology'] },
  { id: 'forensic', name: 'Forensic Medicine', icon: '⚖️', color: '#8b5cf6', topics: ['Forensic Pathology', 'Thanatology', 'Asphyxia', 'Injuries', 'Sexual Offences'] },
  { id: 'community', name: 'Community Medicine', icon: '🏥', color: '#ec4899', topics: ['Epidemiology', 'Biostatistics', 'Demography', 'Nutrition', 'Environment', 'Health Programs'] },
]

export const mcqs: MCQ[] = [
  { id: 1, question: 'Which of the following is the most common site of peptic ulcer?', options: ['Duodenum', 'Stomach', 'Esophagus', 'Jejunum'], correct: 0, explanation: 'Duodenal ulcers are 4 times more common than gastric ulcers. The first part of duodenum is the most common site.', topic: 'GI Pathology', subject: 'pathology' },
  { id: 2, question: 'Which cranial nerve has the longest intracranial course?', options: ['CN VI', 'CN IV', 'CN III', 'CN V'], correct: 0, explanation: 'Abducens nerve (CN VI) has the longest intracranial course and is thus most commonly affected in raised ICT.', topic: 'Neuroanatomy', subject: 'anatomy' },
  { id: 3, question: 'Which of the following is a beta-lactamase inhibitor?', options: ['Clavulanic acid', 'Penicillin', 'Amoxicillin', 'Cephalexin'], correct: 0, explanation: 'Clavulanic acid is a beta-lactamase inhibitor that irreversibly inhibits beta-lactamase enzymes.', topic: 'Antimicrobials', subject: 'pharma' },
  { id: 4, question: 'What is the stain used for Acid Fast Bacilli?', options: ['Gram stain', 'Ziehl-Neelsen stain', 'Giemsa stain', 'India ink stain'], correct: 1, explanation: 'Ziehl-Neelsen staining is used for Acid Fast Bacilli like M. tuberculosis. It uses carbol fuchsin.', topic: 'Bacteriology', subject: 'micro' },
  { id: 5, question: 'Which of the following clotting factors is deficient in Hemophilia A?', options: ['Factor VIII', 'Factor IX', 'Factor XI', 'Factor VII'], correct: 0, explanation: 'Hemophilia A is deficiency of Factor VIII (classic hemophilia). Hemophilia B is Factor IX deficiency.', topic: 'Hematology', subject: 'pathology' },
  { id: 6, question: 'Normal intraocular pressure ranges between:', options: ['10-21 mmHg', '22-30 mmHg', '5-10 mmHg', '30-40 mmHg'], correct: 0, explanation: 'Normal IOP is 10-21 mmHg. Glaucoma is suspected when IOP > 21 mmHg.', topic: 'Head & Neck', subject: 'anatomy' },
  { id: 7, question: 'Drug of choice for absence seizures is:', options: ['Sodium valproate', 'Phenytoin', 'Carbamazepine', 'Ethosuximide'], correct: 3, explanation: 'Ethosuximide is the drug of choice for absence seizures. For tonic-clonic seizures, phenytoin is preferred.', topic: 'CNS Drugs', subject: 'pharma' },
  { id: 8, question: 'The basic metabolic rate is primarily regulated by:', options: ['Thyroxine', 'Growth hormone', 'Cortisol', 'Insulin'], correct: 0, explanation: 'Thyroxine (T3/T4) is the primary regulator of BMR. It increases oxygen consumption and energy expenditure.', topic: 'Endocrine', subject: 'physiology' },
  { id: 9, question: 'Which immunoglobulin is the first to be produced in response to infection?', options: ['IgM', 'IgG', 'IgA', 'IgE'], correct: 0, explanation: 'IgM is the first antibody produced during primary immune response. It is a pentamer.', topic: 'Immunology', subject: 'micro' },
  { id: 10, question: 'The strongest carcinogen in tobacco smoke is:', options: ['Benzo(a)pyrene', 'Nicotine', 'CO', 'Tar'], correct: 0, explanation: 'Benzo(a)pyrene is a polycyclic aromatic hydrocarbon and the strongest carcinogen in tobacco smoke.', topic: 'Neoplasia', subject: 'pathology' },
  { id: 11, question: 'Carpopedal spasm is characteristic of:', options: ['Hypocalcemia', 'Hypercalcemia', 'Hypokalemia', 'Hyperkalemia'], correct: 0, explanation: 'Carpopedal spasm (Trousseau sign) is characteristic of hypocalcemia due to neuromuscular irritability.', topic: 'General Physiology', subject: 'physiology' },
  { id: 12, question: 'Which bone does NOT articulate with the maxilla?', options: ['Zygomatic', 'Frontal', 'Sphenoid', 'Temporal'], correct: 3, explanation: 'The temporal bone does not articulate with the maxilla. The maxilla articulates with frontal, zygomatic, sphenoid, nasal, and palatine bones.', topic: 'Head & Neck', subject: 'anatomy' },
  { id: 13, question: 'Which vitamin is essential for calcium absorption?', options: ['Vitamin D', 'Vitamin C', 'Vitamin B12', 'Vitamin K'], correct: 0, explanation: 'Vitamin D (cholecalciferol) promotes calcium absorption from the gut and is essential for bone health.', topic: 'Nutrition', subject: 'biochemistry' },
  { id: 14, question: 'The enzyme deficient in G6PD deficiency leads to:', options: ['Hemolytic anemia', 'Megaloblastic anemia', 'Aplastic anemia', 'Sickle cell anemia'], correct: 0, explanation: 'G6PD deficiency leads to hemolytic anemia precipitated by oxidant stress from drugs, infections, or fava beans.', topic: 'Hematology', subject: 'pathology' },
  { id: 15, question: 'Which of the following is a Gram-positive bacterium?', options: ['Staphylococcus aureus', 'E. coli', 'Pseudomonas', 'Vibrio cholerae'], correct: 0, explanation: 'Staphylococcus aureus is Gram-positive (cocci in clusters). The others are Gram-negative rods.', topic: 'Bacteriology', subject: 'micro' },
  { id: 16, question: 'Pregnancy is detectable by urine hCG from which day after fertilization?', options: ['Day 14', 'Day 7', 'Day 21', 'Day 28'], correct: 0, explanation: 'Urine hCG becomes detectable approximately 14 days after fertilization, which is around the time of missed period.', topic: 'Reproductive', subject: 'physiology' },
  { id: 17, question: 'The portal vein is formed by the union of:', options: ['SMV and Splenic vein', 'SMV and IMV', 'Splenic and IMV', 'Splenic and gastric'], correct: 0, explanation: 'Portal vein is formed by the union of superior mesenteric vein (SMV) and splenic vein behind the neck of pancreas.', topic: 'Abdomen', subject: 'anatomy' },
  { id: 18, question: 'Which anti-epileptic drug causes gingival hyperplasia?', options: ['Phenytoin', 'Sodium valproate', 'Carbamazepine', 'Lamotrigine'], correct: 0, explanation: 'Phenytoin causes gingival hyperplasia, hirsutism, and megaloblastic anemia.', topic: 'CNS Drugs', subject: 'pharma' },
  { id: 19, question: 'The normal fasting blood glucose level is:', options: ['70-100 mg/dL', '100-126 mg/dL', '126-150 mg/dL', '50-70 mg/dL'], correct: 0, explanation: 'Normal fasting glucose: 70-100 mg/dL. Impaired: 100-126 mg/dL. Diabetes: >126 mg/dL on two occasions.', topic: 'Metabolism', subject: 'biochemistry' },
  { id: 20, question: 'Which is the most common cause of cirrhosis in India?', options: ['Hepatitis B', 'Alcohol', 'NAFLD', 'Hepatitis C'], correct: 0, explanation: 'Hepatitis B is the most common cause of cirrhosis in India. Alcohol is more common in Western countries.', topic: 'GI Pathology', subject: 'pathology' },
]

export const mockTests = [
  { id: 1, name: 'Quick 10', questions: 10, duration: 10, difficulty: 'Easy' as const, subjects: ['Anatomy', 'Physiology', 'Biochemistry'] },
  { id: 2, name: 'Subject Focus: Pathology', questions: 25, duration: 30, difficulty: 'Medium' as const, subjects: ['Pathology'] },
  { id: 3, name: 'Grand Mock 1', questions: 50, duration: 60, difficulty: 'Hard' as const, subjects: ['All Subjects'] },
  { id: 4, name: 'Pharmacology Special', questions: 20, duration: 25, difficulty: 'Medium' as const, subjects: ['Pharmacology'] },
  { id: 5, name: 'Microbiology Blitz', questions: 15, duration: 15, difficulty: 'Easy' as const, subjects: ['Microbiology'] },
  { id: 6, name: 'Grand Mock 2', questions: 50, duration: 60, difficulty: 'Hard' as const, subjects: ['All Subjects'] },
]

export interface Bookmark {
  mcqId: number
  note?: string
}
