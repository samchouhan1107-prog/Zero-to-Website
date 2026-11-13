import { Chapter } from '../../../utils/types';

export const aiModule07: Chapter = {
  id: 'ai-mod-07',
  number: '7',
  badge: 'AI 07',
  slug: 'retrieval-augmented-generation',
  title: 'Retrieval-Augmented Generation',
  subtitle: 'Vector Embeddings, Cosine Similarity, Chunking Strategies, Hybrid Search & Source Attribution',
  description: 'Connect language models to external proprietary databases and real-time knowledge bases. Master high-dimensional vector embeddings, semantic search mathematics, document ingestion pipelines, recursive text chunking, hybrid keyword-vector retrieval, and grounded source citation architectures.',
  estimatedHours: '4 hrs',
  accentColor: 'teal',
  iconName: 'Database',
  totalLessons: 5,
  lessons: [
    {
      id: 'ai-07-01',
      chapterId: 'ai-mod-07',
      number: '7.1',
      slug: 'embeddings',
      title: 'Embeddings',
      tagline: 'High-dimensional vector representations: capturing semantic meaning in floating-point arrays',
      durationMinutes: 25,
      learningObjectives: [
        'Understand how embedding models map words, sentences, and code into dense 768- or 1536-dimensional vector spaces',
        'Analyze semantic distance: synonyms cluster together while unrelated concepts reside in distant regions',
        'Compare leading embedding models (text-embedding-004, text-embedding-3-small, BGE-large)'
      ],
      theorySections: [
        {
          heading: '1. What is an Embedding?',
          content: 'An embedding is a fixed-length array of floating-point numbers (e.g. [0.024, -0.198, 0.412, ...]) that represents the semantic meaning of a piece of text. Unlike keyword matching that searches for identical letters, embeddings position conceptually similar ideas near each other in geometric space.',
          bulletPoints: [
            'Dense Representation: Unlike sparse one-hot encodings, every dimension in an embedding vector captures latent semantic features',
            'Mathematical Geometry: "king" - "man" + "woman" ≈ "queen" in high-dimensional vector arithmetic',
            'Cross-lingual & Multimodal: Modern embeddings can map an English query, a Spanish document, and a photograph of a cat into the exact same semantic cluster'
          ]
        },
        {
          heading: '2. Generating Embeddings via API',
          content: 'Embedding generation is fast and inexpensive (~$0.02 per million tokens). A dedicated encoder model converts input text into normalized unit vectors.',
          bulletPoints: [
            'Unit Normalization: Vectors are normalized to length 1 (||v|| = 1), simplifying cosine similarity to a simple dot product',
            'Batching: Always generate embeddings in batches (e.g. 50 chunks per API call) to maximize network throughput'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Semantic GPS Coordinates',
        concept: 'Embeddings',
        story: 'Just as GPS coordinates (latitude 37.7749, longitude -122.4194) place San Francisco on a geographic map, an embedding vector (768 numbers) places a sentence on a semantic map of human concepts. Two articles about "renewable energy" and "solar panels" will have nearly identical GPS coordinates on the knowledge globe.',
        moral: 'Embeddings convert qualitative human language into quantitative geometry that computers can search instantly.',
        icon: 'Compass'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Generating Embeddings with @google/genai in Node.js',
        description: 'Generating dense vector representations of text strings.',
        html: `<div class="embed-code-card">
  <h4>Vector Embedding Generation</h4>
  <pre><code>import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();

export async function getVectorEmbedding(text: string): Promise<number[]> {
  const result = await ai.models.embedContent({
    model: 'text-embedding-004',
    contents: text
  });

  // Returns array of 768 floating point numbers
  return result.embedding.values;
}</code></pre>
</div>`,
        css: `.embed-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '5-9', title: 'embedContent API', explanation: 'Calls the dedicated encoder model, returning a dense 768-dimensional float array.' }
        ]
      },
      video: {
        title: 'Vector Embeddings Mathematics & Geometry',
        duration: '15:40',
        description: 'Visualizing 768-dimensional space in 3D using t-SNE and PCA dimensionality reduction.',
        keyPoints: ['Vector dimensions', 'Semantic clustering', 'Unit vector normalization'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Vector Geometry', description: 'Embedding spaces.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to RAG. Today we explore high-dimensional semantic vector spaces.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-07-01',
        title: 'Normalize a Vector to Unit Length',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write a helper function that normalizes a 2D or 3D vector so its Euclidean magnitude equals 1.0.',
        instructions: [
          'Calculate magnitude: Math.sqrt(v.reduce((sum, val) => sum + val * val, 0))',
          'Divide each element by magnitude: v.map(val => val / mag)',
          'Return normalized array'
        ],
        starterHtml: `<div id="norm-out">Normalized: [0, 0]</div>`,
        starterCss: `#norm-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function normalizeVector(v) {
  return [];
}`,
        solutionHtml: `<div id="norm-out">Normalized: [0.6, 0.8] (Length = 1.0)</div>`,
        solutionCss: `#norm-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function normalizeVector(v) {
  const mag = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
  return v.map(val => Number((val / mag).toFixed(4)));
}`,
        hints: ['Magnitude is the square root of the sum of squared elements.'],
        testCases: [
          { id: 'tc-32', description: 'Normalizes [3, 4] to [0.6, 0.8]', hint: 'Check magnitude division', checkType: 'text-contains', expectedValue: '0.6' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-07-01',
          question: 'What does it mean when two sentences have a high cosine similarity score (e.g. 0.94) in an embedding space?',
          options: [
            'They contain the exact same alphabetical characters in identical order',
            'They share very close semantic conceptual meaning, even if they use completely different vocabulary words',
            'They were typed on the same keyboard',
            'They both contain typos'
          ],
          correctIndex: 1,
          explanation: 'High cosine similarity signifies geometric proximity in semantic space, indicating conceptual alignment regardless of vocabulary differences.'
        }
      ],
      summary: [
        'Embeddings translate words, paragraphs, and code into dense floating-point coordinate vectors in semantic space.',
        'Concepts with related meanings cluster together, allowing semantic discovery beyond rigid keyword matching.',
        'Unit vector normalization simplifies similarity calculations into fast GPU dot products.'
      ],
      relatedTopics: [
        { title: 'Vector Search Fundamentals', chapterNumber: '7', lessonId: 'ai-07-02', context: 'Search vector databases with cosine distance.' }
      ]
    },
    {
      id: 'ai-07-02',
      chapterId: 'ai-mod-07',
      number: '7.2',
      slug: 'vector-search-fundamentals',
      title: 'Vector Search Fundamentals',
      tagline: 'Cosine similarity, Euclidean distance, Dot product, and Approximate Nearest Neighbor (ANN) indexes',
      durationMinutes: 25,
      learningObjectives: [
        'Calculate Cosine Similarity between vector embeddings using dot products: (A · B) / (||A|| * ||B||)',
        'Understand the trade-offs of exact k-NN vs. Approximate Nearest Neighbor (ANN) algorithms (HNSW, IVF-Flat)',
        'Evaluate vector databases: pgvector (PostgreSQL), Pinecone, Qdrant, Chroma, and SQLite-vss'
      ],
      theorySections: [
        {
          heading: '1. The Mathematics of Vector Similarity',
          content: 'To determine how relevant a stored document chunk is to a user search query, the system calculates the angle between their embedding vectors.',
          bulletPoints: [
            'Dot Product (A · B): Sum of element-wise multiplications. Extremely fast on modern SIMD and AVX hardware',
            'Cosine Similarity: Measures the cosine of the angle between two vectors (-1 to 1); invariant to document length',
            'Euclidean Distance (L2): Measures straight-line distance; sensitive to vector magnitude'
          ]
        },
        {
          heading: '2. Exact k-NN vs. Approximate Nearest Neighbors (ANN)',
          content: 'Searching 10,000 vectors by calculating exact distance to every vector takes a few milliseconds (exact k-NN). Searching 50,000,000 vectors requires Approximate Nearest Neighbor indexing like HNSW (Hierarchical Navigable Small World).',
          bulletPoints: [
            'pgvector: Postgres extension supporting HNSW and IVFFlat indexes right alongside your user tables',
            'HNSW Index: Multi-layer graph structure that finds nearest neighbors in O(log N) time with 99%+ recall'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Six Degrees of Separation Graph',
        concept: 'HNSW Graph Indexing',
        story: 'If you want to find someone who knows a specific engineer in Tokyo, you do not interview all 8 billion people on Earth one by one (exact k-NN). You call an international executive (top layer of HNSW graph), who connects you to a Japanese regional director, who connects you to the specific team lead in 3 phone calls (O(log N) graph traversal).',
        moral: 'Hierarchical graph indexes find needle-in-a-haystack vectors across millions of documents in sub-10ms.',
        icon: 'Network'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Pure JavaScript Cosine Similarity Calculator',
        description: 'Calculating the semantic similarity score between two normalized vectors.',
        html: `<div class="cosine-card">
  <h4>Cosine Similarity Function</h4>
  <pre><code>export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) throw new Error("Vector dimension mismatch");

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  
  return dotProduct / denominator; // Output between -1.0 and 1.0
}</code></pre>
</div>`,
        css: `.cosine-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '8-12', title: 'Accumulator Loop', explanation: 'Calculates the dot product and Euclidean norms in a single fast memory pass.' }
        ]
      },
      video: {
        title: 'Vector Search Mathematics: Cosine Similarity to HNSW',
        duration: '16:15',
        description: 'Implementing dot products, understanding pgvector syntax, and tuning HNSW parameters.',
        keyPoints: ['Dot product vs Cosine vs L2', 'pgvector SQL syntax', 'HNSW m and ef_construction parameters'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Search Math', description: 'Similarity metrics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we master vector distance metrics and approximate nearest neighbor search.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-07-02',
        title: 'Calculate 2D Vector Dot Product',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that returns the dot product of two arrays [a1*b1 + a2*b2 + ...].',
        instructions: [
          'Iterate through elements and sum a[i] * b[i]',
          'Return scalar number'
        ],
        starterHtml: `<div id="dot-out">Dot Product: 0</div>`,
        starterCss: `#dot-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function dotProduct(a, b) {
  return 0;
}`,
        solutionHtml: `<div id="dot-out">Dot Product: 11 ([1, 2] · [3, 4] = 3 + 8 = 11)</div>`,
        solutionCss: `#dot-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function dotProduct(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}`,
        hints: ['Multiply matching indices and accumulate sum.'],
        testCases: [
          { id: 'tc-33', description: 'Calculates 11 for [1,2] and [3,4]', hint: '1*3 + 2*4 = 11', checkType: 'text-contains', expectedValue: '11' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-07-02',
          question: 'Why are Approximate Nearest Neighbor (ANN) index algorithms like HNSW preferred over exact k-NN in production vector search?',
          options: [
            'Because exact k-NN requires translating vectors into Spanish',
            'Exact k-NN requires scanning every single vector in the database (O(N) linear scan), which becomes painfully slow at scale; HNSW navigates graph layers in O(log N) sub-10ms time',
            'HNSW consumes zero RAM',
            'HNSW prevents hallucination by law'
          ],
          correctIndex: 1,
          explanation: 'HNSW provides logarithmic search time over millions of vectors, making real-time vector search possible at scale.'
        }
      ],
      summary: [
        'Cosine similarity measures the geometric alignment between query vectors and document vectors.',
        'Exact k-NN scans all documents linearly; ANN algorithms like HNSW search multi-layer graphs in O(log N) time.',
        'Postgres with pgvector allows housing your application relational data and semantic vectors in a single unified database.'
      ],
      relatedTopics: [
        { title: 'Document Ingestion', chapterNumber: '7', lessonId: 'ai-07-03', context: 'Chunk and prepare documents for vectorization.' }
      ]
    },
    {
      id: 'ai-07-03',
      chapterId: 'ai-mod-07',
      number: '7.3',
      slug: 'document-ingestion',
      title: 'Document Ingestion',
      tagline: 'Text extraction, recursive chunking, chunk overlap, and metadata enrichment',
      durationMinutes: 25,
      learningObjectives: [
        'Implement Recursive Character Chunking with semantic hierarchy: double newlines -> single newlines -> sentences',
        'Tune chunk size (300-800 tokens) and chunk overlap (10-20%) to preserve contextual coherence',
        'Enrich vector chunks with document metadata (title, section header, date, author, page number)'
      ],
      theorySections: [
        {
          heading: '1. Why Chunking Strategy Dictates RAG Quality',
          content: 'You cannot embed an entire 50-page PDF into a single vector. Compressing 50 pages into 768 numbers washes out specific facts. Conversely, chunking text into individual sentences loses surrounding context. The gold standard is recursive chunking into 400-800 character windows with 100 character overlap.',
          bulletPoints: [
            'Chunk Size: 400 - 800 characters (~100 - 200 tokens); compact enough to be specific, broad enough to hold context',
            'Chunk Overlap: 10% - 20% overlap; prevents sentences from being cut in half at arbitrary character boundaries',
            'Recursive Splitting: Attempts to split first by paragraph (\\n\\n), then by sentence (\\n), then by space (" ")'
          ]
        },
        {
          heading: '2. Metadata Enrichment',
          content: 'Vectors without metadata are blind. When ingesting chunks, always attach metadata to enable pre-filtering.',
          bulletPoints: [
            'Metadata Keys: { docId, filename, chapterTitle, sectionHeading, pageNumber, accessRole }',
            'Filtered Vector Search: Searching WHERE accessRole = \'STUDENT\' AND docId = \'ch-02\' before computing vector distances'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Cutting a Movie Reel into Meaningful Scenes',
        concept: 'Chunking Strategy',
        story: 'If you cut a film reel into random 10-second clips, you will cut right through a character mid-sentence ("I am going to... [CUT] ...the grocery store"). A professional film editor cuts by scene and includes a 1-second cross-dissolve overlap so the audience understands the continuous narrative flow.',
        moral: 'Cut your text at natural paragraph and sentence boundaries, with overlap to preserve thought continuity.',
        icon: 'Scissors'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Recursive Text Chunking Algorithm in TypeScript',
        description: 'Pure TypeScript recursive text chunker with overlap support.',
        html: `<div class="chunker-card">
  <h4>Recursive Text Chunker</h4>
  <pre><code>export function chunkText(
  text: string,
  maxChunkSize = 500,
  overlap = 100
): string[] {
  const paragraphs = text.split(/\\n\\n+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + para).length <= maxChunkSize) {
      currentChunk += (currentChunk ? '\\n\\n' : '') + para;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      // Preserve overlap from tail of previous chunk
      const tail = currentChunk.slice(-overlap);
      currentChunk = tail + '\\n\\n' + para;
    }
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}</code></pre>
</div>`,
        css: `.chunker-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '13-17', title: 'Overlap Preservation', explanation: 'Carries over the trailing characters from the prior block to maintain semantic continuity.' }
        ]
      },
      video: {
        title: 'Document Ingestion & Chunking Optimization',
        duration: '15:50',
        description: 'Benchmarking retrieval recall across different chunk sizes and testing markdown AST parsers.',
        keyPoints: ['Chunk size tradeoffs', 'Markdown header splitting', 'Document metadata tagging'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Chunking Strategy', description: 'Splitting documents.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we design a high-precision document ingestion pipeline.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-07-03',
        title: 'Split Text by Paragraph Boundaries',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper function that splits a markdown document by double newline into clean paragraph strings.',
        instructions: [
          'Split by regex /\\n\\n+/',
          'Trim each paragraph and filter out empty strings',
          'Return array of paragraphs'
        ],
        starterHtml: `<div id="para-out">Paragraphs: 0</div>`,
        starterCss: `#para-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function splitParagraphs(text) {
  return [];
}`,
        solutionHtml: `<div id="para-out">Extracted 2 clean paragraphs</div>`,
        solutionCss: `#para-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function splitParagraphs(text) {
  return text.split(/\\n\\n+/).map(p => p.trim()).filter(Boolean);
}`,
        hints: ['Use text.split(/\\n\\n+/).'],
        testCases: [
          { id: 'tc-34', description: 'Splits text into paragraphs', hint: 'Check regex split', checkType: 'text-contains', expectedValue: 'paragraphs' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-07-03',
          question: 'Why is "chunk overlap" added when segmenting documents for vector search?',
          options: [
            'To make documents look longer on disk',
            'To ensure that sentences and ideas occurring near chunk boundaries are not cut in half, preserving semantic context across adjacent vectors',
            'To trick the embedding model into running twice',
            'To bypass copyright regulations'
          ],
          correctIndex: 1,
          explanation: 'Chunk overlap ensures that vital thoughts spanning the boundary of two segments are captured completely in at least one vector.'
        }
      ],
      summary: [
        'Document chunking size and overlap directly govern the accuracy of downstream vector search.',
        'Split hierarchically: paragraphs (\\n\\n) -> sentences (\\n) -> words, keeping chunks between 400-800 characters.',
        'Enrich vector chunks with structured metadata (document ID, section title, timestamps) to allow pre-filtering.'
      ],
      relatedTopics: [
        { title: 'Retrieval Pipelines', chapterNumber: '7', lessonId: 'ai-07-04', context: 'Assemble the end-to-end RAG pipeline.' }
      ]
    },
    {
      id: 'ai-07-04',
      chapterId: 'ai-mod-07',
      number: '7.4',
      slug: 'retrieval-pipelines',
      title: 'Retrieval Pipelines',
      tagline: 'Hybrid search (BM25 + Dense Vectors), reciprocal rank fusion (RRF), and re-ranking',
      durationMinutes: 25,
      learningObjectives: [
        'Understand why hybrid search (BM25 keyword + dense semantic vector) outperforms vector search alone',
        'Implement Reciprocal Rank Fusion (RRF) to merge keyword and vector search rankings',
        'Apply cross-encoder re-ranking models (Cohere Rerank, BGE-Reranker) to rank top-k documents with high precision'
      ],
      theorySections: [
        {
          heading: '1. The Weakness of Pure Vector Search',
          content: 'Dense vector search is phenomenal at understanding concepts, but notoriously weak at exact keyword matching (e.g. searching for a specific error code "ERR_4091_SSL", an invoice number "INV-9821", or an exact variable name "activeTabId"). Hybrid search combines exact BM25 keyword matching with dense semantic embeddings.',
          bulletPoints: [
            'BM25 Keyword Search: Excels at exact acronyms, IDs, rare names, and code syntax',
            'Dense Vector Search: Excels at fuzzy conceptual meaning, synonyms, and natural language questions',
            'Hybrid Power: Captures both specific exact strings and broad conceptual intent'
          ]
        },
        {
          heading: '2. Reciprocal Rank Fusion (RRF) & Re-Ranking',
          content: 'To merge the ranked lists from BM25 and vector search, systems apply Reciprocal Rank Fusion: Score = 1 / (60 + rank_bm25) + 1 / (60 + rank_vector). The top 20 candidates are then passed through a Cross-Encoder Re-ranker to pick the final top 3 most relevant passages.',
          bulletPoints: [
            'RRF: Fast, heuristic score normalization without needing calibrated weights',
            'Cross-Encoder Re-ranker: Compares query and document jointly through full attention layers, providing superior ranking accuracy'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Search Committee: The Archivist and the Subject Expert',
        concept: 'Hybrid Search',
        story: 'If you want to find an obscure 1920s legal statute, you hire two people. The archivist (BM25) searches the index for the exact statute number "Act 482B". The legal scholar (Vector Search) searches for the underlying concept of "waterway rights". When both researchers bring their top books to the judge (Re-ranker), the judge reads all candidates and picks the exact winning precedent.',
        moral: 'Keyword search finds exact numbers; vector search finds conceptual meaning; re-ranking verifies the winner.',
        icon: 'Layers'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Reciprocal Rank Fusion (RRF) in TypeScript',
        description: 'Merging BM25 and vector ranking arrays into a single unified score.',
        html: `<div class="rrf-card">
  <h4>Reciprocal Rank Fusion Algorithm</h4>
  <pre><code>export function reciprocalRankFusion(
  bm25Rankings: string[],
  vectorRankings: string[],
  k = 60
): Map<string, number> {
  const scores = new Map<string, number>();

  const addRank = (docId: string, rank: number) => {
    const current = scores.get(docId) || 0;
    scores.set(docId, current + 1 / (k + rank));
  };

  bm25Rankings.forEach((docId, rank) => addRank(docId, rank + 1));
  vectorRankings.forEach((docId, rank) => addRank(docId, rank + 1));

  // Sort descending by combined RRF score
  return new Map([...scores.entries()].sort((a, b) => b[1] - a[1]));
}</code></pre>
</div>`,
        css: `.rrf-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '10-12', title: 'RRF Math', explanation: 'Assigns decaying reciprocal scores so documents appearing high in both lists rise to the top.' }
        ]
      },
      video: {
        title: 'Hybrid Search & Cross-Encoder Re-Ranking',
        duration: '16:30',
        description: 'Implementing BM25 with vector search in Postgres and evaluating top-k accuracy gains.',
        keyPoints: ['BM25 vs Vector trade-offs', 'RRF mathematics', 'Cross-encoder latency vs accuracy'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Hybrid Retrieval', description: 'Combining algorithms.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we combine keyword matching with vector embeddings for state-of-the-art retrieval.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-07-04',
        title: 'Calculate Single RRF Rank Score',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Calculate the RRF score for a document ranked #1 in BM25 and #2 in vector search with k=60.',
        instructions: [
          'Score = 1 / (60 + 1) + 1 / (60 + 2)',
          '1/61 = 0.01639; 1/62 = 0.01613; Total = 0.0325',
          'Return decimal rounded to 4 places'
        ],
        starterHtml: `<div id="rrf-out">RRF Score: 0</div>`,
        starterCss: `#rrf-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateRrf(rank1, rank2, k = 60) {
  return 0;
}`,
        solutionHtml: `<div id="rrf-out">RRF Score: 0.0325</div>`,
        solutionCss: `#rrf-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateRrf(rank1, rank2, k = 60) {
  return Number(((1 / (k + rank1)) + (1 / (k + rank2))).toFixed(4));
}`,
        hints: ['Sum the two reciprocal fractions.'],
        testCases: [
          { id: 'tc-35', description: 'Calculates 0.0325 for rank 1 and 2', hint: '1/61 + 1/62', checkType: 'text-contains', expectedValue: '0.0325' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-07-04',
          question: 'Why does pure vector search frequently fail when users query for specific product part numbers, error codes, or exact variable names?',
          options: [
            'Because vector embeddings compress text into general semantic concepts, washing out microscopic alphanumeric character distinctions that exact keyword search (BM25) excels at',
            'Because part numbers are illegal in AI models',
            'Because vector search only works on Saturdays',
            'Because embeddings delete all numbers automatically'
          ],
          correctIndex: 0,
          explanation: 'Embeddings group text conceptually, making them poor at distinguishing between exact serial numbers or error codes.'
        }
      ],
      summary: [
        'Hybrid search combines the exact precision of BM25 keyword search with the conceptual power of vector embeddings.',
        'Reciprocal Rank Fusion (RRF) merges disparate ranking lists cleanly without requiring calibrated score weights.',
        'A cross-encoder re-ranking stage delivers the highest retrieval precision for the final LLM prompt context.'
      ],
      relatedTopics: [
        { title: 'Grounded Answers and Source References', chapterNumber: '7', lessonId: 'ai-07-05', context: 'Build citation and attribution UIs.' }
      ]
    },
    {
      id: 'ai-07-05',
      chapterId: 'ai-mod-07',
      number: '7.5',
      slug: 'grounded-answers-and-source-references',
      title: 'Grounded Answers and Source References',
      tagline: 'Fact attribution, clickable source citations, highlighted snippets, and trust verification',
      durationMinutes: 25,
      learningObjectives: [
        'Architect RAG prompts that force the model to attribute claims to specific bracketed citations [1], [2]',
        'Design responsive React UI components that render interactive source badges with snippet tooltips',
        'Build verification algorithms that verify whether generated statements are truly supported by cited context'
      ],
      theorySections: [
        {
          heading: '1. The Citation Contract',
          content: 'In production enterprise RAG systems, answers without citations cannot be trusted. By formatting retrieved documents as numbered sources and instructing the model to cite [Source N] after every factual claim, users can verify claims against authoritative source documents.',
          bulletPoints: [
            'Numbered Context: Context is passed as [Source 1: Title] ... [Source 2: Title] ...',
            'Citation Prompt: "Every factual assertion must be followed by its bracketed citation, e.g. [1]. Never assert facts not found in the sources."',
            'UI Integration: The frontend transforms [1] into clickable badge chips that highlight the exact source snippet'
          ]
        },
        {
          heading: '2. Automated Citation Verification (Faithfulness)',
          content: 'To detect subtle hallucinations, enterprise pipelines use automated faithfulness evaluators (such as Ragas or TruLens) to cross-check whether the generated claim is logically entailed by the cited source passage.',
          bulletPoints: [
            'Faithfulness Metric: (Number of claims supported by context) / (Total claims in answer)',
            'Threshold Enforcement: If faithfulness score < 0.90, prompt the model to re-write or flag for human review'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Academic Research Paper with Footnotes',
        concept: 'Source Citations',
        story: 'If an academic paper claims, "85% of users prefer dark mode," without a footnote, the peer reviewers reject it as an unverified opinion. If the paper adds a footnote: "[14] ACM Browser Study, Oct 2024, page 12," any reader can flip to the bibliography, check the study, and trust the finding completely.',
        moral: 'Footnotes and citations turn plausible AI assertions into verifiable, enterprise-grade truth.',
        icon: 'BookOpen'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Grounded Citation React Renderer in TypeScript',
        description: 'Transforming bracketed citations [1] into interactive citation badges.',
        html: `<div class="citation-card">
  <h4>Citation Badge Parser</h4>
  <pre><code>interface SourceReference {
  id: number;
  title: string;
  url: string;
  snippet: string;
}

export function renderTextWithCitations(
  text: string,
  sources: SourceReference[]
) {
  // Regex matches [1], [2], etc.
  const parts = text.split(/(\\[\\d+\\])/g);

  return parts.map((part, idx) => {
    const match = part.match(/\\[(\\d+)\\]/);
    if (!match) return part;

    const sourceId = parseInt(match[1], 10);
    const source = sources.find(s => s.id === sourceId);
    if (!source) return part;

    return (
      <span
        key={idx}
        className="badge badge-accent"
        title={source.snippet}
        style={{ cursor: 'pointer', margin: '0 2px' }}
      >
        [{sourceId}: {source.title}]
      </span>
    );
  });
}</code></pre>
</div>`,
        css: `.citation-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '13-28', title: 'Badge Transformation', explanation: 'Converts raw markdown citations into clickable UI chips with tooltip snippets.' }
        ]
      },
      video: {
        title: 'Building Interactive RAG Citation Interfaces',
        duration: '15:20',
        description: 'Implementing source grounding prompts, citation parsers, and side-panel document previews.',
        keyPoints: ['Citation prompt engineering', 'Faithfulness verification metrics', 'Interactive citation badges'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Citations', description: 'Grounded attribution.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we transform AI outputs into fully verifiable, cited documentation.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-07-05',
        title: 'Format Context Documents with Numbered Headers',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that formats an array of document objects { id: 1, title: "A", content: "..." } into a numbered citation prompt string.',
        instructions: [
          'Format each doc as "[Source ${d.id}: ${d.title}]\\n${d.content}"',
          'Join documents with double newlines'
        ],
        starterHtml: `<div id="cite-out">Context: pending</div>`,
        starterCss: `#cite-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function formatSources(docs) {
  return "";
}`,
        solutionHtml: `<div id="cite-out">[Source 1: Policy] Refund within 14 days</div>`,
        solutionCss: `#cite-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function formatSources(docs) {
  return docs.map(d => \`[Source \${d.id}: \${d.title}]\\n\${d.content}\`).join('\\n\\n');
}`,
        hints: ['Use template literals with [Source N: Title].'],
        testCases: [
          { id: 'tc-36', description: 'Formats numbered source headers', hint: 'Check [Source N]', checkType: 'text-contains', expectedValue: 'Source' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-07-05',
          question: 'What is the primary value of presenting clickable source citations in a customer-facing RAG interface?',
          options: [
            'To show off how many files are on the hard drive',
            'To provide verifiable evidence that eliminates user skepticism and allows human operators to confirm facts against source material in 1 click',
            'To increase server CPU temperature',
            'To hide the true answer from the user'
          ],
          correctIndex: 1,
          explanation: 'Clickable source citations build immediate user trust by proving that answers are grounded in verified documentation.'
        }
      ],
      summary: [
        'Enforce citation contracts in RAG system prompts: require the model to tag every assertion with [Source N].',
        'Render citations as interactive UI badges with snippet previews in the client web interface.',
        'Implement automated faithfulness verification to guarantee that generated statements are factually entailed by cited passages.'
      ],
      relatedTopics: [
        { title: 'Advanced AI Engineering', chapterNumber: '8', lessonId: 'ai-08-01', context: 'Advance to Module 8.' }
      ]
    }
  ]
};
