/**
 * Enterprise Course Data Catalog
 * Standardized across University & Corporate Academy standards
 */

export const COURSES_DATA = [
  {
    id: 'ai-fundamentals',
    name: 'Artificial Intelligence Fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    code: 'CSE-AI-501',
    instructor: 'Dr. Aris Thorne',
    instructorRole: 'Distinguished Professor of Artificial Intelligence, BMSIT',
    instructorBio: 'Former Senior AI Research Scientist with over 15 years in automated reasoning, cognitive architectures, and ethical AI systems.',
    duration: '6 Weeks (24 Hours)',
    durationHours: 24,
    difficulty: 'Beginner',
    category: 'Artificial Intelligence',
    rating: 4.9,
    enrolledCount: 1420,
    credits: '3.0 Academic Credits',
    defaultProgress: 75,
    tag: 'Accredited Curriculum',
    overview: 'An authoritative foundation in symbolic reasoning, search algorithms, heuristic evaluation, and modern cognitive systems. Designed in collaboration with leading enterprise AI laboratories to bridge academic rigour and industrial readiness.',
    learningOutcomes: [
      'Understand the mathematical foundations of search heuristics and state-space exploration.',
      'Formulate real-world engineering challenges as Constraint Satisfaction Problems (CSPs).',
      'Implement deterministic and adversarial search algorithms including A* and Minimax with Alpha-Beta pruning.',
      'Critically evaluate the ethical implications, governance frameworks, and bias mitigation in enterprise AI.'
    ],
    assessmentCriteria: {
      quizzes: '20% (Weekly Knowledge Checks)',
      labAssignments: '40% (Practical Implementations)',
      finalCapstone: '40% (Comprehensive Assessment & Peer Review)'
    },
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction',
        duration: '5 Hours',
        description: 'Historical context, Turing test, intelligent agents, and environmental classifications.',
        lessons: [
          { id: 'l1-1', title: '1.1 Evolution of Artificial Intelligence & Paradigm Shifts', duration: '45 mins', type: 'Video & Lecture' },
          { id: 'l1-2', title: '1.2 Structure of Intelligent Agents & PEAS Framework', duration: '55 mins', type: 'Technical Note' },
          { id: 'l1-3', title: '1.3 State-Space Representation & Problem Formulation', duration: '60 mins', type: 'Interactive Lab' },
          { id: 'l1-4', title: '1.4 Knowledge Check: Agent Environments Quiz', duration: '30 mins', type: 'Assessment' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Core Concepts',
        duration: '7 Hours',
        description: 'Uninformed vs. Informed search strategies, heuristic design, and adversarial games.',
        lessons: [
          { id: 'l2-1', title: '2.1 Graph Search Strategies: BFS, DFS, & Uniform Cost Search', duration: '60 mins', type: 'Video & Lecture' },
          { id: 'l2-2', title: '2.2 Heuristic Search & Admissibility in A* Algorithm', duration: '75 mins', type: 'Interactive Demo' },
          { id: 'l2-3', title: '2.3 Adversarial Game Trees & Alpha-Beta Pruning', duration: '60 mins', type: 'Technical Note' },
          { id: 'l2-4', title: '2.4 Constraint Satisfaction: Backtracking & AC-3', duration: '65 mins', type: 'Interactive Lab' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Practical Implementation',
        duration: '8 Hours',
        description: 'Hands-on Python implementation of pathfinding engines and automated reasoning solvers.',
        lessons: [
          { id: 'l3-1', title: '3.1 Building a Grid-Based Navigation Solver in Python', duration: '90 mins', type: 'Hands-on Lab' },
          { id: 'l3-2', title: '3.2 Optimizing State Evaluation Functions with Heuristics', duration: '75 mins', type: 'Coding Exercise' },
          { id: 'l3-3', title: '3.3 Implementing Constraint Satisfaction for Enterprise Scheduling', duration: '80 mins', type: 'Hands-on Lab' },
          { id: 'l3-4', title: '3.4 Performance Benchmarking & Memory Optimization', duration: '50 mins', type: 'Technical Review' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Assessment',
        duration: '4 Hours',
        description: 'Capstone project submission, comprehensive examination, and SecureVault certificate verification.',
        lessons: [
          { id: 'l4-1', title: '4.1 Enterprise Pathfinding Engine Capstone Submission', duration: '120 mins', type: 'Project Submission' },
          { id: 'l4-2', title: '4.2 Comprehensive Theory & Algorithmic Final Exam', duration: '90 mins', type: 'Proctored Exam' },
          { id: 'l4-3', title: '4.3 Academic Integrity Confirmation & Verification', duration: '15 mins', type: 'Verification' }
        ]
      }
    ]
  },
  {
    id: 'ml-basics',
    name: 'Machine Learning Basics',
    title: 'Machine Learning Basics',
    code: 'CSE-ML-502',
    instructor: 'Prof. Elena Rostova',
    instructorRole: 'Principal Machine Learning Fellow, Center for Data Intelligence',
    instructorBio: 'Specialist in supervised statistical learning, regularization strategies, and high-throughput predictive pipeline architecture.',
    duration: '8 Weeks (32 Hours)',
    durationHours: 32,
    difficulty: 'Intermediate',
    category: 'Data Science & ML',
    rating: 4.8,
    enrolledCount: 1890,
    credits: '4.0 Academic Credits',
    defaultProgress: 50,
    tag: 'Core Specialization',
    overview: 'A rigorous mathematical and algorithmic exploration of supervised and unsupervised machine learning methods. Covers loss surfaces, gradient descent dynamics, model evaluation metrics, and bias-variance trade-offs in enterprise datasets.',
    learningOutcomes: [
      'Derive and implement Linear, Polynomial, and Logistic Regression models from scratch.',
      'Master Decision Trees, Random Forests, and Gradient Boosted ensemble architectures.',
      'Perform dimensionality reduction using Principal Component Analysis (PCA) and t-SNE.',
      'Diagnose overfitting, underfitting, and data leakage using rigorous cross-validation protocols.'
    ],
    assessmentCriteria: {
      quizzes: '25% (Conceptual Checkpoints)',
      labAssignments: '35% (Model Training Notebooks)',
      finalCapstone: '40% (Predictive Modeling Competition & Report)'
    },
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction',
        duration: '6 Hours',
        description: 'Foundations of statistical learning, data preprocessing pipelines, and exploratory data analysis.',
        lessons: [
          { id: 'l1-1', title: '1.1 The Machine Learning Workflow & Data Lifecycle', duration: '50 mins', type: 'Video & Lecture' },
          { id: 'l1-2', title: '1.2 Feature Engineering, Normalization, & Imputation', duration: '70 mins', type: 'Technical Note' },
          { id: 'l1-3', title: '1.3 Train-Validation-Test Splitting & Stratification', duration: '45 mins', type: 'Interactive Lab' },
          { id: 'l1-4', title: '1.4 Module 1 Milestone Assessment', duration: '30 mins', type: 'Assessment' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Core Concepts',
        duration: '10 Hours',
        description: 'Supervised regression, classification frontiers, loss optimization, and regularization.',
        lessons: [
          { id: 'l2-1', title: '2.1 Gradient Descent Variants (Batch, SGD, Adam)', duration: '75 mins', type: 'Video & Lecture' },
          { id: 'l2-2', title: '2.2 Ridge (L2) and Lasso (L1) Regularization Dynamics', duration: '80 mins', type: 'Technical Note' },
          { id: 'l2-3', title: '2.3 Logistic Regression & Maximum Likelihood Estimation', duration: '65 mins', type: 'Interactive Demo' },
          { id: 'l2-4', title: '2.4 Support Vector Machines & Kernel Tricks', duration: '90 mins', type: 'Interactive Lab' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Practical Implementation',
        duration: '11 Hours',
        description: 'Tree-based ensembles, hyperparameter tuning with Scikit-Learn, and pipeline packaging.',
        lessons: [
          { id: 'l3-1', title: '3.1 Building Random Forests & Gradient Boosted Trees', duration: '90 mins', type: 'Hands-on Lab' },
          { id: 'l3-2', title: '3.2 Automated Cross-Validation and Hyperopt Pipelines', duration: '85 mins', type: 'Coding Exercise' },
          { id: 'l3-3', title: '3.3 ROC-AUC, PR Curves, and Confusion Matrix Diagnostics', duration: '75 mins', type: 'Hands-on Lab' },
          { id: 'l3-4', title: '3.4 Unsupervised Clustering with K-Means & Hierarchical Models', duration: '60 mins', type: 'Technical Review' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Assessment',
        duration: '5 Hours',
        description: 'Predictive modeling capstone challenge, code defense, and enterprise certification issuance.',
        lessons: [
          { id: 'l4-1', title: '4.1 End-to-End Enterprise Credit Risk Prediction Capstone', duration: '150 mins', type: 'Project Submission' },
          { id: 'l4-2', title: '4.2 Machine Learning Applied Diagnostic Examination', duration: '90 mins', type: 'Proctored Exam' },
          { id: 'l4-3', title: '4.3 Verification and Secure Certificate Issuance', duration: '15 mins', type: 'Verification' }
        ]
      }
    ]
  },
  {
    id: 'blockchain-essentials',
    name: 'Blockchain Essentials',
    title: 'Blockchain Essentials',
    code: 'CSE-BC-503',
    instructor: 'Marcus Vance',
    instructorRole: 'Principal Cryptographic Architect, Distributed Ledger Institute',
    instructorBio: 'Consultant to government financial regulatory boards and lead architect of high-throughput permissioned blockchain networks.',
    duration: '5 Weeks (20 Hours)',
    durationHours: 20,
    difficulty: 'Intermediate',
    category: 'Decentralized Systems',
    rating: 4.95,
    enrolledCount: 1150,
    credits: '2.5 Academic Credits',
    defaultProgress: 25,
    tag: 'Govt. Skill Initiative',
    overview: 'A deep architectural dive into cryptographic primitives, distributed consensus protocols, smart contract execution runtimes, and zero-knowledge verification in high-trust enterprise environments.',
    learningOutcomes: [
      'Master Merkle Trees, SHA-256 state hashing, and Elliptic Curve Digital Signatures (ECDSA).',
      'Compare Byzantine Fault Tolerance (PBFT), Proof-of-Work, and Proof-of-Stake consensus mechanisms.',
      'Deploy and unit-test secure smart contracts with automated invariant checks.',
      'Understand enterprise ledger architectures such as Hyperledger Fabric and SecureVault networks.'
    ],
    assessmentCriteria: {
      quizzes: '20% (Cryptography & Consensus Audits)',
      labAssignments: '40% (Smart Contract Verification Labs)',
      finalCapstone: '40% (Decentralized Credential Ledger Deployment)'
    },
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction',
        duration: '4 Hours',
        description: 'Cryptographic hash functions, public-private key cryptography, and digital signatures.',
        lessons: [
          { id: 'l1-1', title: '1.1 Fundamentals of Asymmetric Cryptography & Keystore Management', duration: '50 mins', type: 'Video & Lecture' },
          { id: 'l1-2', title: '1.2 Merkle Trees, Block Structures, & Chain Immutability', duration: '60 mins', type: 'Technical Note' },
          { id: 'l1-3', title: '1.3 Peer-to-Peer Gossiping Protocols & Node Topology', duration: '45 mins', type: 'Interactive Lab' },
          { id: 'l1-4', title: '1.4 Cryptographic Proofs Mastery Quiz', duration: '30 mins', type: 'Assessment' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Core Concepts',
        duration: '6 Hours',
        description: 'Distributed consensus mechanisms, Byzantine generals problem, and state transitions.',
        lessons: [
          { id: 'l2-1', title: '2.1 Solving the Byzantine Generals Dilemma (PBFT vs Raft)', duration: '75 mins', type: 'Video & Lecture' },
          { id: 'l2-2', title: '2.2 Proof of Stake & Finality Gadgets (Casper, Tendermint)', duration: '70 mins', type: 'Technical Note' },
          { id: 'l2-3', title: '2.3 State Transition Execution Models & Gas Mechanics', duration: '65 mins', type: 'Interactive Demo' },
          { id: 'l2-4', title: '2.4 UTXO vs Account-Based Balance Architecture', duration: '60 mins', type: 'Interactive Lab' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Practical Implementation',
        duration: '7 Hours',
        description: 'Smart contract development, reentrancy guards, and unit testing on local testnets.',
        lessons: [
          { id: 'l3-1', title: '3.1 Writing Secure Smart Contract Logic with Reentrancy Guards', duration: '85 mins', type: 'Hands-on Lab' },
          { id: 'l3-2', title: '3.2 Testing Invariants & Formal Verification Frameworks', duration: '75 mins', type: 'Coding Exercise' },
          { id: 'l3-3', title: '3.3 Interfacing with Web3 Providers and Event Listeners', duration: '80 mins', type: 'Hands-on Lab' },
          { id: 'l3-4', title: '3.4 Enterprise Identity Management & SSI Standards', duration: '50 mins', type: 'Technical Review' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Assessment',
        duration: '3 Hours',
        description: 'Production ledger deployment, security audit defense, and SecureVault certification.',
        lessons: [
          { id: 'l4-1', title: '4.1 Deploying a Verifiable Academic Credential Ledger', duration: '90 mins', type: 'Project Submission' },
          { id: 'l4-2', title: '4.2 Distributed Systems Comprehensive Final Examination', duration: '60 mins', type: 'Proctored Exam' },
          { id: 'l4-3', title: '4.3 Ledger Anchor and Verified Credential Minting', duration: '15 mins', type: 'Verification' }
        ]
      }
    ]
  },
  {
    id: 'cyber-security-fundamentals',
    name: 'Cyber Security Fundamentals',
    title: 'Cyber Security Fundamentals',
    code: 'CSE-SEC-504',
    instructor: 'Sarah Jenkins, CISSP',
    instructorRole: 'CISO Advisor & Executive Director, Cyber Defense Institute',
    instructorBio: 'Advisor to national critical infrastructure taskforces with two decades of experience in threat intelligence and SOC architecture.',
    duration: '6 Weeks (24 Hours)',
    durationHours: 24,
    difficulty: 'Beginner',
    category: 'Information Security',
    rating: 4.88,
    enrolledCount: 1670,
    credits: '3.0 Academic Credits',
    defaultProgress: 0,
    tag: 'Industry Standard',
    overview: 'Essential principles of modern enterprise defense, defense-in-depth methodologies, threat modeling, network isolation, identity security, and incident response management.',
    learningOutcomes: [
      'Apply the CIA Triad, Zero Trust Architecture, and NIST Cybersecurity Framework.',
      'Perform vulnerability scanning, attack surface analysis, and secure code review.',
      'Analyze network traffic captures using Wireshark for anomalous exfiltration signatures.',
      'Formulate incident containment, root cause analysis, and disaster recovery runbooks.'
    ],
    assessmentCriteria: {
      quizzes: '20% (Threat Knowledge Checks)',
      labAssignments: '40% (Hands-on SOC & Penetration Scenarios)',
      finalCapstone: '40% (Enterprise Incident Response Simulation)'
    },
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction',
        duration: '5 Hours',
        description: 'Security concepts, attack vectors, threat actors, and security governance frameworks.',
        lessons: [
          { id: 'l1-1', title: '1.1 The Threat Landscape: APTs, Ransomware, & Social Engineering', duration: '50 mins', type: 'Video & Lecture' },
          { id: 'l1-2', title: '1.2 The CIA Triad, AAA Framework, & Defense-in-Depth', duration: '55 mins', type: 'Technical Note' },
          { id: 'l1-3', title: '1.3 NIST Cybersecurity Framework & ISO/IEC 27001 Controls', duration: '60 mins', type: 'Interactive Lab' },
          { id: 'l1-4', title: '1.4 Threat Modeling with STRIDE & PASTA Assessment', duration: '40 mins', type: 'Assessment' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Core Concepts',
        duration: '7 Hours',
        description: 'Network perimeter defense, zero trust network architecture, and cryptographic protocols.',
        lessons: [
          { id: 'l2-1', title: '2.1 Next-Gen Firewalls, IDS/IPS, and Micro-segmentation', duration: '75 mins', type: 'Video & Lecture' },
          { id: 'l2-2', title: '2.2 TLS 1.3, Certificate Authorities, & PKI Architecture', duration: '70 mins', type: 'Technical Note' },
          { id: 'l2-3', title: '2.3 Identity & Access Management (OAuth2, SAML, OIDC, MFA)', duration: '65 mins', type: 'Interactive Demo' },
          { id: 'l2-4', title: '2.4 OWASP Top 10 Web Application Vulnerabilities', duration: '80 mins', type: 'Interactive Lab' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Practical Implementation',
        duration: '8 Hours',
        description: 'Vulnerability assessment, packet analysis, and secure system hardening.',
        lessons: [
          { id: 'l3-1', title: '3.1 Analyzing Packet Captures (PCAPs) for Threat Indicators', duration: '90 mins', type: 'Hands-on Lab' },
          { id: 'l3-2', title: '3.2 Hardening Linux and Windows Enterprise Bastion Hosts', duration: '85 mins', type: 'Coding Exercise' },
          { id: 'l3-3', title: '3.3 Setting up SIEM Ingestion and Alert Rule Tuning', duration: '75 mins', type: 'Hands-on Lab' },
          { id: 'l3-4', title: '3.4 Pen-Testing Remediation & Secure Code Auditing', duration: '60 mins', type: 'Technical Review' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Assessment',
        duration: '4 Hours',
        description: 'SOC breach simulation defense, forensic report submission, and certificate verification.',
        lessons: [
          { id: 'l4-1', title: '4.1 Live Enterprise Incident Containment Capstone', duration: '120 mins', type: 'Project Submission' },
          { id: 'l4-2', title: '4.2 Cyber Security Comprehensive Theoretical Exam', duration: '90 mins', type: 'Proctored Exam' },
          { id: 'l4-3', title: '4.3 Secure Compliance Sign-Off & Certificate Minting', duration: '15 mins', type: 'Verification' }
        ]
      }
    ]
  },
  {
    id: 'cloud-computing-aws',
    name: 'Cloud Computing with AWS',
    title: 'Cloud Computing with AWS',
    code: 'CSE-AWS-505',
    instructor: 'David K. Chen',
    instructorRole: 'AWS Solutions Architect Fellow & Enterprise Cloud Strategist',
    instructorBio: 'Has architected multi-region cloud infrastructures for Fortune 100 enterprises serving over 50 million concurrent users.',
    duration: '7 Weeks (28 Hours)',
    durationHours: 28,
    difficulty: 'Intermediate',
    category: 'Cloud Architecture',
    rating: 4.92,
    enrolledCount: 2040,
    credits: '3.5 Academic Credits',
    defaultProgress: 0,
    tag: 'Enterprise Ready',
    overview: 'Complete architecture curriculum covering AWS Well-Architected Framework, VPC networking, compute autoscaling, serverless microservices, managed databases, and multi-region resilience.',
    learningOutcomes: [
      'Design fault-tolerant, highly available VPC topologies across multiple Availability Zones.',
      'Deploy containerized applications on ECS/EKS and event-driven serverless functions on AWS Lambda.',
      'Implement multi-tiered data storage utilizing Amazon S3, RDS Aurora, and DynamoDB.',
      'Automate infrastructure provisioning using AWS CDK and Terraform with least-privilege IAM.'
    ],
    assessmentCriteria: {
      quizzes: '20% (Cloud Architectural Checkpoints)',
      labAssignments: '40% (AWS Console & Terraform Deployment Labs)',
      finalCapstone: '40% (High-Availability Cloud Architecture Project)'
    },
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction',
        duration: '6 Hours',
        description: 'Cloud paradigms, AWS global infrastructure, and foundational IAM security policies.',
        lessons: [
          { id: 'l1-1', title: '1.1 The AWS Global Infrastructure (Regions, AZs, Edge Locations)', duration: '50 mins', type: 'Video & Lecture' },
          { id: 'l1-2', title: '1.2 Identity and Access Management (IAM): Roles, Policies, & STS', duration: '60 mins', type: 'Technical Note' },
          { id: 'l1-3', title: '1.3 Cloud Economics, Cost Explorer, & Well-Architected Pillars', duration: '50 mins', type: 'Interactive Lab' },
          { id: 'l1-4', title: '1.4 IAM Least-Privilege Policy Design Quiz', duration: '30 mins', type: 'Assessment' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Core Concepts',
        duration: '9 Hours',
        description: 'VPC networking, subnetting, NAT Gateways, routing tables, and EC2 Auto Scaling.',
        lessons: [
          { id: 'l2-1', title: '2.1 VPC Design: Public/Private Subnets, Internet Gateways, & Route Tables', duration: '80 mins', type: 'Video & Lecture' },
          { id: 'l2-2', title: '2.2 Elastic Compute Cloud (EC2), AMI Creation, & EBS Volume Types', duration: '75 mins', type: 'Technical Note' },
          { id: 'l2-3', title: '2.3 Elastic Load Balancing (ALB, NLB) & Auto Scaling Groups', duration: '70 mins', type: 'Interactive Demo' },
          { id: 'l2-4', title: '2.4 Storage Systems: S3 Lifecycle Rules, Glacier, & EFS', duration: '65 mins', type: 'Interactive Lab' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Practical Implementation',
        duration: '9 Hours',
        description: 'Relational & NoSQL database management, AWS Lambda, API Gateway, and CloudFormation.',
        lessons: [
          { id: 'l3-1', title: '3.1 Provisioning Multi-AZ Aurora PostgreSQL & Read Replicas', duration: '90 mins', type: 'Hands-on Lab' },
          { id: 'l3-2', title: '3.2 Serverless Microservices with API Gateway, Lambda, & DynamoDB', duration: '90 mins', type: 'Coding Exercise' },
          { id: 'l3-3', title: '3.3 Infrastructure as Code (IaC) with Terraform & CloudFormation', duration: '80 mins', type: 'Hands-on Lab' },
          { id: 'l3-4', title: '3.4 Observability with Amazon CloudWatch, CloudTrail, & X-Ray', duration: '60 mins', type: 'Technical Review' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Assessment',
        duration: '4 Hours',
        description: 'High-availability multi-tier architecture capstone, architecture review, and certification.',
        lessons: [
          { id: 'l4-1', title: '4.1 Deploying an Enterprise Multi-Tier Resilient Architecture Capstone', duration: '130 mins', type: 'Project Submission' },
          { id: 'l4-2', title: '4.2 AWS Solutions Architect Level Final Comprehensive Exam', duration: '90 mins', type: 'Proctored Exam' },
          { id: 'l4-3', title: '4.3 Validation and SecureVault Digital Credentialing', duration: '15 mins', type: 'Verification' }
        ]
      }
    ]
  },
  {
    id: 'generative-ai-apps',
    name: 'Generative AI Applications',
    title: 'Generative AI Applications',
    code: 'CSE-GENAI-506',
    instructor: 'Dr. Sophia Al-Mansoor',
    instructorRole: 'Head of LLM Architecture & Frontier Research Fellow',
    instructorBio: 'Pioneered retrieval-augmented enterprise assistants, context optimization algorithms, and diffusion model safety guardrails.',
    duration: '6 Weeks (24 Hours)',
    durationHours: 24,
    difficulty: 'Advanced',
    category: 'Artificial Intelligence',
    rating: 4.96,
    enrolledCount: 2210,
    credits: '3.5 Academic Credits',
    defaultProgress: 0,
    tag: 'Frontier Tech',
    overview: 'Architecting industrial Generative AI systems. Covers Transformer self-attention mathematics, Retrieval-Augmented Generation (RAG), Vector Embeddings, Fine-Tuning (LoRA/QLoRA), and LLM evaluation frameworks.',
    learningOutcomes: [
      'Master Transformer self-attention mechanisms, KV-caching, and tokenization pipelines.',
      'Architect enterprise-grade RAG systems using hybrid search and vector databases (Pinecone, Chroma).',
      'Implement Parameter-Efficient Fine-Tuning (PEFT) using LoRA and QLoRA on custom domain datasets.',
      'Deploy deterministic safety guardrails, prompt defense, and hallucination monitoring metrics.'
    ],
    assessmentCriteria: {
      quizzes: '20% (Architecture & Attention Theory)',
      labAssignments: '40% (RAG Pipeline & Fine-Tuning Implementations)',
      finalCapstone: '40% (Enterprise Autonomous Copilot Deployment)'
    },
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction',
        duration: '5 Hours',
        description: 'Transformer mechanics, tokenization, embeddings, and API orchestrations.',
        lessons: [
          { id: 'l1-1', title: '1.1 Transformer Architecture: Self-Attention & Multi-Head Encoders', duration: '60 mins', type: 'Video & Lecture' },
          { id: 'l1-2', title: '1.2 High-Dimensional Embeddings & Cosine Vector Spaces', duration: '55 mins', type: 'Technical Note' },
          { id: 'l1-3', title: '1.3 Prompt Engineering Paradigms: Few-Shot, CoT, & ReAct', duration: '65 mins', type: 'Interactive Lab' },
          { id: 'l1-4', title: '1.4 Transformer Mechanics Diagnostic Quiz', duration: '30 mins', type: 'Assessment' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Core Concepts',
        duration: '8 Hours',
        description: 'RAG architecture, vector index algorithms (HNSW), chunking strategies, and re-ranking.',
        lessons: [
          { id: 'l2-1', title: '2.1 Retrieval-Augmented Generation (RAG) End-to-End Pipeline', duration: '75 mins', type: 'Video & Lecture' },
          { id: 'l2-2', title: '2.2 Semantic Chunking, Metadata Filtering, & Hybrid Search (BM25 + Vector)', duration: '75 mins', type: 'Technical Note' },
          { id: 'l2-3', title: '2.3 Context Window Optimization & Cross-Encoder Re-Ranking', duration: '70 mins', type: 'Interactive Demo' },
          { id: 'l2-4', title: '2.4 Agentic Workflows with Function Calling & Structured Outputs', duration: '80 mins', type: 'Interactive Lab' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Practical Implementation',
        duration: '8 Hours',
        description: 'Hands-on RAG system engineering, local open-weights model fine-tuning with LoRA.',
        lessons: [
          { id: 'l3-1', title: '3.1 Building an Enterprise Document Intelligence Engine', duration: '95 mins', type: 'Hands-on Lab' },
          { id: 'l3-2', title: '3.2 Fine-Tuning Open Source LLMs with QLoRA & HuggingFace', duration: '90 mins', type: 'Coding Exercise' },
          { id: 'l3-3', title: '3.3 Implementing Guardrails: Llama-Guard & Jailbreak Prevention', duration: '75 mins', type: 'Hands-on Lab' },
          { id: 'l3-4', title: '3.4 Evaluating Generation Quality with RAGAS & G-Eval Metrics', duration: '60 mins', type: 'Technical Review' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Final Assessment',
        duration: '3 Hours',
        description: 'Production Autonomous Copilot deployment, evaluation defense, and certificate minting.',
        lessons: [
          { id: 'l4-1', title: '4.1 Deploying an Enterprise Knowledge Graph Copilot Capstone', duration: '120 mins', type: 'Project Submission' },
          { id: 'l4-2', title: '4.2 Generative AI Systems Comprehensive Examination', duration: '80 mins', type: 'Proctored Exam' },
          { id: 'l4-3', title: '4.3 SecureVault Ledger Credential Issuance', duration: '15 mins', type: 'Verification' }
        ]
      }
    ]
  }
];

export const INITIAL_USER = {
  name: 'Krish Jain',
  learnerId: 'STU-2026-001',
  institution: 'BMS Institute of Technology',
  role: 'Student',
  email: 'demo@eduverse.com',
  department: 'Department of Computer Science & Engineering',
  batch: 'Academic Session 2024 - 2026',
  program: 'Bachelor of Engineering (B.E. Honors)',
  verifiedStatus: 'Verified Academic Identity',
  joinedDate: 'August 2024',
  avatarUrl: null
};
