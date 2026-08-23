const COMMON = { role: 'Software Developer', technology: 'MERN', experience: 'Fresher' };

module.exports = [
  // ---- TECHNICAL ----
  {
    ...COMMON,
    category: 'technical',
    topic: 'React',
    difficulty: 'easy',
    text: 'What is the Virtual DOM and how does React use it to update the UI efficiently?',
    keywords: ['virtual dom', 'diffing', 'reconciliation', 'real dom', 'update'],
    idealAnswerNotes: 'Mention diffing, reconciliation, and batched updates to the real DOM.',
    followUps: ['How does React decide which components to re-render?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'React',
    difficulty: 'easy',
    text: 'Explain the difference between props and state in React.',
    keywords: ['props', 'state', 'immutable', 'component', 'parent', 'internal'],
    idealAnswerNotes: 'Props are read-only and passed from parent; state is internal and mutable via setState/useState.',
    followUps: ['Can a child component modify its own props directly?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'React',
    difficulty: 'medium',
    text: 'What are React Hooks? Explain useState and useEffect with an example use case.',
    keywords: ['hooks', 'usestate', 'useeffect', 'functional component', 'side effect', 'dependency array'],
    idealAnswerNotes: 'Hooks let function components use state and lifecycle features; useEffect handles side effects.',
    followUps: ['What happens if you omit the dependency array in useEffect?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'Node.js',
    difficulty: 'easy',
    text: 'What is Node.js and why is it non-blocking? Explain the event loop briefly.',
    keywords: ['event loop', 'non-blocking', 'asynchronous', 'single thread', 'callback', 'v8'],
    idealAnswerNotes: 'Node runs JS on V8, uses an event loop and callback queue to handle async I/O on a single thread.',
    followUps: ['What is the difference between process.nextTick and setImmediate?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'Node.js',
    difficulty: 'medium',
    text: 'What is middleware in Express.js? Give an example of how you would use it.',
    keywords: ['middleware', 'next', 'request', 'response', 'express', 'chain'],
    idealAnswerNotes: 'Middleware functions have access to req, res, next and can run code, modify req/res, or end the cycle.',
    followUps: ['How would you write middleware to handle authentication?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'MongoDB',
    difficulty: 'easy',
    text: 'What is the difference between SQL and MongoDB (NoSQL)? When would you choose MongoDB?',
    keywords: ['schema', 'document', 'collection', 'relational', 'flexible', 'json', 'scalability'],
    idealAnswerNotes: 'MongoDB stores flexible JSON-like documents in collections vs rigid tables/rows in SQL.',
    followUps: ['How does MongoDB handle relationships between documents?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'MongoDB',
    difficulty: 'medium',
    text: 'What is Mongoose and why is it commonly used with MongoDB in a Node.js app?',
    keywords: ['mongoose', 'schema', 'odm', 'validation', 'model'],
    idealAnswerNotes: 'Mongoose is an ODM providing schema definition, validation, and easier querying over the native driver.',
    followUps: ['How would you enforce a required field using Mongoose?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'JavaScript',
    difficulty: 'easy',
    text: 'Explain the difference between var, let, and const in JavaScript.',
    keywords: ['scope', 'block', 'function', 'hoisting', 'reassign', 'const'],
    idealAnswerNotes: 'var is function-scoped and hoisted; let/const are block-scoped; const cannot be reassigned.',
    followUps: ['What is temporal dead zone?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'JavaScript',
    difficulty: 'medium',
    text: 'What is a Promise in JavaScript? How is it different from a callback?',
    keywords: ['promise', 'resolve', 'reject', 'then', 'async', 'callback hell'],
    idealAnswerNotes: 'Promises represent a future value and avoid callback hell via chaining/.then or async-await.',
    followUps: ['How does async/await relate to Promises under the hood?']
  },
  {
    ...COMMON,
    category: 'technical',
    topic: 'REST API',
    difficulty: 'easy',
    text: 'What is a RESTful API? Name the common HTTP methods and what each is used for.',
    keywords: ['rest', 'get', 'post', 'put', 'delete', 'stateless', 'resource'],
    idealAnswerNotes: 'REST is a stateless architecture using HTTP verbs mapped to CRUD operations on resources.',
    followUps: ['What is the difference between PUT and PATCH?']
  },

  // ---- HR ----
  {
    ...COMMON,
    category: 'hr',
    topic: 'Behavioral',
    difficulty: 'easy',
    text: 'Tell me about yourself.',
    keywords: ['background', 'skills', 'project', 'interest', 'goal'],
    idealAnswerNotes: 'Should be a concise pitch: background, key skills/projects, and why this role.',
    followUps: ['What are you most proud of in your academic projects?']
  },
  {
    ...COMMON,
    category: 'hr',
    topic: 'Behavioral',
    difficulty: 'easy',
    text: 'Describe a time you faced a challenging problem in a project. How did you solve it?',
    keywords: ['situation', 'task', 'action', 'result', 'challenge', 'solution'],
    idealAnswerNotes: 'Look for STAR structure: situation, task, action taken, and the result achieved.',
    followUps: ['What would you do differently if you faced it again?']
  },
  {
    ...COMMON,
    category: 'hr',
    topic: 'Behavioral',
    difficulty: 'easy',
    text: 'Why do you want to work as a Software Developer, and why our company?',
    keywords: ['passion', 'skills', 'growth', 'company', 'motivation', 'contribute'],
    idealAnswerNotes: 'Should connect personal motivation with concrete skills and something specific about the company.',
    followUps: ['Where do you see yourself in 3 years?']
  },
  {
    ...COMMON,
    category: 'hr',
    topic: 'Behavioral',
    difficulty: 'medium',
    text: 'Describe a situation where you had to work in a team and disagreed with a teammate. How did you handle it?',
    keywords: ['team', 'conflict', 'communication', 'compromise', 'result'],
    idealAnswerNotes: 'Look for calm communication, focus on shared goals, and a resolved outcome.',
    followUps: ['What did you learn about teamwork from that experience?']
  },
  {
    ...COMMON,
    category: 'hr',
    topic: 'Behavioral',
    difficulty: 'easy',
    text: 'What are your strengths and weaknesses?',
    keywords: ['strength', 'weakness', 'improve', 'self-aware', 'example'],
    idealAnswerNotes: 'Should give concrete, specific strengths/weaknesses with an example and how they are improving.',
    followUps: ['What steps are you taking to work on that weakness?']
  },

  // ---- CODING ----
  {
    ...COMMON,
    category: 'coding',
    topic: 'DSA',
    difficulty: 'easy',
    text: 'How would you reverse a string in JavaScript? Explain your approach and its time complexity.',
    keywords: ['reverse', 'split', 'array', 'loop', 'o(n)', 'time complexity'],
    idealAnswerNotes: 'Common approach: split, reverse, join, or two-pointer swap in place — O(n) time.',
    followUps: ['Can you do it without using built-in reverse methods?']
  },
  {
    ...COMMON,
    category: 'coding',
    topic: 'DSA',
    difficulty: 'medium',
    text: 'How would you find duplicate elements in an array efficiently? Explain your approach and complexity.',
    keywords: ['duplicate', 'hash', 'set', 'o(n)', 'time complexity', 'space'],
    idealAnswerNotes: 'Using a Set/hash map gives O(n) time and O(n) space, versus O(n^2) with nested loops.',
    followUps: ['How would you do it with O(1) extra space if the array only contains 1..n?']
  },
  {
    ...COMMON,
    category: 'coding',
    topic: 'DSA',
    difficulty: 'medium',
    text: 'Explain how you would check if a string is a palindrome. What is the time complexity?',
    keywords: ['palindrome', 'two pointer', 'reverse', 'o(n)', 'time complexity'],
    idealAnswerNotes: 'Two-pointer comparison from both ends, or reverse and compare — O(n) time.',
    followUps: ['How would you handle spaces and case sensitivity?']
  },
  {
    ...COMMON,
    category: 'coding',
    topic: 'Node.js',
    difficulty: 'medium',
    text: 'How would you design a simple REST endpoint in Express to fetch a user by ID from MongoDB, including error handling?',
    keywords: ['express', 'route', 'findbyid', 'try', 'catch', 'status', 'error handling'],
    idealAnswerNotes: 'Should mention route param, Model.findById, try/catch, and returning proper status codes (200/404/500).',
    followUps: ['How would you validate that the ID is a valid MongoDB ObjectId?']
  },

  // ---- MCQ ----
  {
    ...COMMON,
    category: 'mcq',
    topic: 'JavaScript',
    difficulty: 'easy',
    text: 'What will `typeof null` return in JavaScript?',
    options: ['"null"', '"undefined"', '"object"', '"number"'],
    correctOptionIndex: 2
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'React',
    difficulty: 'easy',
    text: 'Which hook is used to perform side effects in a functional React component?',
    options: ['useState', 'useEffect', 'useMemo', 'useRef'],
    correctOptionIndex: 1
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'Node.js',
    difficulty: 'easy',
    text: 'Which module is used to create a basic HTTP server in Node.js without any framework?',
    options: ['fs', 'http', 'path', 'events'],
    correctOptionIndex: 1
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'MongoDB',
    difficulty: 'easy',
    text: 'Which command is used to insert a document into a MongoDB collection?',
    options: ['db.collection.add()', 'db.collection.insertOne()', 'db.collection.push()', 'db.collection.create()'],
    correctOptionIndex: 1
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'Express.js',
    difficulty: 'easy',
    text: 'In Express, which method is used to handle a GET request at the root route?',
    options: ["app.get('/')", "app.route('/')", "app.request('/')", "app.fetch('/')"],
    correctOptionIndex: 0
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'JavaScript',
    difficulty: 'medium',
    text: 'What does the `===` operator check in JavaScript?',
    options: [
      'Value only',
      'Value and type',
      'Reference only',
      'Type only'
    ],
    correctOptionIndex: 1
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'React',
    difficulty: 'medium',
    text: 'What is the correct way to update state based on the previous state in React?',
    options: [
      'setCount(count + 1)',
      'setCount(prev => prev + 1)',
      'count = count + 1',
      'this.state.count++'
    ],
    correctOptionIndex: 1
  },
  {
    ...COMMON,
    category: 'mcq',
    topic: 'MongoDB',
    difficulty: 'medium',
    text: 'Which MongoDB operator is used to match documents where a field value is greater than a given value?',
    options: ['$gt', '$more', '$greater', '$above'],
    correctOptionIndex: 0
  },

  // ================= MEAN =================
  {
    experience: 'Fresher', technology: 'MEAN',
    category: 'technical', topic: 'Angular', difficulty: 'easy',
    text: 'What is a component in Angular, and what are its main building blocks?',
    keywords: ['component', 'template', 'class', 'decorator', 'selector', 'metadata'],
    idealAnswerNotes: 'A component = TypeScript class + HTML template + CSS, tied together with the @Component decorator.',
    followUps: ['What is the purpose of the @Component decorator?']
  },
  {
    experience: 'Fresher', technology: 'MEAN',
    category: 'technical', topic: 'Angular', difficulty: 'medium',
    text: 'What is dependency injection in Angular and why is it useful?',
    keywords: ['dependency injection', 'service', 'provider', 'injector', 'reusable'],
    idealAnswerNotes: 'DI lets Angular provide services to components/classes automatically, improving reusability and testability.',
    followUps: ['How would you scope a service to a single component vs the whole app?']
  },
  {
    experience: 'Fresher', technology: 'MEAN',
    category: 'coding', topic: 'Angular', difficulty: 'medium',
    text: 'How would you fetch data from a REST API in Angular and display it in a component? Mention the tools involved.',
    keywords: ['httpclient', 'observable', 'subscribe', 'service', 'async pipe'],
    idealAnswerNotes: 'Use HttpClient in a service, return an Observable, subscribe (or use async pipe) in the component.',
    followUps: ['What is the difference between an Observable and a Promise?']
  },
  {
    experience: 'Fresher', technology: 'MEAN',
    category: 'mcq', topic: 'Angular', difficulty: 'easy',
    text: 'Which Angular CLI command generates a new component?',
    options: ['ng new component', 'ng generate component', 'ng build component', 'ng create component'],
    correctOptionIndex: 1
  },
  {
    experience: 'Fresher', technology: 'MEAN',
    category: 'mcq', topic: 'TypeScript', difficulty: 'easy',
    text: 'What is the main benefit TypeScript adds over plain JavaScript?',
    options: ['Faster runtime execution', 'Static typing and compile-time checks', 'Smaller file size', 'Built-in database access'],
    correctOptionIndex: 1
  },

  // ================= Java Full Stack =================
  {
    experience: 'Fresher', technology: 'Java Full Stack',
    category: 'technical', topic: 'Java', difficulty: 'easy',
    text: 'What is the difference between an interface and an abstract class in Java?',
    keywords: ['interface', 'abstract class', 'multiple inheritance', 'implementation', 'method'],
    idealAnswerNotes: 'Interfaces define a contract (Java 8+ allows default methods); abstract classes can have state and partial implementation; a class can implement multiple interfaces but extend only one class.',
    followUps: ['When would you choose an abstract class over an interface?']
  },
  {
    experience: 'Fresher', technology: 'Java Full Stack',
    category: 'technical', topic: 'Spring Boot', difficulty: 'medium',
    text: 'What is Spring Boot and how does it simplify building REST APIs compared to plain Spring?',
    keywords: ['spring boot', 'autoconfiguration', 'embedded server', 'rest', 'annotation', 'starter'],
    idealAnswerNotes: 'Spring Boot provides auto-configuration, embedded servers, and starter dependencies, cutting boilerplate XML config.',
    followUps: ['What does the @RestController annotation do?']
  },
  {
    experience: 'Fresher', technology: 'Java Full Stack',
    category: 'coding', topic: 'Java', difficulty: 'medium',
    text: 'How would you handle a null value safely in Java without risking a NullPointerException? Explain your approach.',
    keywords: ['null check', 'optional', 'nullpointerexception', 'if', 'safe'],
    idealAnswerNotes: 'Explicit null checks, or java.util.Optional to represent absence of a value explicitly.',
    followUps: ['How does Optional improve readability over nested null checks?']
  },
  {
    experience: 'Fresher', technology: 'Java Full Stack',
    category: 'mcq', topic: 'Java', difficulty: 'easy',
    text: 'Which keyword is used to inherit a class in Java?',
    options: ['implements', 'extends', 'inherits', 'super'],
    correctOptionIndex: 1
  },
  {
    experience: 'Fresher', technology: 'Java Full Stack',
    category: 'mcq', topic: 'Spring Boot', difficulty: 'medium',
    text: 'Which annotation marks a class as a Spring Boot REST controller?',
    options: ['@Controller', '@RestController', '@Service', '@Repository'],
    correctOptionIndex: 1
  },

  // ================= Python Full Stack =================
  {
    experience: 'Fresher', technology: 'Python Full Stack',
    category: 'technical', topic: 'Python', difficulty: 'easy',
    text: 'What is the difference between a list and a tuple in Python?',
    keywords: ['list', 'tuple', 'mutable', 'immutable', 'performance'],
    idealAnswerNotes: 'Lists are mutable and use [], tuples are immutable and use () — tuples are slightly faster and hashable.',
    followUps: ['When would you prefer a tuple over a list?']
  },
  {
    experience: 'Fresher', technology: 'Python Full Stack',
    category: 'technical', topic: 'Django/Flask', difficulty: 'medium',
    text: 'What is the difference between Django and Flask, and when would you choose one over the other?',
    keywords: ['django', 'flask', 'batteries included', 'lightweight', 'orm', 'micro framework'],
    idealAnswerNotes: 'Django is a full "batteries included" framework with ORM/admin built in; Flask is a lightweight microframework you extend as needed.',
    followUps: ['What is Django ORM and how does it help avoid writing raw SQL?']
  },
  {
    experience: 'Fresher', technology: 'Python Full Stack',
    category: 'coding', topic: 'Python', difficulty: 'medium',
    text: 'How would you build a simple REST endpoint in Flask that returns a list of users as JSON? Explain your approach.',
    keywords: ['flask', 'route', 'jsonify', 'get', 'app.route'],
    idealAnswerNotes: 'Define a route with @app.route, handle GET, return data via jsonify.',
    followUps: ['How would you handle a 404 if the requested user does not exist?']
  },
  {
    experience: 'Fresher', technology: 'Python Full Stack',
    category: 'mcq', topic: 'Python', difficulty: 'easy',
    text: 'Which of these is used to define a function in Python?',
    options: ['function', 'def', 'func', 'lambda only'],
    correctOptionIndex: 1
  },
  {
    experience: 'Fresher', technology: 'Python Full Stack',
    category: 'mcq', topic: 'Django/Flask', difficulty: 'medium',
    text: 'In Django, what is the purpose of a "migration"?',
    options: [
      'To move the project to a new server',
      'To apply changes in models to the database schema',
      'To migrate users between roles',
      'To convert Python 2 code to Python 3'
    ],
    correctOptionIndex: 1
  },

  // ================= AI/ML =================
  {
    experience: 'Fresher', technology: 'AI/ML',
    category: 'technical', topic: 'Machine Learning', difficulty: 'easy',
    text: 'What is the difference between supervised and unsupervised learning? Give an example of each.',
    keywords: ['supervised', 'unsupervised', 'labeled', 'unlabeled', 'classification', 'clustering'],
    idealAnswerNotes: 'Supervised learning uses labeled data (e.g. classification); unsupervised finds patterns in unlabeled data (e.g. clustering).',
    followUps: ['Where does reinforcement learning fit into this picture?']
  },
  {
    experience: 'Fresher', technology: 'AI/ML',
    category: 'technical', topic: 'Machine Learning', difficulty: 'medium',
    text: 'What is overfitting in machine learning, and how would you try to prevent it?',
    keywords: ['overfitting', 'generalize', 'regularization', 'cross-validation', 'training data', 'test data'],
    idealAnswerNotes: 'Overfitting = model memorizes training data but fails to generalize; prevent with regularization, cross-validation, more data, simpler models.',
    followUps: ['What is the difference between overfitting and underfitting?']
  },
  {
    experience: 'Fresher', technology: 'AI/ML',
    category: 'technical', topic: 'Deep Learning', difficulty: 'medium',
    text: 'What is a neural network, and what role does an activation function play in it?',
    keywords: ['neural network', 'activation function', 'non-linear', 'layers', 'weights'],
    idealAnswerNotes: 'A neural network is layers of connected nodes with weights; activation functions introduce non-linearity so the network can learn complex patterns.',
    followUps: ['Why is ReLU commonly preferred over sigmoid in hidden layers?']
  },
  {
    experience: 'Fresher', technology: 'AI/ML',
    category: 'coding', topic: 'Machine Learning', difficulty: 'medium',
    text: 'How would you evaluate a classification model\'s performance? Name the metrics you would use and why.',
    keywords: ['accuracy', 'precision', 'recall', 'f1', 'confusion matrix'],
    idealAnswerNotes: 'Accuracy, precision, recall, F1-score, and confusion matrix — accuracy alone can mislead on imbalanced data.',
    followUps: ['When would recall matter more than precision?']
  },
  {
    experience: 'Fresher', technology: 'AI/ML',
    category: 'mcq', topic: 'Machine Learning', difficulty: 'easy',
    text: 'Which of these is an example of a supervised learning algorithm?',
    options: ['K-Means Clustering', 'Linear Regression', 'PCA', 'Apriori'],
    correctOptionIndex: 1
  },
  {
    experience: 'Fresher', technology: 'AI/ML',
    category: 'mcq', topic: 'Deep Learning', difficulty: 'medium',
    text: 'Which library is most commonly used for building deep learning models in Python?',
    options: ['Pandas', 'TensorFlow / PyTorch', 'Matplotlib', 'Flask'],
    correctOptionIndex: 1
  },

  // ================= Data Science =================
  {
    experience: 'Fresher', technology: 'Data Science',
    category: 'technical', topic: 'Statistics', difficulty: 'easy',
    text: 'What is the difference between mean, median, and mode, and when is each most useful?',
    keywords: ['mean', 'median', 'mode', 'average', 'outlier', 'distribution'],
    idealAnswerNotes: 'Mean is the average, median is the middle value (robust to outliers), mode is the most frequent value.',
    followUps: ['Why might median be preferred over mean for income data?']
  },
  {
    experience: 'Fresher', technology: 'Data Science',
    category: 'technical', topic: 'Pandas', difficulty: 'medium',
    text: 'How would you handle missing values in a dataset using Pandas? Explain a couple of approaches.',
    keywords: ['missing values', 'dropna', 'fillna', 'imputation', 'pandas'],
    idealAnswerNotes: 'dropna() to remove rows/columns, or fillna() with mean/median/mode or forward/backward fill for imputation.',
    followUps: ['When would dropping rows be a bad idea?']
  },
  {
    experience: 'Fresher', technology: 'Data Science',
    category: 'coding', topic: 'SQL', difficulty: 'medium',
    text: 'How would you write a SQL query to find the second-highest salary from an Employees table?',
    keywords: ['sql', 'order by', 'limit', 'subquery', 'distinct', 'salary'],
    idealAnswerNotes: 'A subquery with ORDER BY salary DESC LIMIT 1 OFFSET 1, or MAX(salary) where salary < MAX(salary).',
    followUps: ['How would you find the Nth highest salary generically?']
  },
  {
    experience: 'Fresher', technology: 'Data Science',
    category: 'mcq', topic: 'Statistics', difficulty: 'easy',
    text: 'A dataset\'s standard deviation tells you about its:',
    options: ['Central tendency', 'Spread/variability', 'Correlation with another variable', 'Sample size'],
    correctOptionIndex: 1
  },
  {
    experience: 'Fresher', technology: 'Data Science',
    category: 'mcq', topic: 'Pandas', difficulty: 'easy',
    text: 'Which Pandas function is used to read a CSV file into a DataFrame?',
    options: ['pd.load_csv()', 'pd.read_csv()', 'pd.open_csv()', 'pd.import_csv()'],
    correctOptionIndex: 1
  }
];
