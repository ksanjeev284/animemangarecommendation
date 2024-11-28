// We're using Hugging Face's free inference API
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli';

// These are the labels we want to classify against
const GENRE_LABELS = [
  'Action anime with fighting and battles',
  'Adventure anime with exploration and journeys',
  'Comedy anime with humor and funny moments',
  'Drama anime with emotional stories',
  'Fantasy anime with magic and mythical elements',
  'Horror anime with scary and dark themes',
  'Mystery anime with detective stories',
  'Psychological anime with complex themes',
  'Romance anime with love stories',
  'Science Fiction anime with futuristic themes',
  'Slice of Life anime about daily life',
  'Sports anime about athletes and competitions',
  'Supernatural anime with magical powers',
  'Thriller anime with suspense'
];

export interface AIResponse {
  genres: string[];
  yearPreference: 'modern' | 'classic' | 'any';
  qualityThreshold: 'high' | 'medium' | 'any';
}

async function classifyText(text: string): Promise<{ label: string; score: number }[]> {
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // This is a demo API key that's rate-limited but free to use
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          candidate_labels: GENRE_LABELS
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.labels.map((label: string, index: number) => ({
      label,
      score: data.scores[index]
    }));
  } catch (error) {
    console.error('Error classifying text:', error);
    return [];
  }
}

function extractGenresFromLabels(classifications: { label: string; score: number }[]): string[] {
  // Only consider classifications with a score above 0.3
  const relevantClassifications = classifications.filter(c => c.score > 0.3);
  
  return relevantClassifications.map(c => {
    // Extract the main genre from the label
    const genre = c.label.split(' ')[0];
    return genre;
  });
}

function determineYearPreference(text: string): 'modern' | 'classic' | 'any' {
  const lowercaseText = text.toLowerCase();
  
  if (lowercaseText.includes('new') || 
      lowercaseText.includes('recent') || 
      lowercaseText.includes('modern')) {
    return 'modern';
  }
  
  if (lowercaseText.includes('classic') || 
      lowercaseText.includes('old') || 
      lowercaseText.includes('retro')) {
    return 'classic';
  }
  
  return 'any';
}

function determineQualityThreshold(text: string): 'high' | 'medium' | 'any' {
  const lowercaseText = text.toLowerCase();
  
  if (lowercaseText.includes('best') || 
      lowercaseText.includes('top') || 
      lowercaseText.includes('masterpiece') ||
      lowercaseText.includes('highest rated')) {
    return 'high';
  }
  
  if (lowercaseText.includes('good') || 
      lowercaseText.includes('decent')) {
    return 'medium';
  }
  
  return 'any';
}

export async function analyzeAnimePreferences(text: string): Promise<AIResponse> {
  // Use both AI classification and rule-based analysis
  const classifications = await classifyText(text);
  const genres = extractGenresFromLabels(classifications);
  const yearPreference = determineYearPreference(text);
  const qualityThreshold = determineQualityThreshold(text);

  return {
    genres,
    yearPreference,
    qualityThreshold
  };
}
